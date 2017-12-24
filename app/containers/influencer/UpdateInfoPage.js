import React, {Component} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  View,
  TextInput,
  Linking,
  StatusBar,
  Keyboard,
  Image,
  Picker,
  Platform
} from 'react-native';
const Dimensions = require('Dimensions');
import SmartPicker from '../components/react-native-smart-picker';
import Spinner from 'react-native-loading-spinner-overlay';
import Icon from 'react-native-vector-icons/FontAwesome';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
// also need to provide information here but profile route gives us this
// information anyway right? so it can be done this way always read the
// profileData state here if available well and good else show nothing
import {Actions} from 'react-native-router-flux';
import PopupDialog, {SlideAnimation, DialogTitle, DialogButton} from 'react-native-popup-dialog';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {ActionCreators} from '../../actions'

// import Button from 'react-native-button'; import CircleCheckBox from
// 'react-native-circle-checkbox'; eslint-disable-next-line no-console
console.ignoredYellowBox = [// https://github.com/facebook/react-native/issues/9093
  'Warning: You are manually calling a React.PropTypes validation'];
// influencerViewPage
class UpdateInfoPageComponent extends Component {
  constructor(props) {
    super(props);
    this._onPressInfluencerNicheSelect = this
      ._onPressInfluencerNicheSelect
      .bind(this);
    this._onPressPriceSelect = this
      ._onPressPriceSelect
      .bind(this);
    this._onPressPaymentSelect = this
      ._onPressPaymentSelect
      .bind(this);
    this._onPressInfluencerUpdateInfoSave = this
      ._onPressInfluencerUpdateInfoSave
      .bind(this);
    this.handleOpenURL = this.handleOpenURL.bind(this);
    this.state = {
      spinnerVisible: false,
      fetching: true,
      paypal: "",
      paytm: "",
      currency: "$",
      upi: "",
      nickName: "",
      businessEmail: "",
      bio: "",
      pricePerPost: "",
      pricePerStory: "",
      phone: "",
      instagram_code: ""
    }
  }
  handleOpenURL(event) {
    url = event.url
    insta_code = url.split("://")[1];
    // console.log(insta_code);
    // console.log("this",this);
    this.setState({instagram_code: insta_code});
  }
  componentDidMount() {
    Linking.addEventListener('url', this.handleOpenURL);

    this.setState({fetching: true})
    this
      .props
      .fetchProfile(this.props.loginInfo.id)
      .then((res) => {
        if (this.props.profileData.class == "Influencer") {
          this.setState({
            paypal: this.props.profileData.advanced_data.payments.paypal,
            currency: this.props.profileData.basic_data.currency,
            paytm: this.props.profileData.advanced_data.payments.paytm,
            upi: this.props.profileData.advanced_data.payments.upi,
            pricePerPost: "" + this.props.profileData.basic_data.price_per_post,
            pricePerStory: "" + this.props.profileData.basic_data.price_per_story,
            bio: this.props.profileData.basic_data.bio,
            phone: "" + this.props.profileData.basic_data.phone,
            fetching: false,
          });
        } else {
          this.setState({
            businessEmail: this.props.profileData.basic_data.business_email,
            nickName: this.props.profileData.basic_data.name,
            bio: this.props.profileData.basic_data.bio,
            phone: "" + this.props.profileData.basic_data.phone,
            fetching: false,
          })
        }
      })
  }

  _onPressInfluencerUpdateInfoSave() {
    this
      .props
      .updateInfo(this.props.loginInfo.id, "instagram_name", this.state.bio, this.state.phone, this.state.pricePerPost, this.state.pricePerStory, this.state.nickName, this.state.paypal, this.state.paytm, this.state.upi, this.state.currency, this.state.businessEmail, this.state.instagram_code)
      .then((res) => {
        this.setState({spinnerVisible: false});
        Actions.reset('TabBarComponent');
      });
  }
  _onPressInfluencerNicheSelect() {
    Actions.NicheSelectPage();
  }
  _onPressPaymentSelect() {
    this
      .popupDialogPayment
      .show();
  }
  _onPressPriceSelect() {
    this
      .popupDialog
      .show();
  }
  onChangedPhone(text) {
    let newText = '';
    let numbers = '0123456789';

    for (var i = 0; i < text.length; i++) {
      if (numbers.indexOf(text[i]) > -1) {
        newText = newText + text[i];
      } else {
        Keyboard.dismiss();
        alert("please enter numbers only");
        Keyboard.dismiss();
      }
      this.setState({phone: newText});
    }
    if (text == "") {
      this.setState({phone: ""});
    }
  }
  onChangedPost(text) {
    let newText = '';
    let numbers = '.0123456789';

    for (var i = 0; i < text.length; i++) {
      if (numbers.indexOf(text[i]) > -1) {
        newText = newText + text[i];
      } else {
        Keyboard.dismiss();
        alert("please enter numbers only");
        Keyboard.dismiss();
      }
      this.setState({pricePerPost: newText});
    }
    if (text == "") {
      this.setState({pricePerPost: ""});
    }
  }
  onChangedStory(text) {
    let newText = '';
    let numbers = '.0123456789';

    for (var i = 0; i < text.length; i++) {
      if (numbers.indexOf(text[i]) > -1) {
        newText = newText + text[i];
      } else {
        Keyboard.dismiss();
        alert("please enter numbers only");
        Keyboard.dismiss();
      }
      this.setState({pricePerStory: newText});
    }
    if (text == "") {
      this.setState({pricePerStory: ""});
    }
  }

  render() {
    return (

      <View style={styles.content}>
        <View
          style={Platform.OS == "ios"
          ? styles.header
          : styles.headerAndroid}>
          <Text
            style={Platform.OS == "ios"
            ? styles.headerText
            : styles.headerTextAndroid}>
            Update info
          </Text>
        </View>
        <PopupDialog
          ref={(popupDialogPayment) => {
          this.popupDialogPayment = popupDialogPayment;
        }}
          dialogTitle={< DialogTitle title = "Select preferred Payment methods" titleTextStyle = {{ color : 'gray', fontSize : 17, fontFamily : 'GothamRounded-Medium', }}/>}>
          <View
            style={{
            backgroundColor: '#6563A4',
            flex: 1,
            padding: 10,
            borderColor: 'white',
            borderWidth: 2
          }}>
            <View
              style={{
              flex: 1,
              borderColor: "white",
              flexDirection: 'row',
              marginBottom: 10
            }}>
              <View
                style={{
                flex: 1,
                justifyContent: 'center',
                paddingLeft: 20
              }}>
                <Text
                  style={{
                  color: 'white',
                  fontFamily: 'GothamRounded-Book',
                  fontSize: 20
                }}>
                  PayPal
                </Text>
              </View>
              <TextInput
                underlineColorAndroid='rgba(0,0,0,0)'
                placeholder="Enter PayPal Id"
                onChangeText=
                {(paypal)=> this.setState({paypal})}
                value={this.state.paypal}
                style={{
                flex: 2,
                backgroundColor: 'white',
                borderRadius: 5,
                padding: 10
              }}></TextInput>
            </View>
            <View
              style={{
              flex: 1,
              borderColor: "white",
              flexDirection: 'row',
              marginBottom: 10
            }}>
              <View
                style={{
                flex: 1,
                justifyContent: 'center',
                paddingLeft: 20
              }}>
                <Text
                  style={{
                  color: 'white',
                  fontFamily: 'GothamRounded-Book',
                  fontSize: 20
                }}>
                  Paytm
                </Text>
              </View>
              <TextInput
                underlineColorAndroid='rgba(0,0,0,0)'
                placeholder="Enter Paytm id"
                onChangeText=
                {(paytm)=> this.setState({paytm})}
                value={this.state.paytm}
                style={{
                flex: 2,
                backgroundColor: 'white',
                borderRadius: 5,
                padding: 10
              }}></TextInput>
            </View>
            <View
              style={{
              flex: 1,
              borderColor: "white",
              flexDirection: 'row',
              marginBottom: 10
            }}>
              <View
                style={{
                flex: 1,
                justifyContent: 'center',
                paddingLeft: 20
              }}>
                <Text
                  style={{
                  color: 'white',
                  fontFamily: 'GothamRounded-Book',
                  fontSize: 20
                }}>
                  UPI
                </Text>
              </View>
              <TextInput
                underlineColorAndroid='rgba(0,0,0,0)'
                placeholder="Enter UPI"
                onChangeText=
                {(upi)=> this.setState({upi})}
                value={this.state.upi}
                style={{
                flex: 2,
                backgroundColor: 'white',
                borderRadius: 5,
                padding: 10
              }}></TextInput>
            </View>
            <View
              style={{
              flex: 1,
              borderColor: "white",
              flexDirection: 'row',
              marginBottom: 10
            }}>
              <View
                style={{
                flex: 1,
                justifyContent: 'center',
                paddingLeft: 20
              }}>
                <Text
                  style={{
                  color: 'white',
                  fontFamily: 'GothamRounded-Book',
                  fontSize: 15
                }}>
                  More payment methods will be added soon on demand
                </Text>
              </View>
            </View>
          </View>
        </PopupDialog>
        <PopupDialog
          height={0.5}
          ref={(popupDialog) => {
          this.popupDialog = popupDialog;
        }}
          dialogTitle={< DialogTitle title = "Select Pricing structure" titleTextStyle = {{ color : 'gray', fontSize : 17, fontFamily : 'GothamRounded-Medium', }}/>}>
          <ScrollView
            style={{
            backgroundColor: '#6563A4',
            flex: 1,
            padding: 10,
            borderColor: 'white',
            borderWidth: 2
          }}>
            <View style={{
              flex: 1
            }}>
              <View style={{
                flex: 1
              }}></View>
              <View
                style={{
                flex: 1.5,
                flexDirection: 'row',
                marginBottom: 10
              }}>
                <ScrollView style={{
                  flex: 2
                }}>
                  <SmartPicker
                    iosPickerStyle={{}}
                    selectedValue={this.state.currency
                    ? this.state.currency
                    : "$"}
                    label='Select currency'
                    onValueChange={(value) => {
                    this.setState({currency: value})
                  }}>
                    <Picker.Item label='Indian rupee' value='₹'/>
                    <Picker.Item label='Euro' value='€'/>
                    <Picker.Item label='US Dollar' value='$'/>
                    <Picker.Item label='Pound sterling' value='£'/>
                    <Picker.Item label='Yuan' value='¥'/>
                  </SmartPicker>
                </ScrollView>
              </View>
            </View>
            <View style={{
              flex: 1
            }}>
              <View style={{
                flex: 1
              }}>
                <Text
                  style={{
                  color: 'white',
                  fontFamily: 'GothamRounded-Book',
                  fontSize: 20
                }}>
                  Price per story shoutout :
                </Text>
              </View>
              <View
                style={{
                flex: 1.5,
                flexDirection: 'row',
                marginBottom: 10
              }}>
                <View style={{
                  flex: 1
                }}></View>
                <TextInput
                  keyboardType='numeric'
                  underlineColorAndroid='rgba(0,0,0,0)'
                  placeholder="in $"
                  maxLength
                  ={5}
                  onChangeText=
                  {(text)=> this.onChangedStory(text)}
                  value={this.state.pricePerStory}
                  style={{
                  flex: 1,
                  backgroundColor: 'white',
                  borderRadius: 5,
                  padding: 10
                }}></TextInput>
              </View>
            </View>
            <View style={{
              flex: 1
            }}>
              <View style={{
                flex: 1
              }}>
                <Text
                  style={{
                  color: 'white',
                  fontFamily: 'GothamRounded-Book',
                  fontSize: 20
                }}>
                  Price per post shoutout :
                </Text>
              </View>
              <View
                style={{
                flex: 1.5,
                flexDirection: 'row',
                marginBottom: 10
              }}>
                <View style={{
                  flex: 1
                }}></View>
                <TextInput
                  keyboardType='numeric'
                  underlineColorAndroid='rgba(0,0,0,0)'
                  maxLength
                  ={5}
                  placeholder="in $"
                  value
                  ={this.state.pricePerPost}
                  onChangeText=
                  {(text)=> this.onChangedPost(text)}
                  onSubmitEditing={Keyboard.dismiss}
                  style={{
                  flex: 1,
                  backgroundColor: 'white',
                  borderRadius: 5,
                  padding: 10
                }}></TextInput>
              </View>
            </View>
          </ScrollView>
        </PopupDialog>
        <View style={styles.container}>
          <View style={{
            flex: 9
          }}>
            <ScrollView style={{
              flex: 1
            }} scrollEnabled={true}>
              <View style={styles.picInfoHolder}>
                <View style={styles.picHolder}>
                  <Image
                    style={{
                    width: 50,
                    height: 50,
                    borderRadius: 25,
                    margin: 10,
                    borderWidth: 2,
                    borderColor: 'white'
                  }}
                    source={{
                    uri: "https://randomuser.me/api/portraits/thumb/men/4.jpg"
                  }}/>
                </View>
                <View style={styles.infoHolder}>
                  <View style={styles.infoTextHolder}>
                    {this.props.profileData.class == "Business"
                      ? <TextInput
                          style={styles.infoText}
                          placeholder="Enter Brand Name"
                          underlineColorAndroid='rgba(0,0,0,0)'
                          value={this.state.nickName}
                          onChangeText={(nickName) => this.setState({nickName})}></TextInput>
                      : <Text style={styles.infoText}>
                        {!this.state.fetching
                          ? this.props.profileData.basic_data.first_name + " "
                          : ""}
                        {!this.state.fetching
                          ? this.props.profileData.basic_data.last_name
                          : ""}
                      </Text>
}
                  </View>
                </View>
              </View>
              <View style={styles.row}>
                <View
                  style={{
                  paddingBottom: 5,
                  alignItems: 'center',
                  justifyContent: 'center',
                  paddingLeft: 10
                }}>
                  <Icon name="instagram" size={20} color='#6463A4'></Icon>
                </View>
                <View style={styles.rowLeft}>
                  <Text style={styles.rowLeftText}>
                    Instagram handle
                  </Text>
                </View>
                <TouchableOpacity
                  disabled={ this.props.profileData.basic_data.instagram_name.length == 0 ? false : true}
                  style={styles.coloredWrapper}
                  onPress={() => {
                  Linking.openURL("https://api.instagram.com/oauth/authorize/?client_id=8dcf1c2b76a74235a9e83b4642ca25d8&redirect_uri=https://influencer-market.herokuapp.com/instagram_redirector/redirect&response_type=code")
                }}>
                  <Text style={styles.wrappedText}>

                  {!this.state.fetching
                    ? this.props.profileData.basic_data.instagram_name.length == 0 ? this.state.instagram_code.length == 0 ? "Connect" + " " : "Connected" + " " : this.props.profileData.basic_data.instagram_name + " "
                    : ""}
                  </Text>
                </TouchableOpacity>
              </View>
              <View
                style={{
                backgroundColor: '#F6F5FA',
                borderBottomWidth: 2,
                borderBottomColor: '#6563A4',
                paddingLeft: 10
              }}>
                <Text
                  style={{
                  fontSize: 17,
                  fontFamily: 'GothamRounded-Book',
                  padding: 5,
                  paddingTop: 7
                }}>
                  Bio
                </Text>
                <View
                  style={{
                  marginTop: 2,
                  marginLeft: 5,
                  marginRight: 5,
                  backgroundColor: 'white',
                  flex: 1
                }}>
                  <TextInput
                    placeholder="Enter bio here"
                    underlineColorAndroid='rgba(0,0,0,0)'
                    maxLength
                    ={200}
                    multiline={true}
                    numberOfLines={4}
                    value={this.state.bio}
                    onSubmitEditing={Keyboard.dismiss}
                    onChangeText={(bio) => this.setState({bio})}
                    style={{
                    height: 75,
                    width: Dimensions
                      .get('window')
                      .width,
                    fontSize: 17,
                    fontFamily: 'GothamRounded-Book'
                  }}></TextInput>
                </View>
              </View>
              {this.props.profileData.class == "Influencer"
                ? <View
                    style={{
                    flexDirection: 'row',
                    backgroundColor: '#F6F5FA',
                    borderBottomColor: '#6563A4',
                    borderBottomWidth: 2
                  }}>
                    <View
                      style={{
                      flex: 1,
                      justifyContent: 'center',
                      paddingLeft: 10
                    }}>
                      <Text
                        style={{
                        fontSize: 17,
                        fontFamily: 'GothamRounded-Book',
                        padding: 5
                      }}>
                        Pricing
                      </Text>
                    </View>
                    <TouchableOpacity
                      style={{
                      flex: 1
                    }}
                      onPress={this._onPressPriceSelect}>
                      <View
                        style={{
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
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: '#6563A4',
                        borderRadius: 5
                      }}>
                        <Text
                          style={{
                          color: 'white',
                          fontSize: 18,
                          fontFamily: 'GothamRounded-Medium'
                        }}>
                          select
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                : null
}
              {this.props.profileData.class == "Influencer"
                ? <View
                    style={{
                    flexDirection: 'row',
                    backgroundColor: '#F6F5FA',
                    borderBottomColor: '#6563A4',
                    borderBottomWidth: 2
                  }}>
                    <View
                      style={{
                      flex: 1,
                      alignItems: 'center',
                      flexDirection: 'row',
                      paddingLeft: 10
                    }}>
                      <View
                        style={{
                        paddingBottom: 5
                      }}>
                        <Icon name="lock" size={20} color='#6463A4'></Icon>
                      </View>
                      <Text
                        style={{
                        fontSize: 17,
                        fontFamily: 'GothamRounded-Book',
                        padding: 5
                      }}>
                        Payment Methods
                      </Text>
                    </View>
                    <TouchableOpacity
                      style={{
                      flex: 1
                    }}
                      onPress={this._onPressPaymentSelect}>
                      <View
                        style={{
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
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: '#6563A4',
                        borderRadius: 5
                      }}>
                        <Text
                          style={{
                          color: 'white',
                          fontSize: 18,
                          fontFamily: 'GothamRounded-Medium'
                        }}>
                          select
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                : null
}

              <View
                style={{
                flexDirection: 'row',
                backgroundColor: '#F6F5FA',
                borderBottomColor: '#6563A4',
                borderBottomWidth: 2
              }}>
                <View
                  style={{
                  flex: 1,
                  alignItems: 'center',
                  flexDirection: 'row',
                  paddingLeft: 10
                }}>
                  <View style={{
                    paddingBottom: 5
                  }}>
                    <Icon name="lock" size={20} color='#6463A4'></Icon>
                  </View>
                  <Text
                    style={{
                    fontSize: 17,
                    fontFamily: 'GothamRounded-Book',
                    padding: 5
                  }}>
                    Phone
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
                  borderColor: '#fefefe',
                  borderWidth: 3 / 2,
                  paddingTop: 5,
                  paddingLeft: 5,
                  paddingBottom: 5,
                  justifyContent: 'center',
                  backgroundColor: 'white',
                  borderRadius: 5
                }}>
                  <TextInput
                    maxLength={10}
                    onChangeText=
                    {(text)=> this.onChangedPhone(text)}
                    placeholder="Enter here"
                    value
                    ={this.state.phone}
                    underlineColorAndroid='rgba(0,0,0,0)'
                    style={{
                    flex: 1,
                    color: 'black',
                    fontSize: 17,
                    fontFamily: 'GothamRounded-Book'
                  }}></TextInput>
                </View>
              </View>
              {this.props.profileData.class == "Business"
                ? <View
                    style={{
                    flexDirection: 'row',
                    backgroundColor: '#F6F5FA',
                    borderBottomColor: '#6563A4',
                    borderBottomWidth: 2
                  }}>
                    <View
                      style={{
                      flex: 1,
                      alignItems: 'center',
                      flexDirection: 'row',
                      paddingLeft: 10
                    }}>
                      <View
                        style={{
                        paddingBottom: 5
                      }}>
                        <Icon name="lock" size={20} color='#6463A4'></Icon>
                      </View>
                      <Text
                        style={{
                        fontSize: 17,
                        fontFamily: 'GothamRounded-Book',
                        padding: 5
                      }}>
                        Business Email
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
                      borderColor: '#fefefe',
                      borderWidth: 3 / 2,
                      paddingTop: 5,
                      paddingLeft: 5,
                      paddingBottom: 5,
                      justifyContent: 'center',
                      backgroundColor: 'white',
                      borderRadius: 5
                    }}>
                      <TextInput
                        maxLength={50}
                        underlineColorAndroid='rgba(0,0,0,0)'
                        onSubmitEditing={Keyboard.dismiss}
                        onChangeText=
                        {(businessEmail)=> this.setState({businessEmail})}
                        placeholder="Enter here"
                        value
                        ={this.state.businessEmail}
                        style={{
                        flex: 1,
                        color: 'black',
                        fontSize: 17,
                        fontFamily: 'GothamRounded-Book'
                      }}></TextInput>
                    </View>
                  </View>
                : null
}
              <View
                style={{
                flexDirection: 'row',
                backgroundColor: '#F6F5FA',
                borderBottomColor: '#6563A4',
                borderBottomWidth: 2
              }}>
                <View
                  style={{
                  flex: 1,
                  alignItems: 'center',
                  flexDirection: 'row',
                  paddingLeft: 10
                }}>
                  <View style={{
                    paddingBottom: 5
                  }}>
                    <Icon name="lock" size={20} color='#6463A4'></Icon>
                  </View>
                  <Text
                    style={{
                    fontSize: 17,
                    fontFamily: 'GothamRounded-Book',
                    padding: 5
                  }}>
                    Email
                  </Text>
                </View>
                <ScrollView
                  contentContainerStyle={{
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
                  directionalLockEnabled
                  ={true}
                  style={{
                  flex: 2,
                  flexDirection: 'row',
                  marginTop: 10,
                  marginBottom: 10,
                  marginLeft: 5,
                  marginRight: 10,
                  borderRadius: 2,
                  borderColor: '#fefefe',
                  borderWidth: 3 / 2,
                  paddingTop: 5,
                  paddingBottom: 5,
                  backgroundColor: 'white',
                  borderRadius: 5
                }}>
                  <Text
                    style={{
                    color: 'black',
                    fontSize: 17,
                    fontFamily: 'GothamRounded-Book'
                  }}>
                    {!this.state.fetching
                      ? this
                        .props
                        .profileData
                        .basic_data
                        .email
                        .slice(0, 50)
                      : " "}
                  </Text>
                </ScrollView>
              </View>

              <View
                style={{
                flexDirection: 'row',
                backgroundColor: '#F6F5FA',
                borderBottomColor: '#6563A4',
                borderBottomWidth: 2
              }}>
                <View
                  style={{
                  flex: 1,
                  justifyContent: 'center',
                  paddingLeft: 10
                }}>
                  <Text
                    style={{
                    fontSize: 17,
                    fontFamily: 'GothamRounded-Book',
                    padding: 5
                  }}>
                    Niche
                  </Text>
                </View>

                <TouchableOpacity
                  style={{
                  flex: 1
                }}
                  onPress={this._onPressInfluencerNicheSelect}>
                  <View
                    style={{
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
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#6563A4',
                    borderRadius: 5
                  }}>
                    <Text
                      style={{
                      color: 'white',
                      fontSize: 17,
                      fontFamily: 'GothamRounded-Medium'
                    }}>
                      select
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>

          <TouchableOpacity
            style={{
            flex: 1,
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
                Save
              </Text>
            </View>
          </TouchableOpacity>
        </View>

      </View>
    )

  }
}
class UpdateInfoPage extends Component {
  render() {
    if (Platform.OS === 'ios') {
      return (
        <KeyboardAwareScrollView
          resetScrollToCoords={{
          x: 0,
          y: 0
        }}
          contentContainerStyle={styles.container}
          scrollEnabled={false}
          style={{
          flex: 1
        }}>
          <StatusBar backgroundColor="#6563A4" barStyle="dark-content"/>
          <UpdateInfoPageComponent {...this.props}></UpdateInfoPageComponent>
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
            <UpdateInfoPageComponent {...this.props}></UpdateInfoPageComponent>

          </ScrollView>
        </KeyboardAvoidingView>
      )

    }
  }
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    // paddingTop : 20,
  },
  headerAndroid: {
    flex: 1,
    //height : 27,
    paddingTop: 14,
    paddingBottom: 13,
    alignItems: "center",
    justifyContent: "center",
    borderColor: '#333156',
    borderBottomWidth: 3,
    backgroundColor: '#6563a4'
  },
  header: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderColor: '#333156',
    borderBottomWidth: 3,
    backgroundColor: '#6563a4'
  },
  headerTextAndroid: {
    // color : '#6563A4',
    color: 'white',
    fontSize: 22,
    //  paddingTop : 25,
    fontFamily: 'GothamRounded-Bold'
    // fontFamily : 'arial'
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
    backgroundColor: '#6563a4',
    flexDirection: 'row',
    flex: 1,
    borderBottomWidth: 2,
    borderColor: 'black'
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
    width: 300,
    color: 'white',
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
    justifyContent: 'center'
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
    alignItems: 'center',
    backgroundColor: '#6563A4',
    borderRadius: 5
  },
  wrappedText: {
    color: 'white',
    fontSize: 17,
    fontFamily: 'GothamRounded-Bold'
  }
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}
function mapStateToProps(state) {
  return {
    //not calling any api actions here yet, but will be required later
    profileData: state.profileData,
    loginInfo: state.loginInfo
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateInfoPage);
