import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  AsyncStorage,
} from 'react-native';


import { connect,Provider } from 'react-redux';
import { Router ,Actions, Scene, TabBar} from 'react-native-router-flux';
import { createStore, applyMiddleware, combineReduxers, compose }from 'redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'

import reducer from './app/reducers'
import Icon from 'react-native-vector-icons/FontAwesome';
import { setLoginInfo } from './app/actions/auth'

/*
 * Applying logger middleware only in dev. __DEV__ is some global variable in nodejs*/
const loggerMiddleware = createLogger({ predicate: (getState, action) => __DEV__  });
import TabIconFeed from './app/containers/components/TabIconFeed'
import TabIconSearch from './app/containers/components/TabIconSearch'
import TabIconProfile from './app/containers/components/TabIconProfile'

import SignInPage from './app/containers/influencer/SignInPage';
import SignUpPage from './app/containers/influencer/SignUpPage';
import OpeningPage from './app/containers/influencer/OpeningPage';
import UpdateInfoPage from './app/containers/influencer/UpdateInfoPage';
import SettingPage from './app/containers/influencer/SettingPage';
import WebViewPage from './app/containers/components/WebViewPage';
import NicheSelectPage from './app/containers/influencer/NicheSelectPage';
import FeedPage from './app/containers/influencer/FeedPage';
import ProfilePage from './app/containers/influencer/ProfilePage';
import SearchPage from './app/containers/influencer/SearchPage';
import chatPage2 from './app/containers/influencer/chatPage2';
import InfluencersListPage from './app/containers/influencer/InfluencersListPage';
import BrandsListPage from './app/containers/influencer/BrandsListPage';
import VisitProfilePage from './app/containers/influencer/VisitProfilePage';
import ActionCableChatPage from './app/containers/influencer/ChatClassActionCable';
/*Use the following scene to test redux functionality*/

/*
 * For seting up react native flux router
 * boilerplate
 */
const ConnectedRouter = connect()(Router);
//Style for TabBar
let style = StyleSheet.create({
    tabBarStyle: {
            // flex : 1,
            borderTopWidth : 0.5,
            borderColor    : '#8887b2',
            backgroundColor: '#FFF',
            opacity        : 1
        }
    });

//Flux Scenes
/*PUT SCENES HERE
 * put all the scenes here.
 * use proper component names
 * */
const scenes = Actions.create(
    <Scene {...this.props} key="root">

        <Scene key="OpeningPage" initial={true} component={OpeningPage} hideNavBar />
        <Scene key="SignInPage" component={SignInPage} hideNavBar />
        <Scene key="TabBarComponent" tabs={true} showLabel={false} tabBarStyle={style.tabBarStyle}  >
            <Scene key="home" component={FeedPage} title={"Feed"} icon={TabIconFeed} iconName={"home"} hideNavBar />
            <Scene key="SearchPage" component={SearchPage} title={"Search"} icon={TabIconSearch} iconName={"search"} hideNavBar />
            <Scene key="ProfilePage" component={ProfilePage} title={"Profile"} icon={TabIconProfile} iconName={"user"} hideNavBar />
        </Scene>
        <Scene key="SignUpPage" component={SignUpPage} hideNavBar />
        <Scene key="WebViewPage" component={WebViewPage} hideNavBar />
        <Scene key="UpdateInfoPage" component={UpdateInfoPage} hideNavBar/>
        <Scene key="SettingPage" component={SettingPage} hideNavBar/>
        <Scene key="NicheSelectPage" component={NicheSelectPage} hideNavBar />
        <Scene key="chatPage2" component={chatPage2} hideNavBar/>
        <Scene key="InfluencersListPage" component={InfluencersListPage} hideNavBar/>
        <Scene key="BrandsListPage" component={BrandsListPage} hideNavBar/>
        <Scene key="VisitProfilePage" component={VisitProfilePage} hideNavBar/>
        <Scene key="ActionCableChatPage" component={ActionCableChatPage} hideNavBar/>

    </Scene>

);

//Redux Store
/*CONFIGURING STORE
 * Configuring store with two middlewares
 * loggleMiddleware prints state with action in google chrome
 * boilerplate;
 * may be moved to a different file according to the need
 * */
function configureStore(initialState){
    const enhancer = compose(
        applyMiddleware(
            thunkMiddleware,
            loggerMiddleware,
        ),
    );
    return createStore(reducer, initialState, enhancer);
}

/*
 * If you want to have some initial state for the app put it in configurestore's parameter.
 * inside {}
 * */
const store = configureStore({
  profileData : {
    niche : [],
    contact: {},
  },
  feedData : {
    businesses : [],
  },
  signedInUser:{
    data : {
    },
    headers : {

    }
  },
  chatOBJ:{

  },
  messageObj:{

  }

});

//Main APP
/*MAIN APP
 * Boilerplate.
 * react native flux router | redux
 * */
 export default class Yohoho extends Component {
    componentWillMount(){
        var loginObj = {}

        AsyncStorage.multiGet(['accessToken','tokenType','client', 'expiry', 'uid','id','class']).then((data) => { 
        loginObj.accessToken = data[0][1]
        loginObj.tokenType   = data[1][1]
        loginObj.client      = data[2][1]
        loginObj.expiry      = data[3][1]
        loginObj.uid         = data[4][1]
        loginObj.id          = data[5][1]
        loginObj.class       = data[6][1]
        if(loginObj.accessToken != null){
            store.dispatch(setLoginInfo({ loginInfo : loginObj}))
            Actions.reset('TabBarComponent');
        }
        else {
            Actions.replace('SignInPage');
        }
        });
      }
   render(){
     return(
     <Provider store = {store}>
  <ConnectedRouter scenes={scenes} />
     </Provider>
   )
 }
 };



AppRegistry.registerComponent('Yohoho', () => Yohoho);
