import React, {Component} from 'react';

import {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  ScrollView,
  View,
  Image,
  StatusBar,
  Dimensions,
  Platform,
  TouchableOpacity
} from 'react-native';
import {GiftedChat} from 'react-native-gifted-chat';
import Icon from 'react-native-vector-icons/FontAwesome';
import moment from 'moment'
import {Actions} from 'react-native-router-flux';

const SCREEN_HEIGHT = Dimensions
  .get('window')
  .height
const STATUS_BAR_HEIGHT = 40
const CHAT_MAX_HEIGHT = SCREEN_HEIGHT - STATUS_BAR_HEIGHT

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {ActionCreators} from '../../actions'

class chatPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      messages: [],
      fetching: true
    };
  }
  onPressBack() {
    Actions.pop();
  }
  componentDidMount() {}
  sendMessage(messageSend = []) {
    message = {};
    message.message_to = this
      .props
      .chat_pair
      .user2
      .substring(1);
    message.message_to_type = this
      .props
      .chat_pair
      .user2
      .substring(0, 1)
    message.message = messageSend[0].text;
    message.chat_pair_id = "" + this.props.chat_pair.id;
    this
      .props
      .chat('send_message', {message})

  }
  componentWillMount() {}
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
              {(this.props.username).slice(0, 20)}
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
          <GiftedChat
            messages={this.props.chatList[this.props.chat_pair.id].messages}
            onSend={(messageSend) => this.sendMessage(messageSend)}
            user={{
            _id: this.props.chat_pair.user1
          }}/>
        </View>
      </View>
    )
  }
};

var styles = StyleSheet.create({
  header: {
    flex: 1,
    backgroundColor: '#6563A4',
    borderColor: '#333156',
    borderBottomWidth: 3,
    flexDirection: 'row'
  },
  notificationIcon: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center'
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
    color: '#212121',
    fontFamily: 'GothamRounded-Medium'
  },
  notificationItem: {
    flex: 7,
    paddingRight: 10,
    justifyContent: 'center'
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
    justifyContent: 'flex-end'
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
    flexDirection: 'row'
  },
  influencerContainer: {
    flex: 1,
    backgroundColor: '#595896',
    margin: 10,
    borderRadius: 5
  },
  brandContainer: {
    flex: 1,
    backgroundColor: '#595896',
    margin: 10,
    borderRadius: 5
  },
  notificationBar: {
    flex: 1,
    marginLeft: 10,
    justifyContent: 'center'
  },
  notificationBarText: {
    fontSize: 20,
    fontFamily: 'GothamRounded-Book'
  },
  listView: {
    flex: 7
  }
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}
function mapStateToProps(state) {
  return {chatList: state.chatList, chat: state.chatObj};
}

export default connect(mapStateToProps, mapDispatchToProps)(chatPage);
