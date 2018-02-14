import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';

import {
  View
} from 'react-native';

export default class TabIconProfile extends React.Component {
    render(){
      var isSelected = this.props.focused;
      if(isSelected){
        ICON =<Icon color='#2b2a48'name='user' type='font-awesome' size={30}/>
      }
      else{
        ICON = <Icon color='#8583b7'name='user' type='font-awesome' size={26}/>
      }
      return (
            <View style={{alignItems : "center", justifyContent : 'center'}}>
            {ICON}
            </View>
          )
    }
}
