import React from 'react';

// text nodes dont need keys
export const CommaSeparator = key => ', ';

export const LineBreak = key => <br key={key} />;

export function intersperse(elements, renderSeparator = CommaSeparator) {
  if (elements.length === 0) {
    return [];
  }

  return elements.slice(1).reduce(
    (joined, element, index) => {
      return joined.concat(renderSeparator(`separator-${index}`), element);
    },
    [elements[0]]
  );
}
