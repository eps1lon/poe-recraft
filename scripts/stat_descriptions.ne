main -> 
  NoDescription:* Description:* 
  {% ([no_desc, desc]) => ({ no_desc, desc: desc }) %}

StatIdentifier -> [a-zA-Z0-9_\+\-\%]:+ {% joinEbnf %}
StatIdentifiers -> 
    StatIdentifier {% ident => [ident[0]] %}
  | StatIdentifier " " StatIdentifiers
    {% ([ident, , identifiers]) => [ident, ...identifiers] %}

NoDescription -> 
  "no_description " StatIdentifier  Newline 
  {% ([, id]) => id %}

Description -> 
  DescriptionHeader DescriptionBody Newline:* 
  {% ([header, body]) => header ? [header, ...body] : body %}

DescriptionHeader -> 
  "description" (" " StatIdentifier):? Newline
  {% ([, ident]) => ident ? ident[1] : null %}

DescriptionBody ->
  OtherStats Translation TranslationLanguage:*
  {% 
    ([identOrOthers, english, others]) => [
      identOrOthers.length === 1 
        ? { [identOrOthers[0]]: fromPairs([['english', english], ...others]) }
        : fromPairs([['others', identOrOthers], ['english', english], ...others]), 
    ]
  %}

DescriptionIdentifier ->
  Whitespaces "1 " StatIdentifier Newline
  {% ([, , ident]) => ident %}

OtherStats ->
  Whitespaces Number " " StatIdentifiers Newline
  {% ([, , , identifiers]) => identifiers %}

Translation -> 
  Whitespaces Number Newline Whitespaces TranslationMatcher Newline
  {% ([, , , , translation]) => translation %}

TranslationLanguage ->
  Language Newline Translation 
  {% ([language, , translation]) => [language, translation] %}

Language -> 
  Whitespaces "lang" Whitespaces Text 
  {% ([, , ,text]) => text %}

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
  const joinEbnf = ([chars]) => chars.join('');

  const fromPairs = pairs => 
    pairs.reduce((obj, [key, value]) => ({ ...obj, [key]: value }), {})
%}