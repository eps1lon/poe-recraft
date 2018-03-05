import {
  Descriptions,
  StatLocaleData,
  StatLocaleDatas
} from '../types/StatDescription';

export function* getDescriptions(
  datas: StatLocaleDatas,
  start_file: string
): IterableIterator<Descriptions> {
  let description_file: StatLocaleData | undefined = datas[start_file];

  while (description_file !== undefined) {
    yield description_file.data;

    description_file = description_file.meta.include
      ? datas[description_file.meta.include]
      : undefined;
  }
}
