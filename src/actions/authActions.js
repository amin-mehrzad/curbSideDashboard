import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import {
    GET_ERRORS,
    SET_CURRENT_USER,
    USER_LOADING
} from "./types";

import formurlencoded from 'form-urlencoded';


// Register User
export const registerUser = (userData, history) => dispatch => {
    axios
        .post(`${process.env.REACT_APP_BACKEND_URL}/users/register`, formurlencoded(userData), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            }
        })
        .then(res => history.push("/sign-in")) // re-direct to login on successful register
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};


// Login - get user token
export const loginUser = userData => dispatch => {
    console.log(userData);
    console.log("userData");
    axios
        .post(`${process.env.REACT_APP_BACKEND_URL}/users/authenticate`, formurlencoded(userData), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            }
        })
        .then(response => {
            // Save to localStorage
            // Set token to localStorage
            console.log(response)
            const { token, firstName, lastName } = response.data.data;
            localStorage.setItem("jwtToken", token);
            localStorage.setItem("profileName", firstName);
            localStorage.setItem("profileLastName", lastName);
            // Set token to Auth header
            setAuthToken(token);

            axios.get(`${process.env.REACT_APP_BACKEND_URL}/API/websites`,{
                headers: {
                    'Authorization': `Bearer ${localStorage.jwtToken}`,
                }
            })
             .then(res=>{
                 localStorage.setItem("profileImage", res.data.businessLogoUrl)
                })
            // .then(res=>console.log("BusinessData", res))

            // Decode token to get user data
            const decoded = jwt_decode(token);
            // Set current user
            dispatch(setCurrentUser(decoded));
        })
        .catch(err =>{
            console.log( '---' ,err.response.data);
           //  err.response={email:'Email is not valid !'};
           //  err.emailnotfound='Email/Password not found !';
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        }
        );
};

// Set logged in user
export const setCurrentUser = decoded => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    };
};

// User loading
export const setUserLoading = () => {
    return {
        type: USER_LOADING
    };
};


// Log user out
export const logoutuser = () => dispatch => {
    // Remove token from local storage

    //console.log('here');
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("profileName");
    localStorage.removeItem("profileLastName");
    localStorage.removeItem("profileImage");
    // Remove auth header for future requests
    setAuthToken(false);
    // Set current user to empty object {} which will set isAuthenticated to false
    dispatch(setCurrentUser({}));
};