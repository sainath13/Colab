import * as types from './types'

 export function createChat({ chatObj }){
  return {
      type: types.CREATE_CHAT,
      chatObj,
  }
}

 export function setChat({ chatObj }){
  return {
      type: types.SET_CHAT_OBJECT,
      chatObj,
  }
}
export function createChatObj(chat){
  return (dispatch,getState) => {
    // thisdata = lobbyId;
    // console.log("----------",thisdata)
    return dispatch(createChat({chatObj: chat}));
  }
}

export function setChatObject(chat){
  return (dispatch,getState) => {
    // thisdata = lobbyId;
    // console.log("----------",thisdata)
    return dispatch(setChat({chatObj: chat}));
  }
}


let ROUTE_CHAT = "http://localhost:4000/chats?user1=";

export function setChatList({ chatListData }){
  return {
      type: types.SET_CHAT_LIST,
      chatListData,
  }
}

export function setChatList2(chatListData){
  console.log("im here with chatListData",chatListData);
  return {
      type: types.SET_CHAT_LIST_1,
      chatListData,
  }
}

export function receiveMessage(message){
  console.log("message from action",message);
  return {
    type : types.RECEIVE_MESSAGE,
    message,
  }
}

export function setLast5Messages(last5Messages,chat_pair_id){
  console.log("Im here with last 5 messages",last5Messages);
    last5MessagesData = {}
  if(last5Messages[0]){
    last5MessagesData.chat_pair_id = chat_pair_id;
    last5MessagesData.messages = last5Messages;
    return {
      type: types.SET_LAST_5_MESSAGES,
      last5MessagesData,
    }
  }
  return {
      type: types.SET_LAST_5_MESSAGES,
      last5MessagesData,
  }
}
export function fetchChatList(userId){
  let GET_CHAT_LIST = 'http://localhost:4000/api/chats?user1=1';
  // console.log(FEED_INFLU);
  return (dispatch,getState)=>{
    return fetch( GET_CHAT_LIST, {
      method: 'POST'
    })//fetch
    .then((response) => {
      return response.json();
    })//response
    .then((responseJson) => {
      console.log(responseJson)
      return dispatch(setChatList({chatListData : responseJson}));
    })//responseJson
  }//return (dispatch,getState)

}



//----------------fetchLastFiveMessages-----------//

export function setLastFiveMessages({ lastFiveMessagesData }){
  return {
      type: types.SET_LAST_FIVE_MESSAGES,
      lastFiveMessagesData,
  }
}

export function fetchLastFiveMessages(userId){
  let ROUTE_LAST_FIVE = "http://localhost:4000/api/get_last_few_messages?chat_pair_id=1";
  // console.log(FEED_INFLU);
  return (dispatch,getState)=>{
    return fetch( ROUTE_LAST_FIVE, {
      method: 'POST'
    })//fetch
    .then((response) => {
      return response.json();
    })//response
    .then((responseJson) => {
      console.log("from lastFiveMessagesData",responseJson)
      return dispatch(setLastFiveMessages({lastFiveMessagesData : responseJson}));
    })//responseJson
  }//return (dispatch,getState)

}

export function addNewMessage({ message }){
 return {
     type: types.ADD_NEW_MESSAGE,
     message,
 }
}

export function recieveNewMessage(newMessage){
 return (dispatch,getState) => {
  //  thisdata = newMessage;
   console.log("----------",newMessage)
   newMessage.user = {}
   newMessage.user._id = newMessage.sender_id
   newMessage.user.name = newMessage.sent_by,
   newMessage.createdAt = Date.now();


   return dispatch(addNewMessage({message: newMessage}));
 }
}
