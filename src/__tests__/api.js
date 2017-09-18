import * as containers from '../containers';
import * as exceptions from '../exceptions';
import * as generators from '../generators';
import * as interfaces from '../interfaces';
import * as mods from '../mods';
import * as util from '../util';

const namespaces = [containers, exceptions, generators, interfaces, mods, util];

it('should export defined stuff', () => {
  // test coverage masterrace
  // still useful since neither flow nor lint throw errors when we
  // are exporting an import which is not found
  namespaces.forEach((namespace, i) => {
    if (namespace === undefined) {
      throw new Error(`namespace ${i} is not defined`);
    }

    Object.entries(namespace).forEach(([name, exported]) => {
      if (exported === undefined) {
        throw new Error(`named export ${name} is not defined`);
      }
    });
  });
});
