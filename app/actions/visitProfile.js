/*
* Refer to chats in Components in socketioredux react chat
* in the chats Component write socket.on() then dispatch *** Very important
*/

import * as types from './types'

const GLOBAL = require('./Globals');
let ROUTE = "https://"+GLOBAL.BASE_URL+"/";
let influencer = "influencers/"
let business = "business/"
let INFLUENCER_PROFILE = "/view_visited_profile";
let BUSINESS_PROFILE = "/view_visited_business";
// import profiles from './profiles'
/*
 * Format :
 *  Type
 *  Payload
 *  can have multiple payloads as well
 * */

 export function setVisitProfile({ visitProfileData}){
  return {
      type: types.SET_VISIT_PROFILE,
      visitProfileData,
  }
}
export function setLoginInfo({loginInfo}){
    return {
      type : types.SET_LOGIN_INFO,
      loginInfo,
    }
  }//tried but couldn't avoid code duplication
  
export function unsetVisitProfile(){
  var emtpyObject =   { 
  "id": "",
  "first_name": "",
  "last_name": "",
  "city": "",
  "gender": "",
  "bio": "",
  "age": null,
  "influencer_collaborations_count": 0,
  "business_collaborations_count": 0,
  "niche": [
  ],
  "email": "",
  "payments": [
      {
          "id": null,
          "payment_type": "",
          "payment_id": ""
      },
      {
          "id": null,
          "payment_type": "",
          "payment_id": ""
      }
  ],
  "price_per_post": null,
  "price_per_story": null
} 
    return {
      type : types.UNSET_VISIT_PROFILE,
      emtpyObject
      //passing undefined action rn for testin
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
export function fetchVisitProfile(id,clickedUserId, isBusiness){
  return (dispatch,getState)=>{
    const state = getState();
    ROUTE_ = "";
    if(state.loginInfo.class == "Business"){
      ROUTE_ = ROUTE + business;
    }
    else if(state.loginInfo.class=="Influencer"){
      ROUTE_ = ROUTE + influencer;
    }
    else{
      //it is undefined. put error condition here
    }
  var URL = "";
  if(!isBusiness){
    URL = ROUTE_ + id + INFLUENCER_PROFILE + "?influencer_id=" +clickedUserId ;
  }
  else if(isBusiness){
    URL = ROUTE_ + id + BUSINESS_PROFILE + "?visited_business_id=" + clickedUserId ;
  }
  console.log(URL)
    return fetch( URL , {
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
      return dispatch(setVisitProfile({visitProfileData : responseJson}));
    })//responseJson
    .catch((error) => {
      console.error(error);
      //TODO NEED TO DISPATCH SOME ERROR ACTION FROM HERE, OR JUST KEEP TRYING 3 TIMES, THEN SHOW SOME ERROR. SLOW INTEREST IS ALSO POSSIBLE 
    })
  }//return (dispatch,getState)

}
