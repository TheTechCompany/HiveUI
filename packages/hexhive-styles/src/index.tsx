import { createTheme, ThemeProvider } from '@mui/material';

export { ThemeProvider };




export const globalTheme = createTheme({
  palette: {
    primary: {
      // light: '#fff8f2',
      light: '#1e64b1',
      main: '#004398',
      dark: '#000956'
    },
    secondary: {
      // light: '#a3b579',
      light: '#c8d078',
      main: "#a4b216",
      dark: '#6c6e00'
    },
    error: {
      light: '#e57373',
      main: '#f44336',
      dark: '#d32f2f'
    },
    warning: {
      light: '#ffb74d',
      main: '#ffa726',
      dark: '#f57c00'
    },
    info: {
      light: '#57e5da',
      main: '#1daaa3',
      dark: '#0f6d66'
    },
    success: {
      light: '#b789d8',
      main: '#9950c6',
      dark: '#682d9f'
    }
    // navigation: {
    //   main: '#e3d1c7',
    //   // dark: '#b39f7d'
    // },
    // background: {
    //   // default: '',
    //   paper: '#fff8f2'
    // }
  }
})

export const HexHiveTheme = createTheme({
  palette: {
    ...globalTheme.palette
  },
  components: {
    // MuiPaper: {
    //   styleOverrides: {
    //     root: {
    //       // background: globalTheme.palette.primary.light,
    //       borderRadius: '6px',
    //       overflow: "hidden"
    //     }
    //   }
    // },
    MuiTableHead: {
      styleOverrides: {
        root: {
          backgroundColor: globalTheme.palette.secondary.main,
          '& .MuiTableRow-root .MuiTableCell-root': {
            color: 'white'
          },
          '& .MuiTableRow-root .MuiTableSortLabel-root': {
            color: 'white'
          },
          '& .MuiTableRow-root .MuiTableSortLabel-root.Mui-active': {
            color: 'white'
          },
          '& .MuiTableRow-root .MuiTableSortLabel-root .MuiTableSortLabel-icon': {
            color: 'white'
          },
          '& .MuiTableRow-root .MuiTableSortLabel-root .MuiTableSortLabel-iconDirectionDesc': {
            color: 'white'
          },
          '& .MuiTableRow-root .MuiTableSortLabel-root .MuiTableSortLabel-iconDirectionAsc': {
            color: 'white'
          }
        }
      }
    },
    MuiTabs: {
      styleOverrides: {
        root: {
          minHeight: '36px',
        },
        indicator: {
          // background: globalTheme.palette.navigation.main
        }
      }
    },
    MuiTab: {
      styleOverrides: {
        root: {
          padding: '6px',
          // color: globalTheme.palette.navigation.main,
          minHeight: '36px',
          '&.Mui-selected': {
            // color: globalTheme.palette.navigation.main
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
    // MuiMenu: {
    //   styleOverrides: {
    //       paper: {
    //           background: 'white'
    //       }
    //   }
    // }
  }
});


// export const globalTheme = createTheme({
//     palette: {
//       primary: {
//         light: '#fff8f2',
//         main: '#72738b'
//       },
//       secondary: {
//         // light: '#a3b579',
//         main: "#87927e"
//       },
//       navigation: {
//         main: '#e3d1c7',
//         // dark: '#b39f7d'
//       },
//       background: {
//         // default: '',
//         paper: '#fff8f2'
//       }
//     }
//   })

// export const HexHiveTheme = createTheme({
//     palette: {
//       ...globalTheme.palette
//     },
//     components: {
//       MuiPaper: {
//         styleOverrides: {
//           root: {
//             // background: globalTheme.palette.primary.light,
//             borderRadius: '6px',
//             overflow: "hidden"
//           }
//         }
//       },
//       MuiTableHead: {
//         styleOverrides: {
//           root: {
//             backgroundColor: globalTheme.palette.secondary.main,
//             '& .MuiTableRow-root .MuiTableCell-root': {
//               color: 'white'
//             },
//             '& .MuiTableRow-root .MuiTableSortLabel-root': {
//               color: 'white'
//             },
//             '& .MuiTableRow-root .MuiTableSortLabel-root.Mui-active': {
//               color: 'white'
//             },
//             '& .MuiTableRow-root .MuiTableSortLabel-root .MuiTableSortLabel-icon': {
//               color: 'white'
//             },
//             '& .MuiTableRow-root .MuiTableSortLabel-root .MuiTableSortLabel-iconDirectionDesc': {
//               color: 'white'
//             },
//             '& .MuiTableRow-root .MuiTableSortLabel-root .MuiTableSortLabel-iconDirectionAsc': {
//               color: 'white'
//             }
//           }
//         }
//       },
//       MuiTabs: {
//         styleOverrides: {
//           root: {
//             minHeight: '36px',
//           },
//           indicator: {
//             background: globalTheme.palette.navigation.main
//           }
//         }
//       },
//       MuiTab: {
//         styleOverrides: {
//           root: {
//             padding: '6px',
//             color: globalTheme.palette.navigation.main,
//             minHeight: '36px',
//             '&.Mui-selected': {
//               color: globalTheme.palette.navigation.main
//             }
//           }
        
//         }
//       },
//       MuiDialogContent: {
//         styleOverrides: {
//           root: {
//             padding: '6px'
//           }
//         }
//       },
//       MuiDialogActions: {
//         styleOverrides: {
//           root: {
//             padding: '6px',
//             paddingTop: '6px'
//           }
//         }
//       },
//       MuiDialogTitle: {
//         styleOverrides: {
//           root: {
//             background: globalTheme.palette.secondary.main,
//             color: '#fff',
//             padding: '6px',
//             fontSize: '16px',
//             marginBottom: '6px'
//           }
//         }
//       },
//       MuiMenu: {
//         styleOverrides: {
//             paper: {
//                 background: 'white'
//             }
//         }
//       }
//     }
//   });