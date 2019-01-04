import { createItems, createMods, Transmute } from 'poe-mods';

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
