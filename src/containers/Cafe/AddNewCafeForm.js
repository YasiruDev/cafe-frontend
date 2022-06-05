import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
import { Field, reduxForm } from "redux-form";
import ImageUploader from "react-images-upload";
import { TextField, Button, Grid, Paper } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { addNewCafe, uploadImage, updateCafe } from "../../actions/cafe";
import styles from "./styles";
import { BASE_URL, ROUTES, VALIDATION } from "../../config";

class AddNewCafeForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      imgName: null,
      editCafe: false,
      cafeId: null,
    };
    this.handleRedirect = this.handleRedirect.bind(this);
    this.onDrop = this.onDrop.bind(this);
  }

  componentDidMount() {
    const {
      match,
      location: { state },
    } = this.props;

    if (match?.params.id) {
      this.props.destroy();
      this.props.initialize({
        name: state?.data.name,
        description: state?.data.description,
        location: state?.data.location,
      });
      this.setState({ editCafe: true, imgName: state?.data.logo, cafeId: match.params.id });
    } else {
      this.setState({ editCafe: false });
    }
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.uploadImg !== nextProps.uploadImg) {
      this.setState({ imgName: `${BASE_URL}${ROUTES.UPLOADS}/${nextProps.uploadImg.name}` });
    }
  }
  renderField(field) {
    const {
      meta: { touched, error },
    } = field;

    return (
      <div className={field.style}>
        <TextField
          error={Boolean(touched && error)}
          className="form-control"
          disabled={field.disabled}
          type={field.type || "text"}
          {...field.input}
          placeholder={field.label}
          fullWidth
          helperText={touched ? error : ""}
        />
      </div>
    );
  }
  onDrop(picture) {
    if (picture.length) {
      const data = new FormData();
      data.append("image", picture[0]);
      data.append("type", "RESOURCES");
      this.props.uploadImage(data);
    }
  }
  handleRedirect() {
    const {
      history: { push },
    } = this.props;
    push(`${ROUTES.CAFE}`);
  }
  onSubmit(values) {
    const { addNewCafe, updateCafe } = this.props;
    values.logo = `${this.state.imgName}`;
    if (this.state.editCafe) {
      values.id = this.state.cafeId;
      updateCafe(values, this.handleRedirect);
    } else {
      addNewCafe(values, this.handleRedirect);
    }
  }

  render() {
    const { handleSubmit, classes } = this.props;
    const { editCafe, imgName } = this.state;
    console.log("imgName-->", imgName);
    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <Paper style={{ padding: 16 }}>
          <Grid container alignItems="flex-start" spacing={8}>
            {editCafe && (
              <Grid item xs={12}>
                <img src={imgName} width={100} height={100} />
              </Grid>
            )}
            <Grid item xs={6}>
              <Field
                label="Cafe Name"
                name="name"
                props={{ style: classes.inputStyle }}
                component={this.renderField}
                type="text"
              />
            </Grid>
            <Grid item xs={6}>
              <Field
                label="Description"
                name="description"
                props={{ style: classes.inputStyle }}
                component={this.renderField}
                type="text"
              />
            </Grid>
            <Grid item xs={6}>
              <Field
                label="Location"
                name="location"
                props={{ style: classes.inputStyle }}
                component={this.renderField}
                type="text"
              />
            </Grid>
            <Grid item xs={6}>
              <ImageUploader
                withIcon={true}
                withPreview={true}
                singleImage={true}
                buttonText="Choose images"
                onChange={this.onDrop}
                imgExtension={[".jpg", ".gif", ".png"]}
                maxFileSize={5242880}
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
  return bindActionCreators({ addNewCafe, uploadImage, updateCafe }, dispatch);
}

const mapStateToProps = ({ uploadImg }) => {
  return { uploadImg };
};

export default reduxForm({
  validate,
  form: "AddNewCafeForm",
})(
  withRouter(
    connect(
      mapStateToProps,
      mapDispatchToProps
    )(withStyles(styles, { withTheme: true })(AddNewCafeForm))
  )
);
