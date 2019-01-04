import { createTables } from '../../../__fixtures__/util';
import Mod from '../../../mods/Mod';

import MasterBenchOption from '../MasterBenchOption';
import { SocketColor } from '../../../containers/item/components/Sockets/types';

const { craftingbenchoptions: options, items } = createTables();

it('should build with master mods', () => {
  const haku_life = options.fromPrimary(74);

  expect(haku_life).toBeInstanceOf(MasterBenchOption);
  expect(haku_life.mod).toBeInstanceOf(Mod);
  expect(haku_life.mod != null && haku_life.mod.isMasterMod()).toBe(true);
});

it('should build with no mods on custom actions', () => {
  const remove_crafted_mod = options.fromPrimary(0);

  expect(remove_crafted_mod.mods).toHaveLength(0);
  expect(remove_crafted_mod.mod).not.toBe(expect.anything());
});

it('should apply the chosen option', () => {
  const haku_life = options.fromPrimary(74);
  const greaves = items.fromName('Iron Greaves');

  const crafted = haku_life.applyTo(greaves);

  expect(crafted).not.toBe(greaves);
  expect(crafted.rarity.toString()).toBe('magic');
  expect(crafted.mods[0].props.name).toEqual('Upgraded');
});

it('should return the same item if it cant apply', () => {
  const jewel = items.fromName('Viridian Jewel').rarity.set('magic');
  const haku_life = options.fromPrimary(74);
  expect(haku_life.applyTo(jewel)).toBe(jewel);

  const haku_armour = options.fromPrimary(191);
  const boots = haku_armour.applyTo(items.fromName('Iron Greaves'));
  expect(haku_life.applyTo(boots)).toBe(boots);
});

describe('remove crafted mod', () => {
  it('is only applicable if the item has a master mod', () => {
    const greaves = items.fromName('Iron Greaves');
    const remove_mod = options.fromPrimary(81);
    // pre
    expect(remove_mod.applicableTo(greaves)).toMatchObject({
      no_crafted_mod: true,
    });
    // post
    const haku_life = options.fromPrimary(74);
    const crafted = greaves.addMod(haku_life.mod!);
    expect(remove_mod.applicableTo(crafted)).toMatchObject({
      no_crafted_mod: false,
    });
  });
  it('can remove crafted mods', () => {
    const greaves = items.fromName('Iron Greaves');
    const haku_life = options.fromPrimary(74);
    // pre
    const crafted = haku_life.applyTo(greaves);
    expect(crafted.hasMod(haku_life.mod!)).toBe(true);
    // post
    const remove_mod = options.fromPrimary(81);
    const removed = remove_mod.applyTo(crafted);
    expect(removed).not.toBe(crafted);
    expect(removed.hasMod(haku_life.mod!)).toBe(false);
  });
});

describe('applicable mods', () => {
  const bench = options.fromPrimary(74);
  const greaves = items.fromName('Iron Greaves');

  const craftedLife = bench.mods[0];

  it('should check for equipment type', () => {
    const weapon = items.fromName('Skinning Knife').rarity.set('magic');

    expect(bench.isModApplicableTo(craftedLife, weapon)).toEqual({
      above_lld_level: false,
      already_present: false,
      domain_full: false,
      lower_ilvl: false,
      no_multimod: false,
      wrong_domain: false,
    });
    expect(bench.applicableTo(weapon)).toMatchObject({
      wrong_itemclass: true,
    });

    const jewel = items.fromName('Viridian Jewel').rarity.set('magic');

    expect(bench.isModApplicableTo(craftedLife, jewel)).toEqual({
      above_lld_level: false,
      already_present: false,
      domain_full: false,
      lower_ilvl: false,
      no_multimod: false,
      wrong_domain: true,
    });
    expect(bench.applicableTo(jewel)).toMatchObject({
      wrong_itemclass: true,
    });
  });

  it('should be applicable to white items', () => {
    expect(bench.isModApplicableTo(craftedLife, greaves)).toEqual({
      above_lld_level: false,
      already_present: false,
      domain_full: false,
      lower_ilvl: false,
      no_multimod: false,
      wrong_domain: false,
    });
  });

  it('should work on magic and rares', () => {
    expect(
      bench.isModApplicableTo(craftedLife, greaves.rarity.set('magic')),
    ).toEqual({
      above_lld_level: false,
      already_present: false,
      domain_full: false,
      lower_ilvl: false,
      no_multimod: false,
      wrong_domain: false,
    });
    expect(
      bench.isModApplicableTo(craftedLife, greaves.rarity.set('rare')),
    ).toEqual({
      above_lld_level: false,
      already_present: false,
      domain_full: false,
      lower_ilvl: false,
      no_multimod: false,
      wrong_domain: false,
    });
  });
});

describe('Artisian (Vorici) bench', () => {
  describe('socket change', () => {
    it('is only applicable if the item can have that many sockets', () => {
      const boots = items.fromName('Iron Greaves');
      const six_socket = options.fromPrimary(4);
      expect(six_socket.applicableTo(boots)).toMatchObject({
        socket_limit_exceeded: true,
      });
    });
    it('is only applicable if the number of sockets changes', () => {
      const boots = items.fromName('Iron Greaves').sockets.socket(4);
      const four_socket = options.fromPrimary(2);
      expect(four_socket.applicableTo(boots)).toMatchObject({
        sockets_unmodified: true,
      });
    });
    it('changes sockets while preserving links and colors; new sockets are based on attributes', () => {
      const chest = items.fromName('Vaal Regalia');
      const socketed = chest.sockets.socket(4);
      // pre
      const linked = socketed.sockets.link(0, 2);
      expect(linked.sockets.toString()).toEqual('w-w-w w');
      // post
      const six_socket = options.fromPrimary(4);
      const crafted = six_socket.applyTo(linked);
      expect(crafted).not.toBe(linked);
      expect(crafted.sockets.toString()).toEqual('w-w-w w b b');
    });
  });
  describe('link change', () => {
    it('is only applicable if the item has enough sockets', () => {
      const boots = items.fromName('Iron Greaves');
      const socketed = boots.sockets.socket(2);
      const four_link = options.fromPrimary(7);
      expect(four_link.applicableTo(socketed)).toMatchObject({
        not_enough_sockets: true,
      });
    });
    it('is only applicable if the links change', () => {
      const boots = items.fromName('Iron Greaves');
      const socketed = boots.sockets.socket(4);
      const linked = socketed.sockets.link(0, 3);
      const four_link = options.fromPrimary(7);
      expect(four_link.applicableTo(linked)).toMatchObject({
        links_unmodified: true,
      });
    });
    it('changes links while preserving color', () => {
      const boots = items.fromName('Iron Greaves');
      const socketed = boots.sockets.socket(4);
      const colored = socketed.sockets.color(SocketColor.blue, 0, 2);
      // pre
      const linked = colored.sockets.link(0, 1);
      expect(linked.sockets.toString()).toEqual('b-w b w');
      // post
      const four_link = options.fromPrimary(7);
      const crafted = four_link.applyTo(linked);
      expect(crafted.sockets.toString()).toEqual('b-w-b-w');
    });
  });
  describe('color change', () => {
    it('can not be applied if the items has not enough sockets', () => {
      const boots = items.fromName('Iron Greaves');
      const socketed = boots.sockets.socket(2);
      const color_rrb = options.fromPrimary(23);
      expect(color_rrb.applicableTo(socketed)).toMatchObject({
        not_enough_sockets: true,
      });
    });
    it('can be applied even if the colors are the same at the position', () => {
      const boots = items.fromName('Iron Greaves');
      const socketed = boots.sockets.socket(4);
      const colored = socketed.sockets.color(SocketColor.blue, 0, 1);
      const color_bb = options.fromPrimary(109);
      expect(color_bb.isApplicableTo(colored)).toBe(true);
    });
    it('changes the first colors', () => {
      const boots = items.fromName('Iron Greaves');
      const socketed = boots.sockets.socket(4);
      const colored = socketed.sockets.colorBatch(
        { color: SocketColor.red, sockets: [0, 2] },
        { color: SocketColor.blue, sockets: [1, 3] },
      );
      // pre
      expect(colored.sockets.toString()).toEqual('r b r b');
      // post
      const color_ggb = options.fromPrimary(25);
      const crafted = color_ggb.applyTo(colored);
      expect(crafted).not.toBe(colored);
      expect(crafted.sockets.toString()).toBe('g g b r');
    });
  });
});

describe.skip('map device (Zana)', () => {
  it('throws if a Fortune Favors the brave is applied', () => {
    // needs proposal. how do we handle opened maps?
  });
});
