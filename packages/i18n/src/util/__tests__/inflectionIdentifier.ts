import inflectionIdentifier from '../inflectionIdentifier';

it('should default to NS', () => {
  expect(inflectionIdentifier({})).toEqual('NS');
  expect(inflectionIdentifier({ inflection: '' })).toEqual('NS');
});

it('should default plural to S', () => {
  expect(inflectionIdentifier({ inflection: 'N' })).toEqual('NS');
  expect(inflectionIdentifier({ inflection: 'F' })).toEqual('FS');
  expect(inflectionIdentifier({ inflection: 'M' })).toEqual('MS');
});

it('should prioritize the given context', () => {
  expect(inflectionIdentifier({ inflection: 'MP' })).toEqual('MP');
  expect(inflectionIdentifier({ inflection: 'FS' })).toEqual('FS');
  expect(inflectionIdentifier({ inflection: 'FP' })).toEqual('FP');
});
