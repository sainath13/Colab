import * as types from './types'

const GLOBAL = require('./Globals');
let ROUTE_INFLU = "https://"+GLOBAL.BASE_URL+"/influencers/";
let BUSINESSES = "/business_collaberations";

export function setBusiness({ businessData}){
  return {
      type: types.SET_BUSINESS,
     businessData
  }
}

export function setLoginInfo({loginInfo}){
    return {
      type : types.SET_LOGIN_INFO,
      loginInfo,
    }
  }//tried but couldn't avoid code duplication
  

export function fetchBusiness(id){
  //NEED TO REMOVE THIS ID FROM HERE
  let BUSINESS_INFLU = ROUTE_INFLU + id + BUSINESSES;
  return (dispatch,getState)=>{
    const state = getState();
    return fetch( BUSINESS_INFLU, {
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
      console.log("fetchbusiness",response.status);
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
      //console.log("**************see this response",responseJson);
      return dispatch(setBusiness({businessData: responseJson}));
    })//responseJson
    .catch((error) => {
      console.error(error);
      //TODO NEED TO DISPATCH SOME ERROR ACTION FROM HERE, OR JUST KEEP TRYING 3 TIMES, THEN SHOW SOME ERROR. SLOW INTEREST IS ALSO POSSIBLE 
    })
  }//return (dispatch,getState)

}
