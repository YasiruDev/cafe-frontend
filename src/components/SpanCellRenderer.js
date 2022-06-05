import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import styles from "./styles";

class SpanCellRenderer extends Component {
  constructor(props) {
    super(props);
    this.btnClickedHandler = this.btnClickedHandler.bind(this);
  }
  btnClickedHandler() {
    this.props.clicked(this.props.node.data);
  }
  render() {
    const { value } = this.props;
    return <span onClick={this.btnClickedHandler}>{value}</span>;
  }
}
export default withStyles(styles, { withTheme: true })(SpanCellRenderer);
