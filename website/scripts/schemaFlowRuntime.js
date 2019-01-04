const babel = require('babel-core');
const fs = require('fs');
const path = require('path');

const runtime = babel.transformFileSync(
  path.join(__dirname, '../src/poe/data/schema.js'),
  {
    plugins: [
      [
        'flow-runtime',
        {
          assert: true,
          annotate: true
        }
      ]
    ],
    presets: ['react']
  }
);

fs.writeFileSync(
  path.join(__dirname, '../src/poe/data/schema_runtime.js'),
  runtime.code
);
