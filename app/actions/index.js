
import * as RecipeActions from './recipes';
import * as ChatActions  from './chats';
import * as AuthActions from './auth';
import * as ProfileActions from './profile';
import * as FeedActions from './feeds'
import * as SearchAction from './search'
import * as OpenChatAction from './openedChat'
import * as chatObjAction from './chatObj'

/**
 * to star unstars etc will be in recipes.js files
 * importing them as an object
 * merging them with other objects and returning that as an object
 * ==Grouping all the actions that my application can perform into this actionCreator constant
 * */
 //TODO : rename profile to profiles
export const ActionCreators = Object.assign({},
    RecipeActions,
    ChatActions,
    AuthActions,
    ProfileActions,
    FeedActions,
    SearchAction,
    OpenChatAction,
    chatObjAction
)
