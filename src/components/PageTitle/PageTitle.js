import React, { Component } from "react";
import { AppBar, Box, Toolbar, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import styles from "./styles";

class PageTitle extends Component {
  render() {
    const { classes, title, button } = this.props;
    return (
      <div className={classes.pageTitleContainer}>
        <Typography variant="h2" size="sm">
          {title}
        </Typography>
        {button && button}
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(PageTitle);
