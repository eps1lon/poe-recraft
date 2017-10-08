// @flow
import React from 'react';
import { Button } from 'reactstrap';

export type Props = {
  tag: string,
  onClick: string => void
};

const default_props = {
  onClick: () => {}
};

const TagFilter = (props: Props) => {
  return <Button onClick={() => props.onClick(props.tag)}>{props.tag}</Button>;
};

TagFilter.defaultProps = default_props;

export default TagFilter;
