import * as types from './types'

const GLOBAL = require('./Globals');
let ROUTE_INFLU = "https://"+GLOBAL.BASE_URL+"/influencers/";
let SEARCH_NAME = "search";
let SEARCH_NICHE = "search_by_niche"

export function setSearch({ searchData }){
  return {
      type: types.SET_SEARCH,
      searchData,
  }
}

export function setLoginInfo({loginInfo}){
  return {
    type : types.SET_LOGIN_INFO,
    loginInfo,
  }
}//tried but couldn't avoid code duplication

export function fetchSearch(id, searchInput,isNameSelected){
  var SEARCH_INFLU;
  if(isNameSelected){
    SEARCH_INFLU = ROUTE_INFLU + SEARCH_NAME + "?name=" + searchInput ;
  }else{
    SEARCH_INFLU = ROUTE_INFLU + SEARCH_NICHE + "?niche=" + searchInput ;
  }
  return (dispatch,getState)=>{
    const state = getState();
    return fetch( SEARCH_INFLU, {
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
        console.log("Received different access tokens in search.js");
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
     return dispatch(setSearch({searchData : responseJson}));
    })//responseJson
    .catch((error)=>{
      console.log(error);
    })
  }//return (dispatch,getState)

}
