import React, { Component } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  KeyboardAvoidingView,
  View,
  TextInput,
  StatusBar,
  Keyboard,
  Alert,
  AsyncStorage,
  Image,
  Platform
} from 'react-native';
const Dimensions = require('Dimensions');
import Icon from 'react-native-vector-icons/FontAwesome';
import Spinner from 'react-native-loading-spinner-overlay';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
//also need to provide information here
//but profile route gives us this information anyway right?
//so it can be done this way
//always read the profileData state here 
//if available well and good else show nothing
import { Actions } from 'react-native-router-flux';
import PopupDialog, { SlideAnimation, DialogTitle, DialogButton } from 'react-native-popup-dialog';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ActionCreators } from '../../actions'

class  SettingPage extends Component {

constructor(props) {
  super(props)
  this.state = { fetching: true ,

  }
}
componentDidMount(){
    this.setState({ fetching: true })
    //Data fetching should happen here only.
    this.props.fetchProfile(this.props.loginInfo.id).then( (res) => {
      this.setState({fetching: false })
    })
}

  render() {

    return (
<View
 style={{flex : 1}}>

  {Platform.OS == "ios"? 
<StatusBar
  backgroundColor="#6563A4"
  barStyle="dark-content"
/>
:
<StatusBar
  backgroundColor="#43416d"
  barStyle="light-content"
/>
}
  <View style={styles.header}>
  <TouchableHighlight style={Platform.OS=="ios" ? {flex : 1, alignItems : 'center', justifyContent : 'center', marginTop: 16 } :{flex : 1, alignItems : 'center', justifyContent : 'center'} }  onPress={ ()=>{  Actions.pop(); } } >
  <View style={{}}>
                <Icon name="chevron-left" size={25} color='white' >
                </Icon>
  </View>
  </TouchableHighlight>
  <View style={{flex : 7, alignItems : 'center', justifyContent : 'center'}}>
    <Text style={Platform.OS=="ios" ? styles.headerText : styles.headerTextAndroid}>
Options
    </Text>
  </View>
  <View style={{flex : 1, alignItems : 'center', justifyContent : 'center', marginTop: 16 }} >
  </View>
  </View>
  <View style = {styles.content}>
    <View style={styles.container}>
      <View style={{flex: 9}}>
      <ScrollView style={{flex : 1}} scrollEnabled={false}>
        <View style={styles.picInfoHolder}>
          </View>
        <View style={styles.row}>
        <View style={styles.rowLeft}>
          <Text style={styles.rowLeftText}>
            Instagram account 
          </Text>
        </View>
        <View style={styles.coloredWrapper}>
          <Text style={styles.wrappedText}>
          {!this.state.fetching? this.props.profileData.basic_data.instagram_name: " "
          } 
          </Text>
        </View>
    </View>

<TouchableHighlight style={{flex: 1,}} onPress={()=> {
  Actions.WebViewPage();
  console.log("Message Devs");}}>
<View style={{flexDirection : 'row' , backgroundColor : '#F6F5FA',
            borderBottomColor : '#6563A4' ,
            borderBottomWidth  : 2,
            }}>
<View style={{flex : 6,  justifyContent : 'center'}}>
  <Text style={{
    fontSize : 17,
    fontFamily : 'GothamRounded-Book',
    padding : 15,
    }}>
    Message Devs
  </Text>
</View>
<View style={{flex : 1,
  marginTop : 10,
  marginBottom : 10,
  marginLeft : 5,
  marginRight : 10,
  borderRadius:2,
  paddingTop: 5,
  paddingBottom: 5,
  alignItems : 'center',
  justifyContent: 'center',
  //backgroundColor : '#6563A4',
  borderRadius : 5}}>
    <Icon name="caret-right" size={25} color='#6564A4' >
    </Icon>
</View>
</View>
</TouchableHighlight>


<TouchableHighlight style={{flex: 1,}} onPress={()=> {console.log("Influencer Market Road map");}}>
<View style={{flexDirection : 'row' , backgroundColor : '#F6F5FA',
            borderBottomColor : '#6563A4' ,
            borderBottomWidth  : 2,
            }}>
<View style={{flex : 6,  justifyContent : 'center'}}>
  <Text style={{
    fontSize : 17,
    fontFamily : 'GothamRounded-Book',
    padding : 15,
    }}>
Influencer Market Road map 
  </Text>
</View>
<View style={{flex : 1,
  marginTop : 10,
  marginBottom : 10,
  marginLeft : 5,
  marginRight : 10,
  borderRadius:2,
  paddingTop: 5,
  paddingBottom: 5,
  alignItems : 'center',
  justifyContent: 'center',
  //backgroundColor : '#6563A4',
  borderRadius : 5}}>
    <Icon name="caret-right" size={25} color='#6564A4' >
    </Icon>
</View>
</View>
</TouchableHighlight>

<TouchableHighlight style={{flex: 1,}} onPress={()=> {console.log("Community Guidelines");}}>
<View style={{flexDirection : 'row' , backgroundColor : '#F6F5FA',
            borderBottomColor : '#6563A4' ,
            borderBottomWidth  : 2,
            }}>
<View style={{flex : 6,  justifyContent : 'center'}}>
  <Text style={{
    fontSize : 17,
    fontFamily : 'GothamRounded-Book',
    padding : 15,
    }}>
 Community Guidelines 
  </Text>
</View>
<View style={{flex : 1,
  marginTop : 10,
  marginBottom : 10,
  marginLeft : 5,
  marginRight : 10,
  borderRadius:2,
  paddingTop: 5,
  paddingBottom: 5,
  alignItems : 'center',
  justifyContent: 'center',
  //backgroundColor : '#6563A4',
  borderRadius : 5}}>
    <Icon name="caret-right" size={25} color='#6564A4' >
    </Icon>
</View>
</View>
</TouchableHighlight>

<TouchableHighlight style={{flex: 1,}} onPress={()=> {console.log("Terms and Conditions");}}>
<View style={{flexDirection : 'row' , backgroundColor : '#F6F5FA',
            borderBottomColor : '#6563A4' ,
            borderBottomWidth  : 2,
            }}>
<View style={{flex : 6,  justifyContent : 'center'}}>
  <Text style={{
    fontSize : 17,
    fontFamily : 'GothamRounded-Book',
    padding : 15,
    }}>
    Terms and Conditions
  </Text>
</View>
<View style={{flex : 1,
  marginTop : 10,
  marginBottom : 10,
  marginLeft : 5,
  marginRight : 10,
  borderRadius:2,
  paddingTop: 5,
  paddingBottom: 5,
  alignItems : 'center',
  justifyContent: 'center',
  //backgroundColor : '#6563A4',
  borderRadius : 5}}>
    <Icon name="caret-right" size={25} color='#6564A4' >
    </Icon>
</View>
</View>
</TouchableHighlight>

<TouchableHighlight style={{flex: 1,}} onPress={()=> {console.log("Privacy Policy");}}>
<View style={{flexDirection : 'row' , backgroundColor : '#F6F5FA',
            borderBottomColor : '#6563A4' ,
            borderBottomWidth  : 2,
            }}>
<View style={{flex : 6,  justifyContent : 'center'}}>
  <Text style={{
    fontSize : 17,
    fontFamily : 'GothamRounded-Book',
    padding : 15,
    }}>
  Privacy Policy 
  </Text>
</View>
<View style={{flex : 1,
  marginTop : 10,
  marginBottom : 10,
  marginLeft : 5,
  marginRight : 10,
  borderRadius:2,
  paddingTop: 5,
  paddingBottom: 5,
  alignItems : 'center',
  justifyContent: 'center',
  //backgroundColor : '#6563A4',
  borderRadius : 5}}>
    <Icon name="caret-right" size={25} color='#6564A4' >
    </Icon>
</View>
</View>
</TouchableHighlight>

<TouchableHighlight style={{flex: 1,}} onPress={()=> {console.log("Open-source Libraries");}}>
<View style={{flexDirection : 'row' , backgroundColor : '#F6F5FA',
            borderBottomColor : '#6563A4' ,
            borderBottomWidth  : 2,
            }}>
<View style={{flex : 6,  justifyContent : 'center'}}>
  <Text style={{
    fontSize : 17,
    fontFamily : 'GothamRounded-Book',
    padding : 15,
    }}>
   Open-source Libraries
  </Text>
</View>
<View style={{flex : 1,
  marginTop : 10,
  marginBottom : 10,
  marginLeft : 5,
  marginRight : 10,
  borderRadius:2,
  paddingTop: 5,
  paddingBottom: 5,
  alignItems : 'center',
  justifyContent: 'center',
  //backgroundColor : '#6563A4',
  borderRadius : 5}}>
    <Icon name="caret-right" size={25} color='#6564A4' >
    </Icon>
</View>
</View>
</TouchableHighlight>

<TouchableHighlight style={{flex: 1,}} 
                        onPress={()=> {console.log("logout");

  Alert.alert(
    'Are you sure',
    'You want to log out?',
    [
      {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
      {text: 'Log Out', onPress: () => { console.log('Log Outpressed'); 
    
     AsyncStorage.multiRemove(['accessToken','tokenType','client', 'expiry', 'uid','id','class']);
     Actions.reset('SignInPage');
    } },
    ],
    { cancelable: true}
  )
                        }} > 
<View style={{flexDirection : 'row' , backgroundColor : '#F6F5FA',
            borderBottomColor : '#6563A4' ,
            borderBottomWidth  : 2,
            }}>
<View style={{flex : 6,  justifyContent : 'center'}}>
  <Text style={{
    fontSize : 17,
    fontFamily : 'GothamRounded-Book',
    padding : 15,
    }}>
    Log out
  </Text>
</View>
<View style={{flex : 1,
  marginTop : 10,
  marginBottom : 10,
  marginLeft : 5,
  marginRight : 10,
  borderRadius:2,
  paddingTop: 5,
  paddingBottom: 5,
  alignItems : 'center',
  justifyContent: 'center',
  //backgroundColor : '#6563A4',
  borderRadius : 5}}>
    <Icon name="caret-right" size={25} color='#6564A4' >
    </Icon>
</View>
</View>
</TouchableHighlight>
      </ScrollView>
      </View>

      <View style={{
          flex: 0.95,
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
            Influencer Market V1.0
          </Text>
      </View>
          </View>
    </View>

	</View>
</View>
    );
  }
}

const styles = StyleSheet.create({
content:{
  flex : 9,
  backgroundColor : '#FFFFFF',
    // paddingTop : 20,
},
header: {
  flexDirection : 'row',
    borderColor : '#333156',
    borderBottomWidth : 3,
  flex: 1,
  backgroundColor: '#6563a4',
},
headerTextAndroid:{
// color : '#6563A4',
  color: 'white',
  fontSize : 22,
  fontFamily : 'GothamRounded-Bold'
},
headerText:{
// color : '#6563A4',
  color: 'white',
  fontSize : 22,
  paddingTop : 25,
  fontFamily : 'GothamRounded-Bold'
// fontFamily : 'arial'
},
container: {
  flex: 9,
},
picInfoHolder: {
  flexDirection:'row' ,
  borderBottomWidth : 2 ,
  borderBottomColor : '#F6F5FA'
},
picHolder : {
  flex : 1,
  alignItems : 'center',
  justifyContent:'center',
},
infoHolder:{
  flex : 2.5,
  flexDirection : 'column',
},
infoTextHolder : {
  flex : 1,
  alignItems : 'center',
  justifyContent  : 'center',
},
infoText: {
  color : 'black',
  fontSize : 20,
  fontFamily : 'GothamRounded-Bold',
},
 infoTextSubinfo:{
  fontSize : 17,
  fontFamily : 'GothamRounded-Medium',
 },
row:{
    flexDirection : 'row' ,
    backgroundColor : '#F6F5FA',
    borderBottomColor : '#6563A4' ,
    borderBottomWidth  : 2,
},
rowLeft:{
    flex : 1,  
    justifyContent : 'center',
    marginLeft : 10
},
rowLeftText:{
fontSize : 17,
fontFamily : 'GothamRounded-Book',
padding : 5,
},
coloredWrapper:{
          flex : 1,
          marginTop : 10,
          marginBottom : 10,
          marginLeft : 5,
          marginRight : 10,
          borderRadius:2,
          borderColor:'#fefefe',
          borderWidth : 3/2,
          paddingTop: 5,
          paddingBottom: 5,
          justifyContent: 'center',
          backgroundColor : '#6563A4',
            borderRadius : 5
},
wrappedText:{
    color : 'white',
    fontSize : 17,
    fontFamily :'GothamRounded-Bold',
    paddingLeft : 20,
},
});


function mapDispatchToProps(dispatch){
    return bindActionCreators( ActionCreators, dispatch);
}
function mapStateToProps(state){
    return {
      //not calling any api actions here yet, but will be required later
      profileData : state.profileData,
      loginInfo : state.loginInfo,
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingPage);