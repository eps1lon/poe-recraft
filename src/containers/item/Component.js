// @flow

export interface Component<T, B> {
  parent: T,
  builder(): B,
  any(): boolean,
}
