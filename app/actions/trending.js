import * as types from './types'

const GLOBAL = require('./Globals');
let ROUTE_INFLU = "https://"+GLOBAL.BASE_URL+"/influencers/";
let ROUTE_BRAND = "https://"+GLOBAL.BASE_URL+"/business/";
import ApiUtils from './ApiUtils'
let COLLAB = "trending";

export function setTrending({ feedData }){
  console.log("calling reducer")
  return {
      type: types.SET_TRENDING,
      feedData,
  }
}
export function setLoginInfo({loginInfo}){
    return {
      type : types.SET_LOGIN_INFO,
      loginInfo,
    }
  }//tried but couldn't avoid code duplication
  

export function fetchTrending(id){
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

    return fetch( ROUTE + COLLAB , {
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
      console.log("fetchTrending",response.status);
      var loginObj = {};
      if(response.headers.get("access-token") != state.loginInfo.accessToken){
        console.log("Received different access tokens in trending.js");
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
      console.log("callind dispatch")
      return dispatch(setTrending({feedData : responseJson}));
    })//responseJson
    .catch((error) => {
      console.error(error);
      //TODO NEED TO DISPATCH SOME ERROR ACTION FROM HERE, OR JUST KEEP TRYING 3 TIMES, THEN SHOW SOME ERROR. SLOW INTEREST IS ALSO POSSIBLE 
    })
  }//return (dispatch,getState)

}
