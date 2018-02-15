import * as React from 'react';

import { Item } from '../poe';
import { intersperse } from '../../util';
import Separator from '../Separator';

export interface Props {
  item: Item;
}

export default class Body extends React.PureComponent<Props> {
  render() {
    return (
      <section className="body">
        {intersperse([], key => <Separator key={key} />)}
      </section>
    );
  }
}
