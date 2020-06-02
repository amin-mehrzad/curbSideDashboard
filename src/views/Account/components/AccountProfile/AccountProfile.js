import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import moment from 'moment';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardActions,
  CardContent,
  Avatar,
  Typography,
  Divider,
  Button,
  LinearProgress
} from '@material-ui/core';
import Axios from 'axios'
import setAuthToken from '../../../../utils/setAuthToken'

const useStyles = makeStyles(theme => ({
  root: {},
  details: {
    display: 'flex'
  },
  avatar: {
    marginLeft: 'auto',
    height: 110,
    width: 100,
    flexShrink: 0,
    flexGrow: 0
  },
  progress: {
    marginTop: theme.spacing(2)
  },
  uploadButton: {
    marginRight: theme.spacing(2)
  }
}));

const AccountProfile = props => {
  const { className, ...rest } = props;


  const [profileProgress, setProfileProgress] = useState(100)

  const [businessLogo, setBusinessLogo] = useState("")
  const classes = useStyles();


  const changeProgress = (profileData)=>{
    var incompleteProps = 0
    for (var profileProp in profileData) {
      if (profileData[profileProp] === "" || profileData[profileProp] === null)
        incompleteProps += 10
      console.log(incompleteProps)
    }
    if (profileProgress != 100 - incompleteProps)
      setProfileProgress(100 - incompleteProps)
  }
  useEffect(() => {

    async function fetchProfileInfo() {

      setAuthToken(`Bearer ${localStorage.jwtToken}`);

      const websiteInfo = await Axios.get(`${process.env.REACT_APP_BACKEND_URL}/API/websites`)
      setBusinessLogo(websiteInfo.data)
      console.log(websiteInfo)
      var profileInformation = websiteInfo.data


      // var incompleteProps = 0
      // for (var profileProp in profileInformation) {
      //   if (profileInformation[profileProp] === "" || profileInformation[profileProp] === null)
      //     incompleteProps += 10
      //   console.log(incompleteProps)
      // }
      // if (profileProgress != 100 - incompleteProps)
      //   setProfileProgress(100 - incompleteProps)
      changeProgress(profileInformation)


    }
    fetchProfileInfo()

  }, [])

  const handleUpload = event => {
    event.preventDefault();
    var tempFormData = new FormData()
    console.log(event.target.files[0])

    tempFormData.set('businessLogoUrl', event.target.files[0])


    Axios.post(`${process.env.REACT_APP_BACKEND_URL}/API/websites`, tempFormData)
      .then((response) => {
        console.log(response)


        setBusinessLogo(response.data)
        changeProgress(response.data)

      })
  }

  const handleRemove = event => {
    event.preventDefault();
    var payload = businessLogo
    payload = { ...payload, businessLogoUrl: "" }

    console.log(payload)
    Axios.put(`${process.env.REACT_APP_BACKEND_URL}/API/websites`, payload)
      .then((response) => {
        console.log(response)
        setBusinessLogo(response.data)
        changeProgress(response.data)

      })

  }

  console.log(businessLogo)

  const user = {
    name: `${businessLogo.businessName}`,
    city: 'Los Angeles',
    country: 'USA',
    timezone: 'GTM-7',
    avatar: `${process.env.REACT_APP_BACKEND_URL}/uploads/businessLogos/${businessLogo.businessLogoUrl}`
  };

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardContent>
        <div className={classes.details}>
          <div>
            <Typography
              gutterBottom
              variant="h2"
            >
              {user.name}
            </Typography>
            <Typography
              className={classes.locationText}
              color="textSecondary"
              variant="body1"
            >
              {user.city}, {user.country}
            </Typography>
            <Typography
              className={classes.dateText}
              color="textSecondary"
              variant="body1"
            >
              {moment().format('hh:mm A')} ({user.timezone})
            </Typography>
          </div>
          <Avatar
            className={classes.avatar}
            src={user.avatar}
          />
        </div>
        <div className={classes.progress}>
          <Typography variant="body1">Profile Completeness: {profileProgress}%</Typography>
          <LinearProgress
            value={profileProgress}
            variant="determinate"
          />
        </div>
      </CardContent>
      <Divider />
      <CardActions>
        <input type="file" id="file" style={{ display: 'none' }} onChange={handleUpload} />

        <Button
          className={classes.uploadButton}
          color="primary"
          variant="text"
          onClick={() => { document.getElementById("file").click() }}
        >
          Upload picture
        </Button>
        <Button variant="text"
          onClick={handleRemove}>Remove picture</Button>
      </CardActions>
    </Card>
  );
};

AccountProfile.propTypes = {
  className: PropTypes.string
};

export default AccountProfile;
