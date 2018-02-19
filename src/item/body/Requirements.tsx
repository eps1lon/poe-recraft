import * as React from 'react';

import { Requirements } from '../poe';
import PropertyValue, { DisplayPropertyType } from './PropertyValue';
import { intersperse, CommaSeparator } from '../../util/react';
import { AugmentableValue, SingleValue } from '../../util/value';

export interface Props {
  requirements: Requirements;
}

export default class RequirementsComponent extends React.PureComponent<Props> {
  public render() {
    if (!this.hasAny()) {
      return null;
    }

    return (
      <div className="requirements">
        Requires {intersperse(this.requirements(), CommaSeparator)}
      </div>
    );
  }

  private hasAny() {
    const { requirements } = this.props;
    // Object.values throws ts error (prop not found)
    return Object.keys(requirements).filter(key => {
      const requirement = requirements[key];
      return requirement !== undefined && requirement.value > 0;
    });
  }

  private requirements() {
    const {
      requirements: { level, strength, dexterity, inteliligence },
    } = this.props;

    return [
      this.requirement('level', level),
      this.attributeRequirement('str', strength),
      this.attributeRequirement('dex', dexterity),
      this.attributeRequirement('int', inteliligence),
    ].filter(Boolean);
  }

  private requirement(
    human: string,
    augmentable?: AugmentableValue<SingleValue>,
  ) {
    if (augmentable === undefined || augmentable.value < 1) {
      return null;
    }

    return [
      <span key="human">{human}</span>,
      ' ',
      <PropertyValue
        value={String(augmentable.value)}
        type={
          augmentable.augmented
            ? DisplayPropertyType.augmented
            : DisplayPropertyType.default
        }
      />,
    ];
  }

  private attributeRequirement(
    human: string,
    augmentable?: AugmentableValue<SingleValue>,
  ) {
    if (augmentable === undefined || augmentable.value < 1) {
      return null;
    }

    return [
      <PropertyValue
        value={String(augmentable.value)}
        type={
          augmentable.augmented
            ? DisplayPropertyType.augmented
            : DisplayPropertyType.default
        }
      />,
      ' ',
      <span key="human">{human}</span>,
    ];
  }
}
