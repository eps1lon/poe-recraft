// @flow
export interface Property {
  values: [number, number],
  type: 'simple' | 'augmented',
}

export interface Properties {
  [string]: Property,
}
