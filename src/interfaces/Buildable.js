// @flow
export interface Buildable<P> {
  static build(props: P): *,
}
