import createReducer from '../lib/createReducer'
import * as types from '../actions/types'


export const signedInUser = createReducer({
},{
  [types.SET_SIGNED_IN_USER](state,action){
    //might need to append some data or trim some part
    // console.log("in side reducer: signdedUser",action.userData);
    return action.userData
  }
})

export const loginInfo = createReducer({
},{  
  [types.SET_LOGIN_INFO](state,action){
  //might need to append some data or trim some part
  // console.log("in side reducer: loginInfo",action.loginInfo);
  return action.loginInfo
}

})
