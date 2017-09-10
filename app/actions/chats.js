/*
* Refer to chats in Components in socketioredux react chat
* in the chats Component write socket.on() then dispatch *** Very important
*/

import * as types from './types'
import profiles from './profiles'
/*
 * Format :
 *  Type
 *  Payload
 *  can have multiple payloads as well
 * */

 export function addMessage({ messages }){
  return {
      type: types.ADD_MESSAGE,
      messages,
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
export function recieveMessage(recievedMessage){
  return (dispatch,getState) => {
    thisdata = recievedMessage;
    console.log("----------",thisdata)
    thisdata._id =  Math.floor((Math.random() * 34242) + 0);
    thisdata.user = {}
    thisdata.user._id = 1;
    thisdata.user.name = 1

    return dispatch(addMessage({messages: thisdata}));
  }
}
