import React, { forwardRef, useState, useEffect } from 'react';
// import clsx from 'clsx';
// import PropTypes from 'prop-types';
// import moment from 'moment';
// import PerfectScrollbar from 'react-perfect-scrollbar';
// import { makeStyles } from '@material-ui/styles';

 import { Input } from '@material-ui/core';

// import { getInitials } from 'helpers';

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

  var tempFormData = new FormData()
  const [formData, setFormData] = React.useState(tempFormData)


  setAuthToken(`Bearer ${localStorage.jwtToken}`);

  // var categoryList = {}
  // const categories = axios.get(`${process.env.REACT_APP_BACKEND_URL}/API/scopes`)
  //   .then((response) => {
  //     response.data.data.forEach((element, index) => {
  //       categoryList[index] = element.categoryName
  //     })
  //   })
  // var columnsData = state.columns
  // columnsData[6] = { title: 'Category', field: 'category', lookup: categoryList }
  // console.log(columnsData)
  const [state, setState] = React.useState({
    columns: [
      // {
      //   field: 'imageUrl',
      //   title: 'Picture',
      //   render: rowData => <img src={`${process.env.REACT_APP_BACKEND_URL}/uploads/${rowData.imageUrl}`} style={{ width: 30, height: 30, borderRadius: '20%' }} />,
      //   editComponent: props => <input type="file" id="imageUrl" name="imageUrl" accept="image/*" onChange={handleInputChange} />
      // },
      { title: 'First Name', field: 'firstName' },
      { title: 'Last Name', field: 'lastName' },
      { title: 'Email', field: 'email' },
      {
        title: 'Password',
        field: 'password',
        render: rowData => <div><span>*********</span></div>,
        //editComponent: props => <Input type="password"  readonly/>

      },

      // {
      //   title: 'Tax',
      //   field: 'tax',
      //   lookup: { 0: 'No', 1: 'Yes' },
      // },
      // { title: 'Barcode', field: 'barcode' },

      {
        title: 'Permissions', field: 'permissions',    lookup: { admin: 'Admin', user: 'User' }
      },
      // {
      //   title: 'Featured',
      //   field: 'featured',
      //   lookup: { 0: 'No', 1: 'Yes' },
      // },
      // {
      //   title: 'Active',
      //   field: 'active',
      //   lookup: { 0: 'No', 1: 'Yes' },
      // },
    ],
    data: []
  })



  useEffect(() => {
    async function fetchCategory() {
      setAuthToken(`Bearer ${localStorage.jwtToken}`);

      const data = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/API/adminUsers`)
      console.log(data.data.data)
      setState({ ...state, data: data.data.data })

    }
    fetchCategory()
  }, []);

  console.log(state)
  const handleInputChange = (event) => {

    console.log(event.target.files[0])


    console.log(formData)

    tempFormData = formData
    tempFormData.set('imageUrl', event.target.files[0])
    setFormData(tempFormData)
  }


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
      title="Users"
      columns={state.columns}
      data={state.data}
      icons={tableIcons}
      options={{
        pageSize: 10,
        pageSizeOptions: [5, 10, 20, 30, 50, 75, 100],
        toolbar: true,
        paging: true
      }}
      editable={{
        onRowAdd: (newData) =>
          new Promise((resolve) => {
         //   newData={...newData, permissions: newData.permissions}
            axios.post(`${process.env.REACT_APP_BACKEND_URL}/API/adminUsers`, newData)
              .then(function (response) {
                // handle success
                console.log(response);
                setTimeout(() => {
                  resolve();
                  setState((prevState) => {
                    const data = [...prevState.data];
                    console.log(newData)
                    data.push(response.data.data);
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

              console.log(newData)
              console.log(oldData)

              axios.put(`${process.env.REACT_APP_BACKEND_URL}/API/adminUsers/${oldData._id}`, newData)
                .then(function (response) {
                  console.log(response.data)
                  setTimeout(() => {

                    resolve();
                    setState((prevState) => {
                      const data = [...prevState.data];
                      data[data.indexOf(oldData)] = response.data;
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
                axios.delete(`${process.env.REACT_APP_BACKEND_URL}/API/adminUsers/${oldData._id}`)
                data.splice(data.indexOf(oldData), 1);
                return { ...prevState, data };
              });
            }, 600);
          }),
      }}
    />
  );
}