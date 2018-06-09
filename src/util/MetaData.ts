import { Tag } from '../schema';
// import meta_datas from './meta_data.json' does not work with --module ES6
// tslint:disable-next-line: no-var-requires
const meta_datas: MetaDataMap = require('./meta_data.json');
export interface MetaDataProps {
  extends: string;
  inheritance: string[];
  tags: Tag[];
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
