import {
  ClassKeyOfStyles,
  ClassNameMap,
  Styles,
} from '@material-ui/core/styles/withStyles';

declare module '@material-ui/core/styles' {
  export interface ExtendableStyles<S> {
    classes?: ClassNameMap<ClassKeyOfStyles<S>>;
  }
}
