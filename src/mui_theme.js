import { createMuiTheme } from '@material-ui/core/styles'

const colors = {
  nord00: '#2E3440',
  nord01: '#3B4252',
  nord02: '#434C5E',
  nord03: '#4C566A',
  nord04: '#D8DEE9',
  nord05: '#E5E9F0',
  nord06: '#ECEFF4',
  nord07: '#8FBCBB', // rgba(143,188,187)
  nord08: '#88C0D0', // rgba(136,192,208)
  nord09: '#81A1C1', // rgba(129,161,193)
  nord10: '#5e81ac', // rgba(94,129,172)
  nord11: '#BF616A', // rgba(191,97,106)
  nord12: '#D08770',
  nord13: '#EBCB8B',
  nord14: '#A3BE8C',
  nord15: '#B48EAD',
}


export const theme = createMuiTheme({
  palette: {
    action: {
      active: '#D8DEE9'
    },
    primary: {
      main: colors.nord04
    },
    secondary: {
      main: colors.nord03
    },
    background: {
      paper: colors.nord00
    },
    text: {
      primary: colors.nord04
    }

  },
  typography: {
    fontFamily:
        'Raleway, sans-serif',
  },
  datePicker: {
    selectColor: colors.nord00
  },
  overrides: {
    // MuiSwitch: {
    //   icon: {
    //     color: colors.nord01
    //   },
    //   iconChecked: {
    //     color: colors.nord03
    //   },
    //   bar: {
    //     backgroundColor: colors.nord,
    //   },
    // }
  }
})
