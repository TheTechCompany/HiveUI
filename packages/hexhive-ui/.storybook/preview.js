import { HexHiveTheme, ThemeProvider } from "@hexhive/styles";
import { ThemeProvider as Emotion10ThemeProvider } from '@emotion/react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}

export const decorators = [
  (Story) => (
    <LocalizationProvider dateAdapter={AdapterDateFns}>

    <ThemeProvider theme={HexHiveTheme}>
      <Emotion10ThemeProvider theme={HexHiveTheme}>
        <Story />
      </Emotion10ThemeProvider>
    </ThemeProvider>
    </LocalizationProvider>
  ),
];