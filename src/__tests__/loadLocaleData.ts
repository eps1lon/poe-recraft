import formatStats from '../formatStats';
import loadLocaleData, { loadLocaleDatasFor } from '../loadLocaleData';

it('should load every file given as argument', () => {
  const datas = loadLocaleData('en', ['stat_descriptions']);

  expect(datas.stat_descriptions).toBeDefined();
});

it('should also load every file that is included', () => {
  const datas = loadLocaleData('en', ['atlas_stat_descriptions']);

  expect(datas.atlas_stat_descriptions).toBeDefined();
  expect(datas.map_stat_descriptions).toBeDefined();
  expect(datas.stat_descriptions).toBeDefined();
});

it('should load files that are needed for the current configuration of formatStats', () => {
  const stat_datas = loadLocaleDatasFor('en', formatStats);
  expect(stat_datas.stat_descriptions).toBeDefined();

  formatStats.configure({ start_file: 'atlas_stat_descriptions' });

  const atlas_datas = loadLocaleDatasFor('en', formatStats);
  expect(atlas_datas.atlas_stat_descriptions).toBeDefined();
  expect(atlas_datas.map_stat_descriptions).toBeDefined();
  expect(atlas_datas.stat_descriptions).toBeDefined();
});
