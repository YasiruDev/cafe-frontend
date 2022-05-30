import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Field, reduxForm } from "redux-form";
import Button from "@material-ui/core/Button";
import { FormHelperText, TextField } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { addNewCafe } from "../../actions";
import styles from "./styles";
import { VALIDATION } from "../../config";

class AddNewCafeForm extends Component {
  componentDidMount() {
    this.props.destroy();
  }

  renderField(field) {
    const {
      meta: { touched, error },
    } = field;

    return (
      <div className={field.style}>
        <TextField
          className="form-control"
          disabled={field.disabled}
          type={field.type || "text"}
          {...field.input}
          placeholder={field.label}
          fullWidth
        />
        <FormHelperText>{touched ? error : ""}</FormHelperText>
      </div>
    );
  }

  onSubmit(values) {
    const { addNewCafe, handleHide } = this.props;
    values.logo = "https://www.sample-videos.com/img/Sample-jpg-image-50kb.jpg";
    addNewCafe(values);
    handleHide();
  }

  render() {
    const { handleSubmit, handleHide, classes } = this.props;
    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <Field
          label="Cafe Name"
          name="name"
          props={{ style: classes.inputStyle }}
          component={this.renderField}
          type="text"
        />

        <Field
          label="Description"
          name="description"
          props={{ style: classes.inputStyle }}
          component={this.renderField}
          type="text"
        />
        <Field
          label="Location"
          name="location"
          props={{ style: classes.inputStyle }}
          component={this.renderField}
          type="text"
        />
        <Field
          label="Logo"
          name="logo"
          props={{ style: classes.inputStyle }}
          component={this.renderField}
          type="text"
        />

        <div>
          <Button type="submit" className={classes.submitButton}>
            Submit
          </Button>
          <Button onClick={handleHide} className={classes.closeButton}>
            close
          </Button>
        </div>
      </form>
    );
  }
}

//input validation
function validate(values) {
  const errors = {};

  if (!values.name) {
    errors.name = VALIDATION.REQUIRED;
  }
  if (!values.description) {
    errors.description = VALIDATION.REQUIRED;
  }
  if (!values.location) {
    errors.location = VALIDATION.REQUIRED;
  }
  if (!values.logo) {
    errors.logo = VALIDATION.REQUIRED;
  }
  return errors;
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ addNewCafe }, dispatch);
}

export default reduxForm({
  validate,
  form: "AddNewCafeForm",
})(connect(null, mapDispatchToProps)(withStyles(styles, { withTheme: true })(AddNewCafeForm)));
