import * as types from './types'

const GLOBAL = require('./Globals');
let ROUTE_INFLU = "https://"+GLOBAL.BASE_URL+"/influencers/";
let ROUTE_BRAND = "https://"+GLOBAL.BASE_URL+"/business/";
let COLLAB = "/feed";
let UPDATE_NOTIF_ID = "/update_player_id"
import ApiUtils from './ApiUtils'

export function setFeed({ feedData }){
  return {
      type: types.SET_FEED,
      feedData,
  }
}

export function setNoInternet({ value}){
  return {
      type: types.SET_NO_INTERNET,
      value,
  }
}

export function setSessionExpired({ value}){
  return {
      type: types.SET_NO_SESSION,
      value,
  }
}

export function setLoginInfo({loginInfo}){
    return {
      type : types.SET_LOGIN_INFO,
      loginInfo,
    }
  }//tried but couldn't avoid code duplication
 

export function resetSessionValue(){
  return {
      type: types.RESET_NO_SESSION,
  }
}

export function fetchFeed(id){
  //NEED TO REMOVE THIS ID FROM HERE
  return (dispatch,getState)=>{
    const state = getState();

    ROUTE = "";
    if(state.loginInfo.class == "Business"){
      ROUTE = ROUTE_BRAND;
    }
    else if(state.loginInfo.class=="Influencer"){
      ROUTE = ROUTE_INFLU;
    }

    return fetch( ROUTE +id + COLLAB , {
      method: 'GET',
      headers: {
        'access-token':  state.loginInfo.accessToken,
        'token-type': state.loginInfo.tokenType,
        'expiry': state.loginInfo.expiry,
        'client': state.loginInfo.client,
        'uid': state.loginInfo.uid,
      }
    })//fetch
    .then(ApiUtils.checkStatus)
    .then((response) => {
      var loginObj = {};
      console.log("fetchFeed",response.status);
      if(response.headers.get("access-token") != state.loginInfo.accessToken){
        console.log("Received different access tokens in feeds.js");
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
      return dispatch(setFeed({feedData : responseJson}));
    })//responseJson
    .catch((error) => {
      if(error.response.status == 401){
          return dispatch(setSessionExpired({value : true}))
      }
      else{
      return dispatch(setNoInternet({value : true}));
      console.error(error);
      }
      //TODO NEED TO DISPATCH SOME ERROR ACTION FROM HERE, OR JUST KEEP TRYING 3 TIMES, THEN SHOW SOME ERROR. SLOW INTEREST IS ALSO POSSIBLE 
    })
  }//return (dispatch,getState)

}


export function setNotificationId(id,deviceId){
  //NEED TO REMOVE THIS ID FROM HERE
  return (dispatch,getState)=>{
    const state = getState();

    ROUTE = "";
    if(state.loginInfo.class == "Business"){
      ROUTE = ROUTE_BRAND;
    }
    else if(state.loginInfo.class=="Influencer"){
      ROUTE = ROUTE_INFLU;
    }
    notifUrl = ROUTE +id + UPDATE_NOTIF_ID + '?player_id=' + deviceId;
    return fetch( notifUrl , {
      method: 'POST',
      headers: {
        'access-token':  state.loginInfo.accessToken,
        'token-type': state.loginInfo.tokenType,
        'expiry': state.loginInfo.expiry,
        'client': state.loginInfo.client,
        'uid': state.loginInfo.uid,
      }
    })//fetch
    .then(ApiUtils.checkStatus)
    .then((response) => {
      var loginObj = {};
      if(response.headers.get("access-token") != state.loginInfo.accessToken){
        console.log("Received different access tokens in feeds.js");
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
    })//responseJson
    .catch((error) => {
      console.error(error);
      //TODO NEED TO DISPATCH SOME ERROR ACTION FROM HERE, OR JUST KEEP TRYING 3 TIMES, THEN SHOW SOME ERROR. SLOW INTEREST IS ALSO POSSIBLE 
    })
  }//return (dispatch,getState)
}