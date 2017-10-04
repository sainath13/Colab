import * as types from './types'

let ROUTE_INFLU = "http://localhost:3000/influencers/";
let COLLAB = "/feed";

export function setFeed({ feedData }){
  //console.log("Inside set feed");
  return {
      type: types.SET_FEED,
      feedData,
  }
}
export function setLoginInfo({loginInfo}){
  //  console.log("im in side setLoginInfo")
    return {
      type : types.SET_LOGIN_INFO,
      loginInfo,
    }
  }//tried but couldn't avoid code duplication
  

export function fetchFeed(id){
  //NEED TO REMOVE THIS ID FROM HERE
  let FEED_INFLU = ROUTE_INFLU + id + COLLAB;
//  console.log(FEED_INFLU);
  return (dispatch,getState)=>{
    const state = getState();
    return fetch( FEED_INFLU, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'access-token':  state.loginInfo.accessToken,
        'token-type': state.loginInfo.tokenType,
        'expiry': state.loginInfo.expiry,
        'client': state.loginInfo.client,
        'uid': state.loginInfo.uid,
      }
    })//fetch
    .then((response) => {
      var loginObj = {};
      console.log("from feed", response);
      loginObj.accessToken = response.headers.get("access-token");
      loginObj.tokenType = response.headers.get("token-type");
      loginObj.client = response.headers.get("client");
      loginObj.expiry = response.headers.get("expiry");
      loginObj.uid    = response.headers.get("uid");
      console.log("From feed",loginObj);
      dispatch(setLoginInfo({ loginInfo : loginObj})) //setting login info credentials 
      return response.json();
    })//response
    .then((responseJson) => {
      return dispatch(setFeed({feedData : responseJson}));
    })//responseJson
    .catch((error) => {
      console.error(error);
      //TODO NEED TO DISPATCH SOME ERROR ACTION FROM HERE, OR JUST KEEP TRYING 3 TIMES, THEN SHOW SOME ERROR. SLOW INTEREST IS ALSO POSSIBLE 
    })
  }//return (dispatch,getState)

}
