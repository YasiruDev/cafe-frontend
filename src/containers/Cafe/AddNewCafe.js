import React, { Component } from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import { bindActionCreators } from "redux";
import { Button, Grid, Paper } from "@material-ui/core";
import PageTitle from "../../components/PageTitle/PageTitle";
import AddNewCafeForm from "./AddNewCafeForm";
import { MODAL, PAGE_TITLE } from "../../config";
import styles from "./styles";

class AddNewCafe extends Component {
  render() {
    const { classes } = this.props;
    return (
      <>
        <PageTitle title={PAGE_TITLE.NEW_CAFE} />
        <AddNewCafeForm />
      </>
    );
  }
}
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({}, dispatch);
};
const mapStateToProps = ({}) => {
  return {};
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles, { withTheme: true })(AddNewCafe));
