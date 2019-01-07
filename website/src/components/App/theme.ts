import { brown, lightBlue } from '@material-ui/core/colors';
import { createMuiTheme } from '@material-ui/core/styles';

const theme: Theme = createMuiTheme({
  palette: {
    background: {
      default: '#212121',
      paper: '#000',
    },
    text: {
      primary: '#fff',
      secondary: '#000',
    },
    primary: {
      main: lightBlue.A700,
      light: '#4f83cc',
      dark: '002f6c',
    },
    secondary: {
      main: brown.A700,
      dark: '#6a4f4b',
      light: '#1b0000',
    },
  },
  typography: {
    useNextVariants: true,
  },
});

export default theme;
