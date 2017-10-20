import createReducer from '../lib/createReducer'
import * as types from '../actions/types'


export const visitProfileData = createReducer({
},{
  [types.SET_VISIT_PROFILE](state,action){
    //might need to append some data or trim some part
    return action.VisitProfileData
  }


})
