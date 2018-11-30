import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
// core components
import tableStyle from "../../../styles/components/tableStyle";
import Edit from "@material-ui/icons/Edit";
import View from "@material-ui/icons/Description";
import Delete from "@material-ui/icons/Delete";
import Button from '../FormControls/CustomButtons/Button';
import CustomInput from '../FormControls/CustomInput/CustomInput';
import { TableSortLabel } from '@material-ui/core';

export interface ICustomTable {
  classes: any,
  tableHead: any,
  tableData: any,
  tableHeaderColor: string, //"warning",
  // "primary",
  // "danger",
  // "success",
  // "info",
  // "rose",
  // "gray" 
  hover?: boolean,
  onEdit?: any,
  onView?: any,
  onDelete?: any,
  orderBy?: string,
  order?: any,
  onSort?: any,
  onFilter?: any,
}

class CustomTable extends React.Component<ICustomTable, {}>{

  public state = {
    date: undefined,
    filters: {},
    time: 0
  }

  private createSortHandler = (col: string) => {
    this.props.onSort(col);
  }

  private createEditHandler = (col: string) => {
    this.props.onEdit(col);
  }

  private createViewHandler = (col: string) => {
    this.props.onView(col);
  }

  private createDeleteHandler = (col: string) => {
    this.props.onDelete(col);
  }

  /**
   * @param evt: any
   * @event onFilter through props
   */
   private  createFilterHandle = (evt: any) => {
      const { onFilter } = this.props;
      if (typeof onFilter === "undefined") {
          return;
      }

      this.setState({
          filters: {
              ...this.state.filters,
              [evt.target.id]: evt.target.value ? evt.target.value : undefined
          }
      }, () => {
          return;
      });

      clearTimeout(this.state.time);
      const that = this;
      const timeout = setTimeout(() => {
          that.props.onFilter(that.state.filters);
      }, 800);
      this.setState({ time: timeout });
  }

  public render() {
    const { classes, onFilter, tableHead, tableData, tableHeaderColor, hover, onEdit, onView, onDelete, orderBy, order } = this.props;
    return (
      <div className={classes.tableResponsive}>
        <Table className={classes.table}>
          {tableHead !== undefined ? (
            <TableHead className={classes[tableHeaderColor + "TableHeader"] + " " + classes.headerRow}>
              <TableRow className={classes.header}>
                {tableHead.map((th: any, key: any) => {
                  return (
                    <TableCell
                      className={classes.headerCell + " " + classes.tableHeadCell + " "}
                      key={key}
                      numeric={th.numeric}
                      padding={th.disablePadding ? 'none' : 'default'}
                      sortDirection={orderBy === th.id ? order : false}
                    >
                      {this.props.onSort !== undefined ?
                        <TableSortLabel
                          active={orderBy === th.id}
                          direction={order}
                          onClick={this.createSortHandler.bind(this, th.id)}
                        >
                          {th.label}
                        </TableSortLabel> :
                        th.label}
                    </TableCell>
                  );
                })}
              </TableRow>
              {
                onFilter !== undefined ?
                  <TableRow className={classes.header}>
                    {tableHead.map((prop: any, key: any) => {
                      return (
                        <TableCell
                          className={classes.headerCell + " " + classes.tableHeadCell}
                          key={key}
                        >
                          {key !== tableHead.length - 1 && key !== 0 ?
                            <CustomInput
                              id={prop.id}
                              formControlProps={{
                                className: classes.header
                              }}
                              inputProps={{
                                placeholder: "Tìm kiếm",
                                className: classes.headerFilter,
                                inputProps: {
                                  "aria-label": "Search",
                                  onChange:this.createFilterHandle
                                }
                              }}
                            />
                            : ""}
                        </TableCell>
                      );
                    })}
                  </TableRow> : null
              }
            </TableHead>
          ) : null}
          <TableBody>
            {tableData.map((prop: any, key: any) => {

              return (
                <TableRow key={key} hover={hover}>
                  {prop.map((prop: any, key: any) => {
                    return (
                      <TableCell className={classes.tableCell} key={key}>
                        {key === tableHead.length - 1 ?
                          <>
                            {onEdit !== undefined ?
                              <Button
                                color={window.innerWidth > 959 ? "transparent" : "white"}
                                justIcon={window.innerWidth > 959}
                                simple={!(window.innerWidth > 959)}
                                aria-owns={open ? "menu-list-grow" : null}
                                aria-haspopup="true"
                                onClick={this.createEditHandler.bind(this, prop)}
                                className={classes.button}
                              >
                                <Edit />
                              </Button> : ""}
                            {onView !== undefined ?
                              <Button
                                color={window.innerWidth > 959 ? "transparent" : "white"}
                                justIcon={window.innerWidth > 959}
                                simple={!(window.innerWidth > 959)}
                                aria-owns={open ? "menu-list-grow" : null}
                                aria-haspopup="true"
                                onClick={this.createViewHandler.bind(this, prop)}
                                className={classes.button}
                              >
                                <View />
                              </Button> : ""}
                            {onDelete !== undefined ?
                              <Button
                                color={window.innerWidth > 959 ? "transparent" : "white"}
                                justIcon={window.innerWidth > 959}
                                simple={!(window.innerWidth > 959)}
                                aria-owns={open ? "menu-list-grow" : null}
                                aria-haspopup="true"
                                onClick={this.createDeleteHandler.bind(this, prop)}
                                className={classes.button}
                              >
                                <Delete />
                              </Button> : ""}
                          </>
                          : prop}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    );
  }

}

// CustomTable.defaultProps = {
//   tableHeaderColor: "gray"
// };

// CustomTable.propTypes = {
//   classes: PropTypes.object.isRequired,
//   onEdit: PropTypes.func,
//   onView: PropTypes.func,
//   onDelete: PropTypes.func,
//   hover: PropTypes.bool,
//   tableHeaderColor: PropTypes.oneOf([
//     "warning",
//     "primary",
//     "danger",
//     "success",
//     "info",
//     "rose",
//     "gray"
//   ]),
// tableHead: PropTypes.arrayOf(PropTypes.string),
//   tableData: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string))
// };

export default withStyles(tableStyle)(CustomTable);
