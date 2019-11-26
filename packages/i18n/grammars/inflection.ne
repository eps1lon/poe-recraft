main -> Cases

Cases ->
	Case {% single => single %}
	| Case Cases {% ([single, many]) => ([single, ...many]) %}
Case -> 
  "<" "el":? "if:" InflectionIdentifier ">{" Output "}" 
  {% ([, , , match, , output]) => ({ match, output }) %}
Output -> [^}]:+ {% ([chars]) => chars.join('') %}
InflectionIdentifier -> [A-Z]:+ {% ([chars]) => chars.join('') %}