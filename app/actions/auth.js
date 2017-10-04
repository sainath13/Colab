import * as types from './types'

const AUTH_INFLU = 'http://localhost:3000/facebook_login/omniauth_success?';

export function setSignedInUser({userData}){
  return {
    type : types.SET_SIGNED_IN_USER,
    userData,
  }
}

export function setLoginInfo({loginInfo}){
//  console.log("im in side setLoginInfo")
  return {
    type : types.SET_LOGIN_INFO,
    loginInfo,
  }
}//tried but couldn't avoid code duplication

/* The following function does api call and sign in part.
   TODO: handle errors and exceptions. Report to UI user.
*/
export function signIn(accessToken){
  //if we have 2 sign in flows we need two cases to handle TODO
    // if Username password checking => valied email TODO: those actions or those in the view itself
    var url = AUTH_INFLU + "access_token_fb=" + accessToken 
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
        // console.log(response)
        var loginObj = {};
        loginObj.accessToken = response.headers.get("access-token");
        loginObj.tokenType = response.headers.get("token-type");
        loginObj.client = response.headers.get("client");
        loginObj.expiry = response.headers.get("expiry");
        loginObj.uid    = response.headers.get("uid");
        dispatch(setLoginInfo({ loginInfo : loginObj})) //setting login info credentials 
        return response.json();
      })//response
      .then((responseJson) => {
        var userObj = {}
        userObj = responseJson;
        return dispatch(setSignedInUser({userData : userObj}));
      })//responseJsons
      .catch((error)=>{
        console.error(error);
      })
    }//return (dispatch,getState)
}//signIn
