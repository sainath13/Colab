import * as types from './types'

const AUTH_INFLU = 'http://localhost:3000/influencer_auth/sign_in';
/*TODO : write here*/
export function setSignedInUser({userData}){
  return {
    type : types.SET_SIGNED_IN_USER,
    userData,
  }
}

/* The following function does api call and sign in part.
   TODO: handle errors and exceptions. Report to UI user.
*/
export function signIn(userName , password){
  console.log("username",userName);
    console.log("password",password);
    //TODO: remove below two lines for not skipping login
    userName = "sid5@mailinator.com"
    password = "Siddhesh9"
    let userObj = {}
    // if Username password checking => valied email TODO: those actions or those in the view itself
    return (dispatch,getState)=>{
      return fetch( AUTH_INFLU, {
        method: 'POST',
	      headers: {
		      'Accept': 'application/json',
		      'Content-Type': 'application/json',
	      },
	      body: JSON.stringify({
		    email : userName,
		    password : password
	      })
	    })//fetch
      .then((response) => {
        //    console.log(response)
        userObj.headers = {}
        userObj.headers.accToken = response.headers.get("access-token");
        userObj.headers.tokenType = response.headers.get("token-type");
        userObj.headers.client = response.headers.get("client");
        userObj.headers.expiry = response.headers.get("expiry");
        return response.json();
      })//response
      .then((responseJson) => {
        userObj.data = responseJson.data;
	      return dispatch(setSignedInUser({userData : userObj}));
      })//responseJson
    }//return (dispatch,getState)
}//signIn
