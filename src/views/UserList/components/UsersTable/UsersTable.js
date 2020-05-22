import React, { forwardRef, useState, useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { makeStyles } from '@material-ui/styles';
// import {
//   Card,
//   CardActions,
//   CardContent,
//   Avatar,
//   Checkbox,
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableRow,
//   Typography,
//   TablePagination
// } from '@material-ui/core';
import { Input } from '@material-ui/core';

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


export default function MaterialTableDemo() {
  // const getdata=()=>{
  //   setAuthToken(`Bearer ${localStorage.jwtToken}`);
  //   return axios.get(`${process.env.REACT_APP_BACKEND_URL}/API/products`)
  //   .then(res => {
  //     console.log('rate numbers-->', res.data.data);
  //     console.log('data-->', res.data.data[0]);
  //     const data = res.data.data;
  //     //const total = res.data.data[0].metadata[0].total;
  //     console.log(data)
  //    // if(state.data)
  //   //  setState({...state,data: data});
  //   //  data;
  //   //  return data
  //   })
  //   .catch(err => console.log(err))
  // }

  const [state, setState] = React.useState({
    columns: [
      {
        field: 'url',
        title: 'Picture',
        render: rowData => <img src={rowData.imageUrl} style={{ width: 30, height: 30, borderRadius: '20%' }} />,
        editComponent: props => <input type="file" id="img" name="img" accept="image/*" />
      },
      { title: 'Name', field: 'name' },
      { title: 'Price', field: 'price', type: 'numeric' },
      { title: 'QTY', field: 'qty', type: 'numeric' },

      {
        title: 'Tax',
        field: 'tax',
        lookup: { 0: 'No', 1: 'Yes' },
      },
      { title: 'Barcode', field: 'barcode' },
      {
        title: 'Category', field: 'category', lookup: {
          0: 'Catogory 1',
          1: 'Category 2',
          2: 'Category 3'
        }
      },
      {
        title: 'Featured',
        field: 'featured',
        lookup: { 0: 'No', 1: 'Yes' },
      },
      {
        title: 'Active',
        field: 'active',
        lookup: { 0: 'No', 1: 'Yes' },
      },
    ],
    data: []
  })

  // });

  useEffect(async () => {
    setAuthToken(`Bearer ${localStorage.jwtToken}`);

    const data = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/API/products`)
    console.log(data.data.data)
    setState({ ...state, data: data.data.data });
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
      title="Products"
      columns={state.columns}
      data={state.data}
      icons={tableIcons}
      editable={{

        onRowAdd: (newData) =>

          new Promise((resolve) => {
            setTimeout(() => {
              resolve();
              setState((prevState) => {
                const data = [...prevState.data];
                axios.post(`${process.env.REACT_APP_BACKEND_URL}/API/products`, newData)

                data.push(newData);
                return { ...prevState, data };
              });
            }, 600);
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();
              if (oldData) {

                setState((prevState) => {
                  const data = [...prevState.data];

                  axios.put(`${process.env.REACT_APP_BACKEND_URL}/API/products/${oldData._id}`, newData)
                  data[data.indexOf(oldData)] = newData;
                  return { ...prevState, data };
                });
              }
            }, 600);
          }),
        onRowDelete: (oldData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();
              console.log(oldData)
              setState((prevState) => {
                const data = [...prevState.data];

                axios.delete(`${process.env.REACT_APP_BACKEND_URL}/API/products/${oldData._id}`)
                data.splice(data.indexOf(oldData), 1);
                return { ...prevState, data };
              });
            }, 600);
          }),
      }}
    />
  );
}