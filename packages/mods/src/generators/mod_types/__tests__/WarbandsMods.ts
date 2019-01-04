import { createTables } from '../../../__fixtures__/util';
import WarbandsMods from '../WarbandsMods';

const { items, mods } = createTables();

describe('factions', () => {
  const warbands = WarbandsMods.build(mods.all());

  test('that Redblade drops only helmets', () => {
    const helmet = items.fromName('Hubris Circlet');
    expect(
      warbands.modsFor(helmet, ['domain_full']).map(({ mod }) => mod.props.id),
    ).toEqual(['PhysicalDamageTakenAsFirePercentWarbands']);
  });

  test('that Brinerot drops only gloves', () => {
    const gloves = items.fromName('Sorcerer Gloves');
    expect(
      warbands.modsFor(gloves, ['domain_full']).map(({ mod }) => mod.props.id),
    ).toEqual(['DamageDuringFlaskEffectWarbands']);
  });

  test('that Mutewind drops only boots', () => {
    const boots = items.fromName('Titan Greaves');
    expect(
      warbands.modsFor(boots, ['domain_full']).map(({ mod }) => mod.props.id),
    ).toEqual(['CannotBeFrozenWarbands']);
  });

  test('that Renegade drops only weapons', () => {
    const sword = items.fromName('Rusted Sword');
    expect(
      warbands
        .modsFor(sword, ['domain_full'])
        .map(({ mod }) => mod.props.id)
        .sort(),
    ).toEqual([
      'ColdResistancePenetrationWarbands',
      'FireResistancePenetrationWarbands',
      'LightningPenetrationWarbands',
    ]);

    const wand = items.fromName('Pagan Wand');
    expect(warbands.modsFor(sword, ['domain_full'])).toEqual(
      warbands.modsFor(wand, ['domain_full']),
    );
  });
});
