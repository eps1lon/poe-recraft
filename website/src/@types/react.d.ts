declare type PropsType<T> = T extends React.ComponentType<infer P> ? P : never;
