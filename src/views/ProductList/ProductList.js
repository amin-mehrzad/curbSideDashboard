import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';

import { ProductsToolbar, ProductsTable } from './components';
import mockData from './data';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}));

const ProductList = () => {
  const classes = useStyles();

  //const [users] = useState(mockData);
  const [users] =[];

  return (
    <div className={classes.root}>
      {/* <ProductsToolbar /> */}
      <div className={classes.content}>
        <ProductsTable users={users} />
      </div>
    </div>
  );
};

export default ProductList;
