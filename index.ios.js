import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';


import { connect,Provider } from 'react-redux';
import { Router ,Actions, Scene, TabBar} from 'react-native-router-flux';
import { createStore, applyMiddleware, combineReduxers, compose }from 'redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'

import reducer from './app/reducers'
import AppContainer from './app/containers/AppContainer'
import Icon from 'react-native-vector-icons/FontAwesome';
/*
 * Applying logger middleware only in dev. __DEV__ is some global variable in nodejs*/
const loggerMiddleware = createLogger({ predicate: (getState, action) => __DEV__  });
import TabIconFeed from './app/containers/components/TabIconFeed'
import TabIconSearch from './app/containers/components/TabIconSearch'
import TabIconProfile from './app/containers/components/TabIconProfile'

import SignInPage from './app/containers/influencer/SignInPage';
import SignUpPage from './app/containers/influencer/SignUpPage';
import UpdateInfoPage from './app/containers/influencer/UpdateInfoPage';
import NicheSelectPage from './app/containers/influencer/NicheSelectPage';
import FeedPage from './app/containers/influencer/FeedPage';
import ProfilePage from './app/containers/influencer/ProfilePage';
import SearchPage from './app/containers/influencer/SearchPage';
import chatPage from './app/containers/influencer/chatPage';
import chatListPage from './app/containers/influencer/chatListPage';
import InfluencersListPage from './app/containers/influencer/InfluencersListPage';
import BrandsListPage from './app/containers/influencer/BrandsListPage';
import PendingRequestsPage from './app/containers/influencer/PendingRequestsPage';

/*Use the following scene to test redux functionality*/
import Test from './app/containers/Test'

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

        <Scene key="SignInPage" component={Test}
            hideNavBar = {true}
            initial = {true}
        />
        <Scene key="SignUpPage" component={SignUpPage} hideNavBar />
        <Scene key="SignInPage" component={SignInPage} hideNavBar />
        <Scene key="UpdateInfoPage" component={UpdateInfoPage} hideNavBar/>
        <Scene key="NicheSelectPage" component={NicheSelectPage} hideNavBar />
        <Scene key="chatPage" component={chatPage} hideNavBar/>
        <Scene key="InfluencersListPage" component={InfluencersListPage} hideNavBar/>
        <Scene key="PendingRequestsPage" component={PendingRequestsPage} hideNavBar/>
        <Scene key="BrandsListPage" component={BrandsListPage} hideNavBar/>
        <Scene key="chatListPage" component={chatListPage} hideNavBar/>
        <Scene key="tabbar" tabs={true} showLabel={false} swipeEnabled tabBarStyle={style.tabBarStyle}  >
            <Scene key="home" component={FeedPage} title={"Feed"} icon={TabIconFeed} iconName={"home"} hideNavBar />
            <Scene key="SearchPage" component={SearchPage} title={"Search"} icon={TabIconSearch} iconName={"search"} hideNavBar />
            <Scene key="ProfilePage" component={ProfilePage} title={"Profile"} icon={TabIconProfile} iconName={"user"} hideNavBar />
        </Scene>

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
   render(){
     return(
     <Provider store = {store}>
  <ConnectedRouter scenes={scenes} />
     </Provider>
   )
 }
 };



AppRegistry.registerComponent('Yohoho', () => Yohoho);
