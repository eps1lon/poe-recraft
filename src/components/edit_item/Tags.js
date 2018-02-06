// @flow
import React from 'react';
import { Button } from 'reactstrap';

import { type TagProps } from 'selectors/schema';

export type Props = {
  available: TagProps[],
  changeable: TagProps[],
  current: TagProps[],
  addTag: TagProps => void,
  removeTag: TagProps => void
};

export default class Tags extends React.PureComponent<Props> {
  static default_props = {};

  render() {
    const { props } = this;

    return (
      <fieldset>
        <legend>Tags</legend>
        <ul className="item tags">
          {props.current.map(tag => <li>{tag.id}</li>)}
        </ul>

        <ul className="item tags changeable">
          {props.changeable.map(tag => (
            <li>
              {tag.id}
              <Button onClick={() => props.removeTag(tag)}>X</Button>
            </li>
          ))}
        </ul>
        <label htmlFor="edit-item-add-tag">Add tag</label>
        <select id="edit-item-add-tag" ref="add_tag">
          {props.available.map((tag, index) => (
            <option value={index}>{tag.id}</option>
          ))}
        </select>
        <Button
          onClick={() => {
            props.addTag(props.available[this.refs.add_tag.value]);
          }}
        >
          Add
        </Button>
      </fieldset>
    );
  }
}
