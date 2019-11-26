// Generated automatically by nearley, version 2.19.0
// http://github.com/Hardmath123/nearley
(function () {
function id(x) { return x[0]; }
var grammar = {
    Lexer: undefined,
    ParserRules: [
    {"name": "main", "symbols": ["Cases"]},
    {"name": "Cases", "symbols": ["Case"], "postprocess": single => single},
    {"name": "Cases", "symbols": ["Case", "Cases"], "postprocess": ([single, many]) => ([single, ...many])},
    {"name": "Case$ebnf$1$string$1", "symbols": [{"literal":"e"}, {"literal":"l"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "Case$ebnf$1", "symbols": ["Case$ebnf$1$string$1"], "postprocess": id},
    {"name": "Case$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "Case$string$1", "symbols": [{"literal":"i"}, {"literal":"f"}, {"literal":":"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "Case$string$2", "symbols": [{"literal":">"}, {"literal":"{"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "Case", "symbols": [{"literal":"<"}, "Case$ebnf$1", "Case$string$1", "InflectionIdentifier", "Case$string$2", "Output", {"literal":"}"}], "postprocess": ([, , , match, , output]) => ({ match, output })},
    {"name": "Output$ebnf$1", "symbols": [/[^}]/]},
    {"name": "Output$ebnf$1", "symbols": ["Output$ebnf$1", /[^}]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "Output", "symbols": ["Output$ebnf$1"], "postprocess": ([chars]) => chars.join('')},
    {"name": "InflectionIdentifier$ebnf$1", "symbols": [/[A-Z]/]},
    {"name": "InflectionIdentifier$ebnf$1", "symbols": ["InflectionIdentifier$ebnf$1", /[A-Z]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "InflectionIdentifier", "symbols": ["InflectionIdentifier$ebnf$1"], "postprocess": ([chars]) => chars.join('')}
]
  , ParserStart: "main"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();
