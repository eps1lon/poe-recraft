import { containers, generators, mods } from '../';

it('should export defined stuff', () => {
  // test coverage masterrace
  // still useful since neither flow nor lint throw errors when we
  // are exporting an import which is not found
  [containers, generators, mods].forEach(namespace => {
    Object.entries(namespace).forEach(([name, exported]) => {
      if (exported === undefined) {
        throw new Error(`named export ${name} is not defined`);
      }
    });
  });
});
