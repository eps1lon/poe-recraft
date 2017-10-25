const { transformFromAst } = require('babel-core');
const t = require('babel-types');
const fs = require('fs');
const path = require('path');

/* in a perfect world 
Promise.all([
  import(`react-intl/locale-data/${locale.split('-')[0]}`),
  import(`poe-i18n/locale-data/${locale}/BaseItemTypes.json`),
  import(`poe-i18n/locale-data/${locale}/Mods.json`),
  import(`poe-i18n/locale-data/${locale}/stat_descriptions.json`)
])

would be bundled into one chunk. But this isn't supported in the first place
and would require symbolic exectution for the language code extraction when
importing react-intl
*/

const locales = [
  'en',
  'ru',
  'th',
  'pt',
  'zh-cn', // simplified chinese
  'zh-tw', // traditional chinese
  'de',
  'es',
  'fr'
];

const locale_exports = locale => ({
  locale_data: `react-intl/locale-data/${locale.split('-')[0]}`,
  baseitemtypes: `poe-i18n/locale-data/${locale}/BaseItemTypes.json`,
  mods: `poe-i18n/locale-data/${locale}/Mods.json`,
  stat_descriptions: `poe-i18n/locale-data/${locale}/stat_descriptions.json`
});

locales.forEach(locale => {
  const export_expressions = Object.entries(
    locale_exports(locale)
  ).map(([varname, module_path]) => {
    // export { varname as default } from module_path
    return t.exportNamedDeclaration(
      null,
      [t.exportSpecifier(t.identifier('default'), t.identifier(varname))],
      t.stringLiteral(module_path)
    );
  });

  const ast = t.program([...export_expressions]);
  const { code } = transformFromAst(ast);

  fs.writeFileSync(path.join(__dirname, `../src/i18n/${locale}.js`), code);
});
