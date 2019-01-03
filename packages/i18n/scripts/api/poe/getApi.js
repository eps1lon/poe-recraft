const https = require('https');
const { createGunzip } = require('zlib');

module.exports = async function getApi(endpoint, fn_options = {}) {
  const { subdomain, timeout = 30 * 1000 } = fn_options;

  const gunzip = createGunzip();
  const options = {
    host: `${subdomain ? `${subdomain}.` : ''}pathofexile.com`,
    path: `/api/${endpoint}`,
    headers: {
      'Accept-Encoding': 'gzip'
    }
  };
  console.log(`loading ${options.host}${options.path}`);

  return await new Promise((resolve, reject) => {
    let data = '';
    const request = https
      .get(options, response => {
        const readStream =
          response.headers['content-encoding'] === 'gzip'
            ? response.pipe(gunzip)
            : response;

        // response.pipe(file); but with a write after response finishes
        readStream.on('data', chunk => (data += chunk));
        readStream.on('end', () => {
          const json = JSON.parse(data);
          if (response.statusCode !== 200) {
            reject(json)
          } else {
            resolve(json);
          }
          
        });
        response.on('error', err => reject(err));
      })
      .on('error', err => reject(err))
      .setTimeout(timeout, () => {
        request.abort();
        reject(`timeout after ${timeout}ms`);
      });
  });
};
