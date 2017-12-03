
import * as ChatActions  from './chats';
import * as AuthActions from './auth';
import * as ProfileActions from './profile';
import * as FeedActions from './feeds'
import * as TrendingActions from './trending'
import * as SearchAction from './search'
import * as OpenChatAction from './openedChat'
import * as chatObjAction from './chatObj'
import * as collabActions from './collab'
import * as businessActions from './businesses'
import * as influencerActions from './influencers'
import * as visitProfileActoins from './visitProfile'
import * as updateActions from './update'

/**
 * to star unstars etc will be in recipes.js files
 * importing them as an object
 * merging them with other objects and returning that as an object
 * ==Grouping all the actions that my application can perform into this actionCreator constant
 * */
 //TODO : rename profile to profiles
export const ActionCreators = Object.assign({},
    ChatActions,
    AuthActions,
    ProfileActions,
    FeedActions,
    TrendingActions,
    SearchAction,
    OpenChatAction,
    chatObjAction,
    collabActions,
    businessActions,
    influencerActions,
    visitProfileActoins,
    updateActions,
)
