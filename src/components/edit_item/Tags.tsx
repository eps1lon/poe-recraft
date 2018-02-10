import React, { SFC } from 'react';
import { Button } from 'reactstrap';

import { TagProps } from 'selectors/schema';

export type Props = {
  addable: TagProps[];
  removable: TagProps[];
  current: TagProps[];
  addTag: (tag: TagProps) => any;
  removeTag: (tag: TagProps) => any;
};

export default class Tags extends React.PureComponent<Props> {
  static default_props = {};

  private add_tag: HTMLSelectElement | null = null;

  render() {
    const { props } = this;

    return (
      <fieldset>
        <legend>Tags</legend>
        <ul className="item tags">
          {props.current.map(tag => <li key={tag.id}>{tag.id}</li>)}
        </ul>

        <ul className="item tags changeable">
          {props.removable.map(tag => (
            <li>
              {tag.id}
              <Button onClick={() => props.removeTag(tag)}>X</Button>
            </li>
          ))}
        </ul>
        <label htmlFor="edit-item-add-tag">Add tag</label>
        <select
          id="edit-item-add-tag"
          ref={add_tag => (this.add_tag = add_tag)}
        >
          {props.addable.map((tag, index) => (
            <option key={tag.id} value={index}>
              {tag.id}
            </option>
          ))}
        </select>
        <Button
          onClick={() => {
            props.addTag(props.addable[this.add_tag ? +this.add_tag.value : 0]);
          }}
        >
          Add
        </Button>
      </fieldset>
    );
  }
}
