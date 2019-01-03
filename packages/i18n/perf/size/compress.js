const fs = require('fs');
const path = require('path');
const prettier = require('prettier');

const uncompressed = fs.readFileSync(path.join(__dirname, './Mods.json'));
const mods = JSON.parse(uncompressed);

const fromPairs = pairs =>
  pairs.reduce((obj, [key, value]) => {
    obj[key] = value;
    return obj;
  }, {});

const shortenKeys = obj =>
  fromPairs(
    Object.entries(obj).map(([key, value]) => {
      return [key[0], value];
    })
  );

const removeEmpty = obj =>
  fromPairs(
    Object.entries(obj).filter(([, value]) => value && value.length > 0)
  );

const compressors = {
  no_whitespace: mods => JSON.stringify(mods),
  short_keys: mods =>
    JSON.stringify(
      fromPairs(
        Object.entries(mods).map(([key, values]) => [key, shortenKeys(values)])
      )
    ),
  remove_empty: mods =>
    JSON.stringify(
      fromPairs(
        Object.entries(mods)
          .map(([key, values]) => {
            return [key, removeEmpty(values)];
          })
          .filter(([, values]) => Object.keys(values).length > 0)
      )
    )
};

Object.entries(compressors).forEach(([name, fn]) => {
  fs.writeFileSync(path.join(__dirname, `Mods_${name}.json`), fn(mods));
});

fs.writeFileSync(
  path.join(__dirname, `Mods_all.json`),
  Object.values(compressors).reduce(
    (json, fn) => fn(JSON.parse(json)),
    uncompressed
  )
);
