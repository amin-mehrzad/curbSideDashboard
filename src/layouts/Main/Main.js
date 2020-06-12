import React, { useState,useEffect} from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/styles';
import { useMediaQuery } from '@material-ui/core';

import { Sidebar, Topbar, Footer } from './components';

import { useSnackbar } from 'notistack';
import socketIOClient from "socket.io-client";


const useStyles = makeStyles(theme => ({
  root: {
    paddingTop: 56,
    height: '100%',
    [theme.breakpoints.up('sm')]: {
      paddingTop: 64
    }
  },
  shiftContent: {
    paddingLeft: 240
  },
  content: {
    height: '100%'
  }
}));

const Main = props => {
  const { children } = props;

  const classes = useStyles();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'), {
    defaultMatches: true
  });

  const { enqueueSnackbar,closeSnackbar  } = useSnackbar();

const [newOrder, setNewOrder] = useState([]);


useEffect(() => {
  const socket = socketIOClient(process.env.REACT_APP_BACKEND_URL);
  socket.on("NewOrder", newOrderData => {
    var tempData=  newOrder
    tempData.unshift(newOrderData)
    setNewOrder(tempData)
    console.log(newOrder)
    enqueueSnackbar(`New Order Recieved! OrderID: ${newOrder[0].orderID}`,{ 
      variant: 'info',
      autoHideDuration: 10000,

  });

  });
},[])

  const [openSidebar, setOpenSidebar] = useState(false);

  const handleSidebarOpen = () => {
    setOpenSidebar(true);
  };

  const handleSidebarClose = () => {
    setOpenSidebar(false);
  };

  const shouldOpenSidebar = isDesktop ? true : openSidebar;

  return (

    <div
      className={clsx({
        [classes.root]: true,
        [classes.shiftContent]: isDesktop
      })}
    >
      <Topbar onSidebarOpen={handleSidebarOpen} />
      <Sidebar
        onClose={handleSidebarClose}
        open={shouldOpenSidebar}
        variant={isDesktop ? 'persistent' : 'temporary'}
      />
      <main className={classes.content}>
        {children}
        <Footer />
      </main>
    </div>

  );
};

Main.propTypes = {
  children: PropTypes.node
};

export default Main;
