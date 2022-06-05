import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";
import { Field, reduxForm } from "redux-form";
import Select from "react-select";
import Button from "@material-ui/core/Button";
import { FormHelperText, Grid, Paper, TextField } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { addNewEmployee, updateEmployee } from "../../actions/employee";
import { getCafeList } from "../../actions/cafe";
import styles from "./styles";
import { DROPDOWN, ROUTES, VALIDATION, validateEmail } from "../../config";

class AddNewEmployeeForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cafeList: [],
      editEmployee: false,
      employeeId: null,
      gender: DROPDOWN.GENDER,
    };
    this.handleRedirect = this.handleRedirect.bind(this);
  }
  componentDidMount() {
    const {
      getCafeList,
      match,
      location: { state },
    } = this.props;

    getCafeList();

    if (match?.params.id) {
      this.props.destroy();
      this.props.initialize({
        name: state?.data.name,
        email: state?.data.email,
        phone: state?.data.phone,
        gender: { value: state?.data.gender, label: state?.data.gender },
        cafe: { value: state?.data.cafeId, label: state?.data.cafeName },
      });
      this.setState({ editEmployee: true, employeeId: match.params.id });
    } else {
      this.setState({ editEmployee: false });
    }
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
          error={Boolean(touched && error)}
          className="form-control"
          type={field.type || "text"}
          {...field.input}
          placeholder={field.label}
          fullWidth
          helperText={touched ? error : ""}
        />
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

  handleRedirect() {
    const {
      history: { push },
    } = this.props;
    push(`${ROUTES.EMPLOYEE}`);
  }
  onSubmit(values) {
    const { addNewEmployee, updateEmployee } = this.props;
    values.cafeId = values.cafe?.value;
    values.gender = values.gender?.value;
    delete values.cafe;

    if (this.state.editEmployee) {
      values.id = this.state.employeeId;
      updateEmployee(values, this.handleRedirect);
    } else {
      addNewEmployee(values, this.handleRedirect);
    }
  }

  render() {
    const { handleSubmit, classes } = this.props;
    const { cafeList, gender } = this.state;
    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <Paper style={{ padding: 16 }}>
          <Grid container alignItems="flex-start" spacing={8}>
            <Grid item xs={6}>
              <Field
                label="Employee Name"
                name="name"
                props={{ style: classes.inputStyle, error: classes.formError }}
                component={this.renderField}
                type="text"
              />
            </Grid>
            <Grid item xs={6}>
              <Field
                label="Email"
                name="email"
                props={{ style: classes.inputStyle, error: classes.formError }}
                component={this.renderField}
                type="text"
              />
            </Grid>
            <Grid item xs={6}>
              <Field
                label="Phone Number"
                name="phone"
                props={{ style: classes.inputStyle, error: classes.formError }}
                component={this.renderField}
                type="text"
              />
            </Grid>
            <Grid item xs={6}>
              <Field
                label="Gender"
                name="gender"
                props={{ style: classes.inputStyle, error: classes.formError }}
                component={this.ReduxFormSelect}
                options={gender}
                type="text"
              />
            </Grid>
            <Grid item xs={6}>
              <Field
                label="Cafe"
                name="cafe"
                props={{ style: classes.inputStyle, error: classes.formError }}
                component={this.ReduxFormSelect}
                options={cafeList}
                type="text"
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.submitButton}
              >
                Submit
              </Button>
              <Button
                variant="contained"
                onClick={() => this.handleRedirect()}
                className={classes.closeButton}
              >
                Cancel
              </Button>
            </Grid>
          </Grid>
        </Paper>
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
  if (validateEmail(values.email)) {
    errors.email = VALIDATION.INVAL_EMAIL;
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
  return bindActionCreators({ addNewEmployee, getCafeList, updateEmployee }, dispatch);
}
const mapStateToProps = ({ cafe }) => {
  return { cafe };
};
export default reduxForm({
  validate,
  form: "AddNewEmployeeForm",
})(
  withRouter(
    connect(
      mapStateToProps,
      mapDispatchToProps
    )(withStyles(styles, { withTheme: true })(AddNewEmployeeForm))
  )
);
