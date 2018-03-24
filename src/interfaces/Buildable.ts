export interface Buildable<P, T, A1> {
  // statics
  name: string;
  build(props: P, arg1: A1): T;
}
