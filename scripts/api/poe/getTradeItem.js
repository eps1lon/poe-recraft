const { RateLimiter } = require('limiter');

const getApi = require('./getApi');

// X-Rate-Limit-IP: 20:5:60
// 20 per 5 seconds, don't know how to apply this with limiter so fallback to 4 every second
const limiter = new RateLimiter(3, 'second');

module.exports = async function getTradeItemLimited(item_ids, options = {}) {
  return await new Promise((resolve, reject) => {
    limiter.removeTokens(1, err => {
      if (err) {
        reject(err);
      } else {
        getTradeItem(item_ids, options)
          .then(result => resolve(result))
          .catch(err => reject(err));
      }
    });
  });
};

async function getTradeItem(item_ids, options = {}) {
  const ids = Array.isArray(item_ids) ? item_ids.join(',') : item_ids;

  const { result } = await getApi(`trade/fetch/${ids}`, options);
  return result.map(({ item }) => item);
}
