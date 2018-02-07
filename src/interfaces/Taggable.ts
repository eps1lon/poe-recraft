// @flow
import { TagProps } from '../schema';

export interface Taggable {
  getTags(): TagProps[];
}
