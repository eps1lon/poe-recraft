// parses *.ot files into MetaDataMap
const fs = require('fs');
const { Grammar, Parser } = require('nearley');
const path = require('path');
const stripBom = require('strip-bom');
const { promisify } = require('util');

const grammar = Grammar.fromCompiled(require('./OtFile.out.js'));

const glob = promisify(require('glob'));
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

const file_encoding = 'utf16le';
// extract via pypoe_ui MetaData/Items
const meta_data_dir = path.resolve(process.cwd(), process.argv[2]);
const out_dir = path.join(__dirname, '../../src/util/MetaData/data.json');

const property_whitelist = ['extends', 'inheritance', 'tags'];

glob(path.join(meta_data_dir, 'Items/**/*.ot'))
  .then(async files => {
    const classes = {};

    for (const file of files) {
      // path relative to meta_data dir
      const class_name = path.basename(file, '.ot');
      const meta = await readFile(file, { encoding: file_encoding });
      // remove blanklines and comments
      const preprocessed = [
        stripBom,
        // remove comments (a blank line remains)
        // WARNING: does not recognize comments in
        // string literals and can potentially result in bad syntax
        t => t.replace(/\/\/[^\r\n]*/g, ''),
        // remove blank lines
        t => t.replace(/(\r?\n)\s*\r?\n/g, '$1'),
      ].reduce((text, transform) => transform(text), meta);
      const parser = new Parser(grammar);

      parser.feed(preprocessed);
      const [[results]] = parser.results;
      results.extends = path.basename(results.extends);
      classes[class_name] = results;
    }

    for (const [classname, class_data] of Object.entries(classes)) {
      class_data.inheritance = computeInheritance(classname, classes);
      class_data.tags = computeTags(classname, classes);
    }

    for (const [, class_data] of Object.entries(classes)) {
      for (const key of Object.keys(class_data)) {
        // remove property so that json stringify does not include those
        if (!property_whitelist.includes(key)) {
          class_data[key] = undefined;
        }
      }
    }

    return classes;
  })
  .then(classes => writeFile(out_dir, JSON.stringify(classes, undefined, 2)));

function computeInheritance(start, classes) {
  const chain = [];

  let cur = start;
  do {
    chain.push(cur);

    cur = classes[cur].extends;
  } while (cur && cur !== undefined && cur !== 'nothing');

  return chain.reverse();
}

function computeTags(classname, classes) {
  let tags = [];

  for (const super_class of computeInheritance(classname, classes)) {
    const { base = {} } = classes[super_class];
    // shallow copy
    const { tags: super_tags = [], remove_tags = [] } = base;

    // tags + super_tags.tag - super_tags.remove_tag
    tags = tags.concat(super_tags).filter(tag => !remove_tags.includes(tag));
  }

  // unique
  return Array.from(new Set(tags));
}
