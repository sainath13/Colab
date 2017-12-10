import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  Image,
  View,
  TouchableHighlight,
  StatusBar,
  ScrollView,
} from 'react-native';
//import RNActionCable from 'react-native-actioncable';
import Icon from 'react-native-vector-icons/FontAwesome';
//import ActionCableProvider, { ActionCable } from 'react-actioncable-provider';

const GLOBAL = require('../../actions/Globals');
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ActionCreators } from '../../actions'
import { Actions } from 'react-native-router-flux';
//console.log(this);
//console.log("This line can you see ______******");
//const cable = RNActionCable.createConsumer('ws://localhost:3000/cable?user_id=5');

class ChatClassActionCable extends Component {
constructor(props) {
  super(props)
  //setting it to false if okay. but might need to think about it later
  //in some cases was not working so its true now. :\
  //this.onReceived = this.onReceived.bind(this);
  this.state = { fetching: true }
}

fetchChatList(){
  // console.log("called fetch Chat list");
  return Object.keys(this.props.chatList).map(key =>this.props.chatList[key]);
}
componentDidMount(){
  // console.log("Component mounted");
  // console.log("this is this",this);
  // console.log("performed");
}
	state = {
		messages: []
	}

//	onReceived = (data) => {
//    console.log(this)
//    console.log("received a message");
//    console.log(data);
//    if(data.method == "get_chat_pairs"){
//        //call set chat pair action  
//      this.props.setChatList2(data.chat_pairs);
//      console.log(this);
//   this.setState({fetching: false })
//    }
//	//	this.setState({
//	//		messages: [
//	//			data.message,
//	//			...this.state.messages
//	//		]
//	//	})
//	}
  sendMessage = () => {
    console.log("test");
    var message = {}
    // console.log(this.props.chat)
    //message.message_to = "1"//siddhesh
    //message.message_from = "2"//sainath
    //message.message_to_type = "I"//sainath
    //message.message = "IM message from sainath"
    message.chat_pair_id = "2" 

    //i really want to perform a send message. but I dont have refs.roomChanel here. so sad.
  // Call perform or send
    //this.props.chat.perform('send_message', {message})
    //this.props.chat.perform('get_chat_pairs');
    this.props.chat('get_chat_pair_messages',{message})
}

getLast5Messages(chat_pair){
    var message = {}
    message.chat_pair_id = chat_pair.id;
    this.props.chat('get_chat_pair_messages',{message})
    Actions.chatPage2({chat_pair: chat_pair});
}
	render() {
return(
  <View style={{flex : 1}}>
	{	//		<ActionCable ref='roomChannel' channel={{channel: 'MessageChannel'}} onReceived={this.onReceived} />
 }
 <StatusBar
    backgroundColor="#6563A4"
    barStyle="light-content"
  />
  <View style={styles.header}>
  <TouchableHighlight style={{flex : 1, alignItems : 'center', justifyContent : 'center', marginTop: 16 }}  onPress={ ()=>{  Actions.pop(); } } >
  <View style={{}}>
                <Icon name="chevron-left" size={25} color='white' >
                </Icon>
  </View>
  </TouchableHighlight>
  <View style={{flex : 7, alignItems : 'center', justifyContent : 'center'}}>
    <Text style={styles.headerText}>
Chat
    </Text>
  </View>
  <TouchableHighlight style={{flex : 1, alignItems : 'center', justifyContent : 'center', marginTop: 16 }}  onPress={ ()=>{ Actions.pop(); } } >
  <View style={{}}>
  </View>
  </TouchableHighlight>
  </View>

  <View style = {styles.content}>
    <View style={styles.notificationBar}>
    </View>
    <View style={styles.listView}>
      <ScrollView>
        {this.fetchChatList().map((chatListItem) => {
          // console.log("logging -------------",chatListItem);
             return ( <TouchableHighlight key={chatListItem.chat_pair.id}
                            onPress={ ()=>{
                              // console.log(chatListItem.chat_pair.id);
                              this.getLast5Messages(chatListItem.chat_pair);
                            } }>

                <View style={{flex : 1 ,  flexDirection : 'row', justifyContent : 'center' , borderBottomWidth: 0.5, borderBottomColor: '#E0E0E0', }}>
                    <View style={{flex : 1, alignItems : 'center',justifyContent:'center' }}>
                          <Image
                            style = {{width: 40, height: 40, borderRadius: 20}}
                            source = { { uri: "https://randomuser.me/api/portraits/thumb/men/4.jpg" }}
                          />
                    </View>
                    <View style={{flex : 4, justifyContent : 'center',
                        marginTop : 10,
                        marginBottom : 10,
                        marginLeft : 5,
                        marginRight : 5,
                  }}>
                        <Text style={{
                            fontSize: 16,
                            fontFamily :'GothamRounded-Medium',
                            marginLeft : 0
                        }}>
                         {chatListItem.chat_pair.user2_name} 
                        </Text>
                        <Text style={{
                            fontSize: 16,
                            fontFamily :'GothamRounded-Book',
                            marginLeft : 0,
                            color : '#9C9C9C',
                        }}>
                      You: Hi I want to collaborate
                        </Text>
                    </View>
                </View>

                     </TouchableHighlight>
          )  })}
     </ScrollView>
    </View>

  </View>
  <View style={{flex : 1}}>
  </View>
</View>
)
}
}

var styles = StyleSheet.create({
  header: {
     flex: 1,
     alignItems : "center",
     justifyContent : "center",
    borderColor : '#333156',
    borderBottomWidth : 3,
    flexDirection : 'row',
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
  paddingTop : 25,
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
    flex : 8,
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
    marginTop : 10,
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
      chatList : state.chatList,
      chat : state.chatObj
      // messageObj : state.messageObj,
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatClassActionCable);
