import { createTheme } from "@material-ui/core/styles";
import { grey } from "@material-ui/core/colors";

const theme = createTheme({
  overrides: {
    MuiCssBaseline: {
      "@global": {
        html: {
          height: "100%",
          overflowX: "hidden",
        },
        body: {
          backgroundColor: grey[100],
          height: "100%",
        },
        "#root": {
          display: "flex",
          flexDirection: "column",
          height: "100%",
          // overflowX: "hidden"
        },
      },
    },
  },
  palette: {
    text: {
      primary: "#4A4A4A",
      secondary: "#6E6E6E",
      hint: "#B9B9B9",
    },
  },
  customShadows: {
    widget: "0px 3px 11px 0px #E8EAFC, 0 3px 3px -2px #B2B2B21A, 0 1px 8px 0 #9A9A9A1A",
    widgetDark: "0px 3px 18px 0px #4558A3B3, 0 3px 3px -2px #B2B2B21A, 0 1px 8px 0 #9A9A9A1A",
    widgetWide: "0px 12px 33px 0px #E8EAFC, 0 3px 3px -2px #B2B2B21A, 0 1px 8px 0 #9A9A9A1A",
  },
});

export default theme;
