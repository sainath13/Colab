import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    TouchableHighlight,
    TouchableOpacity,
    Text,
    Image,
    Linking,
    TextInput,
    Clipboard,
    Alert,
    ScrollView,
    View,
    Keyboard,
    StatusBar,
    Platform
} from 'react-native';
const GLOBAL = require('../../actions/Globals');
// import { Card, Button,List, ListItem , ListView } from
// 'react-native-elements'
// TODO: FINISHING CHANGEs required. remove the whole signedInuser thing. should
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
// just have headers
var Spinner = require('react-native-spinkit');
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import PopupDialog, {SlideAnimation, DialogTitle, DialogButton} from 'react-native-popup-dialog';
import {ActionCreators} from '../../actions'
var CustomTabBar = require('../components/CustomTabBar');
import {Actions} from 'react-native-router-flux';
var ScrollableTabView = require('react-native-scrollable-tab-view');
import Icon from 'react-native-vector-icons/FontAwesome';
import Octicons from 'react-native-vector-icons/Octicons';
class VisitProfilePage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            fetching: true,
            reportText : "",
        }
        this.onclickButton = this
            .onclickButton
            .bind(this);
    }
    componentDidUpdate() {
        if (this.props.visitProfileData.status == "no connection" || this.props.visitProfileData.status == "collaberate") {
            this
                .popupDialog
                .dismiss()
            this
                .popupDialog2
                .dismiss()
        }
    }

    componentDidMount() {
        this.setState({fetching: true})
        this
            .props
            .fetchVisitProfile(this.props.loginInfo.id, this.props.clickedUserId, this.props.isBusiness)
            .then((res) => {
                this.setState({fetching: false})
            })
    }

    fetchCollaborationItems() {
        return Object
            .keys(this.props.visitProfileData['collaborations'])
            .map(key => this.props.visitProfileData['collaborations'][key])
    }

    onclickButton(statusString) {
        if (statusString == "no connection") {} else if (statusString == "requested") {} else if (statusString == "accepted") {
            chat_pair = this.props.visitProfileData.chat_pair
            var message = {}
            message.chat_pair_id = chat_pair.id;
            this
              .props
              .chat('get_chat_pair_messages', {message})
            Actions.chatPage2({chat_pair: chat_pair, username: chat_pair.user2_name});
        } else if (statusString == "collaberate") {
            this
                .props
                .requestCollaboration(this.props.loginInfo.id, this.props.visitProfileData.id, this.props.visitProfileData.class);
        } else if (statusString = "accept collaberation") {
            this
                .props
                .acceptCollabRequest(this.props.loginInfo.id, this.props.visitProfileData.id, "VisitProfilePage", this.props.visitProfileData.class);
        }

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

                <PopupDialog
                    ref={(popupDialog2) => {
                    this.popupDialog2 = popupDialog2;
                }}
                    dialogTitle={< DialogTitle title = "Report account" titleTextStyle = {{ color : 'gray', fontSize : 17, fontFamily : 'GothamRounded-Medium', }}/>}
                    height={0.35}>
                    <View
                        style={{
                        backgroundColor: '#6563A4',
                        flex: 1,
                        padding: 10,
                        borderColor: 'white',
                        borderWidth: 2
                    }}>
                                <TextInput
                    placeholder="Enter why you want to report"
                    underlineColorAndroid='rgba(0,0,0,0)'
                    maxLength
                    ={300}
                    multiline={true}
                    numberOfLines={6}
                    value={this.state.reportText}
                    onSubmitEditing={Keyboard.dismiss}
                    onChangeText={(reportText) => this.setState({reportText})}
                    style={{
                    height: 100,
                    fontSize: 15,
                    color : "white",
                    borderColor : '#fefefe',
                    borderWidth : 1,
                    fontFamily: 'GothamRounded-Book'
                  }}></TextInput>
                        <TouchableHighlight
                            style={{
                            marginTop: 10
                        }}
                            onPress={() => {
                                var classvar= "";
                                this.props.loginInfo.class == "Influencer" ? classvar = "influencers" : classvar = "businesses";
                                let ROUTE = "https://"+GLOBAL.BASE_URL + "/"+ classvar +"/" + this.props.loginInfo.id + "/report_spam"
                                ROUTE = ROUTE + "?spammer_class=" + this.props.visitProfileData.class +"&spammer_id=" + this.props.visitProfileData.id + "&comment=" + this.state.reportText;
                                console.log(ROUTE);
                                return fetch( ROUTE, {
                                    method: 'POST',
                                    headers: {
                                      'access-token':  this.props.loginInfo.accessToken,
                                      'token-type': this.props.loginInfo.tokenType,
                                      'expiry': this.props.loginInfo.expiry,
                                      'client': this.props.loginInfo.client,
                                      'uid': this.props.loginInfo.uid,
                                    }
                                  })//fetch
                                  .then((response) => {
                                    console.log("visitPorfile",response.status);
                                    if(response.status == 200){
                                        this
                                        .popupDialog2
                                        .dismiss()
                                        Alert.alert(
                                            'Account Reported!',
                                            'Thanks',
                                            [
                                              {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                                              {text: 'OK', onPress: () => console.log('OK Pressed')},
                                            ],
                                            { cancelable: true}
                                          )
                                    }
                                  })
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
                                        Report Account
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
                                    <Icon name="ban" size={25} color='#6564A4'></Icon>
                                </View>
                            </View>
                        </TouchableHighlight>
                    </View>
                </PopupDialog>
                <PopupDialog
                    ref={(popupDialog) => {
                    this.popupDialog = popupDialog;
                }}
                    dialogTitle={< DialogTitle title = "Options" titleTextStyle = {{ color : 'gray', fontSize : 17, fontFamily : 'GothamRounded-Medium', }}/>}
                    height={0.3}>
                    <View
                        style={{
                        backgroundColor: '#6563A4',
                        flex: 1,
                        padding: 10,
                        borderColor: 'white',
                        borderWidth: 2
                    }}>
                        {this.props.visitProfileData.status == "accept collaberation"
                            ? <TouchableHighlight
                                    onPress={() => {
                                    Alert.alert('Are you sure', 'You want to Reject Collaboration?', [
                                        {
                                            text: 'Cancel',
                                            onPress: () => console.log('Cancel Pressed'),
                                            style: 'cancel'
                                        }, {
                                            text: 'Reject',
                                            onPress: () => {
                                                console.log('Reject Collaboration');
                                                var isBusiness;
                                                if (this.props.visitProfileData.class == "Business") {
                                                    isBusiness = true;
                                                } else {
                                                    isBusiness = false;
                                                }
                                                this
                                                    .props
                                                    .rejectCollab(this.props.loginInfo.id, this.props.visitProfileData.id, isBusiness);
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
                                                Reject Collab
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
                                            <Icon name="trash" size={25} color='#6564A4'></Icon>
                                        </View>
                                    </View>
                                </TouchableHighlight>
                            : null}
                        {this.props.visitProfileData.status == "accepted"
                            ? <TouchableHighlight
                                    onPress={() => {
                                    Alert.alert('Are you sure', 'You want to Delete Collaboration?', [
                                        {
                                            text: 'Cancel',
                                            onPress: () => console.log('Cancel Pressed'),
                                            style: 'cancel'
                                        }, {
                                            text: 'Delete',
                                            onPress: () => {
                                                console.log('Delete Collaboration');
                                                var isBusiness;
                                                if (this.props.visitProfileData.class == "Business") {
                                                    isBusiness = true;
                                                } else {
                                                    isBusiness = false;
                                                }
                                                this
                                                    .props
                                                    .deleteCollab(this.props.loginInfo.id, this.props.visitProfileData.id, isBusiness);
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
                                                Delete collaboration
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
                                            <Icon name="trash" size={25} color='#6564A4'></Icon>
                                        </View>
                                    </View>
                                </TouchableHighlight>
                            : null}

                        <TouchableHighlight
                            style={{
                            marginTop: 10
                        }}
                            onPress={() => {
                                this
                                .popupDialog
                                .dismiss()
                                this
                                .popupDialog2
                                .show();
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
                                        Report Account
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
                                    <Icon name="ban" size={25} color='#6564A4'></Icon>
                                </View>
                            </View>
                        </TouchableHighlight>
                    </View>
                </PopupDialog>
                <View style={styles.content}>
                    {Platform.OS == "ios"
                        ? <View
                                style={{
                                paddingTop: 20,
                                backgroundColor: '#6364A4'
                            }}></View>
                        : null}
                    <View
                        style={{
                        flexDirection: 'row',
                        backgroundColor: '#6463A4'
                    }}>
                        <TouchableOpacity
                            onPress={() => {
                            (Actions.pop());
                            this
                                .props
                                .unsetVisitProfile();
                        }}
                            style={{
                            flex: 1,
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: '#6364A4'
                        }}>
                            <Icon name="chevron-left" size={20} color='white'></Icon>
                        </TouchableOpacity>
                        <View
                            style={{
                            flex: 8,
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <Text
                                style={{
                                borderRadius: 2,
                                fontSize: 20,
                                padding: 6,
                                color: 'white',
                                fontFamily: 'GothamRounded-Bold'
                            }}>
                                {this.state.fetching
                                    ? " loading"
                                    : ""}
                                {!this.state.fetching ? this.props.visitProfileData.name : ""}

                            </Text>
                            {!this.state.fetching ? this.props.visitProfileData.class == "Influencer"
                                ? <Octicons name="broadcast" size={20} color='white'></Octicons>
                                : <Octicons name="briefcase" size={20} color='white'></Octicons>
                                : null
}
                        </View>
                    </View>
                    <View style={styles.contentPic}>
                        <View
                            style={[
                            styles.profilePicHolder, {
                                paddingLeft: 20
                            }
                        ]}>
                            <Image
                                style={{
                                width: 70,
                                height: 70,
                                borderRadius: 35,
                                borderColor: 'white',
                                borderWidth: 2,
                                marginBottom: 15
                            }}
                                source={!this.state.fetching
                                ? (this.props.visitProfileData.profile_pic_link != 0 ? { uri: this.props.visitProfileData.profile_pic_link } : require('../images/1.png')) : require('../images/1.png')}/>
                        </View>
                        <View style={styles.profileInfoHolder}>
                            <View
                                style={{
                                flexDirection: 'row',
                                marginLeft: 23
                            }}>
                                <View
                                    style={{
                                    flex: 1,
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    <TouchableHighlight
                                        onPress={() => {
                                        (console.log("clicked on edit profile"));
                                        this.onclickButton(this.props.visitProfileData.status)
                                    }}
                                        style={{
                                        width: 150,
                                        height: 35,
                                        marginTop: 15,
                                        marginBottom: 15,
                                        marginRight: 10,
                                        borderRadius: 2,
                                        borderColor: '#fefefe',
                                        borderWidth: 3 / 2,
                                        paddingTop: 10,
                                        paddingBottom: 10,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        backgroundColor: '#43416d',
                                        borderRadius: 5
                                    }}>
                                        <View
                                            style={{
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}>
                                            <Text
                                                style={{
                                                color: 'white',
                                                fontSize: 16,
                                                fontFamily: 'GothamRounded-Book'
                                            }}>
                                                {(() => {
                                                    switch (this.props.visitProfileData.status) {
                                                        case "no connection":
                                                            return "No Connection";
                                                        case "requested":
                                                            return "Requested";
                                                        case "accepted":
                                                            return "Message";
                                                        case "collaberate":
                                                            return "Collaberate";
                                                        case "accept collaberation":
                                                            return "Accept Collab";
                                                        default:
                                                            return "not available";
                                                    }
                                                })()}
                                            </Text>
                                        </View>
                                    </TouchableHighlight>
                                </View>
                                <View
                                    style={{
                                    flex: 1,
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    <TouchableHighlight
                                        onPress={() => {
                                        console.log("setting");
                                        this
                                            .popupDialog
                                            .show();
                                    }}
                                        style={{
                                        width: 40,
                                        height: 35,
                                        marginTop: 15,
                                        marginBottom: 15,
                                        marginRight: 10,
                                        borderRadius: 2,
                                        borderColor: '#fefefe',
                                        borderWidth: 3 / 2,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        backgroundColor: '#43416d',
                                        borderRadius: 5
                                    }}>
                                        <Icon name="caret-down" size={20} color='white'></Icon>
                                    </TouchableHighlight>
                                </View>
                            </View>

                        </View>
                    </View>
                </View>
                <ScrollableTabView
                    style={{
                    flex: 2.8,
                    backgroundColor: 'white'
                }}
                    renderTabBar={() => <CustomTabBar
                    underlineStyle={{
                    backgroundColor: 'white'
                }}
                    activeTextColor='white'
                    inactiveTextColor='black'
                    backgroundColor='#6563a4'
                    textStyle={{
                    fontFamily: 'GothamRounded-Book',
                    fontSize: 17,
                    marginTop: 10
                }}/>}>
                    <ScrollView tabLabel="Bio">

                        {this.state.fetching
                            ? <View
                                    style={{
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    <Spinner
                                        style={{
                                        flex: 1,
                                        marginTop: 30
                                    }}
                                        isVisible={this.state.fetching}
                                        size={50}
                                        type={'ThreeBounce'}
                                        color={'#65634A'}/>
                                </View>
                            : <View>
                                <View style={styles.informationSlot}>
                                    <View
                                        style={{
                                        flexDirection: 'column'
                                    }}>
                                        <Text
                                            style={{
                                            marginTop: 10,
                                            fontSize: 16,
                                            marginLeft: 5,
                                            fontFamily: 'GothamRounded-Medium'
                                        }}>
                                            About me
                                        </Text>
                                        <Text
                                            style={{
                                            marginTop: 5,
                                            fontSize: 15,
                                            marginLeft: 5,
                                            marginRight: 10,
                                            marginBottom: 10,
                                            fontFamily: 'GothamRounded-Book'
                                        }}>
                                            {this.props.visitProfileData.bio}
                                        </Text>
                                    </View>
                                </View>
                                <View>
                                    <Text
                                        style={{
                                        marginTop: 10,
                                        fontSize: 16,
                                        paddingLeft: 15,
                                        marginLeft: 5,
                                        marginBottom: 0,
                                        fontFamily: 'GothamRounded-Medium'
                                    }}>
                                        Niche
                                    </Text>
                                </View>
                                <View style={styles.informationCategoriesSlot}>
                                    {!this.state.fetching && this
                                        .props
                                        .visitProfileData
                                        .niche
                                        .map((nicheItem, i) => {
                                            return (

                                                <View
                                                    key={i}
                                                    style={{
                                                    marginTop: 1,
                                                    marginBottom: 1,
                                                    marginLeft: 5,
                                                    marginRight: 5,
                                                    borderRadius: 3,
                                                    borderColor: 'white',
                                                    padding: 5,
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    backgroundColor: '#6563A4'
                                                }}>
                                                    <Text
                                                        style={{
                                                        color: 'white',
                                                        fontSize: 16,
                                                        fontFamily: 'GothamRounded-Book'
                                                    }}>
                                                        {nicheItem}
                                                    </Text>
                                                </View>
                                            )

                                        })
}
                                    {this.state.fetching
                                        ? <Text>Searching...</Text>
                                        : null}
                                </View>
                                {
                                    this.props.visitProfileData.class == "Influencer" ?
                                <View>
                                    <Text
                                        style={{
                                        marginTop: 10,
                                        fontSize: 16,
                                        paddingLeft: 15,
                                        marginLeft: 5,
                                        marginBottom: 5,
                                        fontFamily: 'GothamRounded-Medium'
                                    }}>
                                        Pricing structure
                                    </Text>
                                </View>
                                : null
                                }
                                {this.props.visitProfileData.class == "Influencer"
                                    ? <View style={styles.informationSlotPricing}>
                                            <View style={styles.informationSlotCard}>
                                                <Text style={styles.informationSlotCardHeadingText}>
                                                    Post
                                                </Text>
                                                <View
                                                    style={{
                                                    alignItems: "flex-end",
                                                    justifyContent: 'flex-end'
                                                }}>
                                                    <Text style={styles.informationSlotCardPricingText}>
                                                        {!this.state.fetching
                                                            ? this.props.visitProfileData.price_per_post + this.props.visitProfileData.currency
                                                            : null}
                                                    </Text>
                                                </View>
                                            </View>
                                            <View style={styles.informationSlotCard}>
                                                <Text style={styles.informationSlotCardHeadingText}>
                                                    Story
                                                </Text>
                                                <View
                                                    style={{
                                                    alignItems: "flex-end",
                                                    justifyContent: 'flex-end'
                                                }}>
                                                    <Text style={styles.informationSlotCardPricingText}>
                                                        {!this.state.fetching
                                                            ? this.props.visitProfileData.price_per_story +  this.props.visitProfileData.currency
                                                            : null}
                                                    </Text>
                                                </View>
                                            </View>
                                        </View>
                                    : null
}
{ !this.state.fetching && this.props.visitProfileData.class == "Influencer" ?
                                <View style={styles.informationSlot}>
                                    <View>
                                        <View
                                            style={{
                                            flexDirection: 'row',
                                            alignItems: 'center'
                                        }}>
                                            <Text
                                                style={{
                                                marginTop: 10,
                                                fontSize: 16,
                                                marginLeft: 5,
                                                marginRight: 5,
                                                fontFamily: 'GothamRounded-Medium'
                                            }}>
                                                Payment methods
                                            </Text>
                                            <Icon name="lock" size={20} color='#6463A4'></Icon>
                                        </View>
                                        <View
                                            style={{
                                            flexDirection: 'row',
                                            flexWrap: 'wrap',
                                            justifyContent: 'flex-start',
                                            alignItems: 'flex-start'
                                        }}>
                                        {!this.state.fetching && this.props.visitProfileData.class == "Influencer" && this
                                        .props
                                        .visitProfileData
                                        .payments
                                        .map((paymentItem, i) => {
                                            return (
                                            <TouchableOpacity
                                            onPress={async () => {
                                           if(paymentItem.payment_id){
                                            await Clipboard.setString(paymentItem.payment_id);
                                            Alert.alert(
                                                paymentItem.payment_type + ' id copied to clipboard!',
                                                'You can use it to make payments 🤑',
                                                [
                                                  {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                                                  {text: 'OK', onPress: () => console.log('OK Pressed')},
                                                ],
                                                { cancelable: true}
                                              )
                                            }else{
                                            Alert.alert(
                                                paymentItem.payment_type + ' id not set!',
                                                'Use other payment methods or ping influencer to update',
                                                [
                                                  {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                                                  {text: 'OK', onPress: () => console.log('OK Pressed')},
                                                ],
                                                { cancelable: true}
                                              )
                                            }
                                        }
                                            }
                                            key={i}
                                                style={{
                                                marginTop: 1,
                                                marginBottom: 1,
                                                marginLeft: 5,
                                                marginRight: 5,
                                                borderRadius: 3,
                                                borderColor: 'white',
                                                padding: 5,
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                backgroundColor: '#6563A4'
                                            }}>
                                                <Text
                                                    style={{
                                                    color: 'white',
                                                    fontSize: 16,
                                                    fontFamily: 'GothamRounded-Book'
                                                }}>
                                                   {paymentItem.payment_type}
                                                </Text>
                                            </TouchableOpacity>
                                            )})}

                                        </View>
                                    </View>
                                </View>
                                : null
}
                                <View style={styles.informationSlot}>
                                    <View>
                                        <View
                                            style={{
                                            flexDirection: 'row',
                                            alignItems: 'center'
                                        }}>
                                            <Text
                                                style={{
                                                marginTop: 10,
                                                fontSize: 16,
                                                marginLeft: 5,
                                                marginRight: 5,
                                                fontFamily: 'GothamRounded-Medium'
                                            }}>
                                                Contact
                                            </Text>
                                            <Icon name="lock" size={20} color='#6463A4'></Icon>
                                        </View>
                                        <TouchableOpacity
                                       onPress={async () => {
                                           if(this.props.visitProfileData.phone){
                                        await Clipboard.setString(this.props.visitProfileData.phone);
                                        Alert.alert(
                                            'Contact number copied to clipboard!',
                                            'You can use it to make a phone call 🤙🏻',
                                            [
                                              {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                                              {text: 'OK', onPress: () => console.log('OK Pressed')},
                                            ],
                                            { cancelable: true}
                                          )
                                        }}
                                    }
                                        >
                                        <Text
                                            style={{
                                            padding: 5,
                                            fontSize: 15,
                                            fontFamily: 'GothamRounded-Book',
                                            flex: 5
                                        }}>
                                            {!this.state.fetching
                                                ? this.props.visitProfileData.phone
                                                : null}
                                        </Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                     <View style={styles.informationSlot}>
                                            <View>
                                                <View
                                                    style={{
                                                    flexDirection: 'row',
                                                    alignItems: 'center'
                                                }}>
                                                    <Text
                                                        style={{
                                                        marginTop: 10,
                                                        fontSize: 16,
                                                        marginLeft: 5,
                                                        marginRight: 5,
                                                        fontFamily: 'GothamRounded-Medium'
                                                    }}>
                                                        Business Email
                                                    </Text>
                                                    <Icon name="lock" size={20} color='#6463A4'></Icon>
                                                </View>
                                                <TouchableOpacity
                                       onPress={async () => {
                                        await Clipboard.setString(this.props.visitProfileData.business_email);
                                        Alert.alert(
                                            'Email id copied to clipboard!',
                                            'You can use it to contact 📩!',
                                            [
                                              {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                                              {text: 'OK', onPress: () => console.log('OK Pressed')},
                                            ],
                                            { cancelable: true}
                                          )
                                        }}
                                                >
                                                <Text
                                                    style={{
                                                    padding: 5,
                                                    fontSize: 15,
                                                    fontFamily: 'GothamRounded-Book',
                                                    flex: 5
                                                }}>
                                                    {!this.state.fetching
                                                        ? this.props.visitProfileData.business_email
                                                        : null}
                                                </Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                            </View>
}
                    </ScrollView>
                    <View
                        tabLabel="Stats"
                        style={{
                        flex: 10
                    }}>

                        {this.state.fetching
                            ? <View
                                    style={{
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    <Spinner
                                        style={{
                                        flex: 1,
                                        marginTop: 30
                                    }}
                                        isVisible={this.state.fetching}
                                        size={50}
                                        type={'ThreeBounce'}
                                        color={'#65634A'}/>
                                </View>
                            : <View
                                style={{
                                flex: 10
                            }}>
                                <View
                                    style={{
                                    flex: 2,
                                    backgroundColor: '#fefefe',
                                    flexDirection: 'row'
                                }}>
                                    <View
                                        style={{
                                        flex: 1,
                                        flexDirection: 'column',
                                        justifyContent: 'center'
                                    }}>
                                        <Text
                                            style={{
                                            fontSize: 17,
                                            fontFamily: 'GothamRounded-Medium',
                                            marginLeft: 20
                                        }}>
                                           Instagram
                                        </Text>
                                    </View>
                                    <TouchableOpacity
                                        style={{
                                                    marginTop: 7,
                                                    marginBottom: 7,
                                                    marginLeft: 5,
                                                    marginRight: 5,
                                                    borderRadius: 3,
                                                    borderColor: 'white',
                                                    padding: 10,
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    backgroundColor: '#6563A4'
                                    }}
                                    onPress={() => Linking.openURL("instagram://user?username="+this.props.visitProfileData.instagram_name)}
                                    >
                                        <Text style={{
                                            color : 'white',
                                            fontFamily: 'GothamRounded-Medium',
                                            fontSize : 20 
                                        }}>
                                            {this.props.visitProfileData.instagram_name}
                                        </Text>
                                    </TouchableOpacity>
                                </View>

                                <View
                                    style={{
                                    flex: 2,
                                    backgroundColor: '#F6F5FA',
                                    flexDirection: 'row'
                                }}>
                                    <View
                                        style={{
                                        flex: 3,
                                        flexDirection: 'column',
                                        justifyContent: 'center'
                                    }}>
                                        <Text
                                            style={{
                                            fontSize: 17,
                                            fontFamily: 'GothamRounded-Medium',
                                            marginLeft: 20
                                        }}>
                                            Number Of Posts
                                        </Text>
                                    </View>
                                    <View
                                        style={{
                                        alignItems: "flex-end",
                                        justifyContent: 'flex-end',
                                        flex: 1,
                                        marginRight: 20
                                    }}>
                                        <Text style={styles.informationSlotCardPricingText}>
                                            {this.props.visitProfileData.instagram_posts_count}
                                        </Text>
                                    </View>
                                </View>
                                <View
                                    style={{
                                    flex: 2,
                                    backgroundColor: '#FEFEFE',
                                    flexDirection: 'row'
                                }}>
                                    <View
                                        style={{
                                        flex: 3,
                                        flexDirection: 'column',
                                        justifyContent: 'center'
                                    }}>
                                        <Text
                                            style={{
                                            fontSize: 17,
                                            fontFamily: 'GothamRounded-Medium',
                                            marginLeft: 20
                                        }}>
                                            Followers
                                        </Text>
                                    </View>
                                    <View
                                        style={{
                                        alignItems: "flex-end",
                                        justifyContent: 'flex-end',
                                        flex: 1,
                                        marginRight: 20
                                    }}>
                                        <Text style={styles.informationSlotCardPricingText}>
                                            {this.props.visitProfileData.instagram_followed_by}
                                        </Text>
                                    </View>
                                </View>
                                <View
                                    style={{
                                    flex: 2,
                                    backgroundColor: '#F6F5FA',
                                    flexDirection: 'row'
                                }}>
                                    <View
                                        style={{
                                        flex: 3,
                                        flexDirection: 'column',
                                        justifyContent: 'center'
                                    }}>
                                        <Text
                                            style={{
                                            fontSize: 17,
                                            fontFamily: 'GothamRounded-Medium',
                                            marginLeft: 20
                                        }}>
                                            Likes per pic 
                                        </Text>
                                    </View>
                                    <View
                                        style={{
                                        alignItems: "flex-end",
                                        justifyContent: 'flex-end',
                                        flex: 1,
                                        marginRight: 20
                                    }}>
                                        <Text style={styles.informationSlotCardPricingText}>
                                            {this.props.visitProfileData.avg_likes_pic}
                                        </Text>
                                    </View>
                                </View>

                                <View
                                    style={{
                                    flex: 2,
                                    backgroundColor: '#FEFEFE',
                                    flexDirection: 'row'
                                }}>
                                    <View
                                        style={{
                                        flex: 3,
                                        flexDirection: 'column',
                                        justifyContent: 'center'
                                    }}>
                                        <Text
                                            style={{
                                            fontSize: 17,
                                            fontFamily: 'GothamRounded-Medium',
                                            marginLeft: 20
                                        }}>
                                            Comments per pic 
                                        </Text>
                                    </View>
                                    <View
                                        style={{
                                        alignItems: "flex-end",
                                        justifyContent: 'flex-end',
                                        flex: 1,
                                        marginRight: 20
                                    }}>
                                        <Text style={styles.informationSlotCardPricingText}>
                                            {this.props.visitProfileData.avg_comments_pic}
                                        </Text>
                                    </View>
                                </View>
                                <View
                                    style={{
                                    flex: 2,
                                    backgroundColor: '#F6F5FA',
                                    flexDirection: 'row'
                                }}>
                                    <View
                                        style={{
                                        flex: 3,
                                        flexDirection: 'column',
                                        justifyContent: 'center'
                                    }}>
                                        <Text
                                            style={{
                                            fontSize: 17,
                                            fontFamily: 'GothamRounded-Medium',
                                            marginLeft: 20
                                        }}>
                                            Likes per video 
                                        </Text>
                                    </View>
                                    <View
                                        style={{
                                        alignItems: "flex-end",
                                        justifyContent: 'flex-end',
                                        flex: 1,
                                        marginRight: 20
                                    }}>
                                        <Text style={styles.informationSlotCardPricingText}>
                                            {this.props.visitProfileData.avg_likes_vdio}
                                        </Text>
                                    </View>
                                </View>

                                <View
                                    style={{
                                    flex: 2,
                                    backgroundColor: '#FEFEFE',
                                    flexDirection: 'row'
                                }}>
                                    <View
                                        style={{
                                        flex: 3,
                                        flexDirection: 'column',
                                        justifyContent: 'center'
                                    }}>
                                        <Text
                                            style={{
                                            fontSize: 17,
                                            fontFamily: 'GothamRounded-Medium',
                                            marginLeft: 20
                                        }}>
                                            Comments per video 
                                        </Text>
                                    </View>
                                    <View
                                        style={{
                                        alignItems: "flex-end",
                                        justifyContent: 'flex-end',
                                        flex: 1,
                                        marginRight: 20
                                    }}>
                                        <Text style={styles.informationSlotCardPricingText}>
                                            {this.props.visitProfileData.avg_comments_vdio}
                                        </Text>
                                    </View>
                                </View>

                                <View
                                    style={{
                                    flex: 7
                                }}></View>
                            </View>
}
                    </View>

                    <ScrollView tabLabel="Collabs">
                        {this.state.fetching
                            ? <View
                                    style={{
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    <Spinner
                                        style={{
                                        flex: 1,
                                        marginTop: 30
                                    }}
                                        isVisible={this.state.fetching}
                                        size={50}
                                        type={'ThreeBounce'}
                                        color={'#65634A'}/>
                                </View>
                            : <View>
                                <View
                                    style={{
                                    backgroundColor: '#F6F5FA'
                                }}>
                                    <Text
                                        style={{
                                        marginTop: 10,
                                        fontSize: 16,
                                        marginLeft: 10,
                                        marginRight: 10,
                                        marginBottom: 10,
                                        fontFamily: 'GothamRounded-Medium'
                                    }}>
                                        Favourite collabs
                                    </Text>
                                </View>
                                <View style={{}}>
                        {!this.state.fetching && this
                            .fetchCollaborationItems()
                            .map((collaboration,i) => {

                                return (
                                    <TouchableOpacity
                                        disabled={true}
                                        key={i}
                                        onPress={() => {
                                        Actions.VisitProfilePage({clickedUserId: collaboration.id, isBusiness: false})
                                    }}>
                                        <View
                                            style={{
                                            flex: 1,
                                            flexDirection: 'row',
                                            justifyContent: 'center',
                                            borderBottomWidth: 0.5,
                                            borderBottomColor: '#E0E0E0'
                                        }}>
                                            <View
                                                style={{
                                                flex: 1,
                                                alignItems: 'center',
                                                justifyContent: 'center'
                                            }}>
                                                <Image
                                                    style={{
                                                    width: 40,
                                                    height: 40,
                                                    borderRadius: 20
                                                }}
                                                    source={!this.state.fetching
                                                    ? (collaboration.profile_pic_link != 0 ? { uri: collaboration.profile_pic_link } : require('../images/1.png')) : require('../images/1.png')}/>
                                            </View>
                                            <View
                                                style={{
                                                flex: 4,
                                                justifyContent: 'center'
                                            }}>
                                                <Text
                                                    style={{
                                                    fontSize: 16,
                                                    fontFamily: 'GothamRounded-Medium',
                                                    marginLeft: 10
                                                }}>
                                                    {collaboration.instagram_name}
                                                </Text>
                                                <Text
                                                    style={{
                                                    fontSize: 16,
                                                    fontFamily: 'GothamRounded-Book',
                                                    marginLeft: 10
                                                }}>
                                                    {collaboration.name}
                                                </Text>
                                            </View>
                                            <View
                                                style={{
                                                flex: 2,
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
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                )

                            })
}
                                </View>
                            </View>
}
                    </ScrollView>

                </ScrollableTabView>
        </KeyboardAwareScrollView>
            </View>
        )
    }

};

var styles = StyleSheet.create({
    header: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: '#6563a4',
        // borderColor : 'red', borderWidth : 1,
    },
    container: {
        flex: 8
    },
    page: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center'
    },

    informationSlot: {
        // flex : 1,
        flexDirection: 'row',
        // borderBottomWidth: 0.5, borderBottomColor: '#E0E0E0', alignItems : 'center',
        paddingLeft: 15,
        //justifyContent : 'left',
    },
    informationSlotCardHeadingText: {
        fontSize: 20,
        fontFamily: 'GothamRounded-Medium'
    },
    informationSlotCardPricingText: {
        fontSize: 20,
        fontFamily: 'GothamRounded-Bold'
    },
    followersHolderLeftText: {
        color: 'white',

        fontFamily: 'GothamRounded-Book'
    },
    informationSlotPricing: {
        flex: 1,
        //borderBottomWidth: 0.5, borderBottomColor: '#E0E0E0', alignItems : 'center',
        flexDirection: 'row',
        paddingLeft: 15,
        justifyContent: 'center'
    },
    informationSlotCard: {
        flex: 1,
        margin: 10,
        backgroundColor: '#f1f1f1',
        borderRadius: 5
    },
    informationCategoriesSlot: {
        // flex : 1, width : 60,
        paddingLeft: 15,
        //borderBottomWidth: 0.5,
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: 10,
        // borderBottomColor: '#E0E0E0',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        // flexFlow : 'row'
    },
    headerText: {
        color: 'white',
        fontSize: 25,
        paddingTop: 25,
        fontFamily: 'GothamRounded-Bold'
    },
    headingContainer: {
        alignItems: 'center',
        flex: 2,
        justifyContent: 'center'
    },
    contentHeadingText: {
        fontSize: 25,
        fontFamily: 'chalet'
    },
    bottomNumberTextContainer: {
        flex: 4,
        alignItems: 'center',
        justifyContent: 'center'
    },
    bottomNumberText: {
        fontSize: 80,
        fontFamily: 'chalet'
    },
    content: {
        flex: 0.72,
        backgroundColor: '#FFFFFF',
        //paddingTop : 20, if we do this we get white status bar
    },
    contentPic: {
        flex: 2,
        borderColor: '#333156',
        borderBottomWidth: 3,
        backgroundColor: '#6563A4',
        flexDirection: 'row'
    },
    profilePicHolder: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center'
    },
    profileInfoHolder: {
        flex: 4,
        // flexDirection : ''
        justifyContent: 'center'
    },
    profileInfoTextContainer: {
        flex: 1
    },
    nameHolder: {
        flex: 2,
        // borderColor : 'black', borderWidth : 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    followersHolder: {
        flex: 3,
        flexDirection: 'row'
    },
    followersHolderLeft: {
        flex: 1,
        alignItems: 'flex-start',
        borderWidth: 1,
        borderColor: 'white',
        margin: 10,
        // backgroundColor : 'white'
    },
    followersHolderRight: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'green'
    },
    profileInfoNameText: {
        fontSize: 20,
        color: '#FFFFFF',
        fontFamily: 'GothamRounded-Medium'
    },
    profileInfoFollowerText: {
        fontSize: 25,
        color: "#FFFFFF",
        // fontFamily : 'roboto',
    },
    influencerContainer: {
        flex: 1
    },
    brandContainer: {
        flex: 1
    },
    notificationBar: {
        flex: 1,
        justifyContent: 'center'
    },
    notificationBarText: {
        fontSize: 20
    },
    information: {
        flex: 8
    }
});

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}
function mapStateToProps(state) {
    return {
        //not calling any api actions here yet, but will be required later
        visitProfileData: state.visitProfileData,
        loginInfo: state.loginInfo,
        chat: state.chatObj
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(VisitProfilePage);
