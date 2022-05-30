import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import styles from "./styles";

class BtnCellRenderer extends Component {
  constructor(props) {
    super(props);
    this.btnClickedHandler = this.btnClickedHandler.bind(this);
  }
  btnClickedHandler() {
    this.props.clicked(this.props.value);
  }
  render() {
    const { classes } = this.props;
    return (
      <Button color="primary" variant="contained" onClick={this.btnClickedHandler}>
        Edit
      </Button>
    );
  }
}
export default withStyles(styles, { withTheme: true })(BtnCellRenderer);
