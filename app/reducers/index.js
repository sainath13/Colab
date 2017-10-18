import { combineReducers } from 'redux';

// import * as recipesReducer from './recipes';
import * as chatsReducer from './chats';
import routes from './routes';
import * as authsReducer from './auths';
import * as profilesReducer from './profiles'
import * as feedsReducer from './feeds'
import * as searchReducer from './search'
import * as openChatReducer from './openedChat'
import * as chatObjReducer from './chatObj'
import * as businessReducer from './businesses'
import * as influencerReducer from './influencers'
/*
 * Combining all reducers and making them available to applicaion
 *  most of the code is boilerplate
 *
 * */
export default combineReducers( Object.assign(
    routes,
    searchReducer,
    // recipesReducer,
    chatsReducer,
    authsReducer,
    profilesReducer,
    feedsReducer,
    openChatReducer,
    chatObjReducer,
    businessReducer,
    influencerReducer,
))
