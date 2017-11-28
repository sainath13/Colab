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
import Chat from './Chat'
const NAMES = ['Girl', 'Boy', 'Horse', 'Poo', 'Face', 'Giant', 'Super', 'Butt', 'Captain', 'Lazer']
const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min)) + min
const getRandomName = () => NAMES[getRandomInt(0, NAMES.length)]
const getRandomUser = () => `${ getRandomName() }${ getRandomName() }${ getRandomName() }`
const user ="sai"
const isMe = (someUser) => user === someUser
const avatar = { uri: 'https://facebook.github.io/react/img/logo_og.png' }



class chatListPage extends Component{
//this is a local state.
//redux has nothing to do with this


constructor(props) {
  super(props)
  this.receiveChatMessage = this.receiveChatMessage.bind(this);
  this.onPressChat = this.onPressChat.bind(this);
  // if(this.props.openedChatIND){
    //if that state is present then dont register chat again.
    // i guess its done..
    //tonight will write
    this.chat = Chat(user, this.receiveChatMessage, this.props.signedInUser.data.id);
  // }

  //setting it to false if okay. but might need to think about it later
  //in some cases was not working so its true now. :\
  // this.chat = this.chat.bind(this);
  this.state = { fetching: true }
}

componentDidMount(){
  // if(typeof this.props.chatObjData != "undefined"){
    // console.log(typeof this.props.chatObjData);
    // console.log('chatObjstate is ' , chatObjData);
    // this.props.createChatObj(this.chat);
  // }
  // else {
  // console.log()
    this.props.createChatObj(this.chat);

  // }

 this.setState({fetching: true});
 this.props.fetchChatList("1").then( (res) => {
   this.setState({fetching: false })
 })
}
fetchChatListItems(){
    //actually this function call is not required
    //but will remove later
    //
  // console.log("this is CHATLIST", this.props.CHATLIST);
  tempCHATLIST = this.props.CHATLIST;
  // console.log("inside fetchChatListItems",Object.keys(testobj).map(key =>testobj[key]))

    return Object.keys(tempCHATLIST).map(key =>tempCHATLIST[key])
}
receiveChatMessage (message) {
  // this.props.recieveMessage(message);//action call

  message._id = Math.floor((Math.random() * 34242) + 0);
  message.chatListId = 1;

  // console.log("hi i recieve messages",message);
  this.props.recieveNewMessage(message);

  //  console.log("im hhere with im recieve message");
}
// fetchChatItems(){
//   let test = this.props.chatData
//   Object.keys(test).forEach(function (key) {
//     var value = test[key]
//     // iteration code
//     console.log("Kye , value",key ,value);
// })
//   console.log("from  fetch Chat",this.props.chatData);
//
//     return Object.keys(this.props.chatData).map(key =>this.props.chatData[key])
// }
onPressChat(){
  // var test = this.chat
  // console.log("this.chat", test);
  Actions.chatPage();
}
  render() {
return(
  <View style={{flex : 1}}>
  <StatusBar
    backgroundColor="#6563A4"
    barStyle="light-content"
  />
  <View style={styles.header}>
    <Text style={styles.headerText}>
      Influxcer
    </Text>
  </View>

  <View style = {styles.content}>
    <View style={styles.notificationBar}>
      <TouchableHighlight onPress = {this.onPressChat}>
      <Text style={styles.notificationBarText}>
        List of people with whom you chat
      </Text>
    </TouchableHighlight>
    </View>
    <View style={styles.listView}>
      <ScrollView>
          {! this.state.fetching && this.fetchChatListItems().map((chatlistItem) => {
            // console.log("one item",chatlistItem)
            // console.log("one item test--",chatlistItem)
            // console.log("one item length is ",chatlistItem.length);
            // var lastmessageInd = feedItem.length-1;
            //call here openedChatIND
             return ( <TouchableHighlight key={chatlistItem.id}
                            onPress={ ()=>{
                              console.log(chatlistItem.id);

                              this.onPressChat();
                            } }>
                       <View style={styles.listElement}>
                                      <View style={styles.notificationIcon}>
                         <Image
                           style = {{width: 50, height: 50, borderRadius: 25}}
                           source = { { uri: "https://randomuser.me/api/portraits/thumb/men/4.jpg" }}
                         />
                         </View>
                         <View style={styles.notificationItem}>
                           <Text style={styles.notificationItemText}>
                             <Text style={styles.notificationItemTextBold}>{chatlistItem.user2_name}</Text>Latest message.
                           </Text>
                       </View>
                       </View>
                     </TouchableHighlight>
             )//return
          })//map
        }
     </ScrollView>
    </View>

  </View>
  <View style={{flex : 1}}>
  </View>
</View>
)}
};

var styles = StyleSheet.create({
  header: {
     flex: 1,
     alignItems : "center",
     justifyContent : "center",
     backgroundColor: '#6563A4',
    },
    notificationIcon:{
      flex : 2,
      alignItems : 'center',
      justifyContent : 'center',
      // backgroundColor : 'black',
    },
    notificationItemText:{
      paddingLeft : 20,
      fontSize : 16,
      color : '#424242',
      fontFamily : 'GothamRounded-Book',
    },
    notificationItemTextBold:{
      paddingLeft : 20,
      fontSize : 16,
      // fontWeight : 'bold',
      color : '#212121',
      fontFamily : 'GothamRounded-Medium',
    },
    notificationItem:{
      flex : 7,
      // borderColor : 'red',
      // borderBottomWidth : 1,
      // borderBottomRightRadius : 5,
      // borderBottomColor : 'black',
      // alignItems : 'center',
      paddingRight : 10,
      justifyContent : 'center',
      // backgroundColor : 'red',
    },
  headerText:{
    color : 'white',
    fontSize : 25,
    fontFamily : 'GothamRounded-Bold'
    // fontFamily : 'arial'
  },
  listElement:{
    margin : 1,
    height : 65,
    flexDirection : 'row'
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
    flex : 10,
    backgroundColor : '#FFFFFF',
  },
  contentPic:{
    flex : 2,
    backgroundColor : '#6563A4',
    flexDirection : 'row',
    // borderColor : 'red',
    // borderWidth : 3,
  },
  influencerContainer:{
    flex : 1,
    backgroundColor : '#595896',
    margin : 10,
    borderRadius : 5
    // borderColor: 'red',
    // borderWidth : 2,
  },
  brandContainer:{
    flex : 1,
    backgroundColor : '#595896',
    margin : 10,
    borderRadius : 5
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
      signedInUser : state.signedInUser,
      chatData : state.messageObj,
      CHATLIST : state.chatList,

      // messageObj : state.messageObj,
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(chatListPage );
