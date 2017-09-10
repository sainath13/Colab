import * as types from './types'

let ROUTE_INFLU = "http://localhost:3000/influencers/";
let SEARCH = "/search_by_instagram_handle";

export function setSearch({ searchData }){
  return {
      type: types.SET_SEARCH,
      searchData,
  }
}

export function fetchSearch(headersData,id,email, searchInput){
  let SEARCH_INFLU = ROUTE_INFLU + SEARCH;
  console.log(SEARCH_INFLU);
  return (dispatch,getState)=>{
    return fetch( SEARCH_INFLU, {
      method: 'POST',
      headers: {
        'access-token':  headersData.accToken,
        'token-type': headersData.tokenType,
        'expiry': headersData.expiry,
        'client': headersData.client,
        'uid': email,
        },
	      body: JSON.stringify({
		    instagram_name  : searchInput,
	      })
    })//fetch
    .then((response) => {
      console.log(response);
      return response.json();
    })//response
    .then((responseJson) => {
      console.log(responseJson)
     return dispatch(setSearch({searchData : responseJson}));
    })//responseJson
  }//return (dispatch,getState)

}
