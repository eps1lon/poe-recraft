import {
  ClassKeyOfStyles,
  ClassNameMap,
  Styles,
} from '@material-ui/styles/withStyles';

declare module '@material-ui/styles' {
  export interface ExtendableStyles<S> {
    classes?: ClassNameMap<ClassKeyOfStyles<S>>;
  }
}
