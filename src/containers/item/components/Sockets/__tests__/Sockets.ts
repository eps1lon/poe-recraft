import { createTables } from '../../../../../__fixtures__/util';

const tables = createTables();
const { items } = tables;

const item = items.fromName('Vaal Regalia');

describe('socketing', () => {
  test('items have 0 sockets by default', () => {
    expect(item.sockets.count()).toBe(0);
  });
  it('can add and remove sockets sockets', () => {
    const added = item.sockets.socket(4);
    expect(added.sockets.count()).toBe(4);
    expect(added.sockets.colors().toString()).toEqual('w,w,w,w');

    const removed = item.sockets.socket(2);
    expect(removed.sockets.count()).toBe(2);
    expect(removed.sockets.colors().toString()).toEqual('w,w');
  });
  it('throws if it should add sockets beyond limit', () => {
    expect(() => item.sockets.socket(7)).toThrow(
      "This item can't have more than 6 sockets",
    );
  });
  it('can add beyond max limit if forced', () => {
    const crafted = item.sockets.socket(7, { force: true });
    expect(crafted.sockets.count()).toBe(7);
  });
  it('keeps links when adding', () => {
    // pre
    const socketed = item.sockets.socket(3);
    const linked = socketed.sockets.link(0, 2);
    expect(linked.sockets.toString()).toEqual('w-w-w');
    // post
    const added = linked.sockets.socket(6);
    expect(added.sockets.toString()).toEqual('w-w-w w w w');
  });
  it('cuts of links when removing', () => {
    // pre
    const socketed = item.sockets.socket(6);
    const linked = socketed.sockets.link(0, 5);
    expect(linked.sockets.toString()).toEqual('w-w-w-w-w-w');
    // post
    const removed = linked.sockets.socket(3);
    expect(removed.sockets.toString()).toEqual('w-w-w');
    // and they are not "saved" inbetween
    const added = removed.sockets.socket(6);
    expect(added.sockets.toString()).toEqual('w-w-w w w w');
  });
});

describe('links', () => {
  it('throws if it should link non existing sockets', () => {
    const socketed = item.sockets.socket(3);
    expect(() => socketed.sockets.link(2, 3)).toThrow(
      'Tried to link two sockets that do not exist on this Item.',
    );
  });
  it('can link existing sockets', () => {
    // pre
    const socketed = item.sockets.socket(3);
    expect(socketed.sockets.toString()).toEqual('w w w');

    // post
    const linked = socketed.sockets.link(0, 1, 1, 2);
    expect(linked.sockets.toString()).toEqual('w-w-w');
  });
  it('can link non-adjacent sockets by linking every socket between', () => {
    // pre
    const socketed = item.sockets.socket(3);
    expect(socketed.sockets.toString()).toEqual('w w w');

    // post
    const linked = socketed.sockets.link(0, 2);
    expect(linked.sockets.toString()).toEqual('w-w-w');
  });
  it('throws if the links are not provided as pairs', () => {
    const socketed = item.sockets.socket(3);
    expect(() => socketed.sockets.link(0, 1, 1)).toThrow(
      '#links() require pairs of sockets. An odd number of sockets was given.',
    );
  });
  it('merges linked sockets', () => {
    // pre1
    const socketed = item.sockets.socket(6);
    const linked1 = socketed.sockets.link(0, 1, 2, 3, 4, 5);
    expect(linked1.sockets.toString()).toEqual('w-w w-w w-w');
    // post1
    const linked1_post1 = linked1.sockets.link(1, 2);
    expect(linked1_post1.sockets.toString()).toEqual('w-w-w-w w-w');

    const linked1_post2 = linked1.sockets.link(3, 4);
    expect(linked1_post2.sockets.toString()).toEqual('w-w w-w-w-w');

    const linked1_post3 = linked1.sockets.link(0, 4);
    expect(linked1_post3.sockets.toString()).toEqual('w-w-w-w-w-w');

    // pre2
    const linked2 = socketed.sockets.link(0, 2, 3, 5);
    expect(linked2.sockets.toString()).toEqual('w-w-w w-w-w');
    // post2
    const linked2_post1 = linked2.sockets.link(2, 3);
    expect(linked2_post1.sockets.toString()).toEqual('w-w-w-w-w-w');

    const linked2_post2 = linked2.sockets.link(1, 4);
    expect(linked2_post2.sockets.toString()).toEqual('w-w-w-w-w-w');
  });
});

describe('max()', () => {
  it('should have no more than 4 on boots, gloves, helmets', () => {
    expect(items.fromName('Bone Helmet').sockets.maxSockets()).toBe(4);
    expect(items.fromName('Iron Gauntlets').sockets.maxSockets()).toBe(4);
    expect(items.fromName('Iron Greaves').sockets.maxSockets()).toBe(4);
    expect(items.fromName('Fishing Rod').sockets.maxSockets()).toBe(4);
  });

  it('should have no more than 3 on shields and 1H', () => {
    expect(items.fromName('Rusted Sword').sockets.maxSockets()).toBe(3);
    expect(items.fromName('Siege Axe').sockets.maxSockets()).toBe(3);
    expect(items.fromName('Estoc').sockets.maxSockets()).toBe(3);
    expect(items.fromName('War Buckler').sockets.maxSockets()).toBe(3);
    expect(items.fromName('Driftwood Wand').sockets.maxSockets()).toBe(3);
  });

  it('should have no sockets on jewelry', () => {
    expect(items.fromName('Amber Amulet').sockets.maxSockets()).toBe(0);
  });

  it('should have no more than 6 on armour and 2H', () => {
    expect(items.fromName('Plate Vest').sockets.maxSockets()).toBe(6);
    expect(items.fromName('Keyblade').sockets.maxSockets()).toBe(6);
    expect(items.fromName('Judgement Staff').sockets.maxSockets()).toBe(6);
  });

  it('should check level restrictions', () => {
    const staff = items.fromName('Judgement Staff');

    expect(staff.setProperty('item_level', 1).sockets.maxSockets()).toBe(2);
    expect(staff.setProperty('item_level', 2).sockets.maxSockets()).toBe(3);
    expect(staff.setProperty('item_level', 25).sockets.maxSockets()).toBe(4);
    expect(staff.setProperty('item_level', 35).sockets.maxSockets()).toBe(5);
    expect(staff.setProperty('item_level', 67).sockets.maxSockets()).toBe(6);
  });

  it('should check tags', () => {
    expect(items.fromName('Gnarled Branch').sockets.maxSockets()).toBe(3);
    expect(items.fromName('Unset Ring').sockets.maxSockets()).toBe(1);
    expect(items.fromName('Black Maw Talisman').sockets.maxSockets()).toBe(1);
  });

  it('should have not have any currently', () => {
    expect(items.fromName('Judgement Staff').sockets.any()).toBe(false);
  });
});
