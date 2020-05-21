import React, { useState, useEffect, Component } from 'react';
import { Link as RouterLink, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import validate from 'validate.js';
import { withStyles, makeStyles } from '@material-ui/styles';
import {
  Grid,
  Button,
  IconButton,
  TextField,
  Link,
  Typography
} from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import { Facebook as FacebookIcon, Google as GoogleIcon } from 'icons';

import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import classnames from "classnames";
import compose from 'recompose/compose'


const schema = {
  email: {
    presence: { allowEmpty: false, message: 'is required' },
    email: true,
    length: {
      maximum: 64
    }
  },
  password: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 128
    }
  }
};

const useStyles = theme => ({
  root: {
    backgroundColor: theme.palette.background.default,
    height: '100%'
  },
  grid: {
    height: '100%'
  },
  quoteContainer: {
    [theme.breakpoints.down('md')]: {
      display: 'none'
    }
  },
  quote: {
    backgroundColor: theme.palette.neutral,
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundImage: 'url(/images/auth.jpg)',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center'
  },
  quoteInner: {
    textAlign: 'center',
    flexBasis: '600px'
  },
  quoteText: {
    color: theme.palette.white,
    fontWeight: 300
  },
  name: {
    marginTop: theme.spacing(3),
    color: theme.palette.white
  },
  bio: {
    color: theme.palette.white
  },
  contentContainer: {},
  content: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  contentHeader: {
    display: 'flex',
    alignItems: 'center',
    paddingTop: theme.spacing(5),
    paddingBototm: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2)
  },
  logoImage: {
    marginLeft: theme.spacing(4)
  },
  contentBody: {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('md')]: {
      justifyContent: 'center'
    }
  },
  form: {
    paddingLeft: 100,
    paddingRight: 100,
    paddingBottom: 125,
    flexBasis: 700,
    [theme.breakpoints.down('sm')]: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2)
    }
  },
  title: {
    marginTop: theme.spacing(3)
  },
  socialButtons: {
    marginTop: theme.spacing(3)
  },
  socialIcon: {
    marginRight: theme.spacing(1)
  },
  sugestion: {
    marginTop: theme.spacing(2)
  },
  textField: {
    marginTop: theme.spacing(2)
  },
  signInButton: {
    margin: theme.spacing(2, 0)
  }
});


//const SignIn = props => {

class SignIn extends Component {
  constructor() {
    super();
    this.state = {
      form: {
        isValid: false,
        values: {},
        touched: {},
        errors: {}
      },
      // email: "",
      //  password: "",
     // errors: {}
    }
    this.classes = useStyles;
    // this.handleChange = this.handleChange.bind(this);
    // this.handleSignIn = this.handleSignIn.bind(this);
  }
  componentDidMount() {
    // If logged in and user navigates to Login page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  // componentWillReceiveProps(nextProps) {
  //   console.log(nextProps)
  //   if (nextProps.auth.isAuthenticated) {
  //     this.props.history.push("/"); // push user to dashboard when they login
  //   }


  //   if (nextProps.errors.email) {
  //     this.setState({
  //       form: {
  //         ...this.state.form,
  //         errors: nextProps.errors
  //       }
  //     });
  //   }
  // }
  // const { history } = props;

  // const classes = useStyles();

  // const [formState, setFormState] = useState({
  //   isValid: false,
  //   // isAuthenticated: false,
  //   values: {},
  //   touched: {},
  //   errors: {}
  // });
  // const [authState, setAuthState] = useState(false);

  // useEffect(() => {
  //   const errors = validate(formState.values, schema);

  //   setFormState(formState => ({
  //     ...formState,
  //     isValid: errors ? false : true,
  //     errors: errors || {}
  //   }));


  // }, [formState.values]);


  // useEffect(() => {

  //   //  const errors = validate(formState.values, schema);
  //   if (props.isAuthenticated) {
  //     history.push('/')

  //   }

  // }, [props.isAuthenticated]);

  handleBack = () => {
    this.history.goBack();
  };

  handleChange = (event) => {
   // var that=this

   // event.persist();
    console.log(this.state)
    
    const formErrors = validate({...this.state.form.values,
      [event.target.name]:event.target.value}, schema);
   // console.log(formErrors)
    this.setState({
      //...this.state.form,
      form:{
      values: {
       ...this.state.form.values,
        [event.target.name]:
          event.target.type === 'checkbox'
            ? event.target.checked
            : event.target.value
      },
      touched: {
        ...this.state.form.touched,
        [event.target.name]: true
      },
      isValid: formErrors ? false : true,
      errors: formErrors || {}
    }},()=>{
      console.log(this.state)
    });
    
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/dashboard"); // push user to dashboard when they login
    }
    if (nextProps.errors) {
      console.log('error',nextProps.errors)
      this.setState({
        form:{...this.state.form,
          errors: nextProps.errors}
      });
    }
  }
  handleSignIn = (event) => {
    event.preventDefault();
    console.log(process.env.REACT_APP_BACKEND_URL)
    // console.log(formState.values.email)
    // console.log(formState.values.password)
   var userData = {
      email: this.state.form.values.email,
      password: this.state.form.values.password
    };
    console.log('<><><><>',this.state.form.values);

    this.props.loginUser(userData);
    //history.push('/');
    //  loginUser.
  };

  hasError = field =>
    this.state.form.touched[field] && this.state.form.errors[field] ? true : false;
  render() {

    const { classes ,history  } = this.props;
    return (
      <div className={classes.root}>
        <Grid
          className={classes.grid}
          container
        >
          <Grid
            className={classes.quoteContainer}
            item
            lg={5}
          >
            <div className={classes.quote}>
              <div className={classes.quoteInner}>
                <Typography
                  className={classes.quoteText}
                  variant="h1"
                >
                  Hella narwhal Cosby sweater McSweeney's, salvia kitsch before
                  they sold out High Life.
              </Typography>
                <div className={classes.person}>
                  <Typography
                    className={classes.name}
                    variant="body1"
                  >
                    Takamaru Ayako
                </Typography>
                  <Typography
                    className={classes.bio}
                    variant="body2"
                  >
                    Manager at inVision
                </Typography>
                </div>
              </div>
            </div>
          </Grid>
          <Grid
            className={classes.content}
            item
            lg={7}
            xs={12}
          >
            <div className={classes.content}>
              <div className={classes.contentHeader}>
                {/* <IconButton onClick={this.handleBack}>
                  <ArrowBackIcon />
                </IconButton> */}
              </div>
              <div className={classes.contentBody}>
                <form
                  className={classes.form}
                  onSubmit={this.handleSignIn}
                >
                  <Typography
                    className={classes.title}
                    variant="h2"
                  >
                    Sign in
                </Typography>
                  <Typography
                    color="textSecondary"
                    gutterBottom
                  >
                    Sign in with social media
                </Typography>
                  <Grid
                    className={classes.socialButtons}
                    container
                    spacing={2}
                  >
                    <Grid item>
                      <Button
                        color="primary"
                        onClick={this.handleSignIn}
                        size="large"
                        variant="contained"
                      >
                        <FacebookIcon className={classes.socialIcon} />
                      Login with Facebook
                    </Button>
                    </Grid>
                    <Grid item>
                      <Button
                        onClick={this.handleSignIn}
                        size="large"
                        variant="contained"
                      >
                        <GoogleIcon className={classes.socialIcon} />
                      Login with Google
                    </Button>
                    </Grid>
                  </Grid>
                  <Typography
                    align="center"
                    className={classes.sugestion}
                    color="textSecondary"
                    variant="body1"
                  >
                    or login with email address
                </Typography>
                  <TextField
                    className={classes.textField}
                    error={this.hasError('email')}
                    fullWidth
                    helperText={
                      this.hasError('email') ? this.state.form.errors.email[0] : null
                    }
                    label="Email address"
                    name="email"
                    onChange={this.handleChange}
                    type="text"
                    value={this.state.form.values.email || ''}
                    variant="outlined"
                  />
                  <TextField
                    className={classes.textField}
                    error={this.hasError('password')}
                    fullWidth
                    helperText={
                      this.hasError('password') ? this.state.form.errors.password[0] : null
                    }
                    label="Password"
                    name="password"
                    onChange={this.handleChange}
                    type="password"
                    value={this.state.form.values.password || ''}
                    variant="outlined"
                  />
                  <Button
                    className={classes.signInButton}
                    color="primary"
                    disabled={!this.state.form.isValid}
                   // disabled={false}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    Sign in now
                </Button>
                  <Typography
                    color="textSecondary"
                    variant="body1"
                  >
                    Don't have an account?{' '}
                    <Link
                      component={RouterLink}
                      to="/sign-up"
                      variant="h6"
                    >
                      Sign up
                  </Link>
                  </Typography>
                </form>
              </div>
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }
};

SignIn.propTypes = {
  loginUser: PropTypes.func.isRequired,
  history: PropTypes.object,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

//export default withRouter(SignIn);
export default compose(
  withStyles(useStyles),
  connect(mapStateToProps,{ loginUser })
)(withRouter(SignIn));
