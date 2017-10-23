import formatStats from '../formatStats';
import requiredLocaleDatas, {
  requiredLocaleDatasFor
} from '../requiredLocaleDatas';

it('should load every file given as argument', () => {
  const datas = requiredLocaleDatas(['stat_descriptions']);

  expect(datas.indexOf('stat_descriptions')).not.toBe(-1);
});

it('should also load every file that is included', () => {
  const datas = requiredLocaleDatas(['atlas_stat_descriptions']);

  expect(datas.indexOf('atlas_stat_descriptions')).not.toBe(-1);
  expect(datas.indexOf('map_stat_descriptions')).not.toBe(-1);
  expect(datas.indexOf('stat_descriptions')).not.toBe(-1);
});

it('should load files that are needed for the current configuration of formatStats', () => {
  const stat_datas = requiredLocaleDatasFor(formatStats);
  expect(stat_datas.indexOf('stat_descriptions')).not.toBe(-1);

  formatStats.configure({ start_file: 'atlas_stat_descriptions' });

  const atlas_datas = requiredLocaleDatasFor(formatStats);
  expect(atlas_datas.indexOf('atlas_stat_descriptions')).not.toBe(-1);
  expect(atlas_datas.indexOf('map_stat_descriptions')).not.toBe(-1);
  expect(atlas_datas.indexOf('stat_descriptions')).not.toBe(-1);
});
