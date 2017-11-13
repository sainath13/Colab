import React, { Component } from 'react';

import {
  AppRegistry,
  StyleSheet,
  TouchableHighlight,
  Text,
  TextInput,
  ScrollView,
  View,
  Image,
  StatusBar,
} from 'react-native';
// import { Card, Button,List, ListItem , ListView } from 'react-native-elements'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ActionCreators } from '../../actions'
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/Entypo';

const GLOBAL = require('../../actions/Globals');
import RNActionCable from 'react-native-actioncable';
import ActionCableProvider, { ActionCable } from 'react-actioncable-provider';
class FeedPage extends Component{
//this is a local state.
//redux has nothing to do with this


constructor(props) {
  super(props)
  //setting it to false if okay. but might need to think about it later
  //in some cases was not working so its true now. :\
  this.state = { fetching: true }
}

componentDidMount(){
  this.setState({fetching: true});
  this.props.fetchFeed(this.props.signedInUser.basic_data.id).then( (res) => {
    this.setState({fetching: false })
  })
  console.log("This is this from feed",this);
}
onReceived = (data) => {
    console.log("received a message");
    console.log(data);
    if(data.method == "get_chat_pairs"){
      this.props.setChatList2(data.data);
      console.log(this);
    }
    if(data.method == "get_chat_pair_messages"){
      reversedMessages = data.messages.reverse();
      this.props.setLast5Messages(reversedMessages,data.chat_pair_id);
      console.log(this);
    }
    if(data.method == "send_message"){
      this.props.receiveMessage(data.message);
      //create a nice message here from whatever you got 
    }

	//	this.setState({
	//		messages: [
	//			data.message,
	//			...this.state.messages
	//		]
	//	})
	}

fetchFeedItems(accountType){
 console.log("test")
 //need to create some really nice object here 
 //BADAWALA TODO
 //CREATE NOTIFICATIONS HERE 
 if(accountType == "brand"){
    return Object.keys(this.props.feedData.requested_businesses).map(key =>this.props.feedData.requested_businesses[key])
 }
 else if (accountType = "influencer"){
    return Object.keys(this.props.feedData.requested_influencers).map(key =>this.props.feedData.requested_influencers[key])
 }
}
onPressChat = () => {
  //call the get chat list route of server here 
  this.props.setChatObject(this.refs.roomChannel);
 console.log("this is this ", this);
this.refs.roomChannel.perform('get_chat_pairs');
 Actions.ActionCableChatPage();
  //Actions.chatListPage();
}
  render() {
return(
  <View style={{flex : 1}}>
  <StatusBar
    backgroundColor="red"
    barStyle="dark-content"
  />
   	<ActionCableProvider cable={RNActionCable.createConsumer('ws://'+GLOBAL.BASE_URL+'/cable?id='+this.props.signedInUser.basic_data.id+"&token="+this.props.loginInfo.accessToken+"&client="+this.props.loginInfo.client+"&user_type=I")}>
			<ActionCable ref='roomChannel' channel={{channel: 'MessageChannel'}} onReceived={this.onReceived} />
	   </ActionCableProvider>
 
  <View style={styles.header}>
  <TouchableHighlight style={{flex : 1, alignItems : 'center', justifyContent : 'center', marginTop: 16 }}  onPress={ ()=>{ console.log('Back'); } } >
  <View style={{}}>
  </View>
  </TouchableHighlight>
  <View style={{flex : 7, alignItems : 'center', justifyContent : 'center'}}>
    <Text style={styles.headerText}>
Influx
    </Text>
  </View>
  <TouchableHighlight style={{flex : 1, alignItems : 'center', justifyContent : 'center', marginTop: 16 }}  onPress={ ()=>{ console.log('Back'); } } >
  <View style={{}}>
                <Icon name="chat" size={25} color='white' >
                </Icon>
  </View>
  </TouchableHighlight>
</View>
  <View style = {styles.content}>
    <View style={styles.contentPic}>
    <TouchableHighlight style={{flex: 1}} onPress={ ()=>{  console.log("Influencers"), Actions.InfluencersListPage(); } }>
      <View style={styles.influencerContainer}>
        <View style={styles.headingContainer}>
          <Text style={styles.contentHeadingText}>
           Influencers
          </Text>
        </View>
      <View style={styles.bottomNumberTextContainer}>
        <Text style={styles.bottomNumberText}>
             123
        </Text>
      </View>
      </View>
      </TouchableHighlight>
      <TouchableHighlight style={{flex: 1}} onPress={ ()=>{  console.log("Brands"); Actions.BrandsListPage(); } } >
      <View style={styles.brandContainer}>
        <View style={styles.headingContainer}>
          <Text style={styles.contentHeadingText}>
            Brands
          </Text>
        </View>
      <View style={styles.bottomNumberTextContainer}>
        <Text style={styles.bottomNumberText}>
          12
        </Text>
      </View>
      </View>
      </TouchableHighlight>
    </View>
    <View style={styles.notificationBar}>
      <TouchableHighlight onPress = {this.onPressChat}>
      <Text style={styles.notificationBarText}>
        Notifications
      </Text>
    </TouchableHighlight>
    </View>
    <View style={styles.listView}>
       <ScrollView>
           {! this.state.fetching && this.fetchFeedItems("influencer").map((feedItem) => {
             if(feedItem.status == "requested"){
              return ( <TouchableHighlight key={feedItem.id}
                             onPress={ ()=>{   console.log(feedItem.id);
Actions.VisitProfilePage({clickedUserId : feedItem.id, isBusiness : false}) } }>
                        <View style={styles.listElement}>
                                       <View style={styles.notificationIcon}>
                          <Image
                            style = {{width: 50, height: 50, borderRadius: 25, marginLeft : 10}}
                            source = { { uri: "https://randomuser.me/api/portraits/thumb/men/4.jpg" }}
                          />
                          </View>
                          <View style={styles.notificationItem}>
                            <Text style={styles.notificationItemText}>
                              <Text style={styles.notificationItemTextBold}>{feedItem.first_name +" " + feedItem.last_name}</Text> wants to collaborate.
                            </Text>
                        </View>
                        <TouchableHighlight
                        onPress={()=> {this.props.acceptCollabRequest(this.props.signedInUser.basic_data.id,feedItem.id,"FeedPage","Influencer")}}
                         style={{
                        width : 100,
                        height : 30,
                        marginTop : 15,
                        marginBottom : 15,
                        marginRight : 10,
                        borderRadius:2,
                        borderColor:'#fefefe',
                        borderWidth : 3/2,
                        paddingTop: 5,
                        paddingBottom: 5,
                        alignItems : 'center',
                        justifyContent: 'center',
                        backgroundColor : '#6563A4',
                        borderRadius : 5
                    }}>
                    <Text style={{
                        color : 'white',
                            fontSize : 16,
                            fontFamily :'GothamRounded-Book',
                    }}>
                        accept
                        </Text>
                    </TouchableHighlight>
                        </View>
                      </TouchableHighlight>
              )//return
            }//if
             if(feedItem.status == "accepted"){
              return ( <TouchableHighlight key={feedItem.id}
                             onPress={ ()=>{  console.log(feedItem.id) 
                            Actions.VisitProfilePage({clickedUserId : feedItem.id, isBusiness : false})
                            } }>
                        <View style={styles.listElement}>
                                       <View style={styles.notificationIcon}>
                          <Image
                            style = {{width: 50, height: 50, borderRadius: 25, marginLeft : 10}}
                            source = { { uri: "https://randomuser.me/api/portraits/thumb/men/4.jpg" }}
                          />
                          </View>
                          <View style={styles.notificationItem}>
                            <Text style={styles.notificationItemText}>
                              <Text style={styles.notificationItemTextBold}>{feedItem.first_name + " "+feedItem.last_name }</Text> wants to collaborate.
                            </Text>
                        </View>
                        <TouchableHighlight
                        onPress={()=> {(console.log("clicked on message"))}}
                         style={{
                        width : 100,
                        height : 30,
                        marginTop : 15,
                        marginBottom : 15,
                        marginRight : 10,
                        borderRadius:2,
                        borderColor:'#fefefe',
                        borderWidth : 3/2,
                        paddingTop: 5,
                        paddingBottom: 5,
                        alignItems : 'center',
                        justifyContent: 'center',
                        backgroundColor : '#6563A4',
                        borderRadius : 5
                    }}>
                    <Text style={{
                        color : 'white',
                            fontSize : 16,
                            fontFamily :'GothamRounded-Book',
                    }}>
                       message 
                        </Text>
                    </TouchableHighlight>
                        </View>
                      </TouchableHighlight>
              )//return
            }//if
           })//map
         }
           {! this.state.fetching && this.fetchFeedItems("brand").map((feedItem) => {
             if(feedItem.status == "requested"){
              return ( <TouchableHighlight key={feedItem.id}
                             onPress={ ()=>{  console.log(feedItem.id); Actions.VisitProfilePage({clickedUserId : feedItem.id, isBusiness : true}) } }>
                        <View style={styles.listElement}>
                                       <View style={styles.notificationIcon}>
                          <Image
                            style = {{width: 50, height: 50, borderRadius: 25, marginLeft : 10}}
                            source = { { uri: "https://randomuser.me/api/portraits/thumb/men/4.jpg" }}
                          />
                          </View>
                          <View style={styles.notificationItem}>
                            <Text style={styles.notificationItemText}>
                              <Text style={styles.notificationItemTextBold}>{feedItem.name}</Text> wants to collaborate.
                            </Text>
                        </View>
                        <TouchableHighlight
                        onPress={()=> {this.props.acceptCollabRequest(this.props.signedInUser.basic_data.id,feedItem.id,"FeedPage","Brand")}}
                         style={{
                        width : 100,
                        height : 30,
                        marginTop : 15,
                        marginBottom : 15,
                        marginRight : 10,
                        borderRadius:2,
                        borderColor:'#fefefe',
                        borderWidth : 3/2,
                        paddingTop: 5,
                        paddingBottom: 5,
                        alignItems : 'center',
                        justifyContent: 'center',
                        backgroundColor : '#6563A4',
                        borderRadius : 5
                    }}>
                    <Text style={{
                        color : 'white',
                            fontSize : 16,
                            fontFamily :'GothamRounded-Book',
                    }}>
                        accept
                        </Text>
                    </TouchableHighlight>
                        </View>
                      </TouchableHighlight>
              )//return
            }//if
             if(feedItem.status == "accepted"){
              return ( <TouchableHighlight key={feedItem.id}
                             onPress={ ()=>{  console.log(feedItem.id);  Actions.VisitProfilePage({clickedUserId : feedItem.id, isBusiness : true})} }>
                        <View style={styles.listElement}>
                                       <View style={styles.notificationIcon}>
                          <Image
                            style = {{width: 50, height: 50, borderRadius: 25, marginLeft : 10}}
                            source = { { uri: "https://randomuser.me/api/portraits/thumb/men/4.jpg" }}
                          />
                          </View>
                          <View style={styles.notificationItem}>
                            <Text style={styles.notificationItemText}>
                              <Text style={styles.notificationItemTextBold}>{feedItem.name}</Text> wants to collaborate.
                            </Text>
                        </View>
                        <TouchableHighlight
                        onPress={()=> {(console.log("clicked on message"))}}
                         style={{
                        width : 100,
                        height : 30,
                        marginTop : 15,
                        marginBottom : 15,
                        marginRight : 10,
                        borderRadius:2,
                        borderColor:'#fefefe',
                        borderWidth : 3/2,
                        paddingTop: 5,
                        paddingBottom: 5,
                        alignItems : 'center',
                        justifyContent: 'center',
                        backgroundColor : '#6563A4',
                        borderRadius : 5
                    }}>
                    <Text style={{
                        color : 'white',
                            fontSize : 16,
                            fontFamily :'GothamRounded-Book',
                    }}>
                       message 
                        </Text>
                    </TouchableHighlight>
                        </View>
                      </TouchableHighlight>
              )//return
            }//if
           })//map
         }
      </ScrollView>
    </View>

  </View>
</View>
)}
};

var styles = StyleSheet.create({
  header: {
     flex: 1,
     alignItems : "center",
     justifyContent : "center",
    //  paddingTop : 20,
    //  marginTop : 20,
    //  backgroundColor: 'white',
     backgroundColor: '#6563A4',
     flexDirection : 'row',
    },
    notificationIcon:{
      flex : 2,
      alignItems : 'center',
      justifyContent : 'center',
      // backgroundColor : 'black',
    },
    collaborateIcon:{
      flex : 1,
      justifyContent : 'center',
      alignItems : 'center',
    },
    notificationItemText:{
      // paddingLeft : 20,
      fontSize : 15,
      // color : '#424242',
      color : '#1c1b30',
      fontFamily : 'GothamRounded-Book',
    },
    notificationItemTextBold:{
      // paddingLeft : 20,
      fontSize : 15,
      // fontWeight : 'bold',
      // color : '#212121',
      color : '#3f3d6a',
      fontFamily : 'GothamRounded-Medium',
    },
    notificationItem:{
      flex : 7,
      // borderColor : 'red',
      // borderBottomWidth : 1,
      // borderBottomRightRadius : 5,
      // borderBottomColor : 'black',
      // alignItems : 'center',
      paddingRight : 3,
      paddingLeft : 10,
      justifyContent : 'center',
      borderBottomWidth: 0.25,
      // borderBottomColor : "#12111f",
      borderBottomColor : '#9190b6',
      borderRadius : 25,
      // backgroundColor : 'red',
    },
  headerText:{
    // color : '#6563A4',
    color: 'white',
    fontSize : 25,
    paddingTop : 25,
    fontFamily : 'GothamRounded-Bold'
    // fontFamily : 'arial'
  },
  listElement:{
    margin : 1,
    height : 65,
    flexDirection : 'row',
    borderBottomColor : '#9190b6',
    borderBottomWidth : 0.25,
    borderRadius : 25,
  },
  headingContainer:{
    flex : 2,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  contentHeadingText:{
    fontSize : 25,
    color : 'white',
    fontFamily : 'GothamRounded-Medium'
  },
  bottomNumberTextContainer:{
    flex : 4,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    // borderColor: 'red',
    // borderWidth : 2,
  },
  bottomNumberText:{
    fontSize : 45,
    color : 'white',
    fontFamily : 'GothamRounded-Medium'
  },
  content:{
    flex : 9,
    backgroundColor : '#FFFFFF',
  },
  contentPic:{
    flex : 2,
    backgroundColor : '#6563A4',
    flexDirection : 'row',
    borderColor : '#333156',

    borderBottomWidth : 3,
  },
  influencerContainer:{
    flex : 1,
    backgroundColor : '#43416d',
    margin : 10,
    elevation : 10,
    borderRadius : 10,
    // borderColor: 'white',
    // borderWidth : 1,
  },
  brandContainer:{
    flex : 1,
    backgroundColor : '#43416d',
    margin : 10,
    borderRadius : 10
    // borderColor: 'red',
    // borderWidth : 2,
  },
  notificationBar:{
    flex : 1,
    marginLeft : 10,
    justifyContent: 'center',
  },
  notificationBarText:{
    fontSize: 20,
    fontFamily : 'GothamRounded-Book'
  },
  listView:{
    flex : 7,
    // borderWidth : 1,
    // borderColor : 'red',
  },
});



function mapDispatchToProps(dispatch){
    return bindActionCreators( ActionCreators, dispatch);
}
// export default connect(({routes}) => ({routes}))(Test);
function mapStateToProps(state){
    return {
      // recipeCount : state.recipeCount,
      feedData : state.feedData,
      loginInfo : state.loginInfo,
      signedInUser : state.signedInUser,
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(FeedPage );
