import React, { SFC } from 'react';
import { Button } from 'reactstrap';

export type Props = {
  tag: string;
  onClick: (tag: string) => any;
};

const default_props = {
  onClick: () => {}
};

const TagFilter: SFC<Props> = props => {
  return <Button onClick={() => props.onClick(props.tag)}>{props.tag}</Button>;
};

TagFilter.defaultProps = default_props;

export default TagFilter;
