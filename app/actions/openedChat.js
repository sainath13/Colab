/*
* Refer to chats in Components in socketioredux react chat
* in the chats Component write socket.on() then dispatch *** Very important
*/

import * as types from './types'
// import profiles from './profiles'
/*
 * Format :
 *  Type
 *  Payload
 *  can have multiple payloads as well
 * */

 export function openedChat({ lobbyId }){
  return {
      type: types.OPENED_CHAT,
      lobbyId,
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
export function openChat(lobbyId){
  return (dispatch,getState) => {
    thisdata = lobbyId;
    // console.log("----------",thisdata)
    return dispatch(openedChat({lobbyId: thisdata}));
  }
}
