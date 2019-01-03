const seedrandom = require('seedrandom');
// seed Math.random so that we have a deterministic behavior in our test
// coverage
seedrandom('poe', { global: true });
