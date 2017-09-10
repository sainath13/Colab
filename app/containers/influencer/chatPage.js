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
  Dimensions,
} from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import moment from 'moment'
import { Actions } from 'react-native-router-flux';
const isMe = (someUser) => user === someUser

const SCREEN_HEIGHT = Dimensions.get('window').height
const STATUS_BAR_HEIGHT = 40  // i know, but let's pretend its cool
const CHAT_MAX_HEIGHT = SCREEN_HEIGHT - STATUS_BAR_HEIGHT

 // const NAMES = ['Girl', 'Boy', 'Horse', 'Poo', 'Face', 'Giant', 'Super', 'Butt', 'Captain', 'Lazer']
 // const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min)) + min
 // const getRandomName = () => NAMES[getRandomInt(0, NAMES.length)]
 // const getRandomUser = () => `${ getRandomName() }${ getRandomName() }${ getRandomName() }`
 // const user ="sainath"
 // const isMe = (someUser) => user === someUser
 // const avatar = { uri: 'https://facebook.github.io/react/img/logo_og.png' }

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ActionCreators } from '../../actions'
// const user ="sainath"


class chatPage extends Component{
//this is a local state.
//redux has nothing to do with this
constructor(props) {
  super(props)
  console.log("Props are" , this.props);
    this.state = { messages: [] ,fetching : true };
    // bind our functions to the right scope
    this.handleSend = this.handleSend.bind(this)

    // this.receiveChatMessage = this.receiveChatMessage.bind(this)
    // let's chat!
    // this.chat = Chat(user, this.receiveChatMessage, this.props.signedInUser.data.id)
    //setting it to false if okay. but might need to think about it later
  //in some cases was not working so its true now. :\
  // this.state = { }
}
//
// componentWillReceiveProps(nextProps) {
//     console.log("recieveing next props-=======",nextProps);
//     if (this.props.messageObj === nextProps.messageObj) {
//       return;
//     }else {
//       console.log("recieved this =============",nextProps.messageObj[1]);
//       // console.log(this.props.messageObj[1].length)
//       console.log(this.props.CHAT[1].messages.length)
//       console.log(nextProps.CHAT[1].messages.length)
//       console.log(nextProps.messageObj[1].length)
//
//       index = nextProps.messageObj[1].length - 1 ;
//       console.log("new message is ", nextProps.messageObj[1][index])
//       tempOBj = nextProps.messageObj[1][index];
//       tempOBj.text = tempOBj.content
//       //TODO:dont set state. call recievedMessages function
//       this.setState((previousState) => {
//            return {
//              messages: GiftedChat.append(previousState.messages, tempOBj),
//            };
//          });
//
//     }
//
// }

componentWillReceiveProps(nextProps) {
    console.log("previousState===========",this.props);
    console.log("recieveing next props-=======",nextProps);
    //implementation problem when no messages are there
    if(this.props.CHAT[1].messages && nextProps.CHAT[1].messages){
    if (this.props.CHAT[1].messages.length === nextProps.CHAT[1].messages.length) {
      console.log("everything is equal")
      return;
    }else {
      // console.log("recieved this =============",nextProps.props.CHAT[1]);
      // console.log(this.props.messageObj[1].length)
      console.log("they are not equal");
      // console.log(this.props.CHAT[1].messages.length)
      // console.log(nextProps.CHAT[1].messages.length)
      // console.log(nextProps.messageObj[1].length)

      index = nextProps.CHAT[1].messages.length - 1 ;
      console.log("new message is ", nextProps.CHAT[1].messages[index])
      tempOBj = nextProps.CHAT[1].messages[index];
      tempOBj.text = tempOBj.content
      //TODO:dont set state. call recievedMessages function
      this.setState((previousState) => {
           return {
             messages: GiftedChat.append(previousState.messages, tempOBj),
           };
         });

    }
  }//length wala if

}
componentWillMount() {
  console.log("openedChat is", this.props.openedChatIND);
//TODO load previousmessages here
///whatever is in respective obj populate that here
  }
onPressBack(){
  Actions.pop();
}
 // fires when we receive a message
//  receiveChatMessage (message) {
// //this never will get hit bro
//    console.log("IM here you piece -----------------------------------------------------------------------------------------of ass");
//    this.props.recieveMessage(message);//action call
//    //this code should be in a different Component
//    //may be chatlistpage of may be in a new Component
//    //but this receiveChatMessage funtion should just update the redux store.
//    //thats its whole responsibility
//     const { user } = message;
//     console.log("message received",message);
//       // console.log(this);
//       if (isMe(user)) return; // prevent echoing yourself (TODO: server could handle this i guess?)
//       //TODO might want to remove this. and implement it like fblite
//       let testMessage = {
//         _id : Math.floor((Math.random() * 34242) + 0),
//         text: message.body,
//         createdAt: new Date(Date.UTC(2016, 5, 11, 17, 20, 0)),
//         user: {
//           _id: 2,
//           name: 'React Native',
//           avatar: 'https://facebook.github.io/react/img/logo_og.png',
//         },
//         // image: 'https://facebook.github.io/react/img/logo_og.png',
//         // additional custom parameters
//       }
//       //TODO:call acion to update store here
//     this.setState((previousState) => {
//          return {
//            messages: GiftedChat.append(previousState.messages, testMessage),
//          };
//        });
// }

  // fires when we need to send a message
  handleSend (message) {
    //TODO add a new parameter and set it here in the message
    //Maybe can have a state : to whom im messaging
    //its a state change only
    //do it
    //right now i have a state "openedChat"
    //that tells with whom im chatting right now.
    //how to use that information
    //on componentDidMount => make api call and load previos messages.(may need to change later)
    //use that information to fill message[to] field.
    //simple
    //when the back button is pressed . replace the openchat state with 0 or null
    //move connecting to lobby code to chat list page
    console.log("this is the message in handleSend", message);
    message[0]["to"] = "rooms:lobby"
    message[0]["sender_id"] = this.props.signedInUser.data.id
    console.log("messgage before sending is ",message[0]);
    //yeah its required actually but rendering not reuired
    this.props.CHATOBJ.send(message[0]);//magic happeng sere
    message[0]._id = Math.floor((Math.random() * 34242) + 0);
    message[0].chatListId = 1;
    // this.props.recieveNewMessage(message[0]);
    // this.appendMessages(message[0]);

    //call two actions here.
    //update chatlist + update the phoenix db
    //TODO: call acion to update store here
    //where the fuck did it go man?
    //what the actual fuck
    // this.setState((previousState) => {
    //      return {
    //        messages: GiftedChat.append(previousState.messages, message),
    //      };
    //    });
  }
componentDidMount(){
  // this.setState({fetching: true});
  // this.props.fetchFeed(this.props.signedInUser.headers,this.props.signedInUser.data.id,this.props.signedInUser.data.email).then( (res) => {
  //   this.setState({fetching: false })
  // })
  this.setState({fetching: true});

this.props.CHAT[1].messages.map((oneMessage)=>{
  console.log("inside loop");
    this.setState((previousState) => {
         return {
           messages: GiftedChat.append(previousState.messages, oneMessage),
         };
       });
  })
  this.props.fetchLastFiveMessages(1).then( (res) => {

    this.setState({fetching: false });
    console.log("Im here ");
    console.log("props are", this.props);
    //TODO:call acion to update store here

//
// this.props.LAST_MESSAGES.data.map((oneMessage)=>{
//   console.log("one Message is",  oneMessage);
//   this.props.recieveMessage(oneMessage);//action call
//
//   this.props.messageObj[1].map((realMessage)=>{
//     console.log("real message always updates", realMessage);
//   })
//   });

  // this.props.messageObj[1].map((realMessage)=>{
  //   console.log("real message always updates", realMessage);
  // })
  //     let testMessage = {
  //       _id : oneMessage.id,
  //       text: oneMessage.content,
  //       createdAt: new Date(Date.UTC(2016, 5, 11, 17, 20, 0)),
  //       user: {
  //         _id: 2,
  //         name: 'React Native',
  //         avatar: 'https://facebook.github.io/react/img/logo_og.png',
  //       },
  //       // image: 'https://facebook.github.io/react/img/logo_og.png',
  //       // additional custom parameters
  //     }
  //
  // this.setState((previousState) => {
  //      return {
  //        messages: GiftedChat.append(previousState.messages, testMessage),
  //      };
  //    });






    // this.setState({
    //   messages: [
    //     {
    //       _id: 1,
    //       text: 'Hello developer test',
    //       createdAt: new Date(Date.UTC(2016, 7, 30, 17, 20, 0)),
    //       user: {
    //         _id: 2,
    //         name: 'React Native',
    //         avatar: 'https://facebook.github.io/react/img/logo_og.png',
    //       },
    //     },
    //     {
    //       _id: 2,
    //       text: 'Hello developer test',
    //       createdAt: new Date(Date.UTC(2016, 7, 30, 17, 20, 0)),
    //       user: {
    //         _id: 2,
    //         name: 'React Native',
    //         avatar: 'https://facebook.github.io/react/img/logo_og.png',
    //       },
    //     },{
    //       _id: 3,
    //       text: 'Hello developer test',
    //       createdAt: new Date(Date.UTC(2016, 7, 30, 17, 20, 0)),
    //       user: {
    //         _id: 2,
    //         name: 'React Native',
    //         avatar: 'https://facebook.github.io/react/img/logo_og.png',
    //       },
    //     },
    //     {
    //       _id: 4,
    //       text: 'Hello developer test',
    //       createdAt: new Date(Date.UTC(2016, 7, 30, 17, 20, 0)),
    //       user: {
    //         _id: 2,
    //         name: 'React Native',
    //         avatar: 'https://facebook.github.io/react/img/logo_og.png',
    //       },
    //     },
    //   ],
    // });//setState
  })


}

fetchFeedItems(){
    return Object.keys(this.props.feedData).map(key =>this.props.feedData[key])
}

  render() {
return(

    <View style={{ flex: 1, paddingTop: STATUS_BAR_HEIGHT }}>
      <View>
        <TouchableHighlight onPress = {this.onPressBack}>
          <Text>
            go back
          </Text>
        </TouchableHighlight>

      </View>

          <GiftedChat
            messages={this.state.messages}
            onSend={this.handleSend}
            user={{
              _id: 1,
            }}
          />
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
      messageObj : state.messageObj,
      CHATOBJ : state.chatOBJ,
      LAST_MESSAGES : state.lastFiveMessages,
      CHAT : state.chatList,
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(chatPage );
