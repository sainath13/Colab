/*
* Refer to chats in Components in socketioredux react chat
* in the chats Component write socket.on() then dispatch *** Very important
*/

import * as types from './types'
const GLOBAL = require('./Globals');
const AUTH_INFLU = 'https://'+GLOBAL.BASE_URL+'/influencers/';
import ApiUtils from './ApiUtils'
const AUTH_BRAND =  'https://'+GLOBAL.BASE_URL+'/business/';
/*
 * Format :
 *  Type
 *  Payload
 *  can have multiple payloads as well
 * */

 export function addSubscription({ subscriptionName}){
  return {
      type: types.ADD_SUBSCRIPTION,
      subscriptionName,
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
export function recieveSubscription(subscription,expiry){
  return (dispatch,getState) => {
    const state = getState();
    var url = "";
    if(state.loginInfo.class == "Business"){
       url = AUTH_BRAND + state.loginInfo.id + "/update_plan?plan_expire_date=" + expiry +"&plan_type=" + subscription
    }
    else if(state.loginInfo.class=="Influencer"){
       url = AUTH_INFLU + state.loginInfo.id + "/update_plan?plan_expire_date=" + expiry +"&plan_type=" + subscription
    }
    else{
      //it is undefined. put error condition here
    }
    console.log(url);
      return fetch( url, {
        method: 'POST',
      headers: {
        'access-token':  state.loginInfo.accessToken,
        'token-type': state.loginInfo.tokenType,
        'expiry': state.loginInfo.expiry,
        'client': state.loginInfo.client,
        'uid': state.loginInfo.uid,
      }
      })//fetch //TODO: add .then ((error)) here as well for all requests. refer to link in bookmarks
      .then(ApiUtils.checkStatus)
      //add .then(error) here only
      .then((response) => {
        var loginObj = {};
        console.log("Update_Payment",response.status);
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
        return ;
      })//responseJsons
      .catch((error)=>{
        console.error(error);
      })
    }//return (dispatch,getState)
    //send a message to server if required
    return dispatch(addSubscription({subscriptionName: subscription}));
  }
