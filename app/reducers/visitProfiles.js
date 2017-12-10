import createReducer from '../lib/createReducer'
import * as types from '../actions/types'


export const visitProfileData = createReducer({
},{
  [types.SET_VISIT_PROFILE](state,action){
    //might need to append some data or trim some part
    return action.visitProfileData
  },
  [types.UNSET_VISIT_PROFILE](state,action){
    //might need to append some data or trim some part
    return action.emtpyObject
  },
  [types.SET_REQUESTED_COLLABORATION_ON_VISIT_PROFILE](state,action){
    return {
      ...state,
      status : action.status
    }
  },
  [types.ACCEPT_COLLAB_REQUEST_VISITPROFILE](state,action){
    return   action.collabAccepted.status

    
  },
  
})
