import React, {Component} from 'react';

import {
  AppRegistry,
  StyleSheet,
  TouchableOpacity,
  Text,
  TextInput,
  ScrollView,
  View,
  Alert,
  Clipboard,
  Image,
  Platform,
  AsyncStorage,
  StatusBar,
  RefreshControl
} from 'react-native';
var Spinner = require('react-native-spinkit');
import iapReceiptValidator from 'iap-receipt-validator';
const password = '62742d213b2948a29634c9a196264a7a'; // Shared Secret from iTunes connect
const production = false; // use sandbox or production url for validation
const validateReceipt = iapReceiptValidator(password, production);
import { NativeModules } from 'react-native'
const { InAppUtils } = NativeModules;
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {ActionCreators} from '../../actions'
import {Actions} from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/Entypo';

import FIcon from 'react-native-vector-icons/FontAwesome';
const GLOBAL = require('../../actions/Globals');
import RNActionCable from 'react-native-actioncable';
import ActionCableProvider, {ActionCable} from 'react-actioncable-provider';
class FeedPage extends Component {
  constructor(props) {
    super(props)
    refreshing : false,
    this.state = {
      fetching: true,
      isPullToRefeshShowing: true,
      isunreadMessages : false,
      once : true,
    }
    this.alertMessage = this.alertMessage.bind(this)
    this.validate = this.validate.bind(this)
    this.onPressChat = this.onPressChat.bind(this)
  }
async validate(receiptData) {
    try {
        const validationData = await validateReceipt(receiptData);
        Alert.alert("success");
        // check if Auto-Renewable Subscription is still valid
        var today = new Date();
        console.log(validationData);
        console.log(today);
        console.log(validationData['latest_receipt_info'][0].expires_date)
       if(validationData['latest_receipt_info'][0].expires_date > today){ 
        Alert.alert("Valid");
         console.log("test");
       }
       else{
         console.log("fail")
       }
    } catch(err) {
        console.log(err.valid, err.error, err.message)
        Alert.alert("Failure");
    }
}


  componentDidMount() {
    this.setState({fetching: true, refreshing: false});
    this
      .props
      .fetchFeed(this.props.loginInfo.id)
      .then((res) => {
        this.setState({fetching: false,
          isunreadMessages : this.props.feedData.has_unread_message,
        })
        console.log("business_collaborations_count", this.props.feedData.business_collaborations_count);
        this
          .props
          .setChatObject(this.refs.roomChannel.perform)
              this
                .refs
                .roomChannel
                .perform('get_chat_pairs');
      })
  }
  alertMessage(){
    this.setState({once : false})
    console.log("at least i am here")
    return (  Alert.alert(
        'Network request failed!😴',
        'If the problem persists, try logging in again',
        [
          {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        { cancelable: true}
      )
    )
  }
  onReceived = (data) => {
    if (data.method == "get_chat_pairs") {
      this
        .props
        .setChatList2(data.data);
    }
    if (data.method == "get_chat_pair_messages") {
      reversedMessages = data
        .messages
        .reverse();
      this
        .props
        .setLast5Messages(reversedMessages, data.chat_pair_id);
    }
    if (data.method == "send_message") {
      if(Object.keys(this.props.chatList).length != 0 && this.props.chatList[data.message.chat_pair_id]) {
      this
        .props
        .receiveMessage(data.message);
      }
        if(data.message.user._id != (''+this.props.loginInfo.class[0] + this.props.loginInfo.id)){
        this.setState({isunreadMessages : true})
        }
    }
  }

  fetchFeedItems(accountType) {
    if (accountType == "brand") {
      return Object
        .keys(this.props.feedData.requested_businesses)
        .map(key => this.props.feedData.requested_businesses[key])
    } else if (accountType = "influencer") {
      return Object
        .keys(this.props.feedData.requested_influencers)
        .map(key => this.props.feedData.requested_influencers[key])
    }
  }
  onPressChat = () => {
    //this.setState({isunreadMessages : false})
    var products = [
      'colabplus',
      'colabpremium'
   ];
   InAppUtils.loadProducts(products, (error, products) => {
     console.log(products)
     console.log(error);
      //update store here.
   });
   InAppUtils.canMakePayments((canMakePayments) => {
    if(!canMakePayments) {
       Alert.alert('Not Allowed', 'This device is not allowed to make purchases. Please check restrictions on device');
    }
    else{
      console.log("can make payments")
    }
    InAppUtils.receiptData((error, receiptData)=> {
      if(error) {
        Alert.alert('itunes Error', 'Receipt not found.');
      } else {
        Alert.alert(receiptData);
        Clipboard.setString(receiptData);
        //send to validation server
        this.validate(receiptData)
      }
    });



 //   var productIdentifier = 'colabpremium';
//InAppUtils.purchaseProduct(productIdentifier, (error, response) => {
   // NOTE for v3.0: User can cancel the payment which will be available as error object here.
//   if(response && response.productIdentifier) {
//      Alert.alert('Purchase Successful', 'Your' + response.transactionIdentifier);
      //unlock store here.
//   }
//   else{
//     console.log("didnt work")
//   }
//   console.log("error",error)
//});
 })

    //Actions.ActionCableChatPage();
    //this
    //  .refs
    //  .roomChannel
    //  .perform('get_chat_pairs');
  }

  _onRefresh() {
    this.setState({refreshing: true});
    this
      .props
      .fetchFeed(this.props.loginInfo.id)
      .then(() => {
        this.setState({refreshing: false});
      });
  }
  render() {
    return (
      <View style={{
        flex: 1
      }}>
      {this.props.feedData.internet == false && this.state.once ? 
       this.alertMessage() : 
      null
    }
        {Platform.OS == "ios"
          ? <StatusBar backgroundColor="#6563A4" barStyle="dark-content"/>
          : <StatusBar backgroundColor="#43416d" barStyle="light-content"/>
}
        <ActionCableProvider
          cable={RNActionCable.createConsumer('ws://' + GLOBAL.BASE_URL + '/cable?id=' + this.props.loginInfo.id + "&token=" + this.props.loginInfo.accessToken + "&client=" + this.props.loginInfo.client + "&user_type="+this.props.loginInfo.class)}>
          <ActionCable
            ref='roomChannel'
            channel={{
            channel: 'MessageChannel'
          }}
            onReceived={this.onReceived}/>
        </ActionCableProvider>

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
            onPress={() => {}}>
            <View style={{}}></View>
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
             Colab
            </Text>
          </View>
          {!this.state.fetching && this.props.chat ?
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
            onPress={this.onPressChat}>
            <View style={{}}>
            {!this.state.fetching && [this.props.chatList].reduce(function (
    accumulator,
    currentValue,
  ) {
    temp = currentValue;
    var returnvalue ;
     Object.keys(currentValue).forEach(function(key){
      if(temp[key].chat_pair.current_user_has_unread_messages == true){
        returnvalue =  true;
      }
    }) 
    return returnvalue;
  },false
) 
            ?
              <FIcon name="dot-circle-o" size={25} color='white'>
              </FIcon>
            :  <Icon name="chat" size={25} color='white'></Icon>
            }
            </View>
          </TouchableOpacity>
          : 
          <View style={{flex : 1}}>
          </View>
          }
        </View>
        <View style={styles.content}>
          <View style={styles.contentPic}>
            <TouchableOpacity
              style={{
              flex: 1
            }}
              onPress={() => {
              Actions.InfluencersListPage();
            }}>
              <View style={styles.influencerContainer}>
                <View style={styles.headingContainer}>
                  <Text style={styles.contentHeadingText}>
                    Influencers
                  </Text>
                </View>
                <View style={styles.bottomNumberTextContainer}>
                  <Text style={styles.bottomNumberText}>
                    {!this.state.fetching
                      ? this.props.feedData.influencer_collaborations_count
                      : "0"}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
              flex: 1
            }}
              onPress={() => {
                    if(this.props.loginInfo.class == "Influencer"){
                      Actions.BrandsListPage()
                    }
                    else{
                      Alert.alert(
                        'Your collab posts will appear here!',
                        '🛠Under development🛠',
                        [
                          {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                          {text: 'OK', onPress: () => console.log('OK Pressed')},
                        ],
                        { cancelable: true}
                      )
                }
            }}>
              <View style={styles.brandContainer}>
                <View style={styles.headingContainer}>
                  <Text style={styles.contentHeadingText}>
                    {this.props.loginInfo.class == "Influencer" ?
                    "Brands" :
                    "Collabs"
                    }
                  </Text>
                </View>
                <View style={styles.bottomNumberTextContainer}>
                  <Text style={styles.bottomNumberText}>
                    {!this.state.fetching && this.props.loginInfo.class == "Influencer"
                      ? this.props.feedData.business_collaborations_count
                      : "0"}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.notificationBar}>
            <View>
              <Text style={styles.notificationBarText}>
                Notifications
              </Text>
            </View>
          </View>
          <View style={styles.listView}>
            {this.state.fetching
              ? <View
                  style={{
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Spinner
                    style={{
                    flex: 1
                  }}
                    isVisible={this.state.fetching}
                    size={50}
                    type={'ThreeBounce'}
                    color={'#65634A'}/>
                </View>
              : <ScrollView
                refreshControl={< RefreshControl refreshing = {
                this.state.refreshing
              }
              onRefresh = {
                this
                  ._onRefresh
                  .bind(this)
              } />}>
                {this.state.isPullToRefeshShowing
                  ? <View
                      style={{
                      flex: 1,
                      flexDirection: 'row'
                    }}>
                      <View style={{
                        flex: 10
                      }}>
                        <Text
                          style={{
                          paddingLeft : 10,
                          fontFamily: "GothamRounded-Book",
                          color: 'gray'
                        }}>
                          You can pull down to refresh
                        </Text>
                      </View>
                      <TouchableOpacity
                        style={{
                        flex: 1
                      }}
                        onPress={() => this.setState({isPullToRefeshShowing: false})}>
                        <FIcon name="times-circle" size={20} color='gray'></FIcon>
                      </TouchableOpacity>
                    </View>
                  : null
}
                {!this.state.fetching && this
                  .fetchFeedItems("brand")
                  .map((feedItem) => {
                    if (feedItem.status == "requested") {
                      return (
                        <TouchableOpacity
                          key={feedItem.id}
                          onPress={() => {
                          Actions.VisitProfilePage({clickedUserId: feedItem.id, isBusiness: true})
                        }}>
                          <View style={styles.listElement}>
                            <View style={styles.notificationIcon}>
                              <Image
                                style={{
                                width: 50,
                                height: 50,
                                borderRadius: 25,
                                marginLeft: 10
                              }}
                                source={!this.state.fetching
                                ? (feedItem.profile_pic_link != 0 ? { uri: feedItem.profile_pic_link } : require('../images/1.png')) : require('../images/1.png')}/>
                            </View>
                            <View style={styles.notificationItem}>
                              <Text style={styles.notificationItemText}>
                                <Text style={styles.notificationItemTextBold}>{feedItem.name + " "}</Text>
                                wants to collaborate.
                              </Text>
                            </View>
                            <TouchableOpacity
                              onPress={() => {
                              this
                                .props
                                .acceptCollabRequest(this.props.loginInfo.id, feedItem.id, "FeedPage", "Business")
                            }}
                              style={{
                              width: 100,
                              height: 30,
                              marginTop: 15,
                              marginBottom: 15,
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
                                fontSize: 16,
                                fontFamily: 'GothamRounded-Book'
                              }}>
                                Accept
                              </Text>
                            </TouchableOpacity>
                          </View>
                        </TouchableOpacity>
                      )
                    }
                    if (feedItem.status == "accepted") {
                      return (
                        <TouchableOpacity
                          key={feedItem.id}
                          onPress={() => {
                          Actions.VisitProfilePage({clickedUserId: feedItem.id, isBusiness: true})
                        }}>
                          <View style={styles.listElement}>
                            <View style={styles.notificationIcon}>
                              <Image
                                style={{
                                width: 50,
                                height: 50,
                                borderRadius: 25,
                                marginLeft: 10
                              }}
                                source={!this.state.fetching
                                ? (feedItem.profile_pic_link != 0 ? { uri: feedItem.profile_pic_link } : require('../images/1.png')) : require('../images/1.png')}/>
                            </View>
                            <View style={styles.notificationItem}>
                              <Text style={styles.notificationItemText}>
                                <Text style={styles.notificationItemTextBold}>{feedItem.name + " "}</Text>
                                wants to collaborate.
                              </Text>
                            </View>
                            <TouchableOpacity
                              onPress={() => {
                              chat_pair = feedItem.chat_pair;
                              var message = {}
                              message.chat_pair_id = chat_pair.id;
                              this
                                .props
                                .chat('get_chat_pair_messages', {message})
                              Actions.chatPage2({chat_pair: chat_pair, username: chat_pair.user2_name});
                            }}
                              style={{
                              width: 100,
                              height: 30,
                              marginTop: 15,
                              marginBottom: 15,
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
                                fontSize: 16,
                                fontFamily: 'GothamRounded-Book'
                              }}>
                                message
                              </Text>
                            </TouchableOpacity>
                          </View>
                        </TouchableOpacity>
                      )
                    }
                  })
}
                {!this.state.fetching && this
                  .fetchFeedItems("influencer")
                  .map((feedItem) => {
                    if (feedItem.status == "requested") {
                      return (
                        <TouchableOpacity
                          key={feedItem.id}
                          onPress={() => {
                          Actions.VisitProfilePage({clickedUserId: feedItem.id, isBusiness: false})
                        }}>
                          <View style={styles.listElement}>
                            <View style={styles.notificationIcon}>
                              <Image
                                style={{
                                width: 50,
                                height: 50,
                                borderRadius: 25,
                                marginLeft: 10
                              }}
                                source={!this.state.fetching
                                ? (feedItem.profile_pic_link != 0 ? { uri: feedItem.profile_pic_link } : require('../images/1.png')) : require('../images/1.png')}/>
                            </View>
                            <View style={styles.notificationItem}>
                              <Text style={styles.notificationItemText}>
                                <Text style={styles.notificationItemTextBold}>{feedItem.name + "  "}</Text>
                                wants to collaborate.
                              </Text>
                            </View>
                            <TouchableOpacity
                              onPress={() => {
                              this
                                .props
                                .acceptCollabRequest(this.props.loginInfo.id, feedItem.id, "FeedPage", "Influencer")
                            }}
                              style={{
                              width: 100,
                              height: 30,
                              marginTop: 15,
                              marginBottom: 15,
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
                                fontSize: 16,
                                fontFamily: 'GothamRounded-Book'
                              }}>
                                Accept
                              </Text>
                            </TouchableOpacity>
                          </View>
                        </TouchableOpacity>
                      )
                    }
                    if (feedItem.status == "accepted") {
                      return (
                        <TouchableOpacity
                          key={feedItem.id}
                          onPress={() => {
                          Actions.VisitProfilePage({clickedUserId: feedItem.id, isBusiness: false})
                        }}>
                          <View style={styles.listElement}>
                            <View style={styles.notificationIcon}>
                              <Image
                                style={{
                                width: 50,
                                height: 50,
                                borderRadius: 25,
                                marginLeft: 10
                              }}
                                source={!this.state.fetching
                                ? (feedItem.profile_pic_link != 0 ? { uri: feedItem.profile_pic_link } : require('../images/1.png')) : require('../images/1.png')}/>
                            </View>
                            <View style={styles.notificationItem}>
                              <Text style={styles.notificationItemText}>
                                You have collaboration a with
                                <Text style={styles.notificationItemTextBold}>{ " "+ feedItem.name}</Text>

                              </Text>
                            </View>
                            <TouchableOpacity
                              onPress={() => {
                              chat_pair = feedItem.chat_pair;
                              var message = {}
                              message.chat_pair_id = chat_pair.id;
                              this
                                .props
                                .chat('get_chat_pair_messages', {message})
                              Actions.chatPage2({chat_pair: chat_pair, username: chat_pair.user2_name});
                            }}
                              style={{
                              width: 100,
                              height: 30,
                              marginTop: 15,
                              marginBottom: 15,
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
                                fontSize: 16,
                                fontFamily: 'GothamRounded-Book'
                              }}>
                                message
                              </Text>
                            </TouchableOpacity>
                          </View>
                        </TouchableOpacity>
                      )
                    }
                  })
}
              </ScrollView>
}
          </View>

        </View>
      </View>
    )
  }
};

var styles = StyleSheet.create({
  header: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    //  paddingTop : 20,  marginTop : 20,  backgroundColor: 'white',
    backgroundColor: '#6563A4',
    flexDirection: 'row'
  },
  notificationIcon: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor : 'black',
  },
  collaborateIcon: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  notificationItemText: {
    // paddingLeft : 20,
    fontSize: 15,
    // color : '#424242',
    color: '#1c1b30',
    fontFamily: 'GothamRounded-Book'
  },
  notificationItemTextBold: {
    // paddingLeft : 20,
    fontSize: 15,
    // fontWeight : 'bold', color : '#212121',
    color: '#3f3d6a',
    fontFamily: 'GothamRounded-Medium'
  },
  notificationItem: {
    flex: 7,
    // borderColor : 'red', borderBottomWidth : 1, borderBottomRightRadius : 5,
    // borderBottomColor : 'black', alignItems : 'center',
    paddingRight: 3,
    paddingLeft: 10,
    justifyContent: 'center',
    borderBottomWidth: 0.25,
    // borderBottomColor : "#12111f",
    borderBottomColor: '#9190b6',
    borderRadius: 25,
    // backgroundColor : 'red',
  },
  headerTextAndroid: {
    color: 'white',
    fontSize: 25,
    fontFamily: 'GothamRounded-Bold'
  },
  headerText: {
    // color : '#6563A4',
    color: 'white',
    fontSize: 25,
    paddingTop: 25,
    fontFamily: 'GothamRounded-Bold'
    // fontFamily : 'arial'
  },
  listElement: {
    margin: 1,
    height: 65,
    flexDirection: 'row',
    borderBottomColor: '#9190b6',
    borderBottomWidth: 0.25,
    borderRadius: 25
  },
  headingContainer: {
    flex: 2,
    alignItems: 'flex-start',
    justifyContent: 'flex-start'
  },
  contentHeadingText: {
    fontSize: 25,
    color: 'white',
    fontFamily: 'GothamRounded-Medium'
  },
  bottomNumberTextContainer: {
    flex: 4,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    // borderColor: 'red', borderWidth : 2,
  },
  bottomNumberText: {
    fontSize: 45,
    color: 'white',
    fontFamily: 'GothamRounded-Medium'
  },
  content: {
    flex: 9,
    backgroundColor: '#FFFFFF'
  },
  contentPic: {
    flex: 2,
    backgroundColor: '#6563A4',
    flexDirection: 'row',
    borderColor: '#333156',

    borderBottomWidth: 3
  },
  influencerContainer: {
    flex: 1,
    backgroundColor: '#43416d',
    margin: 10,
    //elevation : 10,
    borderRadius: 10,
    // borderColor: 'white', borderWidth : 1,
  },
  brandContainer: {
    flex: 1,
    backgroundColor: '#43416d',
    margin: 10,
    borderRadius: 10
    // borderColor: 'red', borderWidth : 2,
  },
  notificationBar: {
    flex: 1,
    marginLeft: 10,
    justifyContent: 'center'
  },
  notificationBarText: {
    fontSize: 20,
    fontFamily: 'GothamRounded-Book'
  },
  listView: {
    flex: 7,
    // borderWidth : 1, borderColor : 'red',
  }
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}
// export default connect(({routes}) => ({routes}))(Test);
function mapStateToProps(state) {
  return {
    // recipeCount : state.recipeCount,
    feedData: state.feedData,
    loginInfo: state.loginInfo,
    chat: state.chatObj,
    chatList: state.chatList
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(FeedPage);
