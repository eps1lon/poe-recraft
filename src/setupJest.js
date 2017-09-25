// @flow
const fetchMock = require('fetch-mock');

const items = require('./__fixtures__/baseitemtypes.json');
const mods = require('./__fixtures__/mods.json');

const mocks = {
  items,
  mods,
};

fetchMock.get('/items.json', items);
fetchMock.get('/mods.json', mods);
