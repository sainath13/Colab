import React, { Component } from 'react';

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
} from 'react-native';
// import { Card, Button,List, ListItem , ListView } from 'react-native-elements'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ActionCreators } from '../../actions'
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';

class  InfluencersListPage extends Component{
//this is a local state.
//redux has nothing to do with this


constructor(props) {
  super(props)
  //setting it to false if okay. but might need to think about it later
  //in some cases was not working so its true now. :\
  this.state = { fetching: true , isAcceptedShowing: true}
}

componentDidMount(){
  this.setState({fetching: true});
  this.props.fetchInfluencer(this.props.signedInUser.id).then( (res) => {
    this.setState({fetching: false })
  })
}

fetchInfluencerItems(){
    return Object.keys(this.props.InfluencerData).map(key =>this.props.InfluencerData[key])
}

toggleisAcceptedShowing(){
  this.setState({ isAcceptedShowing : !this.state.isAcceptedShowing})

}
onPressChat(){
  Actions.chatListPage();
}
  render() {
return(
  <View style={{flex : 1}}>
  <StatusBar
    backgroundColor="red"
    barStyle="dark-content"
  />
  <View style={styles.header}>
    <Text style={styles.headerText}>
  Influencers 
    </Text>
  </View>

  <View style = {styles.content}>
  {this.state.isAcceptedShowing ?
              <TouchableHighlight 
                             onPress={ ()=>{ console.log('test'); this.toggleisAcceptedShowing(); } } style={{flex : 1, marginBottom : 10,marginTop : 10,}} >
                <View style={{flex : 1 ,  flexDirection : 'row', justifyContent : 'center' , borderBottomWidth: 2, borderBottomColor: '#E0E0E0',}}>
                    <View style={{flex : 4, justifyContent : 'center', }}>
                        <Text style={{
                            fontSize: 16,
                            fontFamily :'GothamRounded-Medium',
                            marginLeft : 10
                        }}>
                        View pending requests
                        </Text>
                        <Text style={{
                            fontSize: 16,
                            fontFamily :'GothamRounded-Book',
                            marginLeft : 10,
                        }}>
                        7 requests pending
                        </Text>
                    </View>
                    <View style={{flex : 2, 
                        paddingBottom: 5,
                        alignItems : 'center',
                        justifyContent: 'center',
                    }}>
                <Icon name="chevron-right" size={25} color='#6563A4' >
                </Icon>
                    </View>
                </View>
            </TouchableHighlight>
                      : 
              <TouchableHighlight 
                             onPress={ ()=>{ console.log('test'); this.toggleisAcceptedShowing(); } } style={{flex : 1, marginBottom : 10,marginTop : 10,}} >
                <View style={{flex : 1 ,  flexDirection : 'row', justifyContent : 'center' , borderBottomWidth: 2, borderBottomColor: '#E0E0E0',}}>
                    <View style={{flex : 4, justifyContent : 'center', }}>
                        <Text style={{
                            fontSize: 16,
                            fontFamily :'GothamRounded-Medium',
                            marginLeft : 10
                        }}>
                       View accepted collaborations
                        </Text>
                        <Text style={{
                            fontSize: 16,
                            fontFamily :'GothamRounded-Book',
                            marginLeft : 10,
                        }}>
                        27 collaborations
                        </Text>
                    </View>
                    <View style={{flex : 2, 
                        paddingBottom: 5,
                        alignItems : 'center',
                        justifyContent: 'center',
                    }}>
                <Icon name="chevron-left" size={25} color='#6563A4' >
                </Icon>
                    </View>
                </View>
            </TouchableHighlight>
                        
  }
    <View style={styles.notificationBar}>
      <Text style={styles.notificationBarText}>
      {this.state.isAcceptedShowing ? "Collaborations" : "Pending requests"}
      </Text>
    </View>
    <View style={styles.listView}>
       <ScrollView>
           {! this.state.fetching && this.fetchInfluencerItems().map((feedItem) => {
            if(feedItem.status =="accepted" && this.state.isAcceptedShowing){ //because no else if here
              return ( <TouchableHighlight key={feedItem.id}
                             onPress={ ()=>{ console.log(feedItem.id) } }>
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
                         {feedItem.name} 
                        </Text>
                        <Text style={{
                            fontSize: 16,
                            fontFamily :'GothamRounded-Book',
                            marginLeft : 10,
                        }}>
                       7 posts, 3 stories 
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
                      </TouchableHighlight>
              )//return
            }//else
            if(feedItem.status =="requested" && !this.state.isAcceptedShowing){ //because no else if here
              return ( <TouchableHighlight key={feedItem.id}
                             onPress={ ()=>{ console.log(feedItem.id) } }>
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
                         {feedItem.name} 
                        </Text>
                        <Text style={{
                            fontSize: 16,
                            fontFamily :'GothamRounded-Book',
                            marginLeft : 10,
                        }}>
                       7 posts, 3 stories 
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
                      </TouchableHighlight>
              )//return
            }//else

           })//map
         }
      </ScrollView>
    </View>

  </View>
</View>
)}
};

var styles = StyleSheet.create({
  header: {
     flex: 1,
     alignItems : "center",
     justifyContent : "center",
    //  paddingTop : 20,
    //  marginTop : 20,
    //  backgroundColor: 'white',
     backgroundColor: '#6563A4',
    borderColor : '#333156',
    borderBottomWidth : 3,
    },
    notificationIcon:{
      flex : 2,
      alignItems : 'center',
      justifyContent : 'center',
      // backgroundColor : 'black',
    },
    collaborateIcon:{
      flex : 1,
      justifyContent : 'center',
      alignItems : 'center',
    },
    notificationItemText:{
      // paddingLeft : 20,
      fontSize : 15,
      // color : '#424242',
      color : '#1c1b30',
      fontFamily : 'GothamRounded-Book',
    },
    notificationItemTextBold:{
      // paddingLeft : 20,
      fontSize : 15,
      // fontWeight : 'bold',
      // color : '#212121',
      color : '#3f3d6a',
      fontFamily : 'GothamRounded-Medium',
    },
    notificationItem:{
      flex : 7,
      // borderColor : 'red',
      // borderBottomWidth : 1,
      // borderBottomRightRadius : 5,
      // borderBottomColor : 'black',
      // alignItems : 'center',
      paddingRight : 3,
      paddingLeft : 10,
      justifyContent : 'center',
      borderBottomWidth: 0.25,
      // borderBottomColor : "#12111f",
      borderBottomColor : '#9190b6',
      borderRadius : 25,
      // backgroundColor : 'red',
    },
  headerText:{
    // color : '#6563A4',
    color: 'white',
    fontSize : 25,
    paddingTop : 25,
    fontFamily : 'GothamRounded-Bold'
    // fontFamily : 'arial'
  },
  listElement:{
    margin : 1,
    height : 65,
    flexDirection : 'row',
    borderBottomColor : '#9190b6',
    borderBottomWidth : 0.25,
    borderRadius : 25,
  },
  headingContainer:{
    flex : 2,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  contentHeadingText:{
    fontSize : 25,
    color : 'white',
    fontFamily : 'GothamRounded-Medium'
  },
  bottomNumberTextContainer:{
    flex : 4,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    // borderColor: 'red',
    // borderWidth : 2,
  },
  bottomNumberText:{
    fontSize : 45,
    color : 'white',
    fontFamily : 'GothamRounded-Medium'
  },
  content:{
    flex : 9,
    backgroundColor : '#FFFFFF',
  },
  influencerContainer:{
    flex : 1,
    backgroundColor : '#43416d',
    margin : 10,
    elevation : 10,
    borderRadius : 10,
    // borderColor: 'white',
    // borderWidth : 1,
  },
  brandContainer:{
    flex : 1,
    backgroundColor : '#43416d',
    margin : 10,
    borderRadius : 10
    // borderColor: 'red',
    // borderWidth : 2,
  },
  notificationBar:{
    flex : 1,
    marginLeft : 10,
    justifyContent: 'center',
  },
  notificationBarText:{
    fontSize: 20,
    fontFamily : 'GothamRounded-Bold'
  },
  listView:{
    flex : 11,
    flexDirection : 'row',
    // borderWidth : 1,
    // borderColor : 'red',
  },
});



function mapDispatchToProps(dispatch){
    return bindActionCreators( ActionCreators, dispatch);
}
// export default connect(({routes}) => ({routes}))(Test);
function mapStateToProps(state){
    return {
      // recipeCount : state.recipeCount,
      InfluencerData : state.InfluencerData,
      feedData : state.feedData,
      signedInUser : state.signedInUser,
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(InfluencersListPage);
