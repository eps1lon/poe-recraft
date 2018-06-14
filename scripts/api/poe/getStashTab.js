const { RateLimiter } = require('limiter');

const getApi = require('./getApi');

const limiter = new RateLimiter(2, 'second');

module.exports = async function getStashTabLimited(id, options = {}) {
  return await new Promise((resolve, reject) => {
    limiter.removeTokens(1, err => {
      if (err) {
        reject(err);
      } else {
        getStashTab(id, options)
          .then(result => resolve(result))
          .catch(err => reject(err));
      }
    });
  });
};

async function getStashTab(id, options = {}) {
  return await getApi(`public-stash-tabs?id=${id}`, options);
}
