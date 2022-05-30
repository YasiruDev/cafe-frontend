import { AppBar, Box, Toolbar, Typography, withStyles } from "@material-ui/core";
import React, { Component } from "react";
import styles from "./styles";

class Footer extends Component {
  render() {
    const { classes } = this.props;
    return (
      <>
        <Box className={classes.footer}>
          <Typography variant="h6">Footer</Typography>
        </Box>
      </>
    );
  }
}
export default withStyles(styles, { withTheme: true })(Footer);
