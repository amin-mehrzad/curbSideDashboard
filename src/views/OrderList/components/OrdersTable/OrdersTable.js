import React, { forwardRef, useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { makeStyles } from '@material-ui/styles';

import { Input, Table, TableBody, TableRow, TableCell, TableHead, Paper, Grid } from '@material-ui/core';

import { getInitials } from 'helpers';

import MaterialTable from 'material-table';
import {
  AddBox,
  ArrowDownward,
  Check,
  ChevronLeft,
  ChevronRight,
  Clear,
  DeleteOutline,
  Edit,
  FilterList,
  FirstPage,
  LastPage,
  Remove,
  SaveAlt,
  Search,
  ViewColumn
} from "@material-ui/icons";

import axios from 'axios';
import setAuthToken from '../../../../utils/setAuthToken';

import socketIOClient from "socket.io-client";

const useStyles = makeStyles(theme => ({
  headCell: {
    backgroundColor: '#546E7A',
    color: '#FFFFFF'
  },
  bodyCell: {
    backgroundColor: '#FFFFFF',
  },
  itemsTable: {
    border: 'solid 2px #546E7A',
  }
}))

export default function MaterialTableDemo() {

  const classes = useStyles();

  const [response, setResponse] = React.useState("");
  const [state, setState] = React.useState({
    columns: [
      { title: 'Order ID', field: 'orderID' },
      { title: 'Order Number', field: 'orderNumber' },
      { title: 'Order Created Time', field: 'orderCreatedTime' },
      { title: 'Order SubTotal', field: 'orderSubTotal', type: 'numeric' },
      { title: 'Order State', field: 'orderState', },
    ],
    data: []
  })

  useEffect(() => {
    const socket = socketIOClient(process.env.REACT_APP_BACKEND_URL);
    socket.on("NewOrder", data => {
      setResponse(data);
      fetchData()
    });

    async function fetchData() {
      setAuthToken(`Bearer ${localStorage.jwtToken}`);
      const data = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/API/orders`)
      console.log(data.data.data)
      setState({ ...state, data: data.data.data });
    }
    fetchData()
  }, []);
  const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
  };
  return (
    <MaterialTable
      title= {"Orders"}
      // title= {response.orderNumber} /////////////////////////////////////////////////////////////////// TODO use this method
      columns={state.columns}
      data={state.data}
      icons={tableIcons}
      detailPanel={rowData => {
        return (
          // <div
          //   // style={{
          //   //   fontSize: 14,
          //   //   textAlign: 'center',
          //   //   color: 'black',
          //   //   backgroundColor: 'white',
          //   // }}
          // >
          //  {/* <div>{rowData.orderID} </div><br/> */}
          // <Grid container spacing={2} >
          // <Grid item >
          <Grid  >

            <Paper style={{
              padding: 20,
              display: 'flex',
              overflow: 'auto',
              flexDirection: 'column',
              backgroundColor: '#F5F5F5'
            }}>
              <Table size="small" className={classes.itemsTable} >
                <TableHead >
                  <TableRow >
                    <TableCell className={classes.headCell} align="left" style={{ minWidth: '135px' }} >Product ID</TableCell>
                    <TableCell align="left" className={classes.headCell} >Qty Ordered</TableCell>
                    <TableCell align="left" className={classes.headCell} >Qty Shipped</TableCell>
                    <TableCell align="left" className={classes.headCell} >Qty Cancelled</TableCell>
                    <TableCell align="left" className={classes.headCell} style={{ minWidth: '215px' }}>Sold Price</TableCell>
                    <TableCell align="left" className={classes.headCell} >Price</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>

                  {rowData.orderItems.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell align="left" className={classes.bodyCell} style={{ minWidth: '135px' }} >{row.productId}</TableCell>
                      <TableCell align="left" className={classes.bodyCell} >{row.qty.ordered}</TableCell>
                      <TableCell align="left" className={classes.bodyCell} >{row.qty.shipped}</TableCell>
                      <TableCell align="left" className={classes.bodyCell} >{row.qty.cancelled}</TableCell>
                      {/* <TableCell align="left" style={{ minWidth: '215px' }}>{moment(rowData.orderStatusHistory[rowData.orderStatusHistory.length -1 ]).tz('America/Los_Angeles').format('MMMM DD, YYYY - HH:mm:ss')}</TableCell> */}
                      <TableCell align="left" className={classes.bodyCell}>{row.soldPrice}</TableCell>
                      <TableCell align="left" className={classes.bodyCell} >{row.price}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Paper>
          </Grid >

          //  </Grid>
          // </div>
        )
      }}
      onRowClick={(event, rowData, togglePanel) => togglePanel()}
      editable={{
        onRowAdd: (newData) =>
          new Promise((resolve) => {
            axios.post(`${process.env.REACT_APP_BACKEND_URL}/API/orders`, newData)
              .then(function (resp) {
                // handle success
                console.log(resp);
                setTimeout(() => {
                  resolve();
                  setState((prevState) => {
                    const data = [...prevState.data];
                    console.log(newData)
                    data.unshift(resp.data.result);
                    return { ...prevState, data };
                  });
                }, 1600);
              })
              .catch(function (error) {
                // handle error
                console.log(error);
              })
              .then(function () {
                // always executed
              });
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise((resolve) => {

            if (oldData) {

              axios.put(`${process.env.REACT_APP_BACKEND_URL}/API/orders/${oldData._id}`, newData)
                .then(function (resp) {
                  console.log(resp.data.result)
                  setTimeout(() => {

                    resolve();
                    setState((prevState) => {
                      const data = [...prevState.data];
                      data[data.indexOf(oldData)] = resp.data.result;
                      return { ...prevState, data };
                    });


                  }, 600);
                })
                .catch(function (error) {
                  // handle error
                  console.log(error);
                })
            }
          }),
        onRowDelete: (oldData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();
              console.log(oldData)
              setState((prevState) => {
                const data = [...prevState.data];
                axios.delete(`${process.env.REACT_APP_BACKEND_URL}/API/orders/${oldData._id}`)
                data.splice(data.indexOf(oldData), 1);
                return { ...prevState, data };
              });
            }, 600);
          }),
      }}
    />
  );
}