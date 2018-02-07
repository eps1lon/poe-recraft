export interface Buildable<P, T> {
  // statics
  build(props: P): T;
  name: string;
}
