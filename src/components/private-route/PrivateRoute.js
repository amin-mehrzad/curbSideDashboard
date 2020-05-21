import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

/*
import RouteWithLayout from "../RouteWithLayout/RouteWithLayout";
import SignInView from "../../views/SignIn/SignIn";
import MinimalLayout from "../../layouts/Minimal/Minimal"


const PrivateRoute = ({ component: Component, auth, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      auth.isAuthenticated === true ? (
        <RouteWithLayout {...props} />
      ) : (
          <Redirect to="/sign-in" />
          // <RouteWithLayout
          //   component={SignInView}
          //   exact
          //   layout={MinimalLayout}
          //   path="/sign-in"
          // />
          )
    }
  />
);
*/

const PrivateRoute = props => {
  const { layout: Layout, component: Component,auth, ...rest } = props;

  return (
    <Route
      {...rest}
      render={matchProps => 
        auth.isAuthenticated === true ? (
        <Layout>
          <Component {...matchProps} />
        </Layout>
      ):(<Redirect to="/sign-in" />)}
    />
  );
};

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired,

  component: PropTypes.any.isRequired,
  layout: PropTypes.any.isRequired,
  path: PropTypes.string
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(mapStateToProps)(PrivateRoute);