import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Grid, Paper } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { bindActionCreators } from "redux";
import { show } from "redux-modal";
import moment from "moment";
import { getEmployeeList } from "../../actions/employee";
import styles from "./styles";
import PageTitle from "../../components/PageTitle/PageTitle";
import { AgGridReact } from "ag-grid-react";
// import AddNewCafeModal from "./AddNewEmployeeModal";

import BtnCellRenderer from "../../components/BtnCellRenderer";
import { BUTTON, MODAL, PAGE_TITLE, ROUTES, STRING, validateDateDifference } from "../../config";

class Employee extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columnDefs: [
        { headerName: "#", field: "id", width: 100 },
        { headerName: "Name", field: "name", width: 200 },
        { headerName: "Email", field: "email", width: 300 },
        { headerName: "Gender", field: "gender", width: 300 },
        { headerName: "Phone Number", field: "phone", width: 300 },
        { headerName: "Days Work", field: "daysWorked" },
        { headerName: "Cafe Id", field: "cafeId", hide: true },
        { headerName: "Cafe Name", field: "cafeName" },
        {
          headerName: "Activity",
          field: "activity",
          cellRenderer: "btnCellRenderer",
          cellRendererParams: {
            clicked: (field) => {
              this.onEditBtnClick(field);
            },
          },
        },
      ],
      frameworkComponents: {
        btnCellRenderer: BtnCellRenderer,
      },
      rowData: [],
    };
  }

  componentDidMount() {
    const { match, getEmployeeList } = this.props;
    getEmployeeList(match ? match.params.id : null);
  }

  componentWillReceiveProps(nextProps) {
    var employeeObj = {};
    var employeeDataSet = [];

    if (nextProps.employee) {
      for (var i = 0; i < nextProps.employee.length; i++) {
        var rowData = nextProps.employee[i];
        employeeObj = Object.assign({}, {});
        employeeObj.id = rowData.id;
        employeeObj.name = rowData.name;
        employeeObj.email = rowData.email;
        employeeObj.phone = rowData.phone;
        employeeObj.gender = rowData.gender;
        employeeObj.daysWorked = validateDateDifference(
          moment().startOf("day"),
          moment(rowData.addedDate, "YYYY-MM-DD")
        );
        employeeObj.cafeId = rowData.cafe?.id;
        employeeObj.cafeName = rowData.cafe?.name;
        employeeObj.status = rowData.status === 0 ? STRING.DEACTIVE : STRING.ACTIVE;

        employeeDataSet.push(employeeObj);
      }
    }
    this.setState({ rowData: employeeDataSet });
  }

  onEditBtnClick(e) {
    const {
      history: { push },
    } = this.props;
    push({
      pathname: `/edit-employee/${e.id}`,
      state: { data: e },
    });
  }
  route(path) {
    const {
      history: { push },
    } = this.props;
    push(`${path}`);
  }
  onGridReady(params) {
    this.gridApi = params.api;
    this.columnApi = params.columnApi;
    this.gridApi.sizeColumnsToFit();
    window.onresize = () => {
      this.gridApi.sizeColumnsToFit();
    };
  }
  handleOpen(name) {
    this.props.show(name);
  }
  render() {
    const { classes } = this.props;
    const { rowData, columnDefs, frameworkComponents } = this.state;
    return (
      <>
        <PageTitle title={PAGE_TITLE.EMPLOYEE} />
        <Paper className={classes.paperStyle}>
          <Grid
            container
            direction="column"
            justifyContent="space-around"
            alignItems="flex-end"
            className={classes.gridBtn}
          >
            <Button
              color="secondary"
              variant="outlined"
              onClick={() => this.route(ROUTES.NEW_EMPLOYEE)}
            >
              {BUTTON.ADD_EMPLOYEE}
            </Button>
            {/* <AddNewCafeModal /> */}
          </Grid>
          <Grid
            container
            spacing={4}
            direction="column"
            justifyContent="center"
            alignItems="center"
          >
            <Grid item xs={12}>
              <div className={`${classes.ag_grid} ag-theme-alpine`}>
                <AgGridReact
                  rowData={rowData}
                  columnDefs={columnDefs}
                  frameworkComponents={frameworkComponents}
                  onGridReady={this.onGridReady.bind(this)}
                ></AgGridReact>
              </div>
            </Grid>
          </Grid>
        </Paper>
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ getEmployeeList, show }, dispatch);
};
const mapStateToProps = ({ employee }) => {
  return { employee };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles, { withTheme: true })(Employee));
