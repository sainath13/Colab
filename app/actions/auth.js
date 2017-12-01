import * as types from './types'
const GLOBAL = require('./Globals');
const AUTH_INFLU = 'https://'+GLOBAL.BASE_URL+'/facebook_login/omniauth_success?';
//var React = require('react-native');

// var {
  // AsyncStorage
// } = React;

import {
  AsyncStorage,
} from 'react-native';
export function setSignedInUser({userData}){
  return {
    type : types.SET_SIGNED_IN_USER,
    userData,
  }
}

export function setLoginInfo({loginInfo}){
  return {
    type : types.SET_LOGIN_INFO,
    loginInfo,
  }
}//tried but couldn't avoid code duplication

/* The following function does api call and sign in part.
   TODO: handle errors and exceptions. Report to UI user.
*/
export function signIn(accessToken,accountType){
  //if we have 2 sign in flows we need two cases to handle TODO
    // if Username password checking => valied email TODO: those actions or those in the view itself
    //console.log(accountType);
    var url = AUTH_INFLU + "access_token_fb=" + accessToken + "&type=" + accountType;
    return (dispatch,getState)=>{
      return fetch( url, {
        method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
      })//fetch //TODO: add .then ((error)) here as well for all requests. refer to link in bookmarks
      //add .then(error) here only
      .then((response) => {
        var loginObj = {};
        loginObj.accessToken = response.headers.get("access-token");
        loginObj.tokenType   = response.headers.get("token-type");
        loginObj.client      = response.headers.get("client");
        loginObj.expiry      = response.headers.get("expiry");
        loginObj.uid         = response.headers.get("uid");
        loginObj.id         = response.headers.get("id");
        loginObj.class       = response.headers.get("class");

        console.log("setting accessToken", loginObj.accessToken);
        AsyncStorage.multiSet([
          ['accessToken', loginObj.accessToken],
          ['tokenType',loginObj.tokenType],
          ['client', loginObj.client],
          ['expiry',  loginObj.expiry],
          ['uid', loginObj.uid],
          ['id', loginObj.id],
          ['class', loginObj.class]
        ]);
        dispatch(setLoginInfo({ loginInfo : loginObj})) //setting login info credentials 
        //return response.json();
      })//response
     // .then((responseJson) => {
     //   var userObj = {}
     //   userObj = responseJson;
     //   return dispatch(setSignedInUser({userData : userObj}));
     // })//responseJsons
      .catch((error)=>{
        console.error(error);
      })
    }//return (dispatch,getState)
}//signIn
