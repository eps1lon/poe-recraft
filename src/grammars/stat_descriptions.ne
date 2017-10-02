main -> 
  Blankline:* NoDescription:* Description:* 
  {% ([, no_desc, desc]) => (desc) %}

StatIdentifier -> [a-zA-Z0-9_\+\-\%]:+ {% ebnfToString %}
StatIdentifiers -> 
    StatIdentifier {% ident => [ident[0]] %}
  | StatIdentifier " " StatIdentifiers
    {% ([ident, , identifiers]) => [ident, ...identifiers] %}

NoDescription -> 
  "no_description " StatIdentifier  Newline 
  {% ([, id]) => id %}

Description -> 
  DescriptionHeader DescriptionBody Newline:* 
  # if header then header has the identifier, so use this as key
  {% ([header, body]) => [header || body.stats[0], body] %}

DescriptionHeader -> 
  Whitespaces:? "description" Whitespaces:? StatIdentifier:? Newline
  {% ([, , ident]) => ident ? ident[1] : null %}

DescriptionBody ->
  Stats Translation TranslationLanguage:*
  {% 
    ([stats, english, others]) => ({
      stats,
      languages: [['English', english], ...others]
    })
  %}

Stats ->
  Whitespaces IndexNumber Whitespaces StatIdentifiers Whitespaces:? Newline
  {% ([, , , identifiers]) => identifiers %}

TranslationLanguage ->
  Language Newline Blankline:* Translation 
  {% ([language, , , translations]) => [language, translations] %}

Translation -> 
  Whitespaces:? IndexNumber Whitespaces:? Newline Translations
  {% ([, , , , translations]) => translations %}

Language -> 
  Whitespaces:? "lang" Whitespaces StringLiteral Whitespaces:?
  {% ([, , ,text]) => text %}

Translations ->
  (Whitespaces:? TranslationMatcher Newline Blankline:*):+
  {% ([[[, translation]]]) => translation %}

TranslationMatcher -> 
  Matchers Whitespaces StringLiteral OptionalFormatters Whitespaces:?
  {% ([matchers, , text, formatters]) => ({ matchers, text, formatters}) %}

# Formatter
OptionalFormatters -> (Whitespaces:? Formatters):? {% ([matched]) => matched ? matched[1] : [] %}
Formatters -> 
    Formatter
	{% ([formatter]) => [formatter] %}
  | Formatter Whitespaces Formatters 
    {% ([formatter, , formatters]) => [formatter, ...formatters] %}
Formatter -> (NullaryFormatter | UnaryFormatter) {% pipeId %}
NullaryFormatter -> "canonical_line"
UnaryFormatter -> 
  FormatterIdentifier Whitespaces FormatterArgument
  {% ([id, , arg]) => ({ id, arg }) %}
FormatterIdentifier -> [a-zA-Z0-9_%]:+ {% ebnfToString %}
FormatterArgument -> (IndexNumber | ReminderIdentifier) {% pipeId %}
ReminderIdentifier -> CamelCase {% id %}
# not actual camelcase but it does the job
CamelCase -> [a-zA-Z]:+ {% ebnfToString %}

# Matching
Matchers -> 
    Matcher
	{% ([matcher]) => [matcher] %}
  | Matcher Whitespaces Matchers 
    {% ([matcher, , matchers]) => [matcher, ...matchers] %}
Matcher -> (Bound | RangeBound) {% pipeId %}
Bound -> (Any | Number) {% pipeId %}
RangeBound -> Bound "|" Bound {% ([left, sep, right]) => [left, right] %}
Any -> "#" {% id %}

Number -> 
  ("+" | "-" | null) [0-9]:+ 
  {% ([[sign], digits]) => +`${sign || '+'}${digits.join('')}` %}

StringLiteral -> "\"" [^"]:+ "\"" {% ([, text]) => text.join('') %}

# util
Newline -> "\r":? "\n" {% id %}
Blankline -> Whitespaces:? Newline
Whitespace -> " " | "\t"
Whitespaces -> Whitespace:+ {% ebnfToString %}
IndexNumber -> [0-9]:+ {% (...args) => +ebnfToString(args) %}
 
@{%
  const ebnfToString = ([chars]) => chars.join('');

  // (for  | bar) => [[foo | bar]]
  const pipeId = ([[id]]) => id
%}