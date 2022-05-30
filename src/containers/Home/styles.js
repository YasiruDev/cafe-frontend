import { blueGrey, orange } from "@material-ui/core/colors";
const styles = (theme) => ({
  root: {
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    border: 0,
    borderRadius: 3,
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    color: "white",
    height: 48,
    padding: "0 30px",
  },
  banner: {
    height: 350,
    flex: "none",
    color: theme.palette.common.white,
    backgroundColor: blueGrey[300],
  },
  content: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    backgroundColor: blueGrey[100],
  },
  paperStyle: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: 120,
  },
  textColor: {
    color: theme.palette.common.white,
  },
});
export default styles;
