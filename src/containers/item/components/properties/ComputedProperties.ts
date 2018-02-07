export interface Property {
  values: [number, number];
  type: 'simple' | 'augmented';
}

export interface Properties {
  [key: string]: Property;
}
