// Generated automatically by nearley
// http://github.com/Hardmath123/nearley
(function () {
function id(x) {return x[0]; }

  const ebnfToString = ([chars]) => chars.join('');

  // (for  | bar) => [[foo | bar]]
  const pipeId = ([[id]]) => id
var grammar = {
    Lexer: undefined,
    ParserRules: [
    {"name": "main", "symbols": ["Expressions"], "postprocess": ([expressions]) => expressions},
    {"name": "Expressions", "symbols": ["Expression"], "postprocess": ([expression]) => [expression]},
    {"name": "Expressions$ebnf$1", "symbols": ["Blankline"]},
    {"name": "Expressions$ebnf$1", "symbols": ["Expressions$ebnf$1", "Blankline"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "Expressions", "symbols": ["Expression", "Expressions$ebnf$1", "Expressions"], "postprocess": ([expression, , expressions]) => [expression, ...expressions]},
    {"name": "Expression", "symbols": ["Group"], "postprocess": ([group]) => ({ type: 'group', ...group })},
    {"name": "Expression", "symbols": ["Filter"], "postprocess": ([filter]) => ({ type: 'filter',  ...filter })},
    {"name": "Expression", "symbols": ["Copy"], "postprocess": ([copy]) => ({ type: 'copy', ...copy })},
    {"name": "Group", "symbols": ["GroupHead", "Newline", "GroupBody"], "postprocess": ([head, , body]) => ({ ...head, stats: body })},
    {"name": "GroupHead$string$1", "symbols": [{"literal":"g"}, {"literal":"r"}, {"literal":"o"}, {"literal":"u"}, {"literal":"p"}, {"literal":" "}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "GroupHead", "symbols": ["GroupHead$string$1", "Identifier"], "postprocess": ([, id]) => ({ id })},
    {"name": "GroupBody$ebnf$1", "symbols": ["Newline"], "postprocess": id},
    {"name": "GroupBody$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "GroupBody$ebnf$2", "symbols": ["GroupMembers"], "postprocess": id},
    {"name": "GroupBody$ebnf$2", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "GroupBody$ebnf$3", "symbols": ["Newline"], "postprocess": id},
    {"name": "GroupBody$ebnf$3", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "GroupBody", "symbols": [{"literal":"{"}, "GroupBody$ebnf$1", "GroupBody$ebnf$2", "GroupBody$ebnf$3", {"literal":"}"}], "postprocess": ([, , ids]) => ids},
    {"name": "GroupMembers", "symbols": ["GroupMember"], "postprocess": ([id]) => [id]},
    {"name": "GroupMembers", "symbols": ["GroupMember", "Newline", "GroupMembers"], "postprocess": ([expression, , expressions]) => [expression, ...expressions]},
    {"name": "GroupMember$ebnf$1", "symbols": ["Whitespaces"], "postprocess": id},
    {"name": "GroupMember$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "GroupMember", "symbols": ["Whitespaces", "Identifier", "GroupMember$ebnf$1"], "postprocess": ([, id]) => id},
    {"name": "Filter", "symbols": ["FilterHead", "Newline", "FilterBody"], "postprocess": ([head, , body]) => ({ ...head, stats: body })},
    {"name": "FilterHead", "symbols": ["Identifier", "Whitespaces", "StringLiteral"], "postprocess": ([id, , start_file]) => ({ id, start_file })},
    {"name": "FilterBody$ebnf$1", "symbols": ["Whitespaces"], "postprocess": id},
    {"name": "FilterBody$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "FilterBody$ebnf$2", "symbols": ["Newline"], "postprocess": id},
    {"name": "FilterBody$ebnf$2", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "FilterBody$ebnf$3", "symbols": ["FilterIdentifiers"], "postprocess": id},
    {"name": "FilterBody$ebnf$3", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "FilterBody$ebnf$4", "symbols": ["Newline"], "postprocess": id},
    {"name": "FilterBody$ebnf$4", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "FilterBody", "symbols": [{"literal":"{"}, "FilterBody$ebnf$1", "FilterBody$ebnf$2", "FilterBody$ebnf$3", "FilterBody$ebnf$4", {"literal":"}"}], "postprocess": ([, , , ids]) => ids},
    {"name": "FilterIdentifiers", "symbols": ["FilterIdentifier"], "postprocess": ([id]) => [id]},
    {"name": "FilterIdentifiers", "symbols": ["FilterIdentifier", "Newline", "FilterIdentifiers"], "postprocess": ([expression, , expressions]) => [expression, ...expressions]},
    {"name": "FilterIdentifier$subexpression$1", "symbols": ["Identifier"]},
    {"name": "FilterIdentifier$subexpression$1", "symbols": [{"literal":"$"}, "Identifier"]},
    {"name": "FilterIdentifier$ebnf$1", "symbols": ["Whitespaces"], "postprocess": id},
    {"name": "FilterIdentifier$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "FilterIdentifier", "symbols": ["Whitespaces", "FilterIdentifier$subexpression$1", "FilterIdentifier$ebnf$1"], "postprocess": ([, [...id]]) => id.join('')},
    {"name": "Copy$string$1", "symbols": [{"literal":"c"}, {"literal":"o"}, {"literal":"p"}, {"literal":"y"}, {"literal":" "}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "Copy", "symbols": ["Copy$string$1", "Identifier", "Whitespaces", "Identifier"], "postprocess": ([ , target, , source]) => ({ source, target })},
    {"name": "Identifier$ebnf$1", "symbols": [/[a-zA-Z0-9_]/]},
    {"name": "Identifier$ebnf$1", "symbols": ["Identifier$ebnf$1", /[a-zA-Z0-9_]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "Identifier", "symbols": ["Identifier$ebnf$1"], "postprocess": ebnfToString},
    {"name": "StringLiteral$ebnf$1", "symbols": [/[^"]/]},
    {"name": "StringLiteral$ebnf$1", "symbols": ["StringLiteral$ebnf$1", /[^"]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "StringLiteral", "symbols": [{"literal":"\""}, "StringLiteral$ebnf$1", {"literal":"\""}], "postprocess": ([, text]) => text.join('')},
    {"name": "Newline$ebnf$1", "symbols": [{"literal":"\r"}], "postprocess": id},
    {"name": "Newline$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "Newline", "symbols": ["Newline$ebnf$1", {"literal":"\n"}], "postprocess": id},
    {"name": "Blankline$ebnf$1", "symbols": ["Whitespaces"], "postprocess": id},
    {"name": "Blankline$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "Blankline", "symbols": ["Blankline$ebnf$1", "Newline"]},
    {"name": "Whitespace", "symbols": [{"literal":" "}]},
    {"name": "Whitespace", "symbols": [{"literal":"\t"}]},
    {"name": "Whitespaces$ebnf$1", "symbols": ["Whitespace"]},
    {"name": "Whitespaces$ebnf$1", "symbols": ["Whitespaces$ebnf$1", "Whitespace"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "Whitespaces", "symbols": ["Whitespaces$ebnf$1"], "postprocess": ebnfToString}
]
  , ParserStart: "main"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();
