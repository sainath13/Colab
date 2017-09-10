import createReducer from '../lib/createReducer'
import * as types from '../actions/types'


export const profileData = createReducer({
},{
  [types.SET_PROFILE](state,action){
    //might need to append some data or trim some part
    return action.profileData
  }


})
