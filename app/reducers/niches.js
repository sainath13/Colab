import createReducer from '../lib/createReducer'
import * as types from '../actions/types'


export const nicheData = createReducer({
},{
  [types.SET_NICHE_DATA](state,action){
    //might need to append some data or trim some part
    tempNiche = action.nicheData;
    processedNiche= {}
    Object.keys(tempNiche).forEach(function(key){
      processedNiche[tempNiche[key].name] = tempNiche[key]
    })
    return processedNiche; 
  },
  [types.TOGGLE_NICHE](state,action){
    //might need to append some data or trim some part
    //for some reason ! doesnt work :|
    if(state[action.nicheName].value){
      return {
        ...state,
        [action.nicheName] : {
          name : [action.nicheName][0],
          value : false
        }
      }
    }
    else {
      return {
        ...state,
        [action.nicheName] : {
          name : [action.nicheName][0],
          value : true 
        }
      }
    }

  }


})
