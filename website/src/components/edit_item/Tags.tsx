import React, { PureComponent } from 'react';
import { Button } from 'reactstrap';

import RemoveTag from './RemoveTag';

export interface Props {
  addable: string[];
  removable: string[];
  current: string[];
  addTag: (tag: string) => void;
  removeTag: (tag: string) => void;
}

export default class Tags extends PureComponent<Props> {
  public static default_props = {};

  private add_tag: HTMLSelectElement | null = null;

  public render() {
    const { addable, current, removable, removeTag } = this.props;

    return (
      <fieldset>
        <legend>Tags</legend>
        <ul className="item tags">
          {current.map(tag => <li key={tag}>{tag}</li>)}
        </ul>

        <ul className="item tags changeable">
          {removable.map(tag => (
            <RemoveTag key={tag} tag={tag} onClick={removeTag} />
          ))}
        </ul>
        <label htmlFor="edit-item-add-tag">Add tag</label>
        <select
          id="edit-item-add-tag"
          ref={add_tag => (this.add_tag = add_tag)}
        >
          {addable.map((tag, index) => (
            <option key={tag} value={index}>
              {tag}
            </option>
          ))}
        </select>
        <Button onClick={this.handleAddClick}>Add</Button>
      </fieldset>
    );
  }

  private handleAddClick = () => {
    this.props.addTag(
      this.props.addable[this.add_tag ? +this.add_tag.value : 0]
    );
  };
}
