import React, { Component } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  TextInput,
  StatusBar,
  Image
} from 'react-native';
const Dimensions = require('Dimensions');
import Checkbox from 'react-native-custom-checkbox';

import { Actions } from 'react-native-router-flux';
console.ignoredYellowBox = [
  // https://github.com/facebook/react-native/issues/9093
  'Warning: You are manually calling a React.PropTypes validation',
];
// influencerViewPage
class  NicheSelectPage extends Component {
 _onPressInfluencerUpdateInfoSave(){
    Actions.pop();
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
      Niche
    </Text>
  </View>
  <View style={styles.content}>
  <ScrollView style={{flex : 9}}>
    <View style={styles.slot}>
      <View style={styles.slot_element}>
        <Checkbox
          checked={false}
          style={{backgroundColor: '#f2f2f2', color:'#6563A4', borderRadius: 5}}
          />
          <View style={styles.slot_text}>
            <Text style={styles.slot_text1}>
              Music
            </Text>
          </View>
      </View>
      <View style={styles.slot_element}>
        <Checkbox
          checked={false}
          style={{backgroundColor: '#f2f2f2', color:'#6563A4', borderRadius: 5}}
          />
          <View style={styles.slot_text}>
            <Text style={styles.slot_text1}>
              Humor
            </Text>
          </View>
      </View>
    </View>
    <View style={styles.slot}>
      <View style={styles.slot_element}>
        <Checkbox
          checked={false}
          style={{backgroundColor: '#f2f2f2', color:'#6563A4', borderRadius: 5}}
          />
          <View style={styles.slot_text}>
            <Text style={styles.slot_text1}>
              Fasion
            </Text>
          </View>
      </View>
      <View style={styles.slot_element}>
        <Checkbox
          checked={false}
          style={{backgroundColor: '#f2f2f2', color:'#6563A4', borderRadius: 5}}
          />
          <View style={styles.slot_text}>
            <Text style={styles.slot_text1}>
              Motivation
            </Text>
          </View>
      </View>
    </View>
    <View style={styles.slot}>
      <View style={styles.slot_element}>
        <Checkbox
          checked={false}
          style={{backgroundColor: '#f2f2f2', color:'#6563A4', borderRadius: 5}}
          />
          <View style={styles.slot_text}>
            <Text style={styles.slot_text1}>
              Footware
            </Text>
          </View>
      </View>
      <View style={styles.slot_element}>
        <Checkbox
          checked={false}
          style={{backgroundColor: '#f2f2f2', color:'#6563A4', borderRadius: 5}}
          />
          <View style={styles.slot_text}>
            <Text style={styles.slot_text1}>
              Clothing
            </Text>
          </View>
      </View>
      </View>
    <View style={styles.slot}>
      <View style={styles.slot_element}>
        <Checkbox
          checked={false}
          style={{backgroundColor: '#f2f2f2', color:'#6563A4', borderRadius: 5}}
          />
          <View style={styles.slot_text}>
            <Text style={styles.slot_text1}>
              Beauty
            </Text>
          </View>
      </View>
      <View style={styles.slot_element}>
        <Checkbox
          checked={false}
          style={{backgroundColor: '#f2f2f2', color:'#6563A4', borderRadius: 5}}
          />
          <View style={styles.slot_text}>
            <Text style={styles.slot_text1}>
              Cosmetics
            </Text>
          </View>
      </View>
    </View>
    <View style={styles.slot}>
      <View style={styles.slot_element}>
        <Checkbox
          checked={false}
          style={{backgroundColor: '#f2f2f2', color:'#6563A4', borderRadius: 5}}
          />
          <View style={styles.slot_text}>
            <Text style={styles.slot_text1}>
              Photoggraphy
            </Text>
          </View>
      </View>
      <View style={styles.slot_element}>
        <Checkbox
          checked={false}
          style={{backgroundColor: '#f2f2f2', color:'#6563A4', borderRadius: 5}}
          />
          <View style={styles.slot_text}>
            <Text style={styles.slot_text1}>
              Stud
            </Text>
          </View>
      </View>
    </View>
    <View style={styles.slot}>
      <View style={styles.slot_element}>
        <Checkbox
          checked={false}
          style={{backgroundColor: '#f2f2f2', color:'#6563A4', borderRadius: 5}}
          />
          <View style={styles.slot_text}>
            <Text style={styles.slot_text1}>
              Glamor
            </Text>
          </View>
      </View>
      <View style={styles.slot_element}>
        <Checkbox
          checked={false}
          style={{backgroundColor: '#f2f2f2', color:'#6563A4', borderRadius: 5}}
          />
          <View style={styles.slot_text}>
            <Text style={styles.slot_text1}>
              Quotes
            </Text>
          </View>
      </View>
    </View>
    <View style={styles.slot}>
      <View style={styles.slot_element}>
        <Checkbox
          checked={false}
          style={{backgroundColor: '#f2f2f2', color:'#6563A4', borderRadius: 5}}
          />
          <View style={styles.slot_text}>
            <Text style={styles.slot_text1}>
              ShoutOut
            </Text>
          </View>
      </View>
      <View style={styles.slot_element}>
        <Checkbox
          checked={false}
          style={{backgroundColor: '#f2f2f2', color:'#6563A4', borderRadius: 5}}
          />
          <View style={styles.slot_text}>
            <Text style={styles.slot_text1}>
              Adventure
            </Text>
          </View>
      </View>
    </View>
    <View style={styles.slot}>
      <View style={styles.slot_element}>
        <Checkbox
          checked={false}
          style={{backgroundColor: '#f2f2f2', color:'#6563A4', borderRadius: 5}}
          />
          <View style={styles.slot_text}>
            <Text style={styles.slot_text1}>
              Luxery
            </Text>
          </View>
      </View>
      <View style={styles.slot_element}>
        <Checkbox
          checked={false}
          style={{backgroundColor: '#f2f2f2', color:'#6563A4', borderRadius: 5}}
          />
          <View style={styles.slot_text}>
            <Text style={styles.slot_text1}>
              Rich
            </Text>
          </View>
      </View>
    </View>
    <View style={styles.slot}>
      <View style={styles.slot_element}>
        <Checkbox
          checked={false}
          style={{backgroundColor: '#f2f2f2', color:'#6563A4', borderRadius: 5}}
          />
          <View style={styles.slot_text}>
            <Text style={styles.slot_text1}>
              Startups
            </Text>
          </View>
      </View>
      <View style={styles.slot_element}>
        <Checkbox
          checked={false}
          style={{backgroundColor: '#f2f2f2', color:'#6563A4', borderRadius: 5}}
          />
          <View style={styles.slot_text}>
            <Text style={styles.slot_text1}>
              Business
            </Text>
          </View>
      </View>
    </View>
    </ScrollView>

    </View>

      <TouchableHighlight style={{
          flex: 1,
          alignItems : "center",
          justifyContent : "center",
          backgroundColor: '#6563a4',
        }}onPress = {this._onPressInfluencerUpdateInfoSave}>
      <View style={{
          }}>
          <Text style={{
            color: 'white',
            fontSize : 25,
            fontFamily : 'GothamRounded-Medium',
            }}>
            Save
          </Text>
      </View>
          </TouchableHighlight>
    </View>
)}
}

var styles = StyleSheet.create({
  header: {
     flex: 1,
     alignItems : "center",
     justifyContent : "center",
     backgroundColor: '#6563A4',
    },
  headerText:{
// color : '#6563A4',
  color: 'white',
  fontSize : 25,
  paddingTop : 25,
  fontFamily : 'GothamRounded-Bold'
// fontFamily : 'arial'
  },
  content:{
    flex : 8,
    backgroundColor : '#FFFFFF',
  },
  slot:{
    flex: 2,
      flexDirection: 'row',
      //borderWidth : 1,
      //borderColor : 'red',
  },
  slot_element: {
    flex : 1,
    backgroundColor : '#F8F9F9',
    marginLeft: 5,
    marginRight: 5,
    marginTop: 7,
    marginBottom: 7,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 5,
    flexDirection: 'row',
  alignItems : 'center',
  },
  slot_text: {
    marginLeft: 5,
  },
  slot_text1: {
    color: '#6563A4',
    fontSize: 17,
    fontFamily : 'GothamRounded-Book'
  },
});
export default (NicheSelectPage);
