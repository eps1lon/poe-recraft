/* eslint-env node */
const fs = require('fs');
const http = require('http');
const { URL } = require('url');
const { promisify } = require('util');

const writeFile = promisify(fs.writeFile);

module.exports = async function createFromApi(endpoint, outfile, options = {}) {
  const {
    api_root = 'http://localhost:3000/',
    transform = identity,
    auth_token = 'allowme',
  } = options;

  const api_url = new URL(endpoint, api_root);
  api_url.searchParams.set('page_size', Number.MAX_SAFE_INTEGER.toString());
  const time_label = `api-${endpoint}`;
  console.time(time_label);
  const body = await httpGet(api_url, {
    headers: { Authorization: auth_token },
  });
  console.timeEnd(time_label);

  const json = JSON.parse(body);
  const transformed = transform(json);
  const formatted = JSON.stringify(transformed, null, 2);

  return await writeFile(outfile, formatted);
};

function identity(arg) {
  return arg;
}

/**
 *
 * @param {URL} url
 * @param {*} options
 */
function httpGet(url, options = {}) {
  return new Promise((resolve, reject) => {
    let data = '';

    http
      .get(
        {
          host: url.hostname,
          port: url.port,
          path: `${url.pathname}${url.search}`,
          headers: {
            Authorization: 'allowme',
          },
        },
        res => {
          res.on('data', chunk => (data += chunk));
          res.on('end', () => {
            if (res.statusCode === 200) {
              resolve(data);
            } else {
              reject(data);
            }
          });
        },
      )
      .on('error', e => reject(e));
  });
}
