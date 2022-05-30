import {
  AppBar,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  withStyles,
} from "@material-ui/core";
import { withRouter } from "react-router-dom";
import MenuIcon from "@material-ui/icons/Menu";
import StorefrontIcon from "@material-ui/icons/Storefront";
import PeopleIcon from "@material-ui/icons/People";
import React, { Component } from "react";
import styles from "./styles";
import { APP_NAME, PAGE_TITLE, ROUTES } from "../../config";

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      openDrawer: false,
    };
  }
  toggleDrawer = (event) => {
    if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
      return;
    }
    this.setState({ openDrawer: !this.state.openDrawer });
  };

  onClickItem(route) {
    const {
      history: { push },
    } = this.props;
    push(route);
    this.setState({ openDrawer: false });
  }

  render() {
    const { classes } = this.props;

    return (
      <>
        <AppBar elevation={0} className={classes.appbar}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={this.toggleDrawer}
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" onClick={() => this.onClickItem("/")}>
              {APP_NAME}
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer anchor="left" open={this.state.openDrawer} onClose={this.toggleDrawer}>
          <Divider />
          <List>
            <ListItem button key={PAGE_TITLE.CAFE} onClick={() => this.onClickItem(ROUTES.CAFE)}>
              <ListItemIcon>
                <StorefrontIcon />
              </ListItemIcon>
              <ListItemText primary={PAGE_TITLE.CAFE} />
            </ListItem>
            <ListItem
              button
              key={PAGE_TITLE.EMPLOYEE}
              onClick={() => this.onClickItem(ROUTES.EMPLOYEE)}
            >
              <ListItemIcon>
                <PeopleIcon />
              </ListItemIcon>
              <ListItemText primary={PAGE_TITLE.EMPLOYEE} />
            </ListItem>
          </List>
          <Divider />
        </Drawer>
      </>
    );
  }
}
export default withRouter(withStyles(styles, { withTheme: true })(Header));
