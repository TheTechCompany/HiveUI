import { createTheme, ThemeProvider } from '@mui/material';

export { ThemeProvider };

export const globalTheme = createTheme({
    palette: {
      primary: {
        light: '#fff8f2',
        main: '#72738b'
      },
      secondary: {
        // light: '#a3b579',
        main: "#87927e"
      },
      navigation: {
        main: '#e3d1c7',
        // dark: '#b39f7d'
      }
    }
  })

export const HexHiveTheme = createTheme({
    palette: {
      ...globalTheme.palette
    },
    components: {
      MuiPaper: {
        styleOverrides: {
          root: {
            background: globalTheme.palette.primary.light,
            borderRadius: '6px',
            overflow: "hidden"
          }
        }
      },
      MuiTableHead: {
        styleOverrides: {
          root: {
            background: globalTheme.palette.secondary.main
          }
        }
      },
      MuiTabs: {
        styleOverrides: {
          root: {
            minHeight: '36px',
          },
          indicator: {
            background: globalTheme.palette.navigation.main
          }
        }
      },
      MuiTab: {
        styleOverrides: {
          root: {
            padding: '6px',
            color: globalTheme.palette.navigation.main,
            minHeight: '36px',
            '&.Mui-selected': {
              color: globalTheme.palette.navigation.main
            }
          }
        
        }
      },
      MuiDialogContent: {
        styleOverrides: {
          root: {
            padding: '6px'
          }
        }
      },
      MuiDialogActions: {
        styleOverrides: {
          root: {
            padding: '6px',
            paddingTop: '6px'
          }
        }
      },
      MuiDialogTitle: {
        styleOverrides: {
          root: {
            background: globalTheme.palette.secondary.main,
            color: '#fff',
            padding: '6px',
            fontSize: '16px',
            marginBottom: '6px'
          }
        }
      },
      MuiMenu: {
        styleOverrides: {
            paper: {
                background: 'white'
            }
        }
      }
    }
  });