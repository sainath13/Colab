import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    TouchableOpacity,
    TouchableHighlight,
    Text,
    Image,
    TextInput,
    ScrollView,
    Clipboard,
    Alert,
    View,
    Platform,
    StatusBar
} from 'react-native';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {Actions} from 'react-native-router-flux';
import {ActionCreators} from '../../actions'
var Spinner = require('react-native-spinkit');
var CustomTabBar = require('../components/CustomTabBar');
var ScrollableTabView = require('react-native-scrollable-tab-view');
import Icon from 'react-native-vector-icons/FontAwesome';
import Octicons from 'react-native-vector-icons/Octicons';
class influencerProfilePage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            fetching: true
        }
    }

    componentDidMount() {
        this.setState({fetching: true})
        this
            .props
            .fetchProfile(this.props.loginInfo.id)
            .then((res) => {
                this.setState({fetching: false})
            })
    }
    fetchCollaborationItems() {
        return Object
            .keys(this.props.profileData['collaborations'])
            .map(key => this.props.profileData['collaborations'][key])
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
                <View style={styles.content}>
                    <View style={styles.contentPic}>
                        <View style={styles.profilePicHolder}>
                            <Image
                                style={{
                                width: 70,
                                height: 70,
                                borderRadius: 35,
                                borderColor: '#fefefe',
                                borderWidth: 2
                            }}
                                source={!this.state.fetching
                                ? (this.props.profileData.basic_data.profile_pic_link.length != 0 ? { uri: this.props.profileData.basic_data.profile_pic_link } : require('../images/1.png')) : require('../images/1.png')}/>
                        </View>
                        <View style={styles.profileInfoHolder}>
                            {this.props.profileData.class == "Influencer"
                                ? <View
                                        style={{
                                        flex: 1,
                                        paddingLeft: 10,
                                        flexDirection: 'row',
                                        justifyContent: 'flex-start',
                                        alignItems: 'center'
                                    }}>
                                        <Text
                                            style={{
                                            borderRadius: 2,
                                            fontSize: Platform.OS == "ios"
                                                ? 20
                                                : 25,
                                            padding: 6,
                                            color: 'white',
                                            fontFamily: 'GothamRounded-Bold'
                                        }}>
                                            {!this.state.fetching
                                                ? (this.props.profileData.basic_data.name)
                                                : "Loading"}
                                        </Text>
                                        <Octicons name="broadcast" size={20} color='white'></Octicons>
                                    </View>
                                : <View
                                    style={{
                                    flex: 1,
                                    paddingLeft: 10,
                                    flexDirection: 'row',
                                    justifyContent: 'flex-start',
                                    alignItems: 'center'
                                }}>
                                    <Text
                                        style={{
                                        borderRadius: 2,
                                        fontSize: Platform.OS == "ios"
                                            ? 20
                                            : 25,
                                        padding: 6,
                                        paddingTop: 10,
                                        color: 'white',
                                        fontFamily: 'GothamRounded-Bold'
                                    }}>
                                        {!this.state.fetching
                                            ? (this.props.profileData.basic_data.name).slice(0, 19)
                                            : "Loading"}
                                    </Text>
                                    <Octicons name="briefcase" size={20} color='white'></Octicons>
                                </View>
}
                            <View
                                style={{
                                flexDirection: 'row'
                            }}>
                                <View
                                    style={{
                                    flex: 2,
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    <TouchableHighlight
                                        onPress={() => {
                                        console.log("clicked on edit profile");
                                        Actions.UpdateInfoPage();
                                    }}
                                        style={{
                                        width: 150,
                                        height: 35,
                                        marginTop: 15,
                                        marginBottom: 15,
                                        marginRight: 1,
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
                                                Edit Profile
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
                                        Actions.SettingPage();
                                    }}
                                        style={{
                                        width: 45,
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
                                        <Icon name="cog" size={20} color='white'></Icon>
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
                                                                {!this.state.fetching &&  this.props.profileData.basic_data.instagram_name.length == 0 ?
                                <Text style={{fontFamily: 'GothamRounded-Book',
                    fontSize: 17,
                    margin: 10}}>
                                Please connect to instagram and update basic information to activate account using Edit profile button above
                            </Text>
                           :  null }
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
                                            {!this.state.fetching
                                                ? this.props.profileData.basic_data.bio
                                                : null}
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
                                        .profileData
                                        .advanced_data
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
                                {this.props.profileData.class == "Influencer"
                                    ? <View>
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
                                            <View style={styles.informationSlotPricing}>
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
                                                                ? this.props.profileData.basic_data.price_per_post + this.props.profileData.basic_data.currency
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
                                                                ? this.props.profileData.basic_data.price_per_story + this.props.profileData.basic_data.currency
                                                                : null}
                                                        </Text>
                                                    </View>
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
                                        {!this.state.fetching && this.props.profileData.class == "Influencer" && this
                                        .props
                                        .profileData
                                        .advanced_data
                                        .payments
                                        .map((paymentItem, i) => {
                                            return (
                                            <TouchableOpacity
                                            onPress={async () => {
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
                                            }}
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
                                        <Text
                                            style={{
                                            padding: 5,
                                            fontSize: 15,
                                            fontFamily: 'GothamRounded-Book',
                                            flex: 5
                                        }}>
                                            {!this.state.fetching
                                                ? this.props.profileData.basic_data.phone
                                                : null}
                                        </Text>
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
                                                <Text
                                                    style={{
                                                    padding: 5,
                                                    fontSize: 15,
                                                    fontFamily: 'GothamRounded-Book',
                                                    flex: 5
                                                }}>
                                                    {!this.state.fetching
                                                        ? this.props.profileData.basic_data.business_email
                                                        : null}
                                                </Text>
                                            </View>
                                        </View>
                                <View style={styles.informationSlot}>
                                    <View
                                        style={{
                                        paddingBottom: 20
                                    }}>
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
                                                Email
                                            </Text>
                                            <Icon name="lock" size={20} color='#6463A4'></Icon>
                                        </View>
                                        <Text
                                            style={{
                                            padding: 5,
                                            fontSize: 15,
                                            fontFamily: 'GothamRounded-Book',
                                            flex: 5
                                        }}>
                                            {!this.state.fetching
                                                ? this.props.profileData.basic_data.email
                                                : null}
                                        </Text>
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
                                                            {!this.state.fetching &&  this.props.profileData.basic_data.instagram_name.length == 0 ?
                                <Text style={{fontFamily: 'GothamRounded-Book',
                    fontSize: 17,
                    margin: 10}}>
                                Please connect to instagram and update basic information to activate account using Edit profile button above
                            </Text>
                           :  null }

                           {this.props.loginInfo.class == "Influencer" ?
                           <View>
                                <View
                                    style={{
                                    flex: 2,
                                    backgroundColor: '#fefefe',
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
                                           Remaining collaborations 
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
                                            {this.props.profileData.left_free_collaborations}
                                        </Text>
                                    </View>
                                </View>

                                <TouchableOpacity
                                        onPress={() => {
                                            if(this.props.profileData.not_shown_collaborations > 0){
                                            Alert.alert("Hidden Collaborations","Upgrade your plan to reveal them");
                                            }
                                        }}

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
                                          Hidden collaborations 
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
                                            {this.props.profileData.not_shown_collaborations}
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                                </View>
                                : null
                                }
                                <View
                                    style={{
                                    flex: 2,
                                    backgroundColor: '#fefefe',
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
                                            {this.props.profileData.basic_data.instagram_posts_count}
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
                                            {this.props.profileData.basic_data.instagram_followed_by}
                                        </Text>
                                    </View>
                                </View>
                                <View
                                    style={{
                                    flex: 2,
                                    backgroundColor: '#fefefe',
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
                                            {this.props.profileData.basic_data.avg_likes_pic}
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
                                            {this.props.profileData.basic_data.avg_comments_pic}
                                        </Text>
                                    </View>
                                </View>
                                <View
                                    style={{
                                    flex: 2,
                                    backgroundColor: '#fefefe',
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
                                            {this.props.profileData.basic_data.avg_likes_vdio}
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
                                            {this.props.profileData.basic_data.avg_comments_vdio}
                                        </Text>
                                    </View>
                                </View>


                                <View
                                    style={{
                                    flex: 3
                                }}></View>
                            </View>
}
                    </View>

                    <ScrollView tabLabel="Collab">
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
                                {!this.state.fetching &&  this.props.profileData.basic_data.instagram_name.length == 0 ?
                                <Text style={{fontFamily: 'GothamRounded-Book',
                    fontSize: 17,
                    margin: 10}}>
                                Please connect to instagram and update basic information to activate account using Edit profile button above
                            </Text>
                           :  null }
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
                                                        ? {
                                                            uri: collaboration.profile_pic_link
                                                        }
                                                        : { uri: "https://randomuser.me/api/portraits/thumb/men/4.jpg"}}/>
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
                                            <TouchableOpacity

                                        onPress={() => {
                                       //     this.getLast5Messages(feedItem.chat_pair);
                                       chat_pair = collaboration.chat_pair;
                                       var message = {}
                                       message.chat_pair_id = chat_pair.id;
                                       this
                                         .props
                                         .chat('get_chat_pair_messages', {message})
                                       Actions.chatPage2({chat_pair: chat_pair, username: chat_pair.user2_name});
                                        }}

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

                            })
}
                                </View>
                            </View>
}
                    </ScrollView>
                </ScrollableTabView>
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
        flex: 0.78,
        backgroundColor: '#FFFFFF',
        // paddingTop : 20,
    },
    contentPicAndroid: {
        flex: 2,
        borderColor: '#333156',
        borderBottomWidth: 3,
        paddingBottom: 10,
        backgroundColor: '#6563A4',
        flexDirection: 'row',
        borderColor: 'green',
        borderWidth: 1
    },
    contentPic: {
        flex: 2,
        borderColor: '#333156',
        paddingTop: 20,
        borderBottomWidth: 3,
        paddingBottom: 10,
        elevation: 10,
        backgroundColor: '#6563A4',
        flexDirection: 'row'
    },
    profilePicHolder: {
        flex: 2,
        // borderColor : 'blue', borderWidth : 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    profileInfoHolder: {
        flex: 4,
        paddingRight: 20
        // borderColor : 'white', borderWidth : 1, flexDirection : ''
    },
    profileInfoTextContainer: {
        flex: 1,
        borderColor: 'white',
        borderWidth: 1,
        marginRight: 10
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
        profileData: state.profileData,
        loginInfo: state.loginInfo,
        chat : state.chatObj
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(influencerProfilePage);
