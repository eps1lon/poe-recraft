import { Tag } from '../schema';

export interface Taggable {
  getTags(): Tag[];
}
