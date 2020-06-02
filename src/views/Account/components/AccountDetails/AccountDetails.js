import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Grid,
  Button,
  TextField
} from '@material-ui/core';

import statesData from './statesData'
import Axios from 'axios';
import setAuthToken from '../../../../utils/setAuthToken'

import AccountProfile from "../AccountProfile/AccountProfile";

import {Alert} from '@material-ui/lab';

const useStyles = makeStyles(() => ({
  root: {}
}));

const AccountDetails = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  const [values, setValues] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    state: '',
    country: '',
    businessAddress: '',
    businessEmail: '',
    businessName: '',
    businessPhone: '',
  });

  const [hasAlert, setHasAlert] = useState(false)

  useEffect(() => {
    async function getInfo() {
      setAuthToken(`Bearer ${localStorage.jwtToken}`);
      const userInfo = await Axios.get(`${process.env.REACT_APP_BACKEND_URL}/API/users`)
      const websiteInfo = await Axios.get(`${process.env.REACT_APP_BACKEND_URL}/API/websites`)
      setValues({
        ...values,
        firstName: userInfo.data.firstName,
        lastName: userInfo.data.lastName,
        email: userInfo.data.email,
        phone: websiteInfo.data.phone,
        state: websiteInfo.data.state,
        country: websiteInfo.data.country,
        businessAddress: websiteInfo.data.businessAddress,
        businessEmail: websiteInfo.data.businessEmail,
        businessName: websiteInfo.data.businessName,
        businessPhone: websiteInfo.data.businessPhone

      });
      console.log(userInfo.data)
    }
    getInfo();

  }, [])


  const handleChange = event => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };


  const handleSubmit = event => {
    event.preventDefault();

    var userPayload = {
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email
    }
    var websitePayload = {
      phone: values.phone,
      state: values.state,
      country: values.country,
      businessAddress: values.businessAddress,
      businessEmail: values.businessEmail,
      businessName: values.businessName,
      businessPhone: values.businessPhone
    }
    Axios.put(`${process.env.REACT_APP_BACKEND_URL}/API/websites`, websitePayload)
    Axios.put(`${process.env.REACT_APP_BACKEND_URL}/API/users`, userPayload)
    
    setHasAlert(true)


  };


  const states = statesData;

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <form
        autoComplete="off"
        noValidate
      >
        <CardHeader
          subheader="The information can be edited"
          title="Profile"
        />
        <Divider />
        <CardContent>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                helperText="Please specify the first name"
                label="First name"
                margin="dense"
                name="firstName"
                onChange={handleChange}
                required
                value={values.firstName}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Last name"
                margin="dense"
                name="lastName"
                onChange={handleChange}
                required
                value={values.lastName}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Email Address"
                margin="dense"
                name="email"
                onChange={handleChange}
                required
                value={values.email}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Phone Number"
                margin="dense"
                name="phone"
                onChange={handleChange}
                type="number"
                value={values.phone}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Select State"
                margin="dense"
                name="state"
                onChange={handleChange}
                required
                select
                // eslint-disable-next-line react/jsx-sort-props
                SelectProps={{ native: true }}
                value={values.state}
                variant="outlined"
              >
                {states.map(option => (
                  <option
                    key={option.value}
                    value={option.value}
                  >
                    {option.label}
                  </option>
                ))}
              </TextField>
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Country"
                margin="dense"
                name="country"
                onChange={handleChange}
                required
                value={values.country}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Business name"
                margin="dense"
                name="businessName"
                onChange={handleChange}
                required
                value={values.businessName}
                variant="outlined"
              />
            </Grid><Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Business Address"
                margin="dense"
                name="businessAddress"
                onChange={handleChange}
                required
                value={values.businessAddress}
                variant="outlined"
              />
            </Grid><Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Business Phone"
                margin="dense"
                name="businessPhone"
                onChange={handleChange}
                required
                value={values.businessPhone}
                variant="outlined"
              />
            </Grid><Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Business Email"
                margin="dense"
                name="businessEmail"
                onChange={handleChange}
                required
                value={values.businessEmail}
                variant="outlined"
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <CardActions>
          <Button
            color="primary"
            variant="contained"
            onClick={handleSubmit}

          >
            Save details
          </Button>

        </CardActions>
        {hasAlert?<Alert severity="success">Profile Detals Updated Successfully</Alert>:null}
      </form>
    </Card>
  );
};

AccountDetails.propTypes = {
  className: PropTypes.string
};

export default AccountDetails;
