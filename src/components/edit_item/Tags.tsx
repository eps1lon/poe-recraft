import React, { SFC } from 'react';
import { Button } from 'reactstrap';

export type Props = {
  addable: string[];
  removable: string[];
  current: string[];
  addTag: (tag: string) => any;
  removeTag: (tag: string) => any;
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
          {props.current.map(tag => <li key={tag}>{tag}</li>)}
        </ul>

        <ul className="item tags changeable">
          {props.removable.map(tag => (
            <li key={tag}>
              {tag}
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
            <option key={tag} value={index}>
              {tag}
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