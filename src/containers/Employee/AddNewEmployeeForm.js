import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Field, reduxForm } from "redux-form";
import Select from "react-select";
import Button from "@material-ui/core/Button";
import { FormHelperText, TextField } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { addNewEmployee } from "../../actions/employee";
import { getCafeList } from "../../actions/cafe";
import styles from "./styles";
import { DROPDOWN, VALIDATION } from "../../config";

class AddNewEmployeeForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cafeList: [],
      gender: DROPDOWN.GENDER,
    };
  }
  componentDidMount() {
    const { destroy, getCafeList } = this.props;
    destroy();
    getCafeList();
  }

  componentWillReceiveProps(nextProps) {
    let cafeObj = {};
    let cafeDataSet = [];

    if (nextProps.cafe) {
      for (let i = 0; i < nextProps.cafe.length; i++) {
        const rowData = nextProps.cafe[i];
        cafeObj = Object.assign({}, {});
        cafeObj.value = rowData.id;
        cafeObj.label = rowData.name;
        cafeDataSet.push(cafeObj);
      }
    }
    this.setState({ cafeList: cafeDataSet });
  }

  renderField(field) {
    const {
      meta: { touched, error },
    } = field;
    const className = `${field.style} ${touched && error ? "has-danger" : ""}`;

    return (
      <div className={className}>
        <TextField
          className="form-control"
          type={field.type || "text"}
          {...field.input}
          placeholder={field.label}
          fullWidth
        />
        <FormHelperText>{touched ? error : ""}</FormHelperText>
      </div>
    );
  }

  ReduxFormSelect(props) {
    const {
      input,
      options,
      meta: { touched, error },
    } = props;
    const className = `${props.style} ${touched && error ? props.error : ""}`;

    const onChangeValue = (value) => {
      if (props.fieldFor && props.fieldFor === "subject") {
        this.props.change("NewResource", "name", `${value.label} : `);
      }
      return input.onChange(value);
    };

    return (
      <div className={className}>
        <Select
          {...input}
          onChange={(value) => onChangeValue(value)}
          onBlur={() => input.onBlur(input.value)}
          options={options}
        />
        <p className="text-danger">{touched ? error : ""}</p>
      </div>
    );
  }

  onSubmit(values) {
    const { handleHide, addNewEmployee } = this.props;
    values.cafeId = values.cafe?.value;
    values.gender = values.gender?.value;
    delete values.gender;
    delete values.cafe;
    addNewEmployee(values);
    handleHide();
  }

  render() {
    const { handleSubmit, handleHide, classes } = this.props;
    const { cafeList, gender } = this.state;
    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <Field
          label="Employee Name"
          name="name"
          props={{ style: classes.inputStyle, error: classes.formError }}
          component={this.renderField}
          type="text"
        />

        <Field
          label="Email"
          name="email"
          props={{ style: classes.inputStyle, error: classes.formError }}
          component={this.renderField}
          type="text"
        />
        <Field
          label="Phone Number"
          name="phone"
          props={{ style: classes.inputStyle, error: classes.formError }}
          component={this.renderField}
          type="text"
        />
        <Field
          label="Gender"
          name="gender"
          props={{ style: classes.inputStyle, error: classes.formError }}
          component={this.ReduxFormSelect}
          options={gender}
          type="text"
        />
        <Field
          label="Cafe"
          name="cafe"
          props={{ style: classes.inputStyle, error: classes.formError }}
          component={this.ReduxFormSelect}
          options={cafeList}
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
  if (!values.email) {
    errors.email = VALIDATION.REQUIRED;
  }
  if (!values.phone) {
    errors.phone = VALIDATION.REQUIRED;
  }
  if (!values.cafe) {
    errors.cafe = VALIDATION.REQUIRED;
  }
  return errors;
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ addNewEmployee, getCafeList }, dispatch);
}
const mapStateToProps = ({ cafe }) => {
  return { cafe };
};
export default reduxForm({
  validate,
  form: "AddNewEmployeeForm",
})(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(withStyles(styles, { withTheme: true })(AddNewEmployeeForm))
);
