// @flow
import type { MetaDataProps, MetaDataMap } from './data/schema';

type ExpectedType = 'number' | 'string' | 'array';

/**
 * class Metadata
 * 
 * representation of a .ot file in METADATA 
 */
export default class MetaData {
  static build(clazz: string, meta_datas: MetaDataMap): ?MetaData {
    if (meta_datas[clazz] != null) {
      return new MetaData(clazz, meta_datas[clazz]);
    } else {
      return null;
    }
  }

  clazz: string;
  props: MetaDataProps;

  constructor(clazz: string, props: MetaDataProps) {
    this.clazz = clazz;
    this.props = props;
  }

  isA(other: string): boolean {
    return other === this.clazz || this.props.inheritance.indexOf(other) !== -1;
  }

  valueOf(
    fascade_key: string,
    key: string,
    expect: ExpectedType
  ): ?(number | string | string[]) {
    const fascade = this.props[fascade_key];
    const fascade_is_object = fascade != null && typeof fascade === 'object';

    if (fascade_is_object && Array.isArray(fascade[key])) {
      switch (expect) {
        case 'string':
          return fascade[key][0];
        case 'number':
          return +fascade[key][0];
        case 'array':
          return fascade[key];
      }
    } else {
      return undefined;
    }
  }
}
