import createReducer from '../lib/createReducer'
import * as types from '../actions/types'


export const feedData = createReducer({
},{
  [types.SET_FEED](state,action){
    //might need to append some data or trim some part
    return action.feedData
  }


})
