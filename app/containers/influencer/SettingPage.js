import React, {Component} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  KeyboardAvoidingView,
  View,
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
import Spinner from 'react-native-loading-spinner-overlay';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
// also need to provide information here but profile route gives us this
// information anyway right? so it can be done this way always read the
// profileData state here if available well and good else show nothing
import {Actions} from 'react-native-router-flux';
import PopupDialog, {SlideAnimation, DialogTitle, DialogButton} from 'react-native-popup-dialog';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {ActionCreators} from '../../actions'

class SettingPage extends Component {

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
              Options
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
              <ScrollView
                style={{
                flex: 1
              }}
                scrollEnabled={false}>
                <View style={styles.picInfoHolder}></View>

                <TouchableHighlight
                  style={{
                  flex: 1
                }}
                  onPress={() => {
                    Actions.PaymentPage();
                }}>
                  <View
                    style={{
                    flexDirection: 'row',
                    backgroundColor: '#F6F5FA',
                    borderBottomColor: '#6563A4',
                    borderBottomWidth: 2
                  }}>
                    <View
                      style={{
                      flex: 3.5,
                      justifyContent: 'center'
                    }}>
                      <Text
                        style={{
                        fontSize: 17,
                        fontFamily: 'GothamRounded-Book',
                        padding: 15
                      }}>
                       Current Plans 
                      </Text>
                    </View>
                    <View
                      style={{
                      flex: 2.5,
                      marginTop: 10,
                      backgroundColor : '#6463a4',
                      marginBottom: 10,
                      marginLeft: 5,
                      marginRight: 10,
                      borderRadius: 2,
                      paddingTop: 5,
                      paddingBottom: 5,
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: 5
                    }}>
                    <Text
                        style={{
                        fontSize: 17,
                        fontFamily: 'GothamRounded-Medium',
                        color : 'white'
                        }} 
                    >
                     {this.props.subscription.subscriptionActive == "colabplus" ?
                     "Silver" :
                     this.props.subscription.subscriptionActive == "colabpremium" ?
                     "Gold" : "Free"
                    } 
                    </Text>
                    </View>
                    <View
                      style={{
                      flex: 1,
                      marginTop: 10,
                      marginBottom: 10,
                      marginLeft: 5,
                      marginRight: 10,
                      borderRadius: 2,
                      paddingTop: 5,
                      paddingBottom: 5,
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: 5
                    }}>
                      <Icon name="caret-right" size={25} color='#6564A4'></Icon>
                    </View>
                  </View>
                </TouchableHighlight>


                <TouchableHighlight
                  style={{
                  flex: 1
                }}
                  onPress={() => {
                   console.log("h");
                   if(!this.state.notificationsEnabledIos){
                    Alert.alert(
                      'Enable Notifications',
                      'Go to Settings ->Search Colab+ -> Notifications -> Allow Notifications✅',
                      [
                        {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                        {text: 'OK', onPress: () => console.log('OK Pressed')},
                      ],
                      { cancelable: true}
                    ) 
                   }
                }}>
                  <View
                    style={{
                    flexDirection: 'row',
                    backgroundColor: '#F6F5FA',
                    borderBottomColor: '#6563A4',
                    borderBottomWidth: 2
                  }}>
                    <View
                      style={{
                      flex: 3.5,
                      justifyContent: 'center'
                    }}>
                      <Text
                        style={{
                        fontSize: 17,
                        fontFamily: 'GothamRounded-Book',
                        padding: 15
                      }}>
                      Notifications 
                      </Text>
                    </View>
                    <View
                      style={{
                      flex: 2.5,
                      marginTop: 10,
                      backgroundColor : '#6463a4',
                      marginBottom: 10,
                      marginLeft: 5,
                      marginRight: 10,
                      borderRadius: 2,
                      paddingTop: 5,
                      paddingBottom: 5,
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: 5
                    }}>
                    <Text
                        style={{
                        fontSize: 17,
                        fontFamily: 'GothamRounded-Medium',
                        color : 'white'
                        }} 
                    >{this.state.notificationsEnabledIos ? "On" : "Off"}
                    </Text>
                    </View>
                    <View
                      style={{
                      flex: 1,
                      marginTop: 10,
                      marginBottom: 10,
                      marginLeft: 5,
                      marginRight: 10,
                      borderRadius: 2,
                      paddingTop: 5,
                      paddingBottom: 5,
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: 5
                    }}>
                      <Icon name="caret-right" size={25} color='#6564A4'></Icon>
                    </View>
                  </View>
                </TouchableHighlight>

                <TouchableHighlight
                  style={{
                  flex: 1
                }}
                  onPress={() => {
                    Clipboard.setString("colab.influencer.market@gmail.com");
                    Alert.alert(
                        'Email id copied!',
                        'Drop us a mail. We are looking forward to getting in touch😍',
                        [
                          {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                          {text: 'OK', onPress: () => console.log('OK Pressed')},
                        ],
                        { cancelable: true}
                      ) 
                }}>
                  <View
                    style={{
                    flexDirection: 'row',
                    backgroundColor: '#F6F5FA',
                    borderBottomColor: '#6563A4',
                    borderBottomWidth: 2
                  }}>
                    <View
                      style={{
                      flex: 6,
                      justifyContent: 'center'
                    }}>
                      <Text
                        style={{
                        fontSize: 17,
                        fontFamily: 'GothamRounded-Book',
                        padding: 15
                      }}>
                       Contact us! 
                      </Text>
                    </View>
                    <View
                      style={{
                      flex: 1,
                      marginTop: 10,
                      marginBottom: 10,
                      marginLeft: 5,
                      marginRight: 10,
                      borderRadius: 2,
                      paddingTop: 5,
                      paddingBottom: 5,
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: 5
                    }}>
                      <Icon name="caret-right" size={25} color='#6564A4'></Icon>
                    </View>
                  </View>
                </TouchableHighlight>


                <TouchableHighlight
                  style={{
                  flex: 1
                }}
                  onPress={() => {
                  Actions.WebViewPage({PageName : "Terms of Use"});
                  console.log("Terms of Use");
                }}>
                  <View
                    style={{
                    flexDirection: 'row',
                    backgroundColor: '#F6F5FA',
                    borderBottomColor: '#6563A4',
                    borderBottomWidth: 2
                  }}>
                    <View
                      style={{
                      flex: 6,
                      justifyContent: 'center'
                    }}>
                      <Text
                        style={{
                        fontSize: 17,
                        fontFamily: 'GothamRounded-Book',
                        padding: 15
                      }}>
                        Terms of use 
                      </Text>
                    </View>
                    <View
                      style={{
                      flex: 1,
                      marginTop: 10,
                      marginBottom: 10,
                      marginLeft: 5,
                      marginRight: 10,
                      borderRadius: 2,
                      paddingTop: 5,
                      paddingBottom: 5,
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: 5
                    }}>
                      <Icon name="caret-right" size={25} color='#6564A4'></Icon>
                    </View>
                  </View>
                </TouchableHighlight>

                <TouchableHighlight
                  style={{
                  flex: 1
                }}
                  onPress={() => {
                    Actions.WebViewPage({PageName : "Privacy Policy"});
                  console.log("Privacy Policy");
                }}>
                  <View
                    style={{
                    flexDirection: 'row',
                    backgroundColor: '#F6F5FA',
                    borderBottomColor: '#6563A4',
                    borderBottomWidth: 2
                  }}>
                    <View
                      style={{
                      flex: 6,
                      justifyContent: 'center'
                    }}>
                      <Text
                        style={{
                        fontSize: 17,
                        fontFamily: 'GothamRounded-Book',
                        padding: 15
                      }}>
                        Privacy Policy
                      </Text>
                    </View>
                    <View
                      style={{
                      flex: 1,
                      marginTop: 10,
                      marginBottom: 10,
                      marginLeft: 5,
                      marginRight: 10,
                      borderRadius: 2,
                      paddingTop: 5,
                      paddingBottom: 5,
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: 5
                    }}>
                      <Icon name="caret-right" size={25} color='#6564A4'></Icon>
                    </View>
                  </View>
                </TouchableHighlight>

                <TouchableHighlight
                  style={{
                  flex: 1
                }}
                  onPress={() => {
                  console.log("Open-source Libraries");
                  Alert.alert("Will be updated soon")
                }}>
                  <View
                    style={{
                    flexDirection: 'row',
                    backgroundColor: '#F6F5FA',
                    borderBottomColor: '#6563A4',
                    borderBottomWidth: 2
                  }}>
                    <View
                      style={{
                      flex: 6,
                      justifyContent: 'center'
                    }}>
                      <Text
                        style={{
                        fontSize: 17,
                        fontFamily: 'GothamRounded-Book',
                        padding: 15
                      }}>
                        Open-source Libraries
                      </Text>
                    </View>
                    <View
                      style={{
                      flex: 1,
                      marginTop: 10,
                      marginBottom: 10,
                      marginLeft: 5,
                      marginRight: 10,
                      borderRadius: 2,
                      paddingTop: 5,
                      paddingBottom: 5,
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: 5
                    }}>
                      <Icon name="caret-right" size={25} color='#6564A4'></Icon>
                    </View>
                  </View>
                </TouchableHighlight>

                <TouchableHighlight
                  style={{
                  flex: 1
                }}
                  onPress={() => {
                  console.log("logout");
                  Alert.alert('Are you sure', 'You want to log out?', [
                    {
                      text: 'Cancel',
                      onPress: () => console.log('Cancel Pressed'),
                      style: 'cancel'
                    }, {
                      text: 'Log Out',
                      onPress: () => {
                        console.log('Log Outpressed');
                        AsyncStorage.multiRemove([
                          'accessToken',
                          'tokenType',
                          'client',
                          'expiry',
                          'uid',
                          'id',
                          'class'
                        ]);
                        Actions.reset('SignInPage');
                      }
                    }
                  ], {cancelable: true})
                }}>
                  <View
                    style={{
                    flexDirection: 'row',
                    backgroundColor: '#F6F5FA',
                    borderBottomColor: '#6563A4',
                    borderBottomWidth: 2
                  }}>
                    <View
                      style={{
                      flex: 6,
                      justifyContent: 'center'
                    }}>
                      <Text
                        style={{
                        fontSize: 17,
                        fontFamily: 'GothamRounded-Book',
                        padding: 15
                      }}>
                        Log out
                      </Text>
                    </View>
                    <View
                      style={{
                      flex: 1,
                      marginTop: 10,
                      marginBottom: 10,
                      marginLeft: 5,
                      marginRight: 10,
                      borderRadius: 2,
                      paddingTop: 5,
                      paddingBottom: 5,
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: 5
                    }}>
                      <Icon name="caret-right" size={25} color='#6564A4'></Icon>
                    </View>
                  </View>
                </TouchableHighlight>
              </ScrollView>
            </View>

            <View
              style={{
              flex: 0.95,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: '#6563a4'
            }}
              onPress={this._onPressInfluencerUpdateInfoSave}>
              <View style={{}}>
                <Text
                  style={{
                  color: 'white',
                  fontSize: 25,
                  fontFamily: 'GothamRounded-Medium'
                }}>
                 Colab+ Version 1.0
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
    subscription : state.subscription
    //not calling any api actions here yet, but will be required later
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingPage);