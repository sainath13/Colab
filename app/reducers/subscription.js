import createReducer from '../lib/createReducer'
import * as types from '../actions/types'


export const subscription = createReducer({
},{
    [types.ADD_SUBSCRIPTION](state,action){
        return { 
        subscriptionActive : action.subscriptionName       
        }
    }
});
