import { HexHiveTheme, ThemeProvider } from "@hexhive/styles";
import { ThemeProvider as Emotion10ThemeProvider } from 'emotion-theming';

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
    <ThemeProvider theme={HexHiveTheme}>
      <Emotion10ThemeProvider theme={HexHiveTheme}>
        <Story />
      </Emotion10ThemeProvider>
    </ThemeProvider>
  ),
];