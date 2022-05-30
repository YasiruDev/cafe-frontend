import React, { Component } from "react";
import { connectModal } from "redux-modal";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import AddNewCafeForm from "./AddNewEmployeeForm";
import { MODAL, STRING } from "../../config";

class AddNewEmployeeModal extends Component {
  render() {
    const { show, handleHide } = this.props;
    return (
      <Dialog open={show} aria-labelledby="form-dialog-title">
        <DialogContent>
          <DialogContentText>{STRING.ADD_EMPLOYEE}</DialogContentText>
          <AddNewCafeForm handleHide={handleHide} />
        </DialogContent>
      </Dialog>
    );
  }
}
export default connectModal({ name: MODAL.ADD_EMPLOYEE })(AddNewEmployeeModal);
