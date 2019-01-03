import dependencies from './translate/descriptions_dependency';

export default function requiredLocaleDatas(files: string[]): string[] {
  const datas = [...files];
  const queued = [...files]; // clone

  while (queued.length > 0) {
    const file = queued.shift()!;
    const include = dependencies[file];

    if (include) {
      queued.push(include);
      datas.push(include);
    }
  }

  return datas;
}
