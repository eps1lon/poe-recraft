// Generated automatically by nearley
// http://github.com/Hardmath123/nearley
(function () {
function id(x) {return x[0]; }

  const joinEbnf = ([chars]) => chars.join('');

  const fromPairs = pairs => 
    pairs.reduce((obj, [key, value]) => ({ ...obj, [key]: value }), {})
var grammar = {
    Lexer: undefined,
    ParserRules: [
    {"name": "main$ebnf$1", "symbols": []},
    {"name": "main$ebnf$1", "symbols": ["main$ebnf$1", "NoDescription"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "main$ebnf$2", "symbols": []},
    {"name": "main$ebnf$2", "symbols": ["main$ebnf$2", "Description"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "main", "symbols": ["main$ebnf$1", "main$ebnf$2"], "postprocess": ([no_desc, desc]) => ({ no_desc, desc: desc })},
    {"name": "StatIdentifier$ebnf$1", "symbols": [/[a-zA-Z0-9_\+\-\%]/]},
    {"name": "StatIdentifier$ebnf$1", "symbols": ["StatIdentifier$ebnf$1", /[a-zA-Z0-9_\+\-\%]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "StatIdentifier", "symbols": ["StatIdentifier$ebnf$1"], "postprocess": joinEbnf},
    {"name": "StatIdentifiers", "symbols": ["StatIdentifier"], "postprocess": ident => [ident[0]]},
    {"name": "StatIdentifiers", "symbols": ["StatIdentifier", {"literal":" "}, "StatIdentifiers"], "postprocess": ([ident, , identifiers]) => [ident, ...identifiers]},
    {"name": "NoDescription$string$1", "symbols": [{"literal":"n"}, {"literal":"o"}, {"literal":"_"}, {"literal":"d"}, {"literal":"e"}, {"literal":"s"}, {"literal":"c"}, {"literal":"r"}, {"literal":"i"}, {"literal":"p"}, {"literal":"t"}, {"literal":"i"}, {"literal":"o"}, {"literal":"n"}, {"literal":" "}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "NoDescription", "symbols": ["NoDescription$string$1", "StatIdentifier", "Newline"], "postprocess": ([, id]) => id},
    {"name": "Description$ebnf$1", "symbols": []},
    {"name": "Description$ebnf$1", "symbols": ["Description$ebnf$1", "Newline"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "Description", "symbols": ["DescriptionHeader", "DescriptionBody", "Description$ebnf$1"], "postprocess": ([header, body]) => header ? [header, ...body] : body},
    {"name": "DescriptionHeader$string$1", "symbols": [{"literal":"d"}, {"literal":"e"}, {"literal":"s"}, {"literal":"c"}, {"literal":"r"}, {"literal":"i"}, {"literal":"p"}, {"literal":"t"}, {"literal":"i"}, {"literal":"o"}, {"literal":"n"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "DescriptionHeader$ebnf$1$subexpression$1", "symbols": [{"literal":" "}, "StatIdentifier"]},
    {"name": "DescriptionHeader$ebnf$1", "symbols": ["DescriptionHeader$ebnf$1$subexpression$1"], "postprocess": id},
    {"name": "DescriptionHeader$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "DescriptionHeader", "symbols": ["DescriptionHeader$string$1", "DescriptionHeader$ebnf$1", "Newline"], "postprocess": ([, ident]) => ident ? ident[1] : null},
    {"name": "DescriptionBody$ebnf$1", "symbols": []},
    {"name": "DescriptionBody$ebnf$1", "symbols": ["DescriptionBody$ebnf$1", "TranslationLanguage"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "DescriptionBody", "symbols": ["OtherStats", "Translation", "DescriptionBody$ebnf$1"], "postprocess":  
        ([identOrOthers, english, others]) => [
          identOrOthers.length === 1 
            ? { [identOrOthers[0]]: fromPairs([['english', english], ...others]) }
            : fromPairs([['others', identOrOthers], ['english', english], ...others]), 
        ]
          },
    {"name": "DescriptionIdentifier$string$1", "symbols": [{"literal":"1"}, {"literal":" "}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "DescriptionIdentifier", "symbols": ["Whitespaces", "DescriptionIdentifier$string$1", "StatIdentifier", "Newline"], "postprocess": ([, , ident]) => ident},
    {"name": "OtherStats", "symbols": ["Whitespaces", "Number", {"literal":" "}, "StatIdentifiers", "Newline"], "postprocess": ([, , , identifiers]) => identifiers},
    {"name": "Translation", "symbols": ["Whitespaces", "Number", "Newline", "Whitespaces", "TranslationMatcher", "Newline"], "postprocess": ([, , , , translation]) => translation},
    {"name": "TranslationLanguage", "symbols": ["Language", "Newline", "Translation"], "postprocess": ([language, , translation]) => [language, translation]},
    {"name": "Language$string$1", "symbols": [{"literal":"l"}, {"literal":"a"}, {"literal":"n"}, {"literal":"g"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "Language", "symbols": ["Whitespaces", "Language$string$1", "Whitespaces", "Text"], "postprocess": ([, , ,text]) => text},
    {"name": "TranslationMatcher", "symbols": ["Matcher", "Whitespaces", "Text"], "postprocess": ([matcher, , text]) => ({ matcher, text, })},
    {"name": "Matcher", "symbols": [{"literal":"#"}], "postprocess": id},
    {"name": "Text$ebnf$1", "symbols": [/[^"]/]},
    {"name": "Text$ebnf$1", "symbols": ["Text$ebnf$1", /[^"]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "Text", "symbols": [{"literal":"\""}, "Text$ebnf$1", {"literal":"\""}], "postprocess": ([, text]) => text.join('')},
    {"name": "Newline$string$1", "symbols": [{"literal":"\r"}, {"literal":"\n"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "Newline", "symbols": ["Newline$string$1"], "postprocess": id},
    {"name": "Whitespace", "symbols": [{"literal":" "}]},
    {"name": "Whitespace", "symbols": [{"literal":"\t"}]},
    {"name": "Whitespaces$ebnf$1", "symbols": ["Whitespace"]},
    {"name": "Whitespaces$ebnf$1", "symbols": ["Whitespaces$ebnf$1", "Whitespace"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "Whitespaces", "symbols": ["Whitespaces$ebnf$1"]},
    {"name": "Number$ebnf$1", "symbols": [/[0-9]/]},
    {"name": "Number$ebnf$1", "symbols": ["Number$ebnf$1", /[0-9]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "Number", "symbols": ["Number$ebnf$1"]}
]
  , ParserStart: "main"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();
