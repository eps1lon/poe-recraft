// @flow
import type { TagProps } from '../schema';

export interface Taggable {
  getTags(): TagProps[],
}
