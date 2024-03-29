import React from 'react';
import { Switch, Redirect } from 'react-router-dom';

import { RouteWithLayout } from './components';
import { Main as MainLayout, Minimal as MinimalLayout } from './layouts';

import {
  Dashboard as DashboardView,
  UserList as UserListView,
  UserPermissionList as UserPermissionListView,
  CategoryList as CategoryListView,
  OrderList as OrderListView,
  ProductList as ProductListView,
  Typography as TypographyView,
  Icons as IconsView,
  Account as AccountView,
  Settings as SettingsView,
  SignUp as SignUpView,
  SignIn as SignInView,
  NotFound as NotFoundView
} from './views';

import PrivateRoute from '../src/components/private-route/PrivateRoute'




const Routes = () => {
  return (
    <Switch>
      <Redirect
        exact
        from="/"
        to="/sign-in"
      />
      <PrivateRoute
        component={DashboardView}
        exact
        layout={MainLayout}
        path="/dashboard"
      />
      <PrivateRoute
        component={UserListView}
        exact
        layout={MainLayout}
        path="/users"
      />
      <PrivateRoute
        component={UserPermissionListView}
        exact
        layout={MainLayout}
        path="/permissions"
      />
      <PrivateRoute
        component={ProductListView}
        exact
        layout={MainLayout}
        path="/products"
      />
      <PrivateRoute
        component={CategoryListView}
        exact
        layout={MainLayout}
        path="/categories"
      />
      <PrivateRoute
        component={OrderListView}
        exact
        layout={MainLayout}
        path="/orders"
      />
      <PrivateRoute
        component={TypographyView}
        exact
        layout={MainLayout}
        path="/typography"
      />
      <PrivateRoute
        component={IconsView}
        exact
        layout={MainLayout}
        path="/icons"
      />
      <PrivateRoute
        component={AccountView}
        exact
        layout={MainLayout}
        path="/account"
      />
      <PrivateRoute
        component={SettingsView}
        exact
        layout={MainLayout}
        path="/settings"
      />
      <RouteWithLayout
        component={SignUpView}
        exact
        layout={MinimalLayout}
        path="/sign-up"
      />
      <RouteWithLayout
        component={SignInView}
        exact
        layout={MinimalLayout}
        path="/sign-in"
      />
      <PrivateRoute
        component={NotFoundView}
        exact
        layout={MinimalLayout}
        path="/not-found"
      />
      <Redirect to="/not-found" />
    </Switch>
  );
};

export default Routes;
