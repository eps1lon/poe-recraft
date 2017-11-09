/* eslint-disable no-console, no-shadow */
/* global fetch */
import { createItems, createMods, Transmute } from '../../index';

const fetchMock = require('fetch-mock');

const items = require('../../__fixtures__/baseitemtypes.json');
const mods = require('../../__fixtures__/mods.json');

fetchMock.get('/items.json', items);
fetchMock.get('/mods.json', mods);
console.log = () => {};

it('shouldnt crash', () => {
  // data has to be provided. see eps1lon/poedb
  Promise.all([
    fetch('/items.json')
      .then(body => body.json())
      .then(props => createItems(props))
      .then(items => {
        return items.from(item => {
          return item.name === 'Iron Greaves';
        });
      }),
    fetch('/mods.json')
      .then(body => body.json())
      .then(props => createMods(props))
      .then(mods => Transmute.build(mods.all())),
  ]).then(([greaves, transmute]) => {
    console.log(transmute.modsFor(greaves).map(({ mod }) => mod)); // => GeneratorDetails[]
    console.log(transmute.applyTo(greaves)); // => Item
  });
});
