import * as React from 'react';

import { ItemProps } from '../poe';
import { intersperse } from '../../util';
import Separator from '../Separator';

export interface Props {
  item: ItemProps;
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
