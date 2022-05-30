import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Grid, Paper } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { bindActionCreators } from "redux";
import { show } from "redux-modal";
import { getCafeList } from "../../actions/cafe";
import styles from "./styles";
import PageTitle from "../../components/PageTitle/PageTitle";
import { AgGridReact } from "ag-grid-react";
import AddNewCafeModal from "./AddNewCafeModal";

import BtnCellRenderer from "./../../components/BtnCellRenderer";
import { BUTTON, MODAL, PAGE_TITLE, STRING } from "../../config";

class Cafe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columnDefs: [
        { headerName: "#", field: "id", width: 100 },
        {
          headerName: "Logo",
          field: "logo",
          width: 350,
          cellRenderer: this.celRenderFunc,
        },
        { headerName: "Name", field: "name", width: 200 },
        { headerName: "Employees", field: "employees" },
        { headerName: "Description", field: "description", width: 350 },
        { headerName: "Location", field: "location", width: 300 },
        { headerName: "Status", field: "status" },
        {
          headerName: "Activity",
          field: "activity",
          cellRenderer: "btnCellRenderer",
          cellRendererParams: {
            clicked: (field) => {
              console.log("Edit");
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

  celRenderFunc(params) {
    const { value } = params;
    return `<img style="height: 14px; width: 14px" src=${value} />`;
  }
  componentDidMount() {
    const { getCafeList } = this.props;
    getCafeList();
  }

  componentWillReceiveProps(nextProps) {
    var cafeObj = {};
    var cafeDataSet = [];
    if (this.props.cafe !== nextProps.cafe) {
      for (var i = 0; i < nextProps.cafe.length; i++) {
        var rowData = nextProps.cafe[i];
        cafeObj = Object.assign({}, {});
        cafeObj.id = rowData.id;
        cafeObj.name = rowData.name;
        cafeObj.employees = rowData.employeeCount;
        cafeObj.logo = rowData.logo;
        cafeObj.description = rowData.description;
        cafeObj.location = rowData.location;
        cafeObj.status = rowData.status === 0 ? STRING.DEACTIVE : STRING.ACTIVE;

        cafeDataSet.push(cafeObj);
      }
    }
    this.setState({ rowData: cafeDataSet });
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
    console.log("name-->", name);
    this.props.show(name);
  }
  render() {
    const { classes } = this.props;
    const { rowData, columnDefs, frameworkComponents } = this.state;
    return (
      <>
        <PageTitle title={PAGE_TITLE.CAFE} />
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
              onClick={() => this.handleOpen(MODAL.ADD_CAFE)}
            >
              {BUTTON.ADD_CAFE}
            </Button>
            <AddNewCafeModal />
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
  return bindActionCreators({ getCafeList, show }, dispatch);
};
const mapStateToProps = ({ cafe }) => {
  return { cafe };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles, { withTheme: true })(Cafe));
