import React, { forwardRef, useState, useEffect } from 'react';
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

  var tempFormData = new FormData()
  const [formData, setFormData] = React.useState(tempFormData)

  const [state, setState] = React.useState({
    columns: [
      {
        field: 'imageUrl',
        title: 'Picture',
        render: rowData => <img src={`${process.env.REACT_APP_BACKEND_URL}/uploads/${rowData.imageUrl}`} style={{ width: 30, height: 30, borderRadius: '20%' }} />,
        editComponent: props => <input type="file" id="imageUrl" name="imageUrl" accept="image/*" onChange={handleInputChange} />
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



  useEffect(async () => {
    setAuthToken(`Bearer ${localStorage.jwtToken}`);

    const data = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/API/products`)
    console.log(data.data.data)
    setState({ ...state, data: data.data.data });
  }, []);


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
      title="Products"
      columns={state.columns}
      data={state.data}
      icons={tableIcons}
      editable={{

        onRowAdd: (newData) =>

          new Promise((resolve) => {
            tempFormData = formData
            tempFormData.set('name', newData.name)
            tempFormData.set('price', newData.price)
            tempFormData.set('qty', newData.qty)
            tempFormData.set('tax', newData.tax)
            tempFormData.set('featured', newData.featured)
            tempFormData.set('barcode', newData.barcode)
            tempFormData.set('category', newData.category)
            tempFormData.set('active', newData.active)

            console.log(tempFormData)

            axios.post(`${process.env.REACT_APP_BACKEND_URL}/API/products`, tempFormData)
              .then(function (response) {
                // handle success
                console.log(response);

                for (let pair of tempFormData.entries()) {
                  console.log(pair[0] + ': ' + pair[1]);
                }
                setTimeout(() => {
                  resolve();

                  setState((prevState) => {
                    const data = [...prevState.data];
                    console.log(newData)
                    data.push({ ...response.data.result, imageUrl: response.data.result.imageUrl });
                    console.log(formData)

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
            console.log(newData)
            console.log(oldData)
            console.log(formData.get('imageUrl'))

            if (oldData) {
              if (formData.get('imageUrl') != null) {
                var tempData = formData
                tempData.set('name', newData.name)
                tempData.set('price', newData.price)
                tempData.set('qty', newData.qty)
                tempData.set('tax', newData.tax)
                tempData.set('featured', newData.featured)
                tempData.set('barcode', newData.barcode)
                tempData.set('category', newData.category)
                tempData.set('active', newData.active)

                for (let pair of tempData.entries()) {
                  console.log(pair[0] + ': ' + pair[1]);
                }
              } else {
                var tempData = newData
              }
              console.log(tempData)

              axios.put(`${process.env.REACT_APP_BACKEND_URL}/API/products/${oldData._id}`, tempData)
                .then(function (response) {
                  console.log(response.data.result)


                  setTimeout(() => {

                    var tempFormData = new FormData()
                    setFormData(tempFormData);

                    resolve();
                    setState((prevState) => {
                      const data = [...prevState.data];
                      data[data.indexOf(oldData)] = response.data.result;
                      return { ...prevState, data };
                    });


                  }, 600);
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