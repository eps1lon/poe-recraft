import { ComponentType } from 'react';

export type PropsType<C> = C extends ComponentType<infer P> ? P : never;

export type PartialProps<C, K extends keyof PropsType<C>> = Pick<
  PropsType<C>,
  K
>;
