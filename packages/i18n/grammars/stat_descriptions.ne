main -> 
  Blankline:* (Include | NoDescription | HasIdentifiers | Description):*
  {% ([, items]) => items.map(([item]) => item) %}

Include -> "include " StringLiteral Blankline:+ {% ([, include]) => ['$include', include] %}

HasIdentifiers ->
  ("has_identifiers" | "no_identifiers" ) Blankline:+
  {% ([directive]) => ['$hasIdentifiers',  directive === 'has_identifiers'] %}

StatIdentifier -> [a-zA-Z0-9_\+\-\%]:+ {% ebnfToString %}
StatIdentifiers -> 
    StatIdentifier {% ident => [ident[0]] %}
  | StatIdentifier " " StatIdentifiers
    {% ([ident, , identifiers]) => [ident, ...identifiers] %}

NoDescription -> 
  "no_description " StatIdentifier Blankline:+
  {% 
    ([, id]) => [id, {
      no_description: true,
      stats: [],
      translations: {}
    }] 
  %}

Description -> 
  DescriptionHeader DescriptionBody Newline:* 
  # if header then header has the identifier, so use this as key
  {% ([header, body]) => [header || body.stats[0], body] %}

DescriptionHeader -> 
  Whitespaces:? "description" Whitespaces:? StatIdentifier:? Whitespaces:? Blankline:+
  {% ([, , , ident]) => ident %}

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
  Language Newline:? Blankline:* Translation 
  {% ([language, , , translations]) => [language, translations] %}

Translation -> 
  Whitespaces:? IndexNumber Whitespaces:? Newline Translations
  {% ([, , , , translations]) => translations %}

Language -> 
  Whitespaces:? "lang" Whitespaces StringLiteral Whitespaces:?
  {% ([, , ,text]) => text %}

Translations ->
  (Whitespaces:? TranslationMatcher Newline Blankline:*):+
  {% ([translations]) => translations.map(([, translation]) => translation) %}

TranslationMatcher -> 
  Matchers Whitespaces StringLiteral OptionalFormatters Whitespaces:?
  {% ([matchers, , text, formatters]) => ({ matchers, text: createSanitizeText()(text), formatters}) %}

# Formatter
OptionalFormatters -> (Whitespaces:? Formatters):? {% ([matched]) => matched ? matched[1] : [] %}
Formatters -> 
    Formatter
	{% ([formatter]) => [formatter] %}
  | Formatter Whitespaces Formatters 
    {% ([formatter, , formatters]) => [formatter, ...formatters] %}
Formatter -> (NullaryFormatter | UnaryFormatter) {% pipeId %}
NullaryFormatter -> "canonical_line" {% ([formatter]) => formatter %}
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

  const createSanitizeText = () => {
    let i = 1;
    return text => {
      // monster chance to flee has %d%% which is normal printf 
      // syntax that is nowhere else used
      return text.replace(/%d%%/g, () => `%${i++}%%%`);
    }
  }
%}