import React, { Component } from "react";
import { connectModal } from "redux-modal";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import AddNewCafeForm from "./AddNewCafeForm";
import { MODAL, STRING } from "../../config";

class AddNewCafeModal extends Component {
  render() {
    const { show, handleHide } = this.props;
    console.log("handleHide-->", handleHide);
    return (
      <Dialog open={show} aria-labelledby="form-dialog-title">
        <DialogContent>
          <DialogContentText>{STRING.ADD_CAFE}</DialogContentText>
          <AddNewCafeForm handleHide={handleHide} />
        </DialogContent>
      </Dialog>
    );
  }
}
export default connectModal({ name: MODAL.ADD_CAFE })(AddNewCafeModal);
