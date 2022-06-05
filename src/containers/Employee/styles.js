import { blueGrey, orange } from "@material-ui/core/colors";
const styles = (theme) => ({
  addBtn: {
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    border: 0,
    borderRadius: 3,
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    color: "white",
    height: 48,
    padding: "0 30px",
  },
  gridBtn: {
    padding: "10px 165px",
  },
  content: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    backgroundColor: blueGrey[100],
  },
  paperStyle: {
    padding: 10,
  },
  textColor: {
    color: theme.palette.common.white,
  },
  ag_grid: {
    height: 400,
    width: 1000,
  },
  formError: {
    color: "red",
  },
  inputStyle: {
    padding: "10px",
  },
  submitButton: {
    float: "right",
    position: "relative",
  },
  closeButton: {
    float: "left",
    position: "relative",
  },
});
export default styles;
