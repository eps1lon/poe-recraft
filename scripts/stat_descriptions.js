// Generated automatically by nearley
// http://github.com/Hardmath123/nearley
(function () {
function id(x) {return x[0]; }

  const ebnfToString = ([chars]) => chars.join('');

  // (for  | bar) => [[foo | bar]]
  const pipeId = ([[id]]) => id

  //const fromPairs = pairs => pairs
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
    {"name": "StatIdentifier", "symbols": ["StatIdentifier$ebnf$1"], "postprocess": ebnfToString},
    {"name": "StatIdentifiers", "symbols": ["StatIdentifier"], "postprocess": ident => [ident[0]]},
    {"name": "StatIdentifiers", "symbols": ["StatIdentifier", {"literal":" "}, "StatIdentifiers"], "postprocess": ([ident, , identifiers]) => [ident, ...identifiers]},
    {"name": "NoDescription$string$1", "symbols": [{"literal":"n"}, {"literal":"o"}, {"literal":"_"}, {"literal":"d"}, {"literal":"e"}, {"literal":"s"}, {"literal":"c"}, {"literal":"r"}, {"literal":"i"}, {"literal":"p"}, {"literal":"t"}, {"literal":"i"}, {"literal":"o"}, {"literal":"n"}, {"literal":" "}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "NoDescription", "symbols": ["NoDescription$string$1", "StatIdentifier", "Newline"], "postprocess": ([, id]) => id},
    {"name": "Description$ebnf$1", "symbols": []},
    {"name": "Description$ebnf$1", "symbols": ["Description$ebnf$1", "Newline"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "Description", "symbols": ["DescriptionHeader", "DescriptionBody", "Description$ebnf$1"], "postprocess": ([header, [body]]) => header ? [header, body] : body},
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
            // ident
            ? [identOrOthers[0], fromPairs([['english', english], ...others])] 
            // others
            : fromPairs([['others', identOrOthers], ['english', english], ...others]), 
        ]
          },
    {"name": "OtherStats", "symbols": ["Whitespaces", "IndexNumber", {"literal":" "}, "StatIdentifiers", "Newline"], "postprocess": ([, , , identifiers]) => identifiers},
    {"name": "TranslationLanguage", "symbols": ["Language", "Newline", "Translation"], "postprocess": ([language, , translation]) => [language, translation]},
    {"name": "Translation", "symbols": ["Whitespaces", "IndexNumber", "Newline", "TranslationMatchers"], "postprocess": ([, , , matchers]) => ({ matchers })},
    {"name": "Language$string$1", "symbols": [{"literal":"l"}, {"literal":"a"}, {"literal":"n"}, {"literal":"g"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "Language", "symbols": ["Whitespaces", "Language$string$1", "Whitespaces", "StringLiteral"], "postprocess": ([, , ,text]) => text},
    {"name": "TranslationMatchers$ebnf$1$subexpression$1", "symbols": ["Whitespaces", "TranslationMatcher", "Newline"]},
    {"name": "TranslationMatchers$ebnf$1", "symbols": ["TranslationMatchers$ebnf$1$subexpression$1"]},
    {"name": "TranslationMatchers$ebnf$1$subexpression$2", "symbols": ["Whitespaces", "TranslationMatcher", "Newline"]},
    {"name": "TranslationMatchers$ebnf$1", "symbols": ["TranslationMatchers$ebnf$1", "TranslationMatchers$ebnf$1$subexpression$2"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "TranslationMatchers", "symbols": ["TranslationMatchers$ebnf$1"], "postprocess": ([matchers]) => matchers.map(([, matcher]) => matcher)},
    {"name": "TranslationMatcher$ebnf$1", "symbols": ["Whitespaces"], "postprocess": id},
    {"name": "TranslationMatcher$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "TranslationMatcher", "symbols": ["Matchers", "Whitespaces", "StringLiteral", "OptionalFormatters", "TranslationMatcher$ebnf$1"], "postprocess": ([matchers, , text, formatters]) => ({ matchers, text, formatters})},
    {"name": "OptionalFormatters$ebnf$1$subexpression$1", "symbols": [{"literal":" "}, "Formatters"]},
    {"name": "OptionalFormatters$ebnf$1", "symbols": ["OptionalFormatters$ebnf$1$subexpression$1"], "postprocess": id},
    {"name": "OptionalFormatters$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "OptionalFormatters", "symbols": ["OptionalFormatters$ebnf$1"], "postprocess": ([matched]) => matched ? matched[1] : []},
    {"name": "Formatters", "symbols": ["Formatter"], "postprocess": ([formatter]) => [formatter]},
    {"name": "Formatters", "symbols": ["Formatter", {"literal":" "}, "Formatters"], "postprocess": ([formatter, , formatters]) => [formatter, ...formatters]},
    {"name": "Formatter", "symbols": ["FormatterIdentifier", {"literal":" "}, "FormatterArgument"], "postprocess": ([id, , arg]) => ({ id, arg })},
    {"name": "FormatterIdentifier$ebnf$1", "symbols": [/[a-zA-Z0-9_]/]},
    {"name": "FormatterIdentifier$ebnf$1", "symbols": ["FormatterIdentifier$ebnf$1", /[a-zA-Z0-9_]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "FormatterIdentifier", "symbols": ["FormatterIdentifier$ebnf$1"], "postprocess": ebnfToString},
    {"name": "FormatterArgument$subexpression$1", "symbols": ["IndexNumber"]},
    {"name": "FormatterArgument$subexpression$1", "symbols": ["ReminderIdentifier"]},
    {"name": "FormatterArgument", "symbols": ["FormatterArgument$subexpression$1"], "postprocess": pipeId},
    {"name": "ReminderIdentifier", "symbols": ["CamelCase"], "postprocess": id},
    {"name": "CamelCase$ebnf$1", "symbols": [/[a-zA-Z]/]},
    {"name": "CamelCase$ebnf$1", "symbols": ["CamelCase$ebnf$1", /[a-zA-Z]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "CamelCase", "symbols": ["CamelCase$ebnf$1"], "postprocess": ebnfToString},
    {"name": "Matchers", "symbols": ["Matcher"], "postprocess": ([matcher]) => [matcher]},
    {"name": "Matchers", "symbols": ["Matcher", {"literal":" "}, "Matchers"], "postprocess": ([matcher, , matchers]) => [matcher, ...matchers]},
    {"name": "Matcher$subexpression$1", "symbols": ["Bound"]},
    {"name": "Matcher$subexpression$1", "symbols": ["RangeBound"]},
    {"name": "Matcher", "symbols": ["Matcher$subexpression$1"], "postprocess": pipeId},
    {"name": "Bound$subexpression$1", "symbols": ["Any"]},
    {"name": "Bound$subexpression$1", "symbols": ["Number"]},
    {"name": "Bound", "symbols": ["Bound$subexpression$1"], "postprocess": pipeId},
    {"name": "RangeBound", "symbols": ["Bound", {"literal":"|"}, "Bound"], "postprocess": ([left, sep, right]) => [left, right]},
    {"name": "Any", "symbols": [{"literal":"#"}], "postprocess": id},
    {"name": "Number$subexpression$1", "symbols": [{"literal":"+"}]},
    {"name": "Number$subexpression$1", "symbols": [{"literal":"-"}]},
    {"name": "Number$subexpression$1", "symbols": []},
    {"name": "Number$ebnf$1", "symbols": [/[0-9]/]},
    {"name": "Number$ebnf$1", "symbols": ["Number$ebnf$1", /[0-9]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "Number", "symbols": ["Number$subexpression$1", "Number$ebnf$1"], "postprocess": ([[sign], digits]) => +`${sign || '+'}${digits.join('')}`},
    {"name": "StringLiteral$ebnf$1", "symbols": [/[^"]/]},
    {"name": "StringLiteral$ebnf$1", "symbols": ["StringLiteral$ebnf$1", /[^"]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "StringLiteral", "symbols": [{"literal":"\""}, "StringLiteral$ebnf$1", {"literal":"\""}], "postprocess": ([, text]) => text.join('')},
    {"name": "Newline$string$1", "symbols": [{"literal":"\r"}, {"literal":"\n"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "Newline", "symbols": ["Newline$string$1"], "postprocess": id},
    {"name": "Whitespace", "symbols": [{"literal":" "}]},
    {"name": "Whitespace", "symbols": [{"literal":"\t"}]},
    {"name": "Whitespaces$ebnf$1", "symbols": ["Whitespace"]},
    {"name": "Whitespaces$ebnf$1", "symbols": ["Whitespaces$ebnf$1", "Whitespace"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "Whitespaces", "symbols": ["Whitespaces$ebnf$1"], "postprocess": ebnfToString},
    {"name": "IndexNumber$ebnf$1", "symbols": [/[0-9]/]},
    {"name": "IndexNumber$ebnf$1", "symbols": ["IndexNumber$ebnf$1", /[0-9]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "IndexNumber", "symbols": ["IndexNumber$ebnf$1"], "postprocess": (...args) => +ebnfToString(args)}
]
  , ParserStart: "main"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();
