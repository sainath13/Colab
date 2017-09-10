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


/*
 *  Redux-thunk format.
 *  can do cheks or api calls here.
 *  and make the result avalaible in reducers
 *
 *  DISPATCHing a actions results in telling the reducer that its happened.
 *  so reducers of the same "type" get triggered resulting updating the store
 * */
export function fetchProfile(headersData,id,email){
  console.log("********",headersData.accToken)
  console.log("********",id)
  console.log("********",email)
  let PROFILE_INFLU = ROUTE_INFLU + id + PROFILE;
  console.log(PROFILE_INFLU);
  return (dispatch,getState)=>{
    return fetch( PROFILE_INFLU, {
      method: 'GET',
      headers: {
        'access-token':  headersData.accToken,
        'token-type': headersData.tokenType,
        'expiry': headersData.expiry,
        'client': headersData.client,
        'uid': email,
      }
    })//fetch
    .then((response) => {
      //    console.log(response)
      // userObj.headers = {}
      // userObj.headers.accToken = response.headers.get("access-token");
      // userObj.headers.tokenType = response.headers.get("token-type");
      // userObj.headers.client = response.headers.get("client");
      // userObj.headers.expiry = response.headers.get("expiry");
      return response.json();
    })//response
    .then((responseJson) => {
      // userObj.data = responseJson.data;
      console.log(responseJson);
      return dispatch(setProfile({profileData : responseJson}));
    })//responseJson
  }//return (dispatch,getState)

}
