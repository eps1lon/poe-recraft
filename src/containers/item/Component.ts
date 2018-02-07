export default interface Component<T, B> {
  parent: T;
  builder(): B;
  any(): boolean;
};
