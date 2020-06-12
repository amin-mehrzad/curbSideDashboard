import React, { useState,useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { AppBar, Toolbar, Badge, Hidden, IconButton,Typography } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/NotificationsOutlined';
import InputIcon from '@material-ui/icons/Input';

import { logoutuser } from "../../../../actions/authActions";

import { connect } from "react-redux";

import socketIOClient from "socket.io-client";

const useStyles = makeStyles(theme => ({
  root: {
    boxShadow: 'none'
  },
  flexGrow: {
    flexGrow: 1
  },
  signOutButton: {
    marginLeft: theme.spacing(1)
  }
}));

const Topbar = props => {
  const { className, onSidebarOpen, ...rest } = props;

  const classes = useStyles();

  const [notifications] = useState([]);
  // const [newOrder, setNewOrder] = useState([]);


  // useEffect(() => {
  //   const socket = socketIOClient(process.env.REACT_APP_BACKEND_URL);
  //   socket.on("NewOrder", data => {
  //     var tempData=  newOrder
  //     tempData.unshift(data)
  //     // setNewOrder(prevData=>{
  //     //   console.log(prevData)

  //     //   return {...prevData, data };
  //     // });
  //     setNewOrder(tempData)
  //     // badgeContent={newOrder.length}
  //     console.log(newOrder.length)

  //   });
  // },[])


   const onSignOutClick = e => {

    e.preventDefault();
    console.log(props)
    props.logoutuser();
  };
  return (
    <AppBar
      {...rest}
      className={clsx(classes.root, className)}
    >
      <Toolbar>
        <RouterLink to="/">
          {/* <img
            alt="Logo"
            src="/images/logos/logo--white.svg"
          /> */}
          <Typography variant='h3' style={{color:'white'}}>
          CurbSide
          </Typography>
        </RouterLink>
        <div className={classes.flexGrow} />
        <Hidden mdDown>
          <IconButton color="inherit">
            <Badge
             // badgeContent={newOrder.length}
              badgeContent={notifications.length}
              color="primary"
              variant="dot"
            >
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <IconButton
            className={classes.signOutButton}
            color="inherit"
            onClick={onSignOutClick}
          >
            <InputIcon />
          </IconButton>
        </Hidden>
        <Hidden lgUp>
          <IconButton
            color="inherit"
            onClick={onSidebarOpen}
          >
            <MenuIcon />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};

Topbar.propTypes = {
  className: PropTypes.string,
  onSidebarOpen: PropTypes.func,
  logoutuser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps,{ logoutuser}) (Topbar);
