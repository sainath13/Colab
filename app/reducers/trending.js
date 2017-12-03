import createReducer from '../lib/createReducer'
import * as types from '../actions/types'


export const trendingData = createReducer({
},{
  [types.SET_TRENDING](state,action){
    //might need to append some data or trim some part
    return action.feedData
  }


})
