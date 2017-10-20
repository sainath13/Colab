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
 //  testState = state[action.acceptedUserId];
   //return the sate just by deleting the element
   //return state
   //return { ...state , 
   //NOT working
   //FUCK the logic 
   //DO things however possible they are
   //seriously fuck logic
  // testState = state.requested_businesses[action.collabAccepted.id];
  // testState.status = action.collabAccepted.status;
  //  return { ...state , 
  //     requested_businesses , 
  //      [action.collabAccepted.id] : testState
  //  }
//return    state.requested_businesses.filter(({ id }) => id !== action.acceptedUserId)
   // }
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
