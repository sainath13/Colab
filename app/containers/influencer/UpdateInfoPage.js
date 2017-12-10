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
  Image
} from 'react-native';
const Dimensions = require('Dimensions');
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

// import Button from 'react-native-button';
// import CircleCheckBox from 'react-native-circle-checkbox';
// eslint-disable-next-line no-console
console.ignoredYellowBox = [
  // https://github.com/facebook/react-native/issues/9093
  'Warning: You are manually calling a React.PropTypes validation',
];
// influencerViewPage
class  UpdateInfoPage extends Component {
  constructor(props) {
    super(props);
    this._onPressInfluencerNicheSelect = this._onPressInfluencerNicheSelect.bind(this);
    this._onPressPriceSelect = this._onPressPriceSelect.bind(this);
    this._onPressInfluencerUpdateInfoSave = this._onPressInfluencerUpdateInfoSave.bind(this)
    this.state = { 
      spinnerVisible : false,
      fetching: true,
      nickName : "",
      businessEmail : "",
      bio : "" , //this.props.signedInUser.basic_data.bio, 
      pricePerPost : "", // +this.props.signedInUser.basic_data.price_per_post ,
      pricePerStory : "" , // +this.props.signedInUser.basic_data.price_per_story,  
      phone : "" , //+this.props.signedInUser.basic_data.phone
    }
  }

componentDidMount(){
    this.setState({ fetching: true })
    //Data fetching should happen here only.
    this.props.fetchProfile(this.props.loginInfo.id).then( (res) => {
      this.setState({fetching: false,
      bio : this.props.profileData.basic_data.bio,
      businessEmail : this.props.profileData.basic_data.business_email,
      nickName : this.props.profileData.basic_data.name,
      pricePerPost :  "" + this.props.profileData.basic_data.price_per_post,
      pricePerStory : "" + this.props.profileData.basic_data.price_per_story,
      phone : "" + this.props.profileData.basic_data.phone,
      })
    })
}

  _onPressInfluencerUpdateInfoSave(){
   this.props.updateInfo(this.props.loginInfo.id,"instagram_name",this.state.bio,this.state.phone,this.state.pricePerPost,this.state.pricePerStory,this.state.nickName,this.state.businessEmail).then( (res) => {
    this.setState({spinnerVisible: false });
    Actions.TabBarComponent();
  })
    ;
    //Actions.tabbar();
  }
  _onPressInfluencerNicheSelect(){
     Actions.NicheSelectPage();
  }

  _onPressPriceSelect(){
    this.popupDialog.show();
  }
  onChangedPhone(text){
    let newText = '';
    let numbers = '0123456789';
  
    for (var i=0; i < text.length; i++) {
         if(numbers.indexOf(text[i]) > -1 ) {
              newText = newText + text[i];
         }
         else {
               // your call back function
               Keyboard.dismiss();
               alert("please enter numbers only");
               Keyboard.dismiss();
          }
         this.setState({ phone : newText });
     }
    if(text == ""){
         this.setState({phone : "" });
    } 
  }
  onChangedPost(text){
    let newText = '';
    let numbers = '.0123456789';
  
    for (var i=0; i < text.length; i++) {
         if(numbers.indexOf(text[i]) > -1 ) {
              newText = newText + text[i];
         }
         else {
               // your call back function
               Keyboard.dismiss();
               alert("please enter numbers only");
               Keyboard.dismiss();
          }
         this.setState({ pricePerPost : newText });
     }
    if(text == ""){
         this.setState({ pricePerPost : "" });
    } 
  }
  onChangedStory(text){
    let newText = '';
    let numbers = '.0123456789';
  
    for (var i=0; i < text.length; i++) {
         if(numbers.indexOf(text[i]) > -1 ) {
              newText = newText + text[i];
         }
         else {
               // your call back function
               Keyboard.dismiss();
               alert("please enter numbers only");
               Keyboard.dismiss();
          }
         this.setState({ pricePerStory : newText });
     }
    if(text == ""){
         this.setState({ pricePerStory : "" });
    } 
  }
  render() {

    return (
<KeyboardAwareScrollView
      resetScrollToCoords={{ x: 0, y: 0 }}
      contentContainerStyle={styles.container}
      scrollEnabled={false}
 style={{flex : 1}}>
  <StatusBar
    backgroundColor="#6563A4"
    barStyle="dark-content"
  />
  <View style = {styles.content}>
    <View style={styles.header}>
      <Text style={styles.headerText}>
        Update info
      </Text>
    </View>
    <PopupDialog
    ref={(popupDialog) => { this.popupDialog = popupDialog; }}
    dialogTitle={<DialogTitle title="Select Pricing structure" titleTextStyle={{
      color : 'gray',
      fontSize : 17,
      fontFamily : 'GothamRounded-Medium',
    }}
    />}
  >
    <View style={{backgroundColor : '#6563A4', flex : 1, padding : 10, borderColor : 'white', borderWidth : 2}}>
      <View style={{flex : 1}}>
        <View style={{flex : 1}}>
          <Text style={{color:'white', fontFamily : 'GothamRounded-Book', fontSize : 20}}>
            Price per story shoutout : 
          </Text>
          </View>
          <View style={{flex : 1.5, flexDirection : 'row', marginBottom : 10}}>
            <View style={{flex : 1 }}>
            </View>
            <TextInput keyboardType='numeric' 
            placeholder = "in $"
            maxLength ={5} 
            onChangeText = {(text)=> this.onChangedStory(text)}
            value= {this.state.pricePerStory}
            style={{flex : 1 , backgroundColor : 'white' ,borderRadius : 5, padding : 10}} >
            </TextInput>
          </View>
      </View>
      <View style={{flex : 1}}>
        <View style={{flex : 1}}>
          <Text style={{color:'white', fontFamily : 'GothamRounded-Book', fontSize : 20}}>
            Price per post shoutout :
          </Text>
          </View>
          <View style={{flex : 1.5, flexDirection : 'row', marginBottom : 10}}>
            <View style={{flex : 1 }}>
            </View>
            <TextInput keyboardType='numeric'
            maxLength ={5} 
            placeholder = "in $"
            value ={this.state.pricePerPost}
            onChangeText = {(text)=> this.onChangedPost(text)}
             onSubmitEditing={Keyboard.dismiss}  style={{flex : 1 , backgroundColor : 'white' ,borderRadius : 5,padding : 10, }} >
            </TextInput>
          </View>
      </View>
    </View>
  </PopupDialog>
    <View style={styles.container}>
      <View style={{flex: 9}}>
      <ScrollView style={{flex : 1}} scrollEnabled={false}>
        <View style={styles.picInfoHolder}>
          <View style={styles.picHolder}>
                <Image
                  style = {{width: 70, height: 70, borderRadius: 35, margin: 10}}
                  source = { { uri: "https://randomuser.me/api/portraits/thumb/men/4.jpg" }}
                />
          </View>
          <View style={styles.infoHolder}>
          <View style={ styles.infoTextHolder}>
          {this.props.loginInfo.class == "Business" ? 
            <TextInput style={styles.infoText} placeholder="Enter Brand Name" 
            value = {this.state.nickName}
            onChangeText={(nickName) => this.setState({nickName})}
            >
            </TextInput>
            : 
            <Text style={styles.infoText}>
            {!this.state.fetching ? this.props.profileData.basic_data.first_name + " ": ""}  
            {!this.state.fetching ? this.props.profileData.basic_data.last_name: ""} 
              </Text>
          }
          </View>
          <View style={styles.infoTextHolder }>
            
          </View>
          </View>
        </View>
        <View style={styles.row}>
        <View style={styles.rowLeft}>
          <Text style={styles.rowLeftText}>
            Instagram handle
          </Text>
        </View>
        <View style={styles.coloredWrapper}>
          <Text style={styles.wrappedText}>
          {!this.state.fetching? this.props.profileData.basic_data.instagram_name: " "} 
          </Text>
        </View>
    </View>
    <View style={{
        backgroundColor : '#F6F5FA',
        borderBottomWidth : 2 , borderBottomColor : '#6563A4',
    }}>
        <Text style={{
            fontSize : 17,
            fontFamily : 'GothamRounded-Book',
            padding : 5,
            paddingTop : 7,
        }}>
           Bio
       </Text>
       <View style={{
           marginTop : 2,
           marginLeft : 5,
           marginRight : 5,
           backgroundColor : 'white',
           flex : 1,
         }}>
       <TextInput placeholder = "Enter bio here"
       maxLength ={200} 
         multiline = {true}
         numberOfLines = {4}
         value = {this.state.bio}
         onSubmitEditing={Keyboard.dismiss}
         onChangeText={(bio) => this.setState({bio})}
          style={{
            height : 75,
           width : Dimensions.get('window').width,
           fontSize : 17,
           fontFamily : 'GothamRounded-Book',
         }}>
       </TextInput>
     </View>
    </View>
    { this.props.loginInfo.class == "Influencer" ?
    <View style={{flexDirection : 'row' , backgroundColor : '#F6F5FA',
                borderBottomColor : '#6563A4' ,
                borderBottomWidth  : 2,
              }}>             
    <View style={{flex : 1,  justifyContent : 'center'}}>
      <Text style={{
        fontSize : 17,
        fontFamily : 'GothamRounded-Book',
        padding : 5,
        }}>
        Pricing
      </Text>
    </View>
    <TouchableHighlight style={{flex: 1,}} onPress = {this._onPressPriceSelect}>              
    <View style={{flex : 1,
      marginTop : 10,
      marginBottom : 10,
      marginLeft : 5,
      marginRight : 10,
      borderRadius:2,
      borderColor:'#fefefe',
      borderWidth : 3/2,
      paddingTop: 5,
      paddingBottom: 5,
      alignItems : 'center',
      justifyContent: 'center',
      backgroundColor : '#6563A4',
      borderRadius : 5}}>
      <Text style={{
        color : 'white',
        fontSize : 18,
        fontFamily :'GothamRounded-Medium',
        }}>
       select 
      </Text>
    </View>
    </TouchableHighlight>
</View>
: null
    }


<View style={{flexDirection : 'row' , backgroundColor : '#F6F5FA',
            borderBottomColor : '#6563A4' ,
            borderBottomWidth  : 2,
            }}>
<View style={{flex : 1,  justifyContent : 'center'}}>
  <Text style={{
    fontSize : 17,
    fontFamily : 'GothamRounded-Book',
    padding : 5,
    }}>
 Phone 
  </Text>
</View>
<View style={{flex : 1,
  marginTop : 10,
  marginBottom : 10,
  marginLeft : 5,
  marginRight : 10,
  borderRadius:2,
  borderColor:'#fefefe',
  borderWidth : 3/2,
  paddingTop: 5,
  paddingLeft : 5,
  paddingBottom: 5,
  justifyContent: 'center',
  backgroundColor : 'white',
  borderRadius : 5}}>
  <TextInput
  maxLength={10}
   onChangeText = {(text)=> this.onChangedPhone(text)}
   placeholder = "Enter here"
   value ={this.state.phone} 
   style={{
          flex : 1,
          color : 'black',
          fontSize : 17,
          fontFamily :'GothamRounded-Book',
    }}>
  </TextInput>
</View>
</View>
{this.props.loginInfo.class == "Business" ?
<View style={{flexDirection : 'row' , backgroundColor : '#F6F5FA',
            borderBottomColor : '#6563A4' ,
            borderBottomWidth  : 2,
            }}>
<View style={{flex : 1,  justifyContent : 'center'}}>
  <Text style={{
    fontSize : 17,
    fontFamily : 'GothamRounded-Book',
    padding : 5,
    }}>
Business Email 
  </Text>
</View>
<View style={{flex : 1,
  marginTop : 10,
  marginBottom : 10,
  marginLeft : 5,
  marginRight : 10,
  borderRadius:2,
  borderColor:'#fefefe',
  borderWidth : 3/2,
  paddingTop: 5,
  paddingLeft : 5,
  paddingBottom: 5,
  justifyContent: 'center',
  backgroundColor : 'white',
  borderRadius : 5}}>
  <TextInput
  maxLength={50}
         onSubmitEditing={Keyboard.dismiss}
   onChangeText = {(businessEmail)=> this.setState({businessEmail})}
   placeholder = "Enter here"
   value ={this.state.businessEmail} 
   style={{
          flex : 1,
          color : 'black',
          fontSize : 17,
          fontFamily :'GothamRounded-Book',
    }}>
  </TextInput>
</View>
</View>
: null
}
<View style={{flexDirection : 'row' , backgroundColor : '#F6F5FA',
            borderBottomColor : '#6563A4' ,
            borderBottomWidth  : 2,
            }}>
<View style={{flex : 1,  justifyContent : 'center'}}>
  <Text style={{
    fontSize : 17,
    fontFamily : 'GothamRounded-Book',
    padding : 5,
    }}>
    Email 
  </Text>
</View>
<ScrollView 
contentContainerStyle={{
  justifyContent: 'center',
  alignItems : 'center',
}}
directionalLockEnabled ={true}
style={{flex : 2,
  flexDirection : 'row',
  marginTop : 10,
  marginBottom : 10,
  marginLeft : 5,
  marginRight : 10,
  borderRadius:2,
  borderColor:'#fefefe',
  borderWidth : 3/2,
  paddingTop: 5,
  paddingBottom: 5,
  backgroundColor : 'white',
  borderRadius : 5}}>
  <Text style={{
    color : 'black',
        fontSize : 17,
        fontFamily :'GothamRounded-Book',
    }}>
    {!this.state.fetching ? this.props.profileData.basic_data.email.slice(0,50): " "}
  </Text>
</ScrollView>
</View>

<View style={{flexDirection : 'row' , backgroundColor : '#F6F5FA',
            borderBottomColor : '#6563A4' ,
            borderBottomWidth  : 2,
            }}>
<View style={{flex : 1,  justifyContent : 'center'}}>
  <Text style={{
    fontSize : 17,
    fontFamily : 'GothamRounded-Book',
    padding : 5,
    }}>
    Niche
  </Text>
</View>

<TouchableHighlight style={{flex: 1,}} onPress = {this._onPressInfluencerNicheSelect}>
<View style={{flex : 1,
  marginTop : 10,
  marginBottom : 10,
  marginLeft : 5,
  marginRight : 10,
  borderRadius:2,
  borderColor:'#fefefe',
  borderWidth : 3/2,
  paddingTop: 5,
  paddingBottom: 5,
  alignItems : 'center',
  justifyContent: 'center',
  backgroundColor : '#6563A4',
  borderRadius : 5}}>
  <Text style={{
    color : 'white',
        fontSize : 17,
        fontFamily :'GothamRounded-Medium',
    }}>
     select
  </Text>
</View>
</TouchableHighlight>
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

	</View>
</KeyboardAwareScrollView>
    );
  }
}

const styles = StyleSheet.create({
content:{
  flex : 1,
  backgroundColor : '#FFFFFF',
    // paddingTop : 20,
},
header: {
  flex: 1,
  alignItems : "center",
  justifyContent : "center",
    borderColor : '#333156',
    borderBottomWidth : 3,
  backgroundColor: '#6563a4',
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
    justifyContent : 'center'
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

export default connect(mapStateToProps, mapDispatchToProps)(UpdateInfoPage);