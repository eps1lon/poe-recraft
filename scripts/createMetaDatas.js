// parses *.ot files into MetaDataMap
const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

const glob = promisify(require('glob'));
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

const file_encoding = 'utf16le';
const meta_data_dir = path.join(process.cwd(), process.argv[2]);
const out_dir = path.join(process.cwd(), process.argv[3]);

glob(path.join(meta_data_dir, 'Items/**/*.ot'))
  .then(async files => {
    const classes = {};

    for (const file of files) {
      const meta_file = await readFile(file);
      const meta = meta_file.toString(file_encoding);

      const meta_extends = parseExtends(meta);
      const fascades = parseFascades(meta);

      classes[path.basename(file, '.ot')] = Object.assign(fascades, {
        extends: meta_extends,
      });
    }

    computeTags('AbstractDagger', classes);

    for (const [classname, class_data] of Object.entries(classes)) {
      class_data.inheritance = computeInheritance(classname, classes);
      class_data.tags = computeTags(classname, classes);
    }

    return classes;
  })
  .then(classes => writeFile(out_dir, JSON.stringify(classes, undefined, 2)));

function parseExtends(meta) {
  const match = meta.match(/extends "([\/\w]+)"/);

  if (match === null) {
    return 'nothing';
  } else {
    return match[1].split('/').pop();
  }
}

function parseFascades(source) {
  const regex = /(\w+)\s+\{([^}]+)\s+\}/gm;

  const fascades = {};
  let match;
  while ((match = regex.exec(source)) !== null) {
    fascades[match[1]] = parseFascade(match[2]);
  }

  return fascades;
}

function parseFascade(source) {
  const regex = /(\w+) = (.+)$/gm;

  const fascade = {};
  let match;
  while ((match = regex.exec(source)) !== null) {
    const [_, key, value] = match;
    if (fascade[key] === undefined) {
      fascade[key] = [];
    }

    fascade[key].push(value.replace(/^"(.+?)"$/m, '$1'));
  }

  return fascade;
}

function computeInheritance(start, classes) {
  const chain = [];

  let cur = start;
  do {
    chain.push(cur);

    cur = classes[cur].extends;
  } while (cur && cur !== 'nothing');

  return chain.reverse();
}

function computeTags(classname, classes) {
  let tags = [];

  for (const super_class of computeInheritance(classname, classes)) {
    const { Base = {} } = classes[super_class];
    // shallow copy
    const super_tags = Object.assign({}, Base);
    if (super_tags.tag === undefined) {
      super_tags.tag = [];
    }
    if (super_tags.remove_tag === undefined) {
      super_tags.remove_tag = [];
    }

    // tags + super_tags.tag - super_tags.remove_tag
    tags = tags
      .concat(super_tags.tag)
      .filter(tag => !super_tags.remove_tag.includes(tag));
  }

  // unique
  return Array.from(new Set(tags));
}
