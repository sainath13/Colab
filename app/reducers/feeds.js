import createReducer from '../lib/createReducer'
import * as types from '../actions/types'


export const feedData = createReducer({
},{
  [types.SET_FEED](state,action){
    //might need to append some data or trim some part
    tempFeedListData = action.feedData;
    processedFeedList = {}
    Object.keys(tempFeedListData).forEach(function(key){
      processedFeedList[tempFeedListData[key].id] = tempFeedListData[key]
    })

    return processedFeedList;
  },
  [types.ACCEPT_COLLAB_REQUEST](state,action){
   testState = state[action.collabAccepted.id];
   testState.status = action.collabAccepted.status;
    return { ...state , 
       [action.collabAccepted.id] : testState
    }
  }


})
