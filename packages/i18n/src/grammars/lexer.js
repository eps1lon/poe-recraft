const moo = require('moo');

const createLexer = () =>
  moo.compile({
    WS: /[ \t]+/,
    text: /"[^"]+"/,
    number: /0|[1-9][0-9]*/,
    keyword: ['description', 'lang', 'no_description'],
    stat_ident: /[a-z_\+\%]+/,
    matcher: /[#0-9\|\- ]+/,
    NL: { match: /\r?\n/, lineBreaks: true },
    invalid: { error: true }
  });

module.exports = createLexer;
