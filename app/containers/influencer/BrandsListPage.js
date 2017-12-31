import React, {Component} from 'react';

import {
  AppRegistry,
  StyleSheet,
  TouchableHighlight,
  Text,
  TextInput,
  ScrollView,
  View,
  Image,
  StatusBar,
  TouchableOpacity,
  Platform
} from 'react-native';

var Spinner = require('react-native-spinkit');
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {ActionCreators} from '../../actions'
import {Actions} from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';

class BrandsListPage extends Component {

  constructor(props) {
    super(props)
    this.state = {
      fetching: true,
      isAcceptedShowing: true
    }
  }

  componentDidMount() {
    this.setState({fetching: true});
    this
      .props
      .fetchBusiness(this.props.loginInfo.id)
      .then((res) => {
        this.setState({fetching: false})
      })
  }

  fetchBusinessItems() {
    return Object
      .keys(this.props.businessData)
      .map(key => this.props.businessData[key])
  }

  toggleisAcceptedShowing() {
    this.setState({
      isAcceptedShowing: !this.state.isAcceptedShowing
    })
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
              Brands
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
          {this.state.isAcceptedShowing
            ? <TouchableOpacity
                onPress={() => {
                this.toggleisAcceptedShowing();
              }}
                style={{
                flex: 1,
                marginBottom: 10,
                marginTop: 10
              }}>
                <View
                  style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'center',
                  borderBottomWidth: 2,
                  borderBottomColor: '#E0E0E0'
                }}>
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
                      View pending requests
                    </Text>
                  </View>
                  <View
                    style={{
                    flex: 2,
                    paddingBottom: 5,
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Icon name="chevron-right" size={25} color='#6563A4'></Icon>
                  </View>
                </View>
              </TouchableOpacity>
            : <TouchableOpacity
              onPress={() => {
              this.toggleisAcceptedShowing();
            }}
              style={{
              flex: 1,
              marginBottom: 10,
              marginTop: 10
            }}>
              <View
                style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'center',
                borderBottomWidth: 2,
                borderBottomColor: '#E0E0E0'
              }}>
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
                    View accepted collaborations
                  </Text>
                </View>
                <View
                  style={{
                  flex: 2,
                  paddingBottom: 5,
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Icon name="chevron-left" size={25} color='#6563A4'></Icon>
                </View>
              </View>
            </TouchableOpacity>
}
          <View style={styles.notificationBar}>
            <Text style={styles.notificationBarText}>
              {this.state.isAcceptedShowing
                ? "Collaborations"
                : "Pending requests"}
            </Text>
          </View>
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
            : null}
          <View style={styles.listView}>
            <ScrollView>
              {!this.state.fetching && this
                .fetchBusinessItems()
                .map((feedItem) => {
                  if (feedItem.status == "accepted" && this.state.isAcceptedShowing) {
                    return (
                      <TouchableOpacity
                        key={feedItem.id}
                        onPress={() => {
                        Actions.VisitProfilePage({clickedUserId: feedItem.id, isBusiness: true})
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
                              source={{
                              uri: "https://randomuser.me/api/portraits/thumb/men/4.jpg"
                            }}/>
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
                              {feedItem.name}
                            </Text>
                            <Text
                              style={{
                              fontSize: 16,
                              fontFamily: 'GothamRounded-Book',
                              marginLeft: 10
                            }}>
                              {feedItem.instagram_name}
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
                          </View>
                        </View>
                      </TouchableOpacity>
                    )
                  }
                  if (feedItem.status == "requested" && !this.state.isAcceptedShowing) {
                    return (
                      <TouchableOpacity
                        key={feedItem.id}
                        onPress={() => {
                        Actions.VisitProfilePage({clickedUserId: feedItem.id, isBusiness: true})
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
                              source={{
                              uri: "https://randomuser.me/api/portraits/thumb/men/4.jpg"
                            }}/>
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
                              {feedItem.name}
                            </Text>
                            <Text
                              style={{
                              fontSize: 16,
                              fontFamily: 'GothamRounded-Book',
                              marginLeft: 10
                            }}>
                              7 posts, 3 stories
                            </Text>
                          </View>
                          <TouchableOpacity
                            onPress={() => {
                            this
                              .props
                              .acceptCollabRequest(this.props.loginInfo.id, feedItem.id, "BrandListPage", "Business")
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
                              accept
                            </Text>
                          </TouchableOpacity>
                        </View>
                      </TouchableOpacity>
                    )
                  }

                })
}
            </ScrollView>
          </View>

        </View>
      </View>
    )
  }
};

var styles = StyleSheet.create({
  header: {
    flex: 1,
    //  alignItems : "center",  justifyContent : "center",  paddingTop : 20,
    // marginTop : 20,  backgroundColor: 'white',
    backgroundColor: '#6563A4',
    borderColor: '#333156',
    borderBottomWidth: 3,
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
    // color : '#6563A4',
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
  influencerContainer: {
    flex: 1,
    backgroundColor: '#43416d',
    margin: 10,
    elevation: 10,
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
    fontFamily: 'GothamRounded-Bold'
  },
  listView: {
    flex: 11,
    flexDirection: 'row',
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
    businessData: state.businessData,
    loginInfo: state.loginInfo
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(BrandsListPage);
