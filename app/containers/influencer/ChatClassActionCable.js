import React, {Component} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  Image,
  View,
  TouchableHighlight,
  StatusBar,
  ScrollView,
  Platform,
  TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const GLOBAL = require('../../actions/Globals');
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {ActionCreators} from '../../actions'
import {Actions} from 'react-native-router-flux';
import { ACCEPT_COLLAB_REQUEST_BUSINESS } from '../../actions/types';

class ChatClassActionCable extends Component {
  constructor(props) {
    super(props)
    this.state = {
      fetching: true
    }
  }

  fetchChatList() {
    return Object
      .keys(this.props.chatList)
      .map(key => this.props.chatList[key]);
  }
  componentDidMount() {}
  state = {
    messages: []
  }

  sendMessage = () => {
    var message = {}
    message.chat_pair_id = "2"
    this
      .props
      .chat('get_chat_pair_messages', {message})
  }

  getLast5Messages(chat_pair) {
    var message = {}
    message.chat_pair_id = chat_pair.id;
    this
      .props
      .chat('get_chat_pair_messages', {message})
    Actions.chatPage2({chat_pair: chat_pair, username: chat_pair.user2_name});
  }
  render() {
    return (
      <View style={{
        flex: 1
      }}>
        {Platform.OS == "ios"
          ? <StatusBar backgroundColor="#6563A4" barStyle="dark-content"/>
          : <StatusBar backgroundColor="#43416d" barStyle="light-content"/>
}
        <View style={styles.header}>
          <TouchableOpacity
            style={Platform.OS == "ios"
            ? {
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 16
            }
            : {
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center'
            }}
            onPress={() => {
            Actions.pop();
          }}>
            <View style={{}}>
              <Icon name="chevron-left" size={25} color='white'></Icon>
            </View>
          </TouchableOpacity>
          <View
            style={{
            flex: 7,
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Text
              style={Platform.OS == "ios"
              ? styles.headerText
              : styles.headerTextAndroid}>
              Chat
            </Text>
          </View>
          <View
            style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 16
          }}
            onPress={() => {
            Actions.pop();
          }}></View>
        </View>

        <View style={styles.content}>
          <View style={styles.notificationBar}></View>
          <View style={styles.listView}>
            <ScrollView>
              {this
                .fetchChatList()
                .map((chatListItem) =>{
                  return (
                    <TouchableOpacity
                      key={chatListItem.chat_pair.id}
                      onPress={() => {
                      this.getLast5Messages(chatListItem.chat_pair);
                    }}>

                      <View
                        style={{
                        flex: 1,
                        flexDirection: 'row',
                        justifyContent: 'center',
                        borderBottomWidth: 0.5,
                        borderBottomColor: '#E0E0E0'
                      }}>
                        <View
                          style={{
                          flex: 1,
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}>
                          <Image
                            style={{
                            width: 40,
                            height: 40,
                            borderRadius: 20
                          }}
                            source={{
                            uri: "https://randomuser.me/api/portraits/thumb/men/4.jpg"
                          }}/>
                        </View>
                        <View
                          style={{
                          flex: 4,
                          justifyContent: 'center',
                          marginTop: 10,
                          marginBottom: 10,
                          marginLeft: 5,
                          marginRight: 5
                        }}>
                          <Text
                            style={{
                            fontSize: 16,
                            fontFamily: 'GothamRounded-Medium',
                            marginLeft: 0
                          }}>
                            {chatListItem.chat_pair.user2_name}
                          </Text>
                          <Text
                            style={{
                            fontSize: 15,
                            fontFamily: 'GothamRounded-Book',
                            marginLeft: 0,
                            color: '#9C9C9C'
                          }}>
                          { chatListItem.messages ? 
                            (chatListItem.messages[0].user.name +" : "+ chatListItem.messages[0].text).length > 27  ?
                            (chatListItem.messages[0].user.name +" : "+ chatListItem.messages[0].text).slice(0,27) + "..." 
                            :
                            (chatListItem.messages[0].user.name +" : "+ chatListItem.messages[0].text).slice(0,30)

                            : chatListItem.msg ?  (chatListItem.msg_from + ": " + chatListItem.msg).length > 27?
                            (chatListItem.msg_from + ": " + chatListItem.msg).slice(0,27)+ "..."  
                            :
                            (chatListItem.msg_from + ": " + chatListItem.msg).slice(0,30)
                            : "Start business talk"}
                          </Text>
                        </View>
                        <View
                          style={{
                          flex: 1,
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}>
                        {
                         chatListItem.chat_pair.current_user_has_unread_messages ?  
                        <Icon name="dot-circle-o" size={20} color='#6563A4'></Icon>
                        : null
                        }
                        </View>
                      </View>

                    </TouchableOpacity>
                  )
                })}
            </ScrollView>
          </View>

        </View>
      </View>
    )
  }
}

var styles = StyleSheet.create({
  header: {
    flex: 1,
    justifyContent: "center",
    borderColor: '#333156',
    borderBottomWidth: 3,
    flexDirection: 'row',
    backgroundColor: '#6563A4'
  },
  notificationIcon: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor : 'black',
  },
  notificationItemText: {
    paddingLeft: 20,
    fontSize: 16,
    color: '#424242',
    fontFamily: 'GothamRounded-Book'
  },
  notificationItemTextBold: {
    paddingLeft: 20,
    fontSize: 16,
    // fontWeight : 'bold',
    color: '#212121',
    fontFamily: 'GothamRounded-Medium'
  },
  notificationItem: {
    flex: 7,
    // borderColor : 'red', borderBottomWidth : 1, borderBottomRightRadius : 5,
    // borderBottomColor : 'black', alignItems : 'center',
    paddingRight: 10,
    justifyContent: 'center',
    // backgroundColor : 'red',
  },
  headerTextAndroid: {
    color: 'white',
    fontSize: 25,
    fontFamily: 'GothamRounded-Bold'
  },
  headerText: {
    color: 'white',
    fontSize: 25,
    paddingTop: 25,
    fontFamily: 'GothamRounded-Bold'
    // fontFamily : 'arial'
  },
  listElement: {
    margin: 1,
    height: 65,
    flexDirection: 'row'
  },
  headingContainer: {
    flex: 2,
    alignItems: 'flex-start',
    justifyContent: 'flex-start'
  },
  contentHeadingText: {
    fontSize: 25,
    color: 'white',
    fontFamily: 'GothamRounded-Medium'
  },
  bottomNumberTextContainer: {
    flex: 4,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    // borderColor: 'red', borderWidth : 2,
  },
  bottomNumberText: {
    fontSize: 45,
    color: 'white',
    fontFamily: 'GothamRounded-Medium'
  },
  content: {
    flex: 9,
    backgroundColor: '#FFFFFF'
  },
  contentPic: {
    flex: 2,
    backgroundColor: '#6563A4',
    flexDirection: 'row',
    // borderColor : 'red', borderWidth : 3,
  },
  influencerContainer: {
    flex: 1,
    backgroundColor: '#595896',
    margin: 10,
    borderRadius: 5
    // borderColor: 'red', borderWidth : 2,
  },
  brandContainer: {
    flex: 1,
    backgroundColor: '#595896',
    margin: 10,
    borderRadius: 5
    // borderColor: 'red', borderWidth : 2,
  },
  notificationBar: {
    marginTop: 10,
    justifyContent: 'center'
  },
  notificationBarText: {
    fontSize: 20,
    fontFamily: 'GothamRounded-Book'
  },
  listView: {
    flex: 7,
    // borderWidth : 1, borderColor : 'red',
  }
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}
function mapStateToProps(state) {
  return {chatList: state.chatList, chat: state.chatObj};
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatClassActionCable);
