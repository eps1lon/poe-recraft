// @flow
import type { MetaDataProps, MetaDataMap } from './data/schema';

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
}
