//sad error took so much time.
//  onpress () => functioncall
// and onpress () _funtioncall
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
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ActionCreators } from '../../actions'
const FBSDK = require('react-native-fbsdk');
const {
  LoginManager,
  AccessToken,
  LoginButton
} = FBSDK;

import Spinner from 'react-native-loading-spinner-overlay';

import Icon from 'react-native-vector-icons/FontAwesome';

class SignInPage extends Component{
   constructor(props) {
    super(props);
    this.onPressInfluencerSignIn = this.onPressInfluencerSignIn.bind(this);
    this.callLoginRoute = this.callLoginRoute.bind(this);
    this.state = {
        username : "",
        password : "",
        spinnerVisible : false,
    };
  }
  callLoginRoute(accessToken){
   this.props.signIn(accessToken).then( (res) => {
    this.setState({spinnerVisible: false });
    Actions.UpdateInfoPage();
  })
  }
  onPressInfluencerSignIn(){
    var myprops = this;
    LoginManager.logInWithReadPermissions(['public_profile','email','user_birthday','user_location']).then(
      function(result) {
      if (result.isCancelled) {
         alert('Login cancelled');
      } else {
        //  alert('Login success with permissions: '
        //  +result.grantedPermissions.toString());
         AccessToken.getCurrentAccessToken().then(
                 (data) => {
                   if(data){
                    myprops.setState({
                      spinnerVisible: true
                    }, function () {
                  });
                  myprops.callLoginRoute(data.accessToken.toString());            
                }
                 }
               )//TODO : do the log-out thing from fbsdk github page
      }
   },
   function(error) {
      alert('Login fail with error: ' + error);
   }
);   


  }
  onPressInfluencerGoToSignUp(){
    Actions.SignUpPage();
  }

  render() {
  return(
  <View style={{flex : 1}}>
  <StatusBar
    backgroundColor="white"
    barStyle="light-content"
  />
  
  <View style={styles.header}>
    <Text style={styles.headerText}>
      Influxcer
    </Text>
  </View>
  <View style = {styles.content}>
  {this.state.spinnerVisible? <View style={{backgroundColor : '#f0f0f0'}}><Spinner visible={this.state.spinnerVisible} textContent={"Loading..."} textStyle={{color: '#FFF'}} /></View> : null}
    <View style={styles.contentPic}>
    </View>
    <View style={styles.form}>
        <View style={styles.formElementWrapper}>
        <View style={styles.formElement}>
        <View style={styles.formElementTextContainer}>
            <Icon color='grey'name='envelope' type='font-awesome' size={26}/>
        </View>
        <View style={styles.inputBox}>
        <View style={styles.inputTextWrapper}>
            <TextInput style={styles.inputText}
            onChangeText={(username) => this.setState({username})}
            value={this.state.username}
            underlineColorAndroid={'#E0E0E0'}
          >
          </TextInput>
      </View>
        </View>
      </View>

      <View style={styles.formElement}>
        <View style={styles.formElementTextContainer}>

            <Icon color='grey'name='lock' type='font-awesome' size={28}/>
        </View>
        <View style={styles.inputBox}>

        <View style={styles.inputTextWrapper}>
          <TextInput style={styles.inputText}
            onChangeText={(password) => this.setState({password})}
            value={this.state.password}
            underlineColorAndroid={'#E0E0E0'}
            password={true}
         >
          </TextInput>
        </View>
        </View>
      </View>

    </View>
    <TouchableHighlight style={{flex:1}} onPress={()=> {this.onPressInfluencerSignIn()}}>
      <View style={styles.submitButton}>
        <Text style={styles.submitButtonText}>
          Login with facebook
        </Text>
      </View>
    </TouchableHighlight>
    <TouchableHighlight style={{flex:1}} onPress={()=> {this.onPressInfluencerGoToSignUp() }}>
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
    flex : 10,
    backgroundColor : '#FFFFFF',
  },
  form:{
      flex : 5,
      //paddingBottom: 10,
      // borderColor : 'red',
      //borderWidth : 2
  },
 formElementWrapper:{
     flex :2.5,
     padding : 20,
     //borderRadius : 10,
 },
  submitButton:{
    backgroundColor:'grey',
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
    color: 'grey',
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
      //color : '#6563A4',
    color : 'red',
      // flex: 1,
  },
  formElementTextContainer:{
    flex: 3,
    flexDirection: 'column',
    backgroundColor : '#f8f8fa',
     alignItems : 'center',
    justifyContent : 'center',

      borderRadius : 4,
      borderWidth : 2,
      borderColor : '#E0E0E0'
  },
  inputBox:{
    flex: 9,
    backgroundColor : '#E0E0E0',
    // backgroundColor : '#fefef1'
      //borderWidth : 2,
      // borderColor : 'red'

      borderRadius : 4,
      borderWidth : 2,
      borderColor : '#E0E0E0'

  },
    inputTextWrapper :{
        flex : 1,
        padding : 10,
      backgroundColor : 'grey',//TODO : set this to a more light color
    },
  inputText:{
    fontSize : 20,
      flex :1 ,
      color : 'white',
    fontFamily : 'GothamRounded-Book',
      // marginLeft :15,

  },
  formElement:{
    flex : 1,
    flexDirection : 'row',
    // borderWidth: 1,
    borderBottomColor: '#E0E0E0',
      borderBottomWidth: 1,
      //padding : 3,
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
     backgroundColor: 'grey',
    },
  headerText:{
    color : 'white',
    fontSize : 25,
    paddingTop : 25,
    fontFamily : 'GothamRounded-Medium',
    // fontFamily : 'arial'
  }
});
function mapDispatchToProps(dispatch){
    return bindActionCreators( ActionCreators, dispatch);
}
// export default connect(({routes}) => ({routes}))(Test);
function mapStateToProps(state){
    return {
      // recipeCount : state.recipeCount,
      messageObj : state.messageObj,
      signedInUser : state.signedInUser,

    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SignInPage);
// export default connect(mapStateToProps)(Test);
