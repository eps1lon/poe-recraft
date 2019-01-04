declare module 'react-string-replace' {
  const replace: <T>(
    source: string | T,
    match: RegExp | string,
    fn: (match: string, index: number) => JSX.Element,
  ) => string | T;
  export = replace;
}
