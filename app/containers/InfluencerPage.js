import React ,{ Component } from 'react';
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
} from 'react-native';
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux';

class InfluencerPage extends Component{
  _onPressInfluencerSignIn(){
    Actions.influencerViewPage();
    //route to profile update page gui.
  }
  _onPressInfluencerGoToSignUp(){
    Actions.influencerSignUpPage();
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
      Influxcer
    </Text>
  </View>
  <View style = {styles.content}>
    <View style={styles.contentPic}>
    </View>
    <View style={styles.form}>
      <View style={styles.formElement}>
        <View style={styles.formElementTextContainer}>
          <Text style={styles.formElementText}>
            Email Id
          </Text>
        </View>
        <View style={styles.inputBox}>
          <TextInput style={styles.inputText}
            underlineColorAndroid={'#E0E0E0'}
          >
          </TextInput>
        </View>
      </View>

      <View style={styles.formElement}>
        <View style={styles.formElementTextContainer}>
          <Text style={styles.formElementText}>
            Password
          </Text>
        </View>
        <View style={styles.inputBox}>
          <TextInput style={styles.inputText}
            underlineColorAndroid={'#E0E0E0'}
          >
          </TextInput>
        </View>
      </View>
    <TouchableHighlight style={{flex:1}}onPress={this._onPressInfluencerSignIn}>
      <View style={styles.submitButton}>
        <Text style={styles.submitButtonText}>
          Sign In
        </Text>
      </View>
    </TouchableHighlight>
    <TouchableHighlight style={{flex:1}}onPress={this._onPressInfluencerGoToSignUp}>
      <View style={styles.createAccountButton}>
        <Text style={styles.createAccountButtonText}>
          Create an account
        </Text>
      </View>
    </TouchableHighlight>
    </View>
  </View>
</View>



)}
};

var styles = StyleSheet.create({
  content:{
    flex : 8,
    backgroundColor : '#FFFFFF',
  },
  form:{
    flex : 5,
  },
  submitButton:{
    backgroundColor:'#6563A4',
    flex:1,
    alignItems:'center',
    justifyContent: 'center',
  },
  createAccountButton:{
    // backgroundColor:'#6563A4',
    flex:1,
    alignItems:'center',
    justifyContent: 'center',
  },
  createAccountButtonText:{
    color: '#6563A4',
    // fontFamily : 'GothamRoundedMedium',
    fontSize: 21,
  },
  submitButtonText:{
    color: 'white',
    // fontFamily : 'GothamRoundedMedium',
    fontSize: 21,
  },
  formElementText:{
    fontSize : 15,
    // fontFamily : 'GothamRoundedMedium',
    marginLeft :30,
    color : '#6563A4'
    // flex: 1,
  },
  formElementTextContainer:{
    flex: 3,
    flexDirection: 'column',
    backgroundColor : '#f8f8fa',
    // alignItems : 'center',
    justifyContent : 'center',
  },
  inputBox:{
    flex: 5,
    backgroundColor : '#f8f8fa',
    // backgroundColor : '#fefef1'
    // borderWidth : 2,
    // borderColor : 'red'
  },
  inputText:{
    fontSize : 15,
    flex :1 ,
    backgroundColor : '#9593c0',//TODO : set this to a more light color
    // fontFamily : 'GothamRoundedBook',
    marginLeft :15,

  },
  formElement:{
    flex : 1,
    flexDirection : 'row',
    // borderWidth: 1,
    borderBottomColor: '#E0E0E0',
    borderBottomWidth: 1
    // borderWidth : 2,
    // borderColor : 'red'
  },
  contentPic:{
    flex : 4,
    backgroundColor : '#f3f3f1',
    // borderColor : 'red',
    // borderWidth : 3,
  },
  header: {
     flex: 1,
     alignItems : "center",
     justifyContent : "center",
     backgroundColor: '#6563A4',
    },
  headerText:{
    color : 'white',
    fontSize : 25,
    // fontFamily : 'GothamRoundedMedium',
    // fontFamily : 'arial'
  }
});


export default (InfluencerPage);
