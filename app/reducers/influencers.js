import createReducer from '../lib/createReducer'
import * as types from '../actions/types'


export const influencerData = createReducer({
},{
  [types.SET_INFLUENCER](state,action){
    //might need to append some data or trim some part
    //Accepted data will be added to this only but through some later route 
    //structure is same only. No copies. only this singular state
   return action.influencerData;
  },
})
