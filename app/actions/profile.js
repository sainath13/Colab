/*
* Refer to chats in Components in socketioredux react chat
* in the chats Component write socket.on() then dispatch *** Very important
*/

import * as types from './types'
const GLOBAL = require('./Globals');
let ROUTE_INFLU = "https://"+GLOBAL.BASE_URL+"/influencers/";
let ROUTE_BRAND = "https://"+GLOBAL.BASE_URL+"/business/";
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
    console.log(state);
    ROUTE = "";
    if(state.loginInfo.class == "Business"){
      ROUTE = ROUTE_BRAND;
    }
    else if(state.loginInfo.class=="Influencer"){
      ROUTE = ROUTE_INFLU;
    }
    else{
      //it is undefined. put error condition here
    }
    return fetch( ROUTE + id + PROFILE, {
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
      console.log("fetchProfile",response.status);
      if(response.headers.get("access-token") != state.loginInfo.accessToken){
        console.log("Received different access tokens in profile.js");
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
      // userObj.data = responseJson.data;
      return dispatch(setProfile({profileData : responseJson}));
    })//responseJson
    .catch((error) => {
      console.error(error);
      //TODO NEED TO DISPATCH SOME ERROR ACTION FROM HERE, OR JUST KEEP TRYING 3 TIMES, THEN SHOW SOME ERROR. SLOW INTEREST IS ALSO POSSIBLE 
    })
  }//return (dispatch,getState)

}
