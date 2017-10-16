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
   processedFeedList.requested_brands =  processedRequestedBrands; 
   processedFeedList.requested_influencer = processedRequestedInfluencers ; 
    return processedFeedList;
  },
  [types.ACCEPT_COLLAB_REQUEST](state,action){
    console.log(action);
    //DELETE FROM HERE
    //ADD TO accepted list
    //but what will happen if I click on the list of accepted/
    //dont add to accepted list here 
    //just delete from here
    //oh right 
    //if data is already present then just add 
    //if data is not already present then don't add as user is going to call the fetch any way
    //TODO
   testState = state[action.acceptedUserId];
   return state
    //return { ...state , 
    //   [action.collabAccepted.id] : testState
   // }
  },
})
