import createReducer from '../lib/createReducer'
import * as types from '../actions/types'


export const feedData = createReducer({
},{
  [types.SET_FEED](state,action){
    //might need to append some data or trim some part
    //Accepted data will be added to this only but through some later route 
    //structure is same only. No copies. only this singular state
    tempRequestedBrands = action.feedData.requested_businesses;
    processedRequestedBrands = {}
    Object.keys(tempRequestedBrands).forEach(function(key){
      processedRequestedBrands[tempRequestedBrands[key].id] = tempRequestedBrands[key]
    })

    tempRequestedInfluencers = action.feedData.requested_influencer;
    processedRequestedInfluencers = {}
    Object.keys(tempRequestedInfluencers ).forEach(function(key){
      processedRequestedInfluencers[tempRequestedInfluencers[key].id] = tempRequestedInfluencers[key]
    })
    processedFeedList = {}
    processedFeedList.requested_businesses =  processedRequestedBrands; 
    processedFeedList.requested_influencers = processedRequestedInfluencers ; 
    processedFeedList.influencer_collaborations_count = action.feedData.influencer_collaborations_count;
    processedFeedList.business_collaborations_count = action.feedData.business_collaborations_count;
    
    return processedFeedList;
  },
  [types.ACCEPT_COLLAB_REQUEST_INFLUENCER](state,action){
    console.log(action);
   return {
     ...state,
    requested_influencers: {
      ...state.requested_influencers,
      [action.collabAccepted.id] : {
        ...state.requested_influencers[action.collabAccepted.id],
        status : action.collabAccepted.status
      }
    }
   }
  },
  [types.ACCEPT_COLLAB_REQUEST_BUSINESS](state,action){
    console.log(action);
   return {
     ...state,
    requested_businesses : {
      ...state.requested_businesses,
      [action.collabAccepted.id] : {
        ...state.requested_businesses[action.collabAccepted.id],
        status : action.collabAccepted.status
      }
    }
   }
  },
})
