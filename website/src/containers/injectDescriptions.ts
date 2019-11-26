import { ComponentType } from 'react';
import { connect } from 'react-redux';
import { State } from 'state';

const mapStateToProps = (state: State) => {
  return {
    descriptions: state.i18n.descriptions,
  };
};

export default <
  C extends ComponentType<React.ComponentProps<C> & { descriptions: {} }>
>(
  component: C,
) =>
  connect(
    mapStateToProps,
    null,
  )(component as any) as React.ComponentType<
    Omit<
      JSX.LibraryManagedAttributes<C, React.ComponentProps<C>>,
      'descriptions'
    >
  >;
