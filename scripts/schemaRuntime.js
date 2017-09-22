const babel = require('babel-core');
const fs = require('fs');
const path = require('path');

const runtime = babel.transformFileSync(
  path.join(__dirname, '../src/schema.js'),
  {
    plugins: [
      [
        'flow-runtime',
        {
          assert: true,
          annotate: true,
        },
      ],
    ],
  },
);

fs.writeFileSync(
  path.join(__dirname, '../src/util/generated/schema.js'),
  runtime.code,
);
