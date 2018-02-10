import { Item } from 'poe-mods';
import React, { SFC } from 'react';

import Separator from './Separator';

type Props = {
  item: Item;
};

// @ts-ignore: jsx array elements not supported by ts
const Requirements: SFC<Props> = ({ item }) => {
  const { requirements } = item;

  if (requirements.any()) {
    const { level, str, dex, int } = requirements.list();

    const displayed = [
      level > 0 && [
        <span key="human">Level </span>,
        <span key="value" className="value">
          {level}
        </span>
      ],
      str > 0 && [
        <span key="value" className="value">
          {str}
        </span>,
        <span key="human"> Str</span>
      ],
      int > 0 && [
        <span key="value" className="value">
          {int}
        </span>,
        <span key="human"> Int</span>
      ],
      dex > 0 && [
        <span key="value" className="value">
          {dex}
        </span>,
        <span key="human"> Dex</span>
      ]
    ]
      .filter(Boolean)
      // join by str
      .map((component, i) => {
        if (i > 0) {
          return [', ', component];
        } else {
          return component;
        }
      });

    return [
      <Separator key="sep" />,
      <div key="requirements">Requires {displayed}</div>
    ];
  } else {
    return null;
  }
};

export default Requirements;
