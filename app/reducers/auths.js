import createReducer from '../lib/createReducer'
import * as types from '../actions/types'


export const signedInUser = createReducer({
},{
  [types.SET_SIGNED_IN_USER](state,action){
    //might need to append some data or trim some part
    console.log("in side reducer: signdedUser",action.userData);
    return action.userData
  }


})
