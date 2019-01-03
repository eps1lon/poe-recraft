import { Tag } from '../../schema';

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
