import React, {Component} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  KeyboardAvoidingView,
  View,
  Share,
  Button,
  TextInput,
  Clipboard,
  StatusBar,
  Keyboard,
  TouchableOpacity,
  Alert,
  AsyncStorage,
  Image,
  Platform
} from 'react-native';
const Dimensions = require('Dimensions');
import OneSignal from 'react-native-onesignal';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Actions} from 'react-native-router-flux';
import PopupDialog, {SlideAnimation, DialogTitle, DialogButton} from 'react-native-popup-dialog';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {ActionCreators} from '../../actions'

class ReferPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      notificationsEnabledIos : false
    }
  }
  componentDidMount() {
    OneSignal.configure({});
    OneSignal.getPermissionSubscriptionState((status) => {
        if(status.notificationsEnabled){
          this.setState({notificationsEnabledIos : true})
        }
        else{
          console.log("it ");
        }
    });
  }


  render() {
    return (
      <View style={{
        flex: 1
      }}>

        {Platform.OS == "ios"
          ? <StatusBar backgroundColor="#6563A4" barStyle="dark-content"/>
          : <StatusBar backgroundColor="#43416d" barStyle="light-content"/>
}
        <View style={styles.header}>
          <TouchableOpacity
            style={Platform.OS == "ios"
            ? {
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 16
            }
            : {
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center'
            }}
            onPress={() => {
            Actions.pop();
          }}>
            <View style={{}}>
              <Icon name="chevron-left" size={25} color='white'></Icon>
            </View>
          </TouchableOpacity>
          <View
            style={{
            flex: 7,
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Text
              style={Platform.OS == "ios"
              ? styles.headerText
              : styles.headerTextAndroid}>
            Invite Friends
            </Text>
          </View>
          <View
            style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 16
          }}></View>
        </View>
        <View style={styles.content}>
          <View style={styles.container}>
            <View style={{
              flex: 9
            }}>
              <View style={{ flex : 1.5 , alignItems : 'center', 
              justifyContent: "center",
              }}>
              <Icon name="gift" size={125} color='#6463A4'>
              </Icon>
              </View>
                <View style={{flex : 3.5 }}>
                <TouchableHighlight style={{
              flex : 0.4                  ,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: '#6563a4',
              borderColor: '#333156',
              borderBottomWidth: 3,
              borderRadius : 10,
              marginLeft : 20,
              marginRight : 20
              }}>
                <Text
                  style={{
                  color: 'white',
                  fontSize: 25,
                  fontFamily: 'GothamRounded-Medium'
                }}
                
                                            onPress={async () => {
                                            await Clipboard.setString("XXXXXXXXXXXX");
                                            Alert.alert(
                                                'Your unique referral code copied to clipboard!',
                                                'You can share it with friends to earn rewards',
                                                [
                                                  {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                                                  {text: 'OK', onPress: () => console.log('OK Pressed')},
                                                ],
                                                { cancelable: true}
                                              )
                                            }}
                >
                CNFLWpA1qA
                </Text>
                </TouchableHighlight>
                <View style={{flex : 1 , margin: 10,marginTop: 15,
                }}>
                <Text  
                  style={{
                  color: '#333156',
                  fontSize: 20,
                  fontFamily: 'GothamRounded-Medium'
                  }}>Use this code to refer friends on Colab+ and enjoy free months of Colab+ Pro. (Max 12 months)
                </Text>
                <Text style={{
                  color: '#333156',
                  fontSize: 20,
                  fontFamily: 'GothamRounded-Medium'
                  }} >
Don't forget to tell them they also get one month of Colab Gold because you are such a good friend!
                </Text>
                </View>
                <View style={{flex : 1}}>
                <View style={{flex : 0.3}}>
                </View>
                <TouchableOpacity style={{flex : 0.4 , backgroundColor : '#6463A4',
                alignItems : 'center',
                justifyContent: 'center',
                flexDirection : 'row',
              }} 
              
              onPress={() => {
                Share.share({
                  message:
                    'Share text Copied',
                })
            }}
              
              >
              <View style={{marginLeft: 15, marginRight : 7.5, paddingLeft: 10 , paddingRight : 10}}>
              <Icon name="facebook" size={35} color='#FEFEFE'>
              </Icon>
              </View>
              <View style={{marginLeft: 7.5, marginRight : 7.5 , paddingLeft: 10 , paddingRight : 10}}>
              <Icon name="instagram" size={35} color='#FEFEFE'>
              </Icon>
              </View>
              <View style={{marginLeft: 7.5, marginRight : 7.5, paddingLeft: 10 , paddingRight : 10}}>
              <Icon name="twitter" size={35} color='#FEFEFE'>
              </Icon>
              </View>
              <View style={{marginLeft: 7.5, marginRight : 15, paddingLeft: 10 , paddingRight : 10}}>
              <Icon name="whatsapp" size={35} color='#FEFEFE'>
              </Icon>
              </View>
                </TouchableOpacity>
                <View style={{flex : 0.3}}>
                </View>
                </View>
                </View>
            </View>

            <View
              style={{
              flex: 0.95,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: '#6563a4'
            }}
              >
              <View style={{}}>
                <Text
                  style={{
                  color: 'white',
                  fontSize: 25,
                  fontFamily: 'GothamRounded-Medium'
                }}>
               Rewards Earned: 0/12 
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
  content: {
    flex: 9,
    backgroundColor: '#FFFFFF',
    // paddingTop : 20,
  },
  header: {
    flexDirection: 'row',
    borderColor: '#333156',
    borderBottomWidth: 3,
    flex: 1,
    backgroundColor: '#6563a4'
  },
  headerTextAndroid: {
    // color : '#6563A4',
    color: 'white',
    fontSize: 22,
    fontFamily: 'GothamRounded-Bold'
  },
  headerText: {
    // color : '#6563A4',
    color: 'white',
    fontSize: 22,
    paddingTop: 25,
    fontFamily: 'GothamRounded-Bold'
    // fontFamily : 'arial'
  },
  container: {
    flex: 9
  },
  picInfoHolder: {
    flexDirection: 'row',
    borderBottomWidth: 2,
    borderBottomColor: '#F6F5FA'
  },
  picHolder: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  infoHolder: {
    flex: 2.5,
    flexDirection: 'column'
  },
  infoTextHolder: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  infoText: {
    color: 'black',
    fontSize: 20,
    fontFamily: 'GothamRounded-Bold'
  },
  infoTextSubinfo: {
    fontSize: 17,
    fontFamily: 'GothamRounded-Medium'
  },
  row: {
    flexDirection: 'row',
    backgroundColor: '#F6F5FA',
    borderBottomColor: '#6563A4',
    borderBottomWidth: 2
  },
  rowLeft: {
    flex: 1,
    justifyContent: 'center',
    marginLeft: 10
  },
  rowLeftText: {
    fontSize: 17,
    fontFamily: 'GothamRounded-Book',
    padding: 5
  },
  coloredWrapper: {
    flex: 1,
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 5,
    marginRight: 10,
    borderRadius: 2,
    borderColor: '#fefefe',
    borderWidth: 3 / 2,
    paddingTop: 5,
    paddingBottom: 5,
    justifyContent: 'center',
    backgroundColor: '#6563A4',
    borderRadius: 5
  },
  wrappedText: {
    color: 'white',
    fontSize: 17,
    fontFamily: 'GothamRounded-Bold',
    paddingLeft: 20
  }
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}
function mapStateToProps(state) {
  return {
    subscription : state.subscription,
    loginInfo: state.loginInfo
    //not calling any api actions here yet, but will be required later
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ReferPage);