import React, { ReactNode, SFC } from 'react';

// text nodes dont need keys
// @ts-ignore: strings also not supported by typing
export const CommaSeparator: SFC<string> = key => ', ';

export const LineBreak: SFC<string> = key => <br key={key} />;

export function intersperse(
  elements: ReactNode[],
  renderSeparator: (key: string) => ReactNode = CommaSeparator
) {
  if (elements.length === 0) {
    return [];
  }

  return elements.slice(1).reduce(
    (joined: ReactNode[], element, index) => {
      return joined.concat(renderSeparator(`separator-${index}`), element);
    },
    [elements[0]] as ReactNode[]
  );
}
