import * as types from './types'

const AUTH_INFLU = 'http://localhost:3000/influencers/';

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
export function updateInfo(id,instagram_name,bio,phone,price_per_post,price_per_story){
  //if we have 2 sign in flows we need two cases to handle TODO
    // if Username password checking => valied email TODO: those actions or those in the view itself
    var url = AUTH_INFLU + id + "?" + "instagram_name=" + instagram_name + "&" + "bio=" + bio + "&" + "phone=" + phone + "&" + "price_per_post=" +price_per_post + "&price_per_story=" + price_per_story; 
    return (dispatch,getState)=>{
    const state = getState();
      return fetch( url, {
        method: 'PUT',
      headers: {
        'access-token':  state.loginInfo.accessToken,
        'token-type': state.loginInfo.tokenType,
        'expiry': state.loginInfo.expiry,
        'client': state.loginInfo.client,
        'uid': state.loginInfo.uid,
      }
      })//fetch //TODO: add .then ((error)) here as well for all requests. refer to link in bookmarks
      //add .then(error) here only
      .then((response) => {
        var loginObj = {};
      if(response.headers.get("access-token") != state.loginInfo.accessToken){
        loginObj.accessToken = response.headers.get("access-token");
        loginObj.tokenType = response.headers.get("token-type");
        loginObj.client = response.headers.get("client");
        loginObj.expiry = response.headers.get("expiry");
        loginObj.uid    = response.headers.get("uid");
        dispatch(setLoginInfo({ loginInfo : loginObj})) //setting login info credentials 
      }
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
