import React from "react";
import { ThemeProvider } from "styled-components";
import { themes } from "@storybook/theming";
import { GlobalStyle } from "@styles/global.style";

export const parameters = {
  docs: { theme: themes.white },
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: { expanded: true },
};

export const decorators = [
  (Story) => (
    <ThemeProvider theme={{ test: null }}>
      <GlobalStyle />
      <Story />
    </ThemeProvider>
  ),
];
