// @flow
export type Buildable<P, T> = {
  // statics
  build(P): T,
  name: string,
};
