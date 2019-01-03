import formatMessage from '../message';

it('returns the same string if no args are given', () => {
  expect(formatMessage('identity')).toEqual('identity');
});

it('is silent if params are provided but not needed in the string', () => {
  expect(formatMessage('identity', { foo: 1, bar: 'test' })).toEqual(
    'identity'
  );
});

it('throws if params appear in message but are not provided', () => {
  expect(() => formatMessage('foo is "{foo}"')).toThrow(
    "Message required 'foo' to be present."
  );
  expect(formatMessage('foo is "{foo}"', { foo: undefined })).toEqual(
    'foo is "undefined"'
  );
});

it('fills in arguments with toString()', () => {
  expect(formatMessage('foo is "{foo}"', { foo: 0x16 })).toEqual('foo is "22"');
  expect(
    formatMessage('foo is "{foo}"', {
      foo: {
        toString: () => 'called'
      }
    })
  ).toEqual('foo is "called"');
});
