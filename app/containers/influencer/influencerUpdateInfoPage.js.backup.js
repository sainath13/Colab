import React, { Component } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  TextInput,
} from 'react-native';

// import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
  // import { Kaede,  } from 'react-native-textinput-effects';

// import ModalPicker from 'react-native-modal-picker'

// import Hoshi from '../animatedTextInput/Hoshi.js'

import { Actions } from 'react-native-router-flux';

// import Button from 'react-native-button';
// import CircleCheckBox from 'react-native-circle-checkbox';
// eslint-disable-next-line no-console
console.ignoredYellowBox = [
  // https://github.com/facebook/react-native/issues/9093
  'Warning: You are manually calling a React.PropTypes validation',
];
// influencerViewPage
class  InfluencerUpdateInfoPage extends Component {
  _onPressInfluencerUpdateInfoSave(){
    Actions.tabbar();
  }
  render() {

    return (
      <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>
          Update your info
        </Text>
      </View>
      <View style={styles.inputForm}>
        <View style={styles.formHeading}>
          <Text style={{paddingLeft: 20, fontSize : 25}}>
              Private information
          </Text>
        </View>
        <View style={styles.inputDoubleRow}>
            <TextInput style ={styles.formTextDouble}
              placeholder = "Sainath"
              underlineColorAndroid={'transparent'}
            >
            </TextInput>
            <View style={{margin: 5}}>
            </View>
            <TextInput style ={styles.formTextDouble}
              placeholder = "Sainath"
              underlineColorAndroid={'transparent'}
            >
            </TextInput>


        </View>
        <View style={styles.inputRow}>
          <TextInput style ={styles.formText}
            placeholder = "Sainath"
            underlineColorAndroid={'transparent'}
          >
          </TextInput>
        </View>
        <View style={{flex : 10}}>
            <TouchableHighlight onPress = {this._onPressInfluencerUpdateInfoSave}>
                <Text>
                    click me to go to TabView
                </Text>
            </TouchableHighlight>
        </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
container:{
    flex : 1,
    backgroundColor: '#F5FCFF'
},
inputForm:{
  flex : 15,
},
formHeading:{
  flex: 1,
  // justifyContent:'flex',

},
formText:{
  fontSize : 20,
},
header : {
  flex : 3,
  justifyContent: 'center',
  alignItems : 'center',
  backgroundColor : '#5469A4',
},
headerText:{
  fontSize : 25,
  color : 'white',

},
inputRow:{
  flex : 2,
  // padding: 10,
  margin : 5,
  backgroundColor : '#E3E8EE',
  // alignItems : 'center',
  flexDirection : 'row',

},
inputDoubleRow:{
  flex : 2,
  flexDirection : 'row',
  // padding: 10,
  margin : 5,
  // backgroundColor : '#E3E8EE',
  // alignItems : 'center',
  justifyContent: 'center',
},

formText:{
  color : 'black',
  fontSize : 15,
  flex : 1,
  paddingLeft : 30,
  // textAlign : 'center'
},
formTextDouble: {
  color : 'black',
  backgroundColor : '#E3E8EE',
  fontSize : 15,
  flex : 1,
  paddingLeft : 30,

  },
});


export default (InfluencerUpdateInfoPage);
