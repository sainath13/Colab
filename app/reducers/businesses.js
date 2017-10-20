import createReducer from '../lib/createReducer'
import * as types from '../actions/types'


export const businessData = createReducer({
},{
  [types.SET_BUSINESS](state,action){
    //might need to append some data or trim some part
    //Accepted data will be added to this only but through some later route 
    //structure is same only. No copies. only this singular state
    tempRequestedBrands = action.businessData;
    processedBrands = {}
    Object.keys(tempRequestedBrands).forEach(function(key){
      processedBrands[tempRequestedBrands[key].id] = tempRequestedBrands[key]
    })
   return processedBrands;
  },
  [types.ACCEPT_COLLAB_REQUEST_PENDING_BUSINESS](state,action){
   return {
     ...state,
      [action.collabAccepted.id] : {
        ...state[action.collabAccepted.id],
        status : action.collabAccepted.status
    }
   }
  }
})
