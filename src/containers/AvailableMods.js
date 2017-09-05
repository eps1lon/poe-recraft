// @flow
import { connect } from 'react-redux';

import type { State } from '../reducers/rootReducer';
import type Mod from '../poe/Mod/';

import Item from '../poe/ModContainer/Item';
import ModGenerator from '../poe/ModGenerator/';

import AvailableMods from '../components/mods/AvailableMods';

const whitelist = [
  'LOWER_ILVL',
  'DOMAIN_FULL',
  'ALREADY_PRESENT',
  'NO_MULTIMOD',
  'ABOVE_LLD_LEVEL'
];

// TODO spawnchance
// TODO expensive selector logic => add reselect
const mapStateToProps = (state: State) => {
  const item = state.craft.item;
  const generator = state.craft.mod_generator;

  let mods: Mod[] = [];

  if (!(generator instanceof ModGenerator)) {
    console.log('mod_generator needs to be of type ModGenerator');
  } else if (!(item instanceof Item)) {
    console.log('baseitem needs to be of type BaseItem');
  } else {
    mods = generator.modsFor(item, whitelist);
  }

  const prefixes = mods.filter(mod => mod.isPrefix());
  const suffixes = mods.filter(mod => mod.isSuffix());
  const implicits = mods.filter(mod => mod.implicitCandidate());

  return {
    prefixes,
    suffixes,
    implicits
  };
};

export default connect(mapStateToProps)(AvailableMods);
