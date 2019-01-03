const fs = require('fs');
const http = require('http');
const { URL } = require('url');
const { promisify } = require('util');

const writeFile = promisify(fs.writeFile);

module.exports = async function apiEndpoint(endpoint, options = {}) {
  const {
    api_root = 'http://localhost:3000/',
    auth_token = 'allowme',
    params = {},
  } = options;

  const api_url = new URL(endpoint, api_root);
  setParams(api_url, params);

  const body = await httpGet(api_url, {
    headers: { Authorization: auth_token },
  });

  const json = JSON.parse(body);
  return json;
};

function identity(arg) {
  return arg;
}

function setParams(url, params) {
  if (params === null || typeof params !== 'object') {
    throw new Error('no object given');
  }

  for (const key of Object.keys(params)) {
    url.searchParams.set(key, params[key]);
  }

  return url;
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
