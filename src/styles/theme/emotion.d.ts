import "@emotion/react";
import theme from "styles/theme/theme";

type ThemeType = typeof theme;

declare module "@emotion/react" {
  export interface Theme extends ThemeType {}
}
