import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Divider, Drawer } from '@material-ui/core';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ViewList from '@material-ui/icons/ViewList';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import TextFieldsIcon from '@material-ui/icons/TextFields';
import ImageIcon from '@material-ui/icons/Image';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import SettingsIcon from '@material-ui/icons/Settings';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import ListAltIcon from '@material-ui/icons/ListAlt';
//import LockOpenIcon from '@material-ui/icons/LockOpen';

import { Profile, SidebarNav, UpgradePlan } from './components';

import jwtDecode from 'jwt-decode'

// const role =(typeof localStorage.jwtToken != "undefined")? jwtDecode(localStorage.jwtToken).permissions : false


// console.log(typeof localStorage.jwtToken != "undefined")
// console.log(role)
//console.log(jwtDecode(localStorage.jwtToken))

const useStyles = makeStyles(theme => ({
  drawer: {
    width: 240,
    [theme.breakpoints.up('lg')]: {
      marginTop: 64,
      height: 'calc(100% - 64px)'
    }
  },
  root: {
    backgroundColor: theme.palette.white,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    padding: theme.spacing(2)
  },
  divider: {
    margin: theme.spacing(2, 0)
  },
  nav: {
    marginBottom: theme.spacing(2)
  }
}));

const Sidebar = props => {
  const { open, variant, onClose, className, ...rest } = props;

  const classes = useStyles();

  const role =(typeof localStorage.jwtToken != "undefined")? jwtDecode(localStorage.jwtToken).permissions : false


console.log(typeof localStorage.jwtToken != "undefined")
console.log(role)

  const pages = (role[0] === "admin" ) ? [
  //  const pages = ( true) ? [
    {
      title: 'Dashboard',
      href: '/dashboard',
      icon: <DashboardIcon />
    },

    {
      title: 'Orders',
      href: '/orders',
      icon: <ListAltIcon />
    },
    {
      title: 'Products',
      href: '/products',
      icon: <ShoppingBasketIcon />
    },
    {
      title: 'Categories',
      href: '/Categories',
      icon: <ViewList />
    },


    // {
    //   title: 'Authentication',
    //   href: '/sign-in',
    //   icon: <LockOpenIcon />
    // },
    // {
    //   title: 'Typography',
    //   href: '/typography',
    //   icon: <TextFieldsIcon />
    // },
    // {
    //   title: 'Icons',
    //   href: '/icons',
    //   icon: <ImageIcon />
    // },
    {
      title: 'Account',
      href: '/account',
      icon: <AccountBoxIcon />
    },
    {
      title: 'Users',
      href: '/users',
      icon: <GroupAddIcon />
    },
    // {
    //   title: 'User Permissions',
    //   href: '/permissions',
    //   icon: <LockOpenIcon />
    // },
    {
      title: 'Settings',
      href: '/settings',
      icon: <SettingsIcon />
    }
  ] : [

      {
        title: 'Orders',
        href: '/orders',
        icon: <ListAltIcon />
      }


    ];

  return (
    <Drawer
      anchor="left"
      classes={{ paper: classes.drawer }}
      onClose={onClose}
      open={open}
      variant={variant}
    >
      <div
        {...rest}
        className={clsx(classes.root, className)}
      >
        <Profile />
        <Divider className={classes.divider} />
        <SidebarNav
          className={classes.nav}
          pages={pages}
        />
        {/* <UpgradePlan /> */}
      </div>
    </Drawer>
  );
};

Sidebar.propTypes = {
  className: PropTypes.string,
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired,
  variant: PropTypes.string.isRequired
};

export default Sidebar;
