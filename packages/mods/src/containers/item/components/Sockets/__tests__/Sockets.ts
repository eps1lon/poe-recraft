import { createTables } from '../../../../../__fixtures__/util';
import { SocketColor } from '../types';

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
  it('can create sockets with a custom builder', () => {
    const added = item.sockets.socket(5, {
      newSocket: (_, index) => {
        return {
          color: index % 2 ? SocketColor.blue : SocketColor.abyss,
        };
      },
    });
    expect(added.sockets.toString()).toEqual('a b a b a');
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
  it('can clear links if specified', () => {
    // pre
    const socketed = item.sockets.socket(3);
    const linked = socketed.sockets.link(0, 2);
    expect(linked.sockets.toString()).toEqual('w-w-w');
    // post
    const added = linked.sockets.socket(6, { keep_links: false });
    expect(added.sockets.toString()).toEqual('w w w w w w');
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
  it('changes reference equality if and only if the amounf of sockets changes', () => {
    const socketed = item.sockets.socket(4);
    expect(item).not.toBe(socketed);
    // same amount of sockets
    expect(socketed).toBe(socketed.sockets.socket(4));
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

  it('can recognize the size of the biggest linked group', () => {
    // pre
    const socketed = item.sockets.socket(6);
    expect(socketed.sockets.maxLinks()).toBe(0);
    // post1
    const linked1 = socketed.sockets.link(0, 1, 2, 3, 4, 5);
    expect(linked1.sockets.maxLinks()).toBe(2);
    // post2
    const linked2 = socketed.sockets.link(0, 3);
    expect(linked2.sockets.maxLinks()).toBe(4);
    // post2
    const linked3 = socketed.sockets.link(0, 1, 2, 5);
    expect(linked3.sockets.maxLinks()).toBe(4);
    // post3
    const linked4 = socketed.sockets.link(0, 5);
    expect(linked4.sockets.maxLinks()).toBe(6);
  });

  it('changes reference equality if and only if the links changes', () => {
    const socketed = item.sockets.socket(4);
    const linked = socketed.sockets.link(0, 2);
    expect(linked).not.toBe(socketed);
    // same links
    expect(linked).toBe(linked.sockets.link(0, 2));
    expect(linked).toBe(linked.sockets.link(1, 2));
    expect(linked).toBe(linked.sockets.link());
  });
});

describe('coloring', () => {
  const socketed = item.sockets.socket(6);
  it('throws if the specified socket index does not exist', () => {
    expect(() => socketed.sockets.color(SocketColor.green, 0, 1, 7)).toThrow(
      'Tried to color a socket that does not exist.',
    );
  });
  it('allows changing colors', () => {
    const colored = socketed.sockets.color(SocketColor.green, 2, 3);
    expect(socketed.sockets.toString()).toEqual('w w w w w w');
    expect(colored.sockets.toString()).toEqual('w w g g w w');
  });
  it('allows changing colors in batches', () => {
    const colored = socketed.sockets.colorBatch(
      { sockets: [0, 1], color: SocketColor.green },
      { sockets: [2, 3], color: SocketColor.red },
    );
    expect(colored.sockets.toString()).toEqual('g g r r w w');
  });
  describe('mapColors()', () => {
    it('allows changing colors with a mapped function', () => {
      // at least 2 blue
      const colored = socketed.sockets.mapColors((socket, index) => {
        if (index <= 1) {
          return {
            color: SocketColor.blue,
          };
        } else {
          return socket;
        }
      });
      expect(colored).not.toBe(socketed);
      expect(colored.sockets.toString()).toEqual('b b w w w w');
    });
    it('keeps referntial equality with identity function', () => {
      const colored = socketed.sockets.mapColors(s => s);
      expect(colored).toBe(socketed);
      expect(colored.sockets.toString()).toEqual('w w w w w w');
    });
    it('keeps referntial equality with same color', () => {
      // this is a new object the shallowly equal
      const colored = socketed.sockets.mapColors(s => ({ color: s.color }));
      expect(colored).toBe(socketed);
      expect(colored.sockets.toString()).toEqual('w w w w w w');
    });
  });

  it('changes referentiell equality if and only if the color changes', () => {
    const colored = socketed.sockets.color(SocketColor.blue, 0);
    expect(colored).not.toBe(socketed);
    expect(colored.sockets.color(SocketColor.blue, 0)).toBe(colored);
    expect(colored.sockets.color(SocketColor.white, 1)).toBe(colored);
  });
});

describe('maxSockets()', () => {
  test('max() is deprecated', () => {
    global.console.warn = jest.fn();

    // deprecated method
    item.sockets.max();

    expect(console.warn).toBeCalledWith(
      'poe-mods DEPRECATION: use Sockets.maxSockets() instead of Sockets.max()',
    );
  });

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

it('serializes including socket groups', () => {
  // pre
  const socketed = item.sockets.socket(6);
  expect(socketed.sockets.toJson()).toEqual([
    { color: 'w', group: -1 },
    { color: 'w', group: -1 },
    { color: 'w', group: -1 },
    { color: 'w', group: -1 },
    { color: 'w', group: -1 },
    { color: 'w', group: -1 },
  ]);

  // post
  const linked = socketed.sockets.link(0, 1, 2, 3, 4, 5);
  expect(linked.sockets.toJson()).toEqual([
    { color: 'w', group: 0 },
    { color: 'w', group: 0 },
    { color: 'w', group: 1 },
    { color: 'w', group: 1 },
    { color: 'w', group: 2 },
    { color: 'w', group: 2 },
  ]);
});
