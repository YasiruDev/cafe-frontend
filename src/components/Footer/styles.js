import { blueGrey, orange } from "@material-ui/core/colors";
const styles = (theme) => ({
  footer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    flex: "none",
    color: theme.palette.common.white,
    backgroundColor: blueGrey[900],
  },
});
export default styles;
