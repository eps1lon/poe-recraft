import { MetaDataMap } from '../MetaData';

describe.skip('type definitions for meta_data.json', () => {
  type DeepExactify<T, X extends T> = T &
    { [K in keyof X]: K extends keyof T ? DeepExactify<T[K], X[K]> : never };

  test('meta_data', async () => {
    const json = await import('../meta_data.json');
    // tslint:disable-next-line: no-unused-variable
    const checked: DeepExactify<MetaDataMap, typeof json> = json;
  });
});
