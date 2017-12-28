import React ,{ Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  TouchableHighlight,
  Text,
  TextInput,
  ScrollView,
  View,
  Platform,
  Image,
  StatusBar,
} from 'react-native';

import { Actions } from 'react-native-router-flux';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
class InsiderView extends Component{
  render(){
    return (
  <View style={{flex : 1}}>
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
            keyboardType={"email-address"}
            placeholder={"Enter here"}
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
            placeholder={"Enter here"}
            underlineColorAndroid={'#E0E0E0'}
            secureTextEntry={true}
          >
          </TextInput>
        </View>
      </View>

      <View style={styles.formElement}>
        <View style={styles.formElementTextContainer}>
          <Text style={styles.formElementText}>
            Confirm Password
          </Text>
        </View>
        <View style={styles.inputBox}>
          <TextInput style={styles.inputText}
            placeholder={"Enter here"}
            secureTextEntry={true}
            underlineColorAndroid={'#E0E0E0'}
          >
          </TextInput>
        </View>
      </View>
    <TouchableHighlight style={{flex:1}} onPress={()=> {this.onPressInfluencerSignUp() }}>
      <View style={styles.submitButton}>
        <Text style={styles.submitButtonText}>
          Sign Up
        </Text>
      </View>
    </TouchableHighlight>

    <TouchableHighlight style={{flex:1}} onPress={()=> {this.onPressInfluencerGoToSignIn() }}>
      <View style={styles.createAccountButton}>
        <Text style={styles.createAccountButtonText}>
          Already have an account
        </Text>
      </View>
    </TouchableHighlight>


    </View>
    </View>
  </View>    )}

}


class SignUpPage extends Component{
  render() {
  if (Platform.OS === 'ios') {
    return (
      <KeyboardAwareScrollView
        resetScrollToCoords={{
        x: 0,
        y: 0
      }}
        contentContainerStyle={{flex : 1}}
        scrollEnabled={false}
        style={{
        flex: 1
      }}>
        <StatusBar backgroundColor="#6563A4" barStyle="dark-content"/>
        <InsiderView {...this.props}></InsiderView>
      </KeyboardAwareScrollView>
    );
  } else {
    return (
      <KeyboardAvoidingView
        {...this.props}
        behavior="padding"
        keyboardVerticalOffset={-1000}
        style={{
        flex: 1
      }}>
        <ScrollView style={{
          flex: 1
        }}>
          <StatusBar backgroundColor="#43416d" barStyle="dark-content"/>
          <InsiderView {...this.props}></InsiderView>

        </ScrollView>
      </KeyboardAvoidingView>
    )

  }

}

};

var styles = StyleSheet.create({
  content:{
    flex : 10,
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
     fontFamily : 'GothamRounded-Medium',
    fontSize: 21,
  },
  submitButtonText:{
    color: 'white',
     fontFamily : 'GothamRounded-Medium',
    fontSize: 21,
  },
  formElementText:{
    fontSize : 15,
    fontFamily : 'GothamRounded-Medium',
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
     //backgroundColor : '#fefef1',
     //borderWidth : 1,
     //borderColor : 'red'
  },
  inputText:{
     //backgroundColor : '#fefef1',
    fontSize : 15,
    flex : 1,
     fontFamily : 'GothamRounded-Book',
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
    paddingTop : 25,
    fontFamily : 'GothamRounded-Medium',
  }
});

export default (SignUpPage);
