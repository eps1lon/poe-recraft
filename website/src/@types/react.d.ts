declare type PropsOf<T> = T extends React.ComponentType<infer P> ? P : never;
