import { Tag } from '../schema';

import meta_datas from './meta_data';

export interface MetaDataProps {
  extends: string;
  inheritance: string[];
  tags: Tag[];
  // specific fascade
  AttributeRequirements?:
    | {
        dexterity_requirement: string[];
        intelligence_requirement: string[];
        strength_requirement: string[];
      }
    | {};
  Base?: {
    tag?: string[];
    x_size?: string[];
    y_size?: string[];
  };
  Quality?: {
    max_quality: string[];
  };
  Sockets?: {
    socket_info: string[];
  };
  Usable?:
    | {
        action: string[];
        use_type: string[];
      }
    | {};
  Weapon?: {
    accuracy_rating?: string[];
    critical_chance?: string[];
    minimum_attack_distance?: string[];
    maximum_attack_distance?: string[];
    minimum_damage?: string[];
    maximum_damage?: string[];
    weapon_speed?: string[];
    weapon_class?: string[];
  };
}

export interface MetaDataMap {
  [key: string]: MetaDataProps;
}

/**
 * class Metadata
 *
 * representation of a .ot file in METADATA
 */
export default class MetaData {
  public static build(clazz: string): MetaData {
    if (meta_datas[clazz] != null) {
      return new MetaData(clazz, meta_datas[clazz]);
    } else {
      throw new Error(`meta_data for ${clazz} not found`);
    }
  }

  public clazz: string;
  public props: MetaDataProps;

  constructor(clazz: string, props: MetaDataProps) {
    this.clazz = clazz;
    this.props = props;
  }

  public isA(other: string): boolean {
    return other === this.clazz || this.props.inheritance.indexOf(other) !== -1;
  }
}
