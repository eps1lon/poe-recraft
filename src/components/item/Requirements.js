// @flow
import { type Item } from 'poe-mods';
import React from 'react';

import Separator from './Separator';

type Props = {
  item: Item
};

const Requirements = ({ item }: Props) => {
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
