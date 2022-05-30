import React, { Component } from "react";
import { Box, Typography, Grid, Paper } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import styles from "./styles";
import { STRING } from "../../config";

class Home extends Component {
  render() {
    const { classes } = this.props;
    return (
      <>
        <Box display="flex" justifyContent="center" alignItems="center" className={classes.banner}>
          <Typography variant="h3">{STRING.BANNER}</Typography>
        </Box>
        <Box className={classes.content}>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <Paper
                initial="hidden"
                animate="visible"
                whileHover="hover"
                className={classes.paperStyle}
              >
                Cafe 1
              </Paper>
            </Grid>
            <Grid item xs={4}>
              <Paper
                initial="hidden"
                animate="visible"
                whileHover="hover"
                className={classes.paperStyle}
              >
                Cafe 2
              </Paper>
            </Grid>
            <Grid item xs={4}>
              <Paper
                initial="hidden"
                animate="visible"
                whileHover="hover"
                className={classes.paperStyle}
              >
                Cafe 3
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </>
    );
  }
}

export default withStyles(styles, { withTheme: true })(Home);
