import createReducer from '../lib/createReducer'
import * as types from '../actions/types'


export const chatOBJ = createReducer({
},{
  [types.CREATE_CHAT](state,action){
    //might need to append some data or trim some part
    return action.chatObj
  }
})


export const chatList = createReducer({
},{
  [types.SET_CHAT_LIST](state,action){
      tempChatlistData = action.chatListData.data
      processedChatList = {} //processesing is changing keys to appropriate keys based on id
      Object.keys(tempChatlistData).forEach(function(key) {
          processedChatList[tempChatlistData[key].id] = tempChatlistData[key] //magic happening here only
      })
    return processedChatList
  },
  [types.ADD_NEW_MESSAGE](state,action){
    // console.log(state)
    // console.log(action)
    //chatListId term is updated in store only
    //it doesnt go in the db
    //required on message
    console.log(action.message.chatListId)
    // [action.message.chatListId] :  action.message

    // newState = state[action.message.chatListId]
    // newState.messages.push(action.message);
    // newState.sainath = "sainath";
    // console.log("this is the chatlist id $$$$$$$$$$$$$$$$$$$$$$$$$$$$",state[action.message.chatListId])
    // return { ...state,
    //   [action.message.chatListId] : [
    //     ...state[action.message.chatListId].messages , action.message
    //   ]
    // }
    // state[action.message.chatListId].messages.push(action.message);
    // ptr = state[action.message.chatListId].messages
    // newState = {}
    // newState = state
    // console.log("im the state bitch",state[action.message.chatListId].messages)
    // newState[action.message.chatListId].messages = state[action.message.chatListId].messages
    // google = newState[action.message.chatListId].messages.concat([action.message])
    // console.log("IM FROM TRUMP STATE",newState[action.message.chatListId])
    //TODO:leaving this for now

    // let newState = {
    //   ...state,
    //   newState[action.message.chatListId] : [
    //     ...state[action.message.chatListId],
    //     newState[action.message.chatListId].messages: [
    //     ...State[action.message.chatListId].messages,
    //     action.message
    //     ]
    //   ]
    // }
    var google = {}
    google.id = state[action.message.chatListId].id
    google.user1 = state[action.message.chatListId].user1
    google.user1_name = state[action.message.chatListId].user1_name
    google.user2 = state[action.message.chatListId].user2
    google.user2_name = state[action.message.chatListId].user2_name
    googlenew = state[action.message.chatListId].messages.concat([action.message])
    google.messages = googlenew
    return { ...state,
      [action.message.chatListId] : google

    }
  },
}
)
// return {
//   ...state,
//   [action.message.chatListId] : [
//     ...state[action.message.chatListId] || [],
//     action.message,
//   ]
// }


export const lastFiveMessages = createReducer({
},{
  [types.SET_LAST_FIVE_MESSAGES](state,action){
    //might need to append some data or trim some part
    return action.lastFiveMessagesData
  }
})
