import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';

import { ProductsToolbar, OrdersTable } from './components';
import mockData from './data';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}));

const OrderList = () => {
  const classes = useStyles();

  //const [users] = useState(mockData);
  const [users] = []

  return (
    <div className={classes.root}>
      {/* <ProductsToolbar /> */}
      <div className={classes.content}>
        <OrdersTable users={users} />
      </div>
    </div>
  );
};

export default OrderList;
