/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight
} from 'react-native';
import RNActionCable from 'react-native-actioncable';
import ActionCableProvider, { ActionCable } from 'react-actioncable-provider';

const GLOBAL = require('../../actions/Globals');
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ActionCreators } from '../../actions'
import { Actions } from 'react-native-router-flux';
//console.log(this);
//console.log("This line can you see ______******");
//const cable = RNActionCable.createConsumer('ws://localhost:3000/cable?user_id=5');

class ChatClassActionCable extends Component {
	state = {
		messages: []
	}

	onReceived = (data) => {
		this.setState({
			messages: [
				data.message,
				...this.state.messages
			]
		})
	}
  sendMessage = () => {
    console.log("test");
    var message = {}
    message.message_to = "1"//siddhesh
    message.message_from = "2"//sainath
    message.message = "IM message from sainath"
  // Call perform or send
    this.refs.roomChannel.perform('send_message', {message})
}
	render() {
		return (
			<View style={styles.container}>
				<ActionCable ref='roomChannel' channel={{channel: 'MessageChannel'}} onReceived={this.onReceived} />
        <TouchableHighlight onPress={this.sendMessage}>
        <Text style={styles.welcome}>
          Welcome to React Native!
          </Text>
        </TouchableHighlight>
        <View>
        	<Text>There are {this.state.messages.length} messages.</Text>
        </View>
        {this.state.messages.map((message, index) =>
        	<View key={index} style={styles.message}>
		        <Text style={styles.instructions}>
		          {message}
		        </Text>
		      </View>
	      )}
      </View>
	  )
	}
}

export class TestRNActionCable extends Component {
  render() {
    return (
    	<ActionCableProvider cable={RNActionCable.createConsumer('ws://'+GLOBAL.BASE_URL+'/cable?id='+this.props.signedInUser.basic_data.id+"&token="+this.props.loginInfo.accessToken+"&client="+this.props.loginInfo.client+"&user_type=I")}>
	      <ChatClassActionCable/>
	     </ActionCableProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  message: {
  	borderBottomWidth: 1,
  	borderColor: 'black'
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

function mapDispatchToProps(dispatch){
    return bindActionCreators( ActionCreators, dispatch);
}
// export default connect(({routes}) => ({routes}))(Test);
function mapStateToProps(state){
    return {
      // recipeCount : state.recipeCount,
      loginInfo : state.loginInfo,
      signedInUser : state.signedInUser,
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(TestRNActionCable);