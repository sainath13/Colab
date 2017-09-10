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
import { ActionCreators } from '../../actions'


class influencerProfilePage extends Component{
  //this is a local state.
  //redux has nothing to do with this
constructor(props) {
  super(props)
  this.state = { fetching: true }
}

componentDidMount(){
    this.setState({ fetching: true })
    //Data fetching should happen here only.
    this.props.fetchProfile(this.props.signedInUser.headers,this.props.signedInUser.data.id,this.props.signedInUser.data.email).then( (res) => {
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
          style = {{width: 80, height: 80, borderRadius: 40}}
          source = {require('../images/new.jpg')}
        />
      </View>
      <View style={styles.profileInfoHolder}>
        <View style={{flex: 1, flexDirection: 'column',justifyContent: 'center',alignItems : 'center'}}>
          <Text style={{  height:30, borderRadius:2, fontSize : 20,
               padding: 6, color: 'white', fontFamily: 'GothamRounded-Bold'}}>Siddhesh Latkar</Text>
        </View>

        <View style={{flex: 1 , alignItems : 'center',justifyContent: 'center'}}>
          <Text style={{  height:30, borderRadius:2, borderColor:'white', borderWidth : 3/2,
               padding: 6, color: 'white', fontFamily: 'GothamRounded-Book'}}>✓ Collaborate</Text>
        </View>

      </View>
    </View>
    <View style={{flex : 0.7,
                  backgroundColor : '#ECEDF1',
                  marginTop : 10,
                  marginBottom : 10,
                  marginLeft: 10,
                  marginRight : 10,
                  paddingBottom : 5,
                  paddingTop : 5,
                  borderRadius : 20,
                  flexDirection : "row",}}>
      <View style={{flex : 1,borderRadius: 20,alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{color: 'black',fontFamily: 'GothamRounded-Book', fontSize : 20, }}>
          Stats
        </Text>
      </View>
        <View style={{flex : 1, borderRadius: 20, backgroundColor: '#6563a4', alignItems: 'center', justifyContent: 'center'}}>
          <Text style={{color: 'white',fontFamily: 'GothamRounded-Book', fontSize : 20,textDecorationLine: 'underline', textDecorationStyle: 'solid'}}>
            Bio
          </Text>
      </View>
      <View style={{flex : 1,borderRadius: 20,alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{color: 'black',fontFamily: 'GothamRounded-Book', fontSize : 20, }}>
          Activity
        </Text>
      </View>

    </View>
    <View style={styles.information}>
    <ScrollView>
        <View style={styles.informationSlot}>
          <Text style={{marginTop : 10 ,
                        fontSize: 16,
                        marginLeft : 10,
                        marginRight : 10,
                        marginBottom:10,
                        // padding:5,
                        fontFamily :'GothamRounded-Book'}}>
{!this.state.fetching ? this.props.profileData.bio : null }
          </Text>
        </View>
        <View style={styles.informationCategoriesSlot}>
          {console.log(this.props.profileData.niche)}
          {! this.state.fetching && this.props.profileData.niche.map((nicheItem,i)=>{
            return (<Text key ={i}
                         style={{marginTop: 1,
                                 margin:8,
                                 height:30,
                                 borderRadius:2,
                                 borderColor:'#6563A4',
                                 borderWidth : 3/2,
                                 padding: 6,
                                 color: '#6563A4',
                                 fontFamily: 'GothamRounded-Book'}}
                   >
                    {nicheItem}
                   </Text>
                 )//return
          })//Map
        }
        {this.state.fetching ? <Text>Searching...</Text> : null }
        </View>
        <View style={styles.informationSlotPricing}>
          <View style={styles.informationSlotCard}>
            <Text style={styles.informationSlotCardHeadingText}>
                Video
            </Text>
            <View style={{alignItems: "flex-end",
                  justifyContent : 'flex-end',
              }}>
              <Text style={styles.informationSlotCardPricingText}>
                  20$
              </Text>
            </View>
          </View>
           <View style={styles.informationSlotCard}>
            <Text style={styles.informationSlotCardHeadingText}>
                Snap
            </Text>
            <View style={{alignItems: "flex-end",
                  justifyContent : 'flex-end',
              }}>
              <Text style={styles.informationSlotCardPricingText}>
                  25$
              </Text>
            </View>
           </View>
        </View>
        <View style={styles.informationSlot}>
          <Text style={{padding : 5 , fontSize: 18, fontFamily :'GothamRounded-Book'}}>
          Contact : {!this.state.fetching ? this.props.profileData.contact.phone : null }
          </Text>
          <Text style={{padding : 5 , fontSize: 18, fontFamily :'GothamRounded-Book'}}>
            Email : {!this.state.fetching ? this.props.profileData.contact.email : null }
          </Text>
        </View>
</ScrollView>
    </View>
  </View>
  <View style={{flex : 1}}>
  </View>
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
    informationSlot:{
      // flex : 1,
      borderBottomWidth: 0.5,
      borderBottomColor: '#E0E0E0',
      // alignItems : 'center',
      paddingLeft : 15,
      justifyContent : 'center',
    },
    informationSlotCardHeadingText:{
      fontSize : 20,
      fontFamily : 'GothamRounded-Medium'
    },
    informationSlotCardPricingText:{
      fontSize :  40,
      fontFamily : 'GothamRounded-Book',
    },
    followersHolderLeftText:{
      color : 'white',

      fontFamily: 'GothamRounded-Book'
    },
    informationSlotPricing:{
      flex : 1,
      borderBottomWidth: 0.5,
      borderBottomColor: '#E0E0E0',
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
      borderBottomWidth: 0.5,
      flexDirection:'row',
      flexWrap : 'wrap',
      padding : 10,
      borderBottomColor: '#E0E0E0',
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
    flex : 9,
    backgroundColor : '#FFFFFF',
    // paddingTop : 20,
  },
  contentPic:{
    flex : 2,
    borderColor : '#333156',
    paddingTop : 20,
    borderBottomWidth : 2,
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
      signedInUser : state.signedInUser,
      profileData : state.profileData,
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(influencerProfilePage);
