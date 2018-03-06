// sad error took so much time.  onpress () => functioncall and onpress ()
// _funtioncall
import React, {Component} from 'react';
import {
  AppRegistry,
  StyleSheet,
  TouchableOpacity,
  Text,
  TextInput,
  ScrollView,
  Platform,
  View,
  Image,
  Alert,
  StatusBar
} from 'react-native';
import PaymentComponent from './PaymentComponent';
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import { NativeModules } from 'react-native'
const { InAppUtils } = NativeModules;
import {ActionCreators} from '../../actions'
const FBSDK = require('react-native-fbsdk');
const {LoginManager, AccessToken, LoginButton} = FBSDK;

import Spinner from 'react-native-loading-spinner-overlay';

import Icon from 'react-native-vector-icons/FontAwesome';

class PaymentPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      canMakePayments : "false",
      goldPlanPrice : "",
      silverPlanPrice : "",
      spinnerVisible: false
    };
  }
  componentDidMount(){
    var products = [
      'colabplus',
      'colabpremium'
   ];
   InAppUtils.loadProducts(products, (error, products) => {
     if(error){
       Alert.alert("Connection failed","Cannot connect to iTunes Store");
       this.setState({canMakePayments : 'Can not connect to iTunes Store'})
     }
     if(products){
       console.log(products);
       if(products[0].identifier == "colabplus"){
         this.setState({silverPlanPrice : products[0].priceString})
       }
       if(products[1].identifier == "colabpremium"){
         this.setState({goldPlanPrice : products[1].priceString})
       }
       if(products[1].identifier == "colabplus"){
         this.setState({silverPlanPrice : products[1].priceString})
       }
       if(products[0].identifier == "colabpremium"){
         this.setState({goldPlanPrice: products[0].priceString})
       }
     }
      //update store here.
   });
   InAppUtils.canMakePayments((canMakePayments) => {
    if(!canMakePayments) {
       canMakePayments : "This device is not allowed to make purchases. Please check restrictions on device",
       Alert.alert('Not Allowed', 'This device is not allowed to make purchases. Please check restrictions on device');
    }
    else{
      this.setState(
        {
          canMakePayments : "true",
        }
      )
      console.log("can make payments")
    }
  })
}
  render() {
    return (
      <View style={{
        flex: 1,
        backgroundColor : 'white',
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
              Plans 
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
        <View style={{flex :10}}>
        <ScrollView style={{ flex: 10}}>
        <View style={styles.content}>
          <View style={styles.contentPic}>
          {this.state.canMakePayments == "true"?
          <PaymentComponent silverPlanString={this.state.silverPlanPrice} goldPlanString={this.state.goldPlanPrice}/>
          :
          <View style={{flex : 1}}>
            <Text style={{
              padding : 20,
                 fontSize: 16,
                 fontFamily: 'GothamRounded-Book'
            }}>
            { this.state.canMakePayments == "false"?
             "Loading" : 
             "Error"    
            }
            </Text>
          </View>   
          }
          </View>
            <View
              style={{
              flex: 2.2
            }}
            >
              <View style={styles.createAccountButton}>
                <Text style={styles.privacy}>
                 iTunes Terms
                </Text>
                </View>
              <View style={{paddingLeft : 10}}>
                <Text style={styles.privacy}>
              * Payment will be charged to iTunes Account at confirmation of purchase
                </Text>
                <Text style={styles.privacy}>
                * Subscription automatically renews unless auto-renew is turned off at least 24-hours before the end of the current period
                </Text>
                <Text style={styles.privacy}>
                * Account will be charged for renewal within 24-hours prior to the end of the current period, and identify the cost of the renewal
                </Text>
                <Text style={styles.privacy}>
                * Subscription may be managed by the user and auto-renewal may be turned off by going to the user's Account Settings after purchase
                </Text>
                <Text style={styles.privacy}>
                * Subscription automatically renews unless auto-renew is turned off at least 24-hours before the end of the current period
                </Text>
                <Text style={styles.privacy}>
                * Any unused portion of a free trial period, if offered, will be forfeited when the user purchases a subscription to that publication, where applicable
                </Text>

              </View>
              <View style={{flexDirection : 'row', justifyContent: 'space-between', paddingLeft : 3, paddingRight : 3, paddingTop : 5, paddingBottom : 10}}>
                <TouchableOpacity
                onPress={() => {
                  Actions.WebViewPage({PageName : "Privacy Policy"});
                }}
                >
                  <Text style={styles.privacyButtom}>
                    Privacy policy
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
               onPress={() => {
                Actions.WebViewPage({PageName : "Terms of Use"});
              }} 
                >
                  <Text style={styles.privacyButtom}>
                   Terms of use  
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
        </View>
      </ScrollView>
      </View>
      </View>

    )
  }
};

var styles = StyleSheet.create({
  content: {
    flex: 10,
    backgroundColor: '#FFFFFF'
  },
  form: {
    flex: 5,
  },
  formElementWrapper: {
    flex: 2.5,
    padding: 20,
  },
  submitButton: {
    flexDirection : 'row',
    borderTopColor : "#4f4e86",
    borderTopWidth : 1,
    backgroundColor: '#6563a4',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  createAccountButton: {
    flexDirection : 'row',
     backgroundColor:'white',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  createAccountButtonText: {
    color: '#454475',
    fontFamily: 'GothamRounded-Medium',
    fontSize: 21
  },
  privacy: {
    color: '#454475',
    fontFamily: 'GothamRounded-book',
    fontSize: 11 
  },
  privacyButtom:{
    color: '#454475',
    fontFamily: 'GothamRounded-book',
    fontSize: 13
  },
  submitButtonText: {
    color: 'white',
    fontFamily: 'GothamRounded-Medium',
    fontSize: 21
  },
  formElementText: {
    fontSize: 15,
    fontFamily: 'GothamRounded-Medium',
    marginLeft: 30,
    //color : '#6563A4',
    color: 'red',
    // flex: 1,
  },
  formElementTextContainer: {
    flex: 3,
    flexDirection: 'column',
    backgroundColor: '#f8f8fa',
    alignItems: 'center',
    justifyContent: 'center',

    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#E0E0E0'
  },
  inputBox: {
    flex: 9,
    backgroundColor: '#E0E0E0',
    // backgroundColor : '#fefef1' borderWidth : 2, borderColor : 'red'

    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#E0E0E0'

  },
  inputTextWrapper: {
    flex: 1,
    padding: 10,
    backgroundColor: 'grey', //TODO : set this to a more light color
  },
  inputText: {
    fontSize: 20,
    flex: 1,
    color: 'white',
    fontFamily: 'GothamRounded-Book',
    // marginLeft :15,

  },
  formElement: {
    flex: 1,
    flexDirection: 'row',
    // borderWidth: 1,
    borderBottomColor: '#E0E0E0',
    borderBottomWidth: 1,
    //padding : 3, borderWidth : 2, borderColor : 'red'
  },
  contentPic: {
    flex: 9,
  },
  header: {
    flexDirection: 'row',
    borderColor: '#333156',
    borderBottomWidth: 3,
    backgroundColor: '#6563a4',
    flex: 1.1,
  },
  headerText: {
    color: 'white',
    fontSize: 25,
    paddingTop: 25,
    fontFamily: 'GothamRounded-Medium',
    // fontFamily : 'arial'
  }
});
function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}
// export default connect(({routes}) => ({routes}))(Test);
function mapStateToProps(state) {
  return {
    // recipeCount : state.recipeCount,
    signedInUser: state.signedInUser
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PaymentPage);
// export default connect(mapStateToProps)(Test);