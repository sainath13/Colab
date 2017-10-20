import createReducer from '../lib/createReducer'
import * as types from '../actions/types'


export const influencerData = createReducer({
},{
  [types.SET_INFLUENCER](state,action){
    //might need to append some data or trim some part
    //Accepted data will be added to this only but through some later route 
    //structure is same only. No copies. only this singular state
    tempRequestedInfluencer = action.influencerData;
    processedInfluencer = {}
    Object.keys(tempRequestedInfluencer).forEach(function(key){
      processedInfluencer[tempRequestedInfluencer[key].id] = tempRequestedInfluencer[key]
    })
   return processedInfluencer;
  },
  [types.ACCEPT_COLLAB_REQUEST_PENDING_INFLUENCER](state,action){
    //might need to append some data or trim some part
    //Accepted data will be added to this only but through some later route 
    //structure is same only. No copies. only this singular state
   return {
     ...state,
      [action.collabAccepted.id] : {
        ...state[action.collabAccepted.id],
        status : action.collabAccepted.status
    }
   }
  },
})
