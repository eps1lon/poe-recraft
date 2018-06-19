import Item from '../Item';
import { RarityIdent, RarityKind } from '../components/Rarity';
import { AugmentableValue } from '../util';
import { ModGroup } from './types';
import { BaseItemTypeProps, ModProps } from '../../../schema';
import { Mod } from '../../../mods';
import Container from '../../Container';
import { fromFlags } from '../atlasModifier';
import { Socket, SocketGroup } from '../components/Sockets';

/**
 * a serialization of an {Item} that aims convey meaning of its properties
 * and not how they are supposed to be displayed.
 *
 * Its goal is it to be deserialized into an Item
 */
export interface SemanticItemJSON {
  base: BaseItemTypeProps;
  name: string;
  rarity: RarityIdent;
  requirements: {
    level: AugmentableValue;
    dex: AugmentableValue;
    int: AugmentableValue;
    str: AugmentableValue;
  };
  mods?: { [key in ModGroup]?: ModProps[] };
  elder?: boolean;
  shaper?: boolean;
  corrupted?: boolean;
  mirrored?: boolean;
  item_level?: number;
  quality?: number;
  sockets: Socket[];
  groups: SocketGroup[];
}

export function serialize(item: Item): SemanticItemJSON {
  const base = item.baseitem;
  const [name, type_line] = item.name.lines();
  const rarity = item.rarity.toString();
  const requirements = item.requirements.list();
  const mods = {
    explicit: modProps(item.affixes),
    implicit: modProps(item.implicits),
  };
  const elder = item.isElderItem();
  const shaper = item.isSHaperItem();
  const { corrupted, item_level, mirrored } = item.props;
  const quality = item.properties.quality;
  const { sockets, groups } = serializeSockets(item);

  return {
    base,
    name: type_line !== undefined ? name : 'Random Name',
    rarity,
    requirements,
    mods,
    elder,
    shaper,
    corrupted,
    item_level,
    mirrored,
    quality,
    sockets,
    groups,
  };
}

export function deserialize(json: SemanticItemJSON): Item {
  const {
    mods = {},
    corrupted = false,
    mirrored = false,
    quality = 0,
    elder,
    shaper,
    sockets,
    groups,
    item_level = 100,
  } = json;
  const { explicit = [], implicit = [] } = mods;
  const atlas_modifier = fromFlags({ elder, shaper });

  const item = new Item({
    affixes: modsFromProps(explicit),
    baseitem: json.base,
    implicits: modsFromProps(implicit),
    meta_data: Item.buildMetaData(json.base),
    name: json.name,
    properties: { quality },
    props: { corrupted, mirrored, atlas_modifier, item_level },
    rarity: RarityKind[json.rarity],
    requirements: json.base.component_attribute_requirement,
    sockets: { sockets, groups },
  });
  return item;
}

function modProps(container: Container<Mod>): ModProps[] {
  return container.mods.map(({ props }) => props);
}

function modsFromProps(props: ModProps[]): Mod[] {
  return props.map(p => new Mod(p));
}

function serializeSockets(item: Item) {
  const json = item.sockets.toJson();
  const groups: number[][] = [];
  const sockets = json.map(({ group, ...socket }, index) => {
    if (!Array.isArray(groups[group])) {
      groups[group] = [];
    }
    groups[group].push(index);
    return socket;
  });

  return { sockets, groups };
}
