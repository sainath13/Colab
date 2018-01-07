import createReducer from '../lib/createReducer'
import * as types from '../actions/types'


export const chatOBJ = createReducer({
},{
  [types.CREATE_CHAT](state,action){
    //might need to append some data or trim some part
    return action.chatObj
  }
})


export const chatObj = createReducer({
},{
  [types.SET_CHAT_OBJECT](state,action){
    //might need to append some data or trim some part
    return action.chatObj
  }
})

export const chatList = createReducer({
},{
  [types.SET_CHAT_LIST_1](state,action){
    // console.log("im in reducer",action.chatListData)
      tempChatlistData = action.chatListData
      processedChatList = {} //processesing is changing keys to appropriate keys based on id
      Object.keys(tempChatlistData).forEach(function(key) {
        // console.log(key);
        // console.log(tempChatlistData[key].chat_pair);
          processedChatList[tempChatlistData[key]['chat_pair'].id] = tempChatlistData[key] //magic happening here only
      })
    return processedChatList
  },
  [types.SET_LAST_5_MESSAGES](state,action){
    // console.log("im in reducer from set_last_5_messages",action.last5MessagesData);
    if(action.last5MessagesData.chat_pair_id){
    return {
          ...state,
          [action.last5MessagesData.chat_pair_id] : {
            ...state[action.last5MessagesData.chat_pair_id],
            messages : action.last5MessagesData.messages
          }
    }
  }
  else{
    return state;
  }

  },
  [types.RECEIVE_MESSAGE](state,action){
    return {
      ...state,
      [action.message.chat_pair_id] : {
        chat_pair : {
         ...state[action.message.chat_pair_id].chat_pair,
          current_user_has_unread_messages : true,
        },
        messages: [ action.message, ...state[action.message.chat_pair_id].messages || [] ]
      }
    }
  },
  [types.MARK_CHAT_AS_READ](state,action){
    return {
      ...state,
      [action.chat_pair_id] : {
        chat_pair : {
          ...state[action.chat_pair_id].chat_pair,
           current_user_has_unread_messages : false,
         }, 
        messages : [
          ...state[action.chat_pair_id].messages
        ] 
      },
    }
  }
}
)