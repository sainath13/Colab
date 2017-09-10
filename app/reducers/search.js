import createReducer from '../lib/createReducer'
import * as types from '../actions/types'


export const searchData = createReducer({
},{
  [types.SET_SEARCH](state,action){
    //might need to append some data or trim some part
    return action.searchData
  }


})
