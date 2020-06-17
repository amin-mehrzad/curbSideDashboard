import React, { forwardRef, useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { makeStyles } from '@material-ui/styles';

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

  const [state, setState] = React.useState({
    columns: [
      { title: 'Category Name', field: 'categoryName' },
      { title: 'Category Description', field: 'categoryDescription' },
      { title: 'Sort Order', field: 'sortOrder', type: 'numeric' },
    ],
    data: []
  })

  useEffect(() => {
    async function fetchData() {
      setAuthToken(`Bearer ${localStorage.jwtToken}`);
      const data = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/API/categories`)
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
      title="Categories"
      columns={state.columns}
      data={state.data}
      icons={tableIcons}
      editable={{
        onRowAdd: (newData) =>
          new Promise((resolve) => {
            axios.post(`${process.env.REACT_APP_BACKEND_URL}/API/categories`, newData)
              .then(function (response) {
                // handle success
                console.log(response);
                setTimeout(() => {
                  resolve();
                  setState((prevState) => {
                    const data = [...prevState.data];
                    console.log(newData)
                    data.push(response.data.result);
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

              axios.put(`${process.env.REACT_APP_BACKEND_URL}/API/categories/${oldData._id}`, newData)
                .then(function (response) {
                  console.log(response.data.result)
                  setTimeout(() => {

                    resolve();
                    setState((prevState) => {
                      const data = [...prevState.data];
                      data[data.indexOf(oldData)] = response.data.result;
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
                axios.delete(`${process.env.REACT_APP_BACKEND_URL}/API/categories/${oldData._id}`)
                data.splice(data.indexOf(oldData), 1);
                return { ...prevState, data };
              });
            }, 600);
          }),
      }}
    />
  );
}