export interface Buildable<P, T> {
  // statics
  name: string;
  build(props: P): T;
}
