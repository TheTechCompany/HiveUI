import { PaletteOptions } from '@mui/material'

declare module '@mui/material/styles' {
    // interface Theme {
    //   status: {
    //     danger: React.CSSProperties['color'];
    //   };
    // }
  
    interface Palette {
      navigation: Palette['primary'];
    }
    interface PaletteOptions {
      navigation: PaletteOptions['primary'];
    }
  
    // interface PaletteColor {
    //   darker?: string;
    // }
    // interface SimplePaletteColorOptions {
    //   darker?: string;
    // }
    // interface ThemeOptions {
    //   status: {
    //     danger: React.CSSProperties['color'];
    //   };
    // }
  }