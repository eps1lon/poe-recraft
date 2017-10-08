// parse PoE MetaData *descriptions into consumeable format
const { promisify } = require('util');
const fs = require('fs');
const path = require('path');
const { Grammar, Parser } = require('nearley');

const grammar = Grammar.fromCompiled(
  require('../src/grammars/generated/stat_descriptions.js')
);

const readdir = promisify(fs.readdir);

const txt_dir = path.join(__dirname, '../tmp/raw');
const json_dir = path.join(__dirname, '../tmp/unprocessed');

const isDescriptionFile = file => file === 'stat_descriptions.txt'; //file => file.endsWith('.txt');

readdir(txt_dir).then(files => {
  files.filter(isDescriptionFile).forEach(file => {
    const text = fs.readFileSync(path.join(txt_dir, file), {
      encoding: 'utf8'
    });

    const out = fs.createWriteStream(
      path.join(json_dir, path.basename(file, '.txt') + '.json')
    );
    out.write('[\n');

    const regex = /^[ \t]*description/gm;
    let chunk_start = 0;
    // used to stream a join method
    // we could just use join() but then we had to keep the hole array in memory
    let first = true;

    // stream every description .* token into the parser
    // and transform it into a json output stream
    while ((token = regex.exec(text)) !== null) {
      const chunk = text.substring(chunk_start, token.index);
      const parser = new Parser(grammar);

      if (chunk !== '') {
        try {
          parser.feed(chunk);
        } catch (err) {
          console.log(file);
          console.log(chunk);
          throw err;
        }

        const [results] = parser.results;
        const { includes, has_identifiers, no_desc, desc } = results;

        first = writeIncludes(includes, first, out);
        first = writeIdentifiers(has_identifiers, first, out);
        first = writeNoDesc(no_desc, first, out);
        first = writeDesc(desc, first, out);
      }

      chunk_start = token.index;
    }

    // closing
    out.write('\n]');
    out.end();
  });
});

function writeIdentifiers(has_identifiers, first, outstream) {
  if (has_identifiers != null) {
    return write([['$hasIdentifiers', has_identifiers]], first, outstream);
  } else {
    return first;
  }
}

function writeIncludes(includes, first, outstream) {
  if (includes != null) {
    return write(includes, first, outstream, include => ['$includes', include]);
  } else {
    return first;
  }
}

function writeNoDesc(identifiers, first, outstream) {
  return write(identifiers, first, outstream, identifier => [
    identifier,
    { stats: [], languages: [], no_description: true }
  ]);
}

// return false if something was written (i.e. set first to false)
function writeDesc(descriptions, first, outstream) {
  return write(descriptions, first, outstream, ([ident, description]) => [
    ident,
    description
  ]);
}

function write(things, first, outstream, map = thing => thing) {
  things.forEach(thing => {
    if (!first) {
      outstream.write(',\n');
    }

    outstream.write(JSON.stringify(map(thing), null, 2));
    first = false;
  });

  return first;
}
