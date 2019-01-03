const ts = require('typescript');

const { apiEndpoint } = require('./util');

// creates a union type for all possible string values of `item_class`

itemClasses().then(item_classes => {
  const ids = item_classes.map(({ id }) => id);
  const type = ts.createTypeAliasDeclaration(
    [],
    [],
    'ItemClassId',
    [],
    ts.createUnionTypeNode(ids.map(id => ts.createLiteral(id))),
  );

  // print ts source
  const source_file = ts.createSourceFile(
    'schema.ts',
    '',
    ts.ScriptTarget.Latest,
    false,
    ts.ScriptKind.TS,
  );
  const printer = ts.createPrinter();
  const source = printer.printNode(ts.EmitHint.Unspecified, type, source_file);

  console.log(source);
});

async function itemClasses(options = {}) {
  const {
    api_root = 'http://localhost:3000/',
    auth_token = 'allowme',
  } = options;

  const endpoint = '/find/ItemClasses/';
  const params = { page_size: Number.MAX_SAFE_INTEGER };

  const body = await apiEndpoint(endpoint, { api_root, auth_token, params });
  return body.result;
}
