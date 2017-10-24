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
