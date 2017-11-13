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
  TouchableHighlight,
  StatusBar,
  ScrollView,
} from 'react-native';
import RNActionCable from 'react-native-actioncable';
import ActionCableProvider, { ActionCable } from 'react-actioncable-provider';
import ChatClassActionCable from './ChatClassActionCable'
const GLOBAL = require('../../actions/Globals');
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ActionCreators } from '../../actions'
import { Actions } from 'react-native-router-flux';
//console.log(this);
//console.log("This line can you see ______******");
//const cable = RNActionCable.createConsumer('ws://localhost:3000/cable?user_id=5');

export class TestRNActionCable extends Component {
  render() {
    return (
    	<ActionCableProvider cable={RNActionCable.createConsumer('ws://'+GLOBAL.BASE_URL+'/cable?id='+this.props.signedInUser.basic_data.id+"&token="+this.props.loginInfo.accessToken+"&client="+this.props.loginInfo.client+"&user_type=I")}>
	      <ChatClassActionCable />
	     </ActionCableProvider>
    );
  }
}

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