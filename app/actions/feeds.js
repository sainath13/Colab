import * as types from './types'

let ROUTE_INFLU = "http://localhost:3000/influencers/";
let COLLAB = "/feed";

export function setFeed({ feedData }){
  return {
      type: types.SET_FEED,
      feedData,
  }
}

export function fetchFeed(headersData,id,email){
  let FEED_INFLU = ROUTE_INFLU + id + COLLAB;
  console.log(FEED_INFLU);
  return (dispatch,getState)=>{
    return fetch( FEED_INFLU, {
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
      return response.json();
    })//response
    .then((responseJson) => {
      console.log(responseJson)
      return dispatch(setFeed({feedData : responseJson}));
    })//responseJson
  }//return (dispatch,getState)

}
