import React, { Component } from 'react';

export interface Props {
  is_modifieable: boolean;
  is_shaped: boolean;
  is_elder: boolean;
  onShape: () => void;
  onElder: () => void;
  onNone: () => void;
}

export interface State {
  is_modifieable: boolean;
}

export default class AtlasModifiers extends Component<Props, State> {
  public static default_props = {
    onElder: () => {},
    onShape: () => {},
    onNone: () => {}
  };

  public state: State = { is_modifieable: true };

  constructor(props: Props) {
    super(props);
    this.state = { is_modifieable: props.is_modifieable };
  }

  public componentDidCatch() {
    // assume as*Item threw
    this.setState({ is_modifieable: false });
  }

  public render() {
    const { props } = this;

    return [
      <label key="label-elder" htmlFor="atlas-modifier-as-elder">
        Elder
      </label>,
      <input
        key="input-elder"
        id="atlas-modifier-as-elder"
        type="checkbox"
        checked={props.is_elder}
        disabled={!props.is_modifieable}
        onChange={this.handleElderChange}
      />,
      <label key="label-shaper" htmlFor="atlas-modifier-as-shaper">
        Shaped
      </label>,
      <input
        key="input-shaper"
        id="atlas-modifier-as-shaper"
        type="checkbox"
        checked={props.is_shaped}
        disabled={!props.is_modifieable}
        onChange={this.handleShapedChange}
      />
    ];
  }

  private handleElderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.target.checked ? this.props.onElder() : this.props.onNone();
  };

  private handleShapedChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.target.checked ? this.props.onShape() : this.props.onNone();
  };
}
