import React, {Component} from 'react';
import {AppRegistry, View, StatusBar} from 'react-native';

class OpeningPage extends Component {
  render() {
    return (
      <View style={{
        flex: 1
      }}>
        <StatusBar backgroundColor="#6563A4" barStyle="light-content"/>
      </View>
    )
  }
};

export default(OpeningPage);
