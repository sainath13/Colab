import createReducer from '../lib/createReducer'
import * as types from '../actions/types'


export const openedChat = createReducer({
},{
  [types.OPENED_CHAT](state,action){
    //might need to append some data or trim some part
    return action.lobbyId
  }


})
