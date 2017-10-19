import React, { Component } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  TextInput,
  StatusBar,
  Keyboard,
  Image
} from 'react-native';
const Dimensions = require('Dimensions');
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
    this.state = { bio : this.props.signedInUser.bio }
  }
  _onPressInfluencerUpdateInfoSave(){
    Actions.tabbar();
  }
  _onPressInfluencerNicheSelect(){
     Actions.NicheSelectPage();
  }

  _onPressPriceSelect(){
    this.popupDialog.show();
  }
  render() {

    return (
<View style={{flex : 1}}>
  <StatusBar
    backgroundColor="#6563A4"
    barStyle="dark-content"
  />
  <View style = {styles.content}>
    <View style={styles.header}>
      <Text style={styles.headerText}>
        Update information
      </Text>
    </View>
    <PopupDialog
    ref={(popupDialog) => { this.popupDialog = popupDialog; }}
    dialogAnimation = { new SlideAnimation({ slideFrom: 'bottom' }) }
    dialogTitle={<DialogTitle title="Select Pricing structure" />}
    actions={[
            <DialogButton
              text="Dismiss"
              onPress={() => {
                Keyboard.dismiss();
                this.popupDialog.dismiss();
              }}
               key="button-1"
            />,
          ]}
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
            <TextInput keyboardType='numeric' onSubmitEditing={Keyboard.dismiss}  style={{flex : 1 , backgroundColor : 'white' ,borderRadius : 5, padding : 10}} >
              
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
            <TextInput keyboardType='numeric' onSubmitEditing={Keyboard.dismiss}  style={{flex : 1 , backgroundColor : 'white' ,borderRadius : 5,padding : 10, }} >
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
            <Text style={styles.infoText}>
              Sainath Latkar
            </Text>
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
             @sainathl
          </Text>
        </View>
    </View>
    <View style={{
        backgroundColor : '#F6F5FA',
        borderBottomWidth : 2 , borderBottomColor : '#6563A4'
    }}>
        <Text style={{
            fontSize : 17,
            fontFamily : 'GothamRounded-Book',
            padding : 5,
        }}>
           Bio
       </Text>
       <View style={{
           marginTop : 10,
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
    8073457348 
  </Text>
</View>
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
    Email 
  </Text>
</View>
<View style={{flex : 2,
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
     Latkarsainath@gmail.com
  </Text>
</View>
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
    niche
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
</View>
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
  backgroundColor: '#6563a4',
},
headerText:{
// color : '#6563A4',
  color: 'white',
  fontSize : 20,
  paddingTop : 25,
  fontFamily : 'GothamRounded-Bold'
// fontFamily : 'arial'
},
container: {
  flex: 10,
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
    borderBottomWidth  : 1,
    borderRadius : 5,
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
      signedInUser : state.signedInUser,
      profileData : state.profileData,
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateInfoPage);