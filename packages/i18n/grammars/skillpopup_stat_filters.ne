main -> Expressions {%([expressions]) => expressions %}

Expressions -> 
	Expression 
		{% ([expression]) => [expression] %}
	| Expression Blankline:+ Expressions 
		{% ([expression, , expressions]) => [expression, ...expressions] %}
Expression -> 
	Group {% ([group]) => ({ type: 'group', ...group })%}
	| Skill {% ([skill]) => ({ type: 'skill',  ...skill })%}
	| Copy {% ([copy]) => ({ type: 'copy', ...copy })%}

Group -> 
	GroupHead Newline GroupBody 
	{% ([head, , body]) => ({ ...head, stats: body }) %}
GroupHead -> "group " Identifier {% ([, id]) => ({ id }) %}
GroupBody -> "{" Newline:? GroupMembers:? Newline:? "}" {% ([, , ids]) => ids %}
GroupMembers -> 
	GroupMember {% ([id]) => [id] %}
	| GroupMember Newline GroupMembers 
		{% ([expression, , expressions]) => [expression, ...expressions] %}
GroupMember -> Whitespaces Identifier Whitespaces:? {% ([, id]) => id %}

Skill ->
	SkillHead Newline SkillBody 
	{% ([head, , body]) => ({ ...head, stats: body }) %}
SkillHead ->
	Identifier Whitespaces StringLiteral 
	{% ([id, , start_file]) => ({ id, start_file }) %}
SkillBody -> "{" Whitespaces:? Newline:? FilterIdentifiers:? Newline:? "}" {% ([, , , ids]) => ids %}
FilterIdentifiers -> 
	FilterIdentifier {% ([id]) => [id] %}
	| FilterIdentifier Newline FilterIdentifiers 
		{% ([expression, , expressions]) => [expression, ...expressions] %}
FilterIdentifier ->
	Whitespaces (Identifier | "$" Identifier) Whitespaces:?
	{% ([, [...id]]) => id.join('') %}

Copy -> 
	"copy " Identifier Whitespaces Identifier 
	{% ([ , target, , source]) => ({ source, target }) %}

Identifier -> [a-zA-Z0-9_]:+ {% ebnfToString %}
StringLiteral -> "\"" [^"]:+ "\"" {% ([, text]) => text.join('') %}

# util
Newline -> "\r":? "\n" {% id %}
Blankline -> Whitespaces:? Newline
Whitespace -> " " | "\t"
Whitespaces -> Whitespace:+ {% ebnfToString %}

@{%
  const ebnfToString = ([chars]) => chars.join('');

  // (for  | bar) => [[foo | bar]]
  const pipeId = ([[id]]) => id
%}