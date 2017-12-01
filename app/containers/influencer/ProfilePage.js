import React ,{ Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  TouchableHighlight,
  Text,
  Image,
  TextInput,
  ScrollView,
  View,
  StatusBar,
} from 'react-native';
// import { Card, Button,List, ListItem , ListView } from 'react-native-elements'
//TODO: FINISHING CHANGEs required. remove the whole signedInuser thing. should just have headers
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Actions } from 'react-native-router-flux';
import { ActionCreators } from '../../actions'
var ScrollableTabView = require('react-native-scrollable-tab-view');
import Icon from 'react-native-vector-icons/FontAwesome';
import Octicons from 'react-native-vector-icons/Octicons';
class influencerProfilePage extends Component{
  //this is a local state.
  //redux has nothing to do with this
constructor(props) {
  super(props)
  this.state = { fetching: true ,

  }
}

componentDidMount(){
    this.setState({ fetching: true })
    //Data fetching should happen here only.
    this.props.fetchProfile(this.props.loginInfo.id).then( (res) => {
      this.setState({fetching: false })
    })
}

  //put some loading screen animation in if clause
  render() {
return(
  <View style={{flex : 1}}>
  <StatusBar
    backgroundColor="#6563A4"
    barStyle="dark-content"
  />

  <View style = {styles.content}>
    <View style={styles.contentPic}>
      <View style={styles.profilePicHolder}>
        <Image
          style = {{width: 70, height: 70, borderRadius: 35, borderColor: 'red', borderWidth: 2}}
          source = {require('../images/new.jpg')}
        />
      </View>
      <View style={styles.profileInfoHolder}>
        <View style={{flex: 1, flexDirection: 'row',justifyContent : 'center',alignItems : 'center',}}>
          <Text style={{  height:30, borderRadius:2, fontSize : 20,
               padding: 6, color: 'white', fontFamily: 'GothamRounded-Bold'}}>
               {!this.state.fetching ? (this.props.profileData.basic_data.first_name + " " + this.props.profileData.basic_data.last_name).slice(0,19) : ""}
               </Text>
               <Octicons name="broadcast" size={20} color='white' >
                </Octicons>
                {
                  //briefcase icon for brands
                }
        </View>

        <View style={{flex: 1 ,alignItems : 'center',justifyContent : 'center'}}>
                        <TouchableHighlight
                        onPress={()=> {console.log("clicked on edit profile");
                        Actions.UpdateInfoPage();
                      }}
                         style={{
                        width : 150,
                        height : 35,
                        marginTop : 15,
                        marginBottom : 15,
                        marginRight : 10,
                        borderRadius: 2,
                        borderColor:'#fefefe',
                        borderWidth : 3/2,
                        paddingTop: 10,
                        paddingBottom: 10,
                        alignItems : 'center',
                        justifyContent: 'center',
                        backgroundColor : '#43416d',
                        borderRadius : 5
                    }}>
                    <View style={{flexDirection : 'row', alignItems : 'center', justifyContent : 'center'}}>
                    <Text style={{
                        color : 'white',
                            fontSize : 16,
                            fontFamily :'GothamRounded-Book',
                    }}>
                      Edit Profile 
                        </Text>
                    </View>
                    </TouchableHighlight>
        </View>

      </View>
    </View>
  </View>
  <ScrollableTabView
        style={{flex: 3, backgroundColor : 'white'}}
        tabBarUnderlineStyle={{backgroundColor : 'white'}}
        tabBarActiveTextColor='white'
        tabBarInactiveTextColor='black'
        tabBarBackgroundColor='#6563a4'
        tabBarTextStyle= {{fontFamily: 'GothamRounded-Book', fontSize : 17, marginTop:10}}
        >
        <ScrollView tabLabel="Bio" >
          <View style={styles.informationSlot}>
          <View style={{flexDirection : 'column'}}>
            <Text style={{marginTop : 10 ,
                          fontSize: 16,
                          marginLeft : 5,
                          // padding:5,
                         fontFamily :'GothamRounded-Medium'
                        }}>
                        About me
            </Text>
            <Text style={{marginTop : 5,
                          fontSize: 15,
                          marginLeft : 5,
                          marginRight : 10,
                          marginBottom:10,
                          // padding:5,
                         fontFamily :'GothamRounded-Book'
                        }}>
                {!this.state.fetching ? this.props.profileData.basic_data.bio : null }
            </Text>
            </View>
          </View>
          <View>
            <Text style={{marginTop :10 ,
                          fontSize: 16,
                          paddingLeft: 15,
                          marginLeft : 5,
                          marginBottom:0,
                         fontFamily :'GothamRounded-Medium'
                        }}>
                       Niche 
            </Text>
            </View>
          <View style={styles.informationCategoriesSlot}>
            {! this.state.fetching && this.props.profileData.advanced_data.niche.map((nicheItem,i)=>{
              return (
              
                    <View key={i} style={{
                        marginTop : 1,
                        marginBottom : 1,
                        marginLeft : 5,
                        marginRight : 5,
                        borderRadius:3,
                        borderColor : 'white',
                        padding : 5,
                        alignItems : 'center',
                        justifyContent: 'center',
                        backgroundColor : '#6563A4',
                    }}>
                    <Text style={{
                        color : 'white',
                            fontSize : 16,
                            fontFamily :'GothamRounded-Book',
                    }}>
                           {nicheItem} 
                        </Text>
                    </View>
                   )//return

            })//Map
          }
          {this.state.fetching ? <Text>Searching...</Text> : null }
          </View>
          <View>
            <Text style={{
                          marginTop :10 ,
                          fontSize: 16,
                          paddingLeft: 15,
                          marginLeft : 5,
                         marginBottom : 5,
                         fontFamily :'GothamRounded-Medium'
                        }}>
                      Pricing structure
            </Text>
            </View>
          <View style={styles.informationSlotPricing}>
            <View style={styles.informationSlotCard}>
              <Text style={styles.informationSlotCardHeadingText}>
                 Post 
              </Text>
              <View style={{alignItems: "flex-end",
                    justifyContent : 'flex-end',
                }}>
                <Text style={styles.informationSlotCardPricingText}>
                {!this.state.fetching ? this.props.profileData.basic_data.price_per_post : null }
                </Text>
              </View>
            </View>
             <View style={styles.informationSlotCard}>
              <Text style={styles.informationSlotCardHeadingText}>
                 Story 
              </Text>
              <View style={{alignItems: "flex-end",
                    justifyContent : 'flex-end',
                }}>
                <Text style={styles.informationSlotCardPricingText}>
                {!this.state.fetching ? this.props.profileData.basic_data.price_per_story: null }
                </Text>
              </View>
             </View>
          </View>
          <View style={styles.informationSlot}>
          <View>
            <View style={{flexDirection : 'row',alignItems : 'center'}}>
            <Text style={{marginTop : 10 ,
                          fontSize: 16,
                          marginLeft : 5,
                          // padding:5,
                          marginRight : 5,
                         fontFamily :'GothamRounded-Medium'
             }}>
                { //  Contact : {!this.state.fetching ? this.props.profileData.contact.phone : null }
                }
               Payment methods
            </Text>
                <Icon name="lock" size={20} color='#6463A4' >
                </Icon>
                </View>
                <View style={{
                flexDirection:'row',
                flexWrap : 'wrap',
                justifyContent : 'flex-start',
                alignItems : 'flex-start',
                }}>
                    <View  style={{
                        marginTop : 1,
                        marginBottom : 1,
                        marginLeft : 5,
                        marginRight : 5,
                        borderRadius:3,
                        borderColor : 'white',
                        padding : 5,
                        alignItems : 'center',
                        justifyContent: 'center',
                        backgroundColor : '#6563A4',
                    }}>
                    <Text style={{
                        color : 'white',
                            fontSize : 16,
                            fontFamily :'GothamRounded-Book',
                    }}>
                      PhonePay 
                        </Text>
                    </View>
                    <View  style={{
                        marginTop : 1,
                        marginBottom : 1,
                        marginLeft : 5,
                        marginRight : 5,
                        borderRadius:3,
                        borderColor : 'white',
                        padding : 5,
                        alignItems : 'center',
                        justifyContent: 'center',
                        backgroundColor : '#6563A4',
                    }}>
                    <Text style={{
                        color : 'white',
                            fontSize : 16,
                            fontFamily :'GothamRounded-Book',
                    }}>
                       paypal 
                        </Text>
                    </View>
                    <View  style={{
                        marginTop : 1,
                        marginBottom : 1,
                        marginLeft : 5,
                        marginRight : 5,
                        borderRadius:3,
                        borderColor : 'white',
                        padding : 5,
                        alignItems : 'center',
                        justifyContent: 'center',
                        backgroundColor : '#6563A4',
                    }}>
                    <Text style={{
                        color : 'white',
                            fontSize : 16,
                            fontFamily :'GothamRounded-Book',
                    }}>
                       paytm 
                        </Text>
                    </View>
                    <View  style={{
                        marginTop : 1,
                        marginBottom : 1,
                        marginLeft : 5,
                        marginRight : 5,
                        borderRadius:3,
                        borderColor : 'white',
                        padding : 5,
                        alignItems : 'center',
                        justifyContent: 'center',
                        backgroundColor : '#6563A4',
                    }}>
                    <Text style={{
                        color : 'white',
                            fontSize : 16,
                            fontFamily :'GothamRounded-Book',
                    }}>
                        Google-wallet 
                        </Text>
                    </View>
                    </View>
            </View>
          </View>
          <View style={styles.informationSlot}>
          <View>
            <View style={{flexDirection : 'row',alignItems : 'center'}}>
            <Text style={{marginTop : 10 ,
                          fontSize: 16,
                          marginLeft : 5,
                          // padding:5,
                          marginRight : 5,
                         fontFamily :'GothamRounded-Medium'
             }}>
                { //  Contact : {!this.state.fetching ? this.props.profileData.contact.phone : null }
                }
                Contact
            </Text>
                <Icon name="lock" size={20} color='#6463A4' >
                </Icon>
                </View>
            <Text style={{padding : 5 , fontSize: 15, fontFamily :'GothamRounded-Book', flex : 5}}>
                { //  Contact : {!this.state.fetching ? this.props.profileData.contact.phone : null }
                }
                {!this.state.fetching ? this.props.profileData.basic_data.phone : null }
            </Text>
            </View>
          </View>
          <View style={styles.informationSlot}>
          <View>
            <View style={{flexDirection : 'row',alignItems : 'center'}}>
            <Text style={{marginTop : 10 ,
                          fontSize: 16,
                          marginLeft : 5,
                          // padding:5,
                          marginRight : 5,
                         fontFamily :'GothamRounded-Medium'
             }}>
                { //  Contact : {!this.state.fetching ? this.props.profileData.contact.phone : null }
                }
               Email   
            </Text>
                <Icon name="lock" size={20} color='#6463A4' >
                </Icon>
                </View>
            <Text style={{padding : 5 , fontSize: 15, fontFamily :'GothamRounded-Book', flex : 5}}>
                { //  Contact : {!this.state.fetching ? this.props.profileData.contact.phone : null }
                }
                {//: {!this.state.fetching ? this.props.profileData.contact.email : null }
                }
                {!this.state.fetching ? this.props.profileData.basic_data.email : null }
            </Text>
          </View>
          </View>
        </ScrollView>
        <View tabLabel="Stats" style={{flex : 10}}>
            <View style={{flex : 2,  backgroundColor: '#fefefe', flexDirection : 'row' }}>
                <View style={{ flex:  3 , flexDirection : 'column', justifyContent : 'center'}}> 
              <Text style={{ fontSize : 20, fontFamily : 'GothamRounded-Medium', marginLeft : 20 }}>
                 Likes per post 
             </Text>
             </View>
              <View style={{alignItems: "flex-end",
                  justifyContent : 'flex-end',
                  flex : 1,
                  marginRight : 20 
                }}>
                <Text style={styles.informationSlotCardPricingText}>
                    1225
                </Text>
            </View>
          </View>

          <View style={{flex : 2, backgroundColor: '#F6F5FA' , flexDirection : 'row'}}>
            <View style={{ flex:  3 , flexDirection : 'column', justifyContent : 'center'}}> 
              <Text style={{ fontSize : 20, fontFamily : 'GothamRounded-Medium', marginLeft : 20 }}>
                  Comments per post 
             </Text>
             </View>
              <View style={{alignItems: "flex-end",
                  justifyContent : 'flex-end',
                  flex : 1,
                marginRight : 20 
                }}>
                <Text style={styles.informationSlotCardPricingText}>
                   134 
                </Text>
            </View>
        </View>
            <View style={{flex : 2,  backgroundColor: '#fefefe', flexDirection : 'row' }}>
                <View style={{ flex:  3 , flexDirection : 'column', justifyContent : 'center'}}> 
              <Text style={{ fontSize : 20, fontFamily : 'GothamRounded-Medium', marginLeft : 20 }}>
               Your collaborations will appear here 
             </Text>
             </View>
              <View style={{alignItems: "flex-end",
                  justifyContent : 'flex-end',
                  flex : 1
                }}>
                <Text style={styles.informationSlotCardPricingText}>
                </Text>
            </View>
          </View>
            <View style={{flex : 7 }}>
            </View>
        </View>

        <ScrollView tabLabel="Collab" >
            <View style={{ backgroundColor: '#F6F5FA'}}>
                <Text style={{
                          marginTop : 10 ,
                          fontSize: 16,
                          marginLeft : 10,
                          marginRight : 10,
                          marginBottom:10,
                          fontFamily :'GothamRounded-Medium'
                }}> 
                Favourite collabs
                </Text>
            </View>
            <View style={{}}>
                <View style={{flex : 1 ,  flexDirection : 'row', justifyContent : 'center' , borderBottomWidth: 0.5, borderBottomColor: '#E0E0E0', }}>
                    <View style={{flex : 1, alignItems : 'center',justifyContent:'center' }}>
                          <Image
                            style = {{width: 40, height: 40, borderRadius: 20}}
                            source = { { uri: "https://randomuser.me/api/portraits/thumb/men/4.jpg" }}
                          />
                    </View>
                    <View style={{flex : 4, justifyContent : 'center', }}>
                        <Text style={{
                            fontSize: 16,
                            fontFamily :'GothamRounded-Medium',
                            marginLeft : 10
                        }}>
                            GooGle
                        </Text>
                        <Text style={{
                            fontSize: 16,
                            fontFamily :'GothamRounded-Book',
                            marginLeft : 10,
                        }}>
                       The Search Engine 
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
                        borderRadius : 5
                    }}>
                    <Text style={{
                        color : 'white',
                            fontSize : 16,
                            fontFamily :'GothamRounded-Book',
                    }}>
                            message 
                        </Text>
                    </View>
                </View>
                <View style={{flex : 1 ,  flexDirection : 'row', justifyContent : 'center' , borderBottomWidth: 0.5, borderBottomColor: '#E0E0E0', }}>
                    <View style={{flex : 1, alignItems : 'center',justifyContent:'center' }}>
                          <Image
                            style = {{width: 40, height: 40, borderRadius: 20}}
                            source = { { uri: "https://randomuser.me/api/portraits/thumb/men/4.jpg" }}
                          />
                    </View>
                    <View style={{flex : 4, justifyContent : 'center', }}>
                        <Text style={{
                            fontSize: 16,
                            fontFamily :'GothamRounded-Medium',
                            marginLeft : 10
                        }}>
                           Amazon 
                        </Text>
                        <Text style={{
                            fontSize: 16,
                            fontFamily :'GothamRounded-Book',
                            marginLeft : 10,
                        }}>
                        Online shopping  
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
                        borderRadius : 5
                    }}>
                    <Text style={{
                        color : 'white',
                            fontSize : 16,
                            fontFamily :'GothamRounded-Book',
                    }}>
                            message 
                        </Text>
                    </View>
                </View>
                <View style={{flex : 1 ,  flexDirection : 'row', justifyContent : 'center' , borderBottomWidth: 0.5, borderBottomColor: '#E0E0E0', }}>
                    <View style={{flex : 1, alignItems : 'center',justifyContent:'center' }}>
                          <Image
                            style = {{width: 40, height: 40, borderRadius: 20}}
                            source = { { uri: "https://randomuser.me/api/portraits/thumb/men/4.jpg" }}
                          />
                    </View>
                    <View style={{flex : 4, justifyContent : 'center', }}>
                        <Text style={{
                            fontSize: 16,
                            fontFamily :'GothamRounded-Medium',
                            marginLeft : 10
                        }}>
                           Facebook 
                        </Text>
                        <Text style={{
                            fontSize: 16,
                            fontFamily :'GothamRounded-Book',
                            marginLeft : 10,
                        }}>
                        social networking  
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
                        borderRadius : 5
                    }}>
                    <Text style={{
                        color : 'white',
                            fontSize : 16,
                            fontFamily :'GothamRounded-Book',
                    }}>
                            message 
                        </Text>
                    </View>
                </View>
                <View style={{flex : 1 ,  flexDirection : 'row', justifyContent : 'center' , borderBottomWidth: 0.5, borderBottomColor: '#E0E0E0', }}>
                    <View style={{flex : 1, alignItems : 'center',justifyContent:'center' }}>
                          <Image
                            style = {{width: 40, height: 40, borderRadius: 20}}
                            source = { { uri: "https://randomuser.me/api/portraits/thumb/men/4.jpg" }}
                          />
                    </View>
                    <View style={{flex : 4, justifyContent : 'center', }}>
                        <Text style={{
                            fontSize: 16,
                            fontFamily :'GothamRounded-Medium',
                            marginLeft : 10
                        }}>
                           Nike 
                        </Text>
                        <Text style={{
                            fontSize: 16,
                            fontFamily :'GothamRounded-Book',
                            marginLeft : 10,
                        }}>
                        Just do it 
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
                        borderRadius : 5
                    }}>
                    <Text style={{
                        color : 'white',
                            fontSize : 16,
                            fontFamily :'GothamRounded-Book',
                    }}>
                            message 
                        </Text>
                    </View>
                </View>
            </View>
        </ScrollView>
      </ScrollableTabView>
</View>
)}

};

var styles = StyleSheet.create({
  header: {
     flex: 1,
     alignItems : "center",
     justifyContent : "center",
     backgroundColor: '#6563a4',
    //  borderColor : 'red',
    //  borderWidth : 1,
    },
    container: {
  flex: 8,
},
page: {
  flex: 2,
  alignItems: 'center',
  justifyContent: 'center',
},

    informationSlot:{
        // flex : 1,
      flexDirection: 'row',
     // borderBottomWidth: 0.5,
    //  borderBottomColor: '#E0E0E0',
      // alignItems : 'center',
      paddingLeft : 15,
      //justifyContent : 'left',
    },
    informationSlotCardHeadingText:{
      fontSize : 20,
      fontFamily : 'GothamRounded-Medium'
    },
    informationSlotCardPricingText:{
      fontSize :  20,
      fontFamily : 'GothamRounded-Bold',
    },
    followersHolderLeftText:{
      color : 'white',

      fontFamily: 'GothamRounded-Book'
    },
    informationSlotPricing:{
      flex : 1,
      //borderBottomWidth: 0.5,
      //borderBottomColor: '#E0E0E0',
      // alignItems : 'center',
      flexDirection : 'row',
      paddingLeft : 15,
      justifyContent : 'center',
    },
    informationSlotCard:{
        flex : 1,
        margin : 10,
        backgroundColor: '#f1f1f1',
        borderRadius : 5,
    },
    informationCategoriesSlot:{
      // flex : 1,
      // width : 60,
      paddingLeft: 15,
      //borderBottomWidth: 0.5,
      flexDirection:'row',
      flexWrap : 'wrap',
      padding : 10,
    //  borderBottomColor: '#E0E0E0',
      justifyContent : 'flex-start',
      alignItems : 'flex-start',
      // flexFlow : 'row'
    },
  headerText:{
    color : 'white',
    fontSize : 25,
    paddingTop : 25,
    fontFamily : 'GothamRounded-Bold',
  },
  headingContainer:{
    alignItems: 'center',
    flex : 2,
    justifyContent: 'center',
  },
  contentHeadingText:{
    fontSize : 25,
    fontFamily : 'chalet',
  },
  bottomNumberTextContainer:{
    flex : 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomNumberText:{
    fontSize : 80,
    fontFamily : 'chalet',
  },
  content:{
    flex : 0.78,
    backgroundColor : '#FFFFFF',
    // paddingTop : 20,
  },
  contentPic:{
    flex : 2,
    borderColor : '#333156',
    paddingTop : 20,
    borderBottomWidth : 3,
    paddingBottom: 10,
    elevation : 10,
    backgroundColor : '#6563A4',
    flexDirection : 'row',
  },
  profilePicHolder:{
    flex : 2,
    // borderColor : 'blue',
    // borderWidth : 1,
    alignItems : 'center',
    justifyContent : 'center'
  },
  profileInfoHolder:{
    flex : 4,
    paddingRight : 20
    // borderColor : 'white',
    // borderWidth : 1,
    // flexDirection : ''
  },
  profileInfoTextContainer:{
    flex : 1,
    borderColor : 'white',
    borderWidth : 1,
    marginRight : 10
  },
  nameHolder:{
    flex: 2,
    // borderColor : 'black',
    // borderWidth : 1,
    alignItems : 'center',
    justifyContent : 'center',
  },
  followersHolder:{
    flex : 3,
    flexDirection : 'row',
  },
  followersHolderLeft: {
    flex : 1,
    alignItems : 'flex-start',
    borderWidth : 1,
    borderColor : 'white',
    margin:10,
    // backgroundColor : 'white'
  },
  followersHolderRight: {
    flex : 1,
    alignItems : 'center',
    backgroundColor : 'green'
  },
  profileInfoNameText:{
    fontSize : 20,
    color : '#FFFFFF',
    fontFamily : 'GothamRounded-Medium',
  },
  profileInfoFollowerText:{
    fontSize : 25,
    color : "#FFFFFF",
    // fontFamily : 'roboto',
  },
  influencerContainer:{
    flex : 1,
  },
  brandContainer:{
    flex : 1,
  },
  notificationBar:{
    flex : 1,
    justifyContent: 'center',
  },
  notificationBarText:{
    fontSize: 20,
  },
  information:{
    flex : 8,
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

export default connect(mapStateToProps, mapDispatchToProps)(influencerProfilePage);
