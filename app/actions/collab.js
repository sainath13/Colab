import * as types from './types'

let URL_START = "http://localhost:3000/influencers/";
let ACCEPT_COLLAB = "/accept_collaboration_with_business";
let ACCEPT_COLLAB_INFLUENCER = "/accept_collaboration_with_influencer";

export function setLoginInfo({loginInfo}){
  return {
    type : types.SET_LOGIN_INFO,
    loginInfo,
  }
}//tried but couldn't avoid code duplication

export function setAcceptedCollabRequest(acceptedUserId,status,pageName,userType){
  console.log(pageName)
  console.log("from set accept collab request",acceptedUserId,status);
  var collabAccepted = {};
   collabAccepted.id = acceptedUserId;
   collabAccepted.status = status;
   //put if condition here //TODO
   if(pageName == "BrandListPage"){
      return {
        type : types.ACCEPT_COLLAB_REQUEST_PENDING_BUSINESS,
        collabAccepted
      }
   }
   if(pageName == "InfluencerListPage"){
      return {
        type : types.ACCEPT_COLLAB_REQUEST_PENDING_INFLUENCER,
        collabAccepted
      }
   }
   if(pageName == "FeedPage"){
     if(userType == "Brand"){
      return {
        type : types.ACCEPT_COLLAB_REQUEST_BUSINESS,
        collabAccepted
      }
     }
     else if (userType == "Influencer"){
      return {
        type : types.ACCEPT_COLLAB_REQUEST_INFLUENCER,
        collabAccepted
      }
     }
  }
  }//
  
export function acceptCollabRequest(currentUserId,acceptUserId,pageName,userType){
  //NEED TO REMOVE THIS ID FROM HERE
  //can remove the id from here. passing id is not required. 
  // it can be done inside this return . get the id from the state after getting state
  console.log("user", currentUserId);
  console.log("new", acceptUserId);
  var ACCEPT_COLLAB_ROUTE = "";
  if(userType == "Brand"){
      ACCEPT_COLLAB_ROUTE = URL_START + currentUserId + ACCEPT_COLLAB + "?business_id=" +acceptUserId;
  }

  if(userType == "Influencer"){
      ACCEPT_COLLAB_ROUTE = URL_START + currentUserId + ACCEPT_COLLAB_INFLUENCER  + "?influencer_friend_id=" +acceptUserId;
  }
  return (dispatch,getState)=>{
    const state = getState();
    return fetch(ACCEPT_COLLAB_ROUTE , {
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
        console.log("Received different access tokens in collab.js");
        loginObj.accessToken = response.headers.get("access-token");
        loginObj.tokenType = response.headers.get("token-type");
        loginObj.client = response.headers.get("client");
        loginObj.expiry = response.headers.get("expiry");
        loginObj.uid    = response.headers.get("uid");
        dispatch(setLoginInfo({ loginInfo : loginObj})) //setting login info credentials 
    }
    console.log("response",response)
      return response.json();
    })//response
    .then((responseJson) => {
      console.log(responseJson);
      if(userType == "Influencer"){
        return dispatch(setAcceptedCollabRequest(responseJson.influencer_friend_id,responseJson.status,pageName,userType));
      }
      if(userType == "Brand"){
        return dispatch(setAcceptedCollabRequest(responseJson.business_id,responseJson.status,pageName,userType));
      }
    })//responseJson
    .catch((error) => {
      console.error(error);
      //TODO NEED TO DISPATCH SOME ERROR ACTION FROM HERE, OR JUST KEEP TRYING 3 TIMES, THEN SHOW SOME ERROR. SLOW INTEREST IS ALSO POSSIBLE 
    })
  }//return (dispatch,getState)

}
