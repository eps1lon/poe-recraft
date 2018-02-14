import * as React from 'react';

// text nodes dont need keys
export const CommaSeparator = () => ', ';

export const LineBreak = (key: string) => <br key={key} />;

export function intersperse(
  nodes: React.ReactNode[],
  renderSeparator: (key: string) => React.ReactNode = CommaSeparator,
) {
  if (nodes.length === 0) {
    return [];
  }

  return nodes.slice(1).reduce(
    (joined: React.ReactNode[], element, index) => {
      // push instead of concat's returnval because concat is expensive
      joined.push(renderSeparator(`separator-${index}`), element);
      return joined;
    },
    [nodes[0]],
  );
}
