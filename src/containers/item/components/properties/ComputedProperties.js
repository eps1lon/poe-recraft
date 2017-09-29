// @flow
import type ValueRange from '../../../../calculator/ValueRange';

export interface Property {
  values: ValueRange,
  type: 'simple' | 'augmented',
}

export interface Properties {
  [string]: Property,
}
