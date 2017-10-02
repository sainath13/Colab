/*
* Refer to chats in Components in socketioredux react chat
* in the chats Component write socket.on() then dispatch *** Very important
*/

import * as types from './types'
let ROUTE_INFLU = "http://localhost:3000/influencers/";
let PROFILE = "/profile";
// import profiles from './profiles'
/*
 * Format :
 *  Type
 *  Payload
 *  can have multiple payloads as well
 * */

 export function setProfile({ profileData }){
  return {
      type: types.SET_PROFILE,
      profileData,
  }
}
export function setLoginInfo({loginInfo}){
  //  console.log("im in side setLoginInfo")
    return {
      type : types.SET_LOGIN_INFO,
      loginInfo,
    }
  }//tried but couldn't avoid code duplication
  


/*
 *  Redux-thunk format.
 *  can do cheks or api calls here.
 *  and make the result avalaible in reducers
 *
 *  DISPATCHing a actions results in telling the reducer that its happened.
 *  so reducers of the same "type" get triggered resulting updating the store
 * */
export function fetchProfile(id){
  let PROFILE_INFLU = ROUTE_INFLU + id + PROFILE;

  return (dispatch,getState)=>{
    const state = getState();
    return fetch( PROFILE_INFLU, {
      method: 'GET',
      headers: {
        'access-token':  state.loginInfo.accessToken,
        'token-type': state.loginInfo.tokenType,
        'expiry': state.loginInfo.expiry,
        'client': state.loginInfo.client,
        'uid': state.loginInfo.uid,
      }
    })//fetch
    .then((response) => {
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
      // userObj.data = responseJson.data;
      console.log(responseJson);
      return dispatch(setProfile({profileData : responseJson}));
    })//responseJson
  }//return (dispatch,getState)

}
