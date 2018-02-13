import { combineReducers } from 'redux';

import * as chatsReducer from './chats';
import routes from './routes';
import * as authsReducer from './auths';
import * as profilesReducer from './profiles'
import * as feedsReducer from './feeds'
import * as searchReducer from './search'
import * as trendingReducer from './trending'
import * as chatObjReducer from './chatObj'
import * as businessReducer from './businesses'
import * as influencerReducer from './influencers'
import * as visitProfilesReducer from './visitProfiles'
import * as nichesReducer from './niches'
import * as subscriptionsReducer from './subscription'
/*
 * Combining all reducers and making them available to applicaion
 *  most of the code is boilerplate
 *
 * */
export default combineReducers( Object.assign(
    routes,
    searchReducer,
    trendingReducer,
    chatsReducer,
    authsReducer,
    profilesReducer,
    feedsReducer,
    chatObjReducer,
    businessReducer,
    influencerReducer,
    visitProfilesReducer,
    nichesReducer,
    subscriptionsReducer,
))
