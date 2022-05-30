import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { clearNotification } from "../actions";
import Alert from "@material-ui/lab/Alert";

class Notification extends Component {
  componentDidUpdate() {
    setTimeout(() => {
      this.props.clearNotification();
    }, 4000);
  }

  render() {
    const { type, message } = this.props.notifications;
    return type ? (
      <Alert severity={type} style={{ zIndex: 10000 }}>
        {message}
      </Alert>
    ) : (
      ""
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ clearNotification }, dispatch);
}

function mapStateToProps({ notifications }) {
  return { notifications };
}

export default connect(mapStateToProps, mapDispatchToProps)(Notification);
