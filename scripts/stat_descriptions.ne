main -> 
  NoDescription:* Description:* 
  {% ([no_desc, desc]) => ({ no_desc, desc: desc }) %}

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
  {% ([header, [body]]) => header ? [header, body] : body %}

DescriptionHeader -> 
  "description" (" " StatIdentifier):? Newline
  {% ([, ident]) => ident ? ident[1] : null %}

DescriptionBody ->
  OtherStats Translation TranslationLanguage:*
  {% 
    ([identOrOthers, english, others]) => [
      identOrOthers.length === 1 
        // ident
        ? [identOrOthers[0], fromPairs([['english', english], ...others])] 
        // others
        : fromPairs([['others', identOrOthers], ['english', english], ...others]), 
    ]
  %}

OtherStats ->
  Whitespaces Number " " StatIdentifiers Newline
  {% ([, , , identifiers]) => identifiers %}

TranslationLanguage ->
  Language Newline Translation 
  {% ([language, , translation]) => [language, translation] %}

Translation -> 
  Whitespaces Number Newline TranslationMatchers
  {% ([, , , matchers]) => ({ matchers }) %}

Language -> 
  Whitespaces "lang" Whitespaces Text 
  {% ([, , ,text]) => text %}

TranslationMatchers ->
  (Whitespaces TranslationMatcher Newline):+
  {% ([matchers]) => matchers.map(([, matcher]) => matcher) %}

TranslationMatcher -> 
  Matcher Whitespaces Text 
  {% ([matcher, , text]) => ({ matcher, text, }) %}

Matcher -> "#" {% id %}
Text -> "\"" [^"]:+ "\"" {% ([, text]) => text.join('') %}

# util
Newline -> "\r\n" {% id %}
Whitespace -> " " | "\t"
Whitespaces -> Whitespace:+
Number -> [0-9]:+

@{%
  const ebnfToString = ([chars]) => chars.join('');

  //const fromPairs = pairs => pairs
  const fromPairs = pairs => 
    pairs.reduce((obj, [key, value]) => ({ ...obj, [key]: value }), {})
%}