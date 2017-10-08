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

class FeedPage extends Component{
//this is a local state.
//redux has nothing to do with this


constructor(props) {
  super(props)
  //setting it to false if okay. but might need to think about it later
  //in some cases was not working so its true now. :\
  this.state = { fetching: true }
}

componentDidMount(){
  this.setState({fetching: true});
  this.props.fetchFeed(this.props.signedInUser.id).then( (res) => {
    this.setState({fetching: false })
  })
}

fetchFeedItems(){
    return Object.keys(this.props.feedData).map(key =>this.props.feedData[key])
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
      Influxcer
    </Text>
  </View>

  <View style = {styles.content}>
    <View style={styles.contentPic}>
      <View style={styles.influencerContainer}>
        <View style={styles.headingContainer}>
          <Text style={styles.contentHeadingText}>
            Influxcer
          </Text>
        </View>
      <View style={styles.bottomNumberTextContainer}>
        <Text style={styles.bottomNumberText}>
             123
        </Text>
      </View>
      </View>
      <View style={styles.brandContainer}>
        <View style={styles.headingContainer}>
          <Text style={styles.contentHeadingText}>
            Brand
          </Text>
        </View>
      <View style={styles.bottomNumberTextContainer}>
        <Text style={styles.bottomNumberText}>
          12
        </Text>
      </View>
      </View>
    </View>
    <View style={styles.notificationBar}>
      <TouchableHighlight onPress = {this.onPressChat}>
      <Text style={styles.notificationBarText}>
        Notifications
      </Text>
    </TouchableHighlight>
    </View>
    <View style={styles.listView}>
       <ScrollView>
           {! this.state.fetching && this.fetchFeedItems().map((feedItem) => { 
              return ( <TouchableHighlight key={feedItem.id}
                             onPress={ ()=>{ this.props.acceptCollabRequest(this.props.signedInUser.id,feedItem.id) ; console.log(feedItem.id) } }>
                        <View style={styles.listElement}>
                                       <View style={styles.notificationIcon}>
                          <Image
                            style = {{width: 50, height: 50, borderRadius: 25, marginLeft : 10}}
                            source = { { uri: "https://randomuser.me/api/portraits/thumb/men/4.jpg" }}
                          />
                          </View>
                          <View style={styles.notificationItem}>
                            <Text style={styles.notificationItemText}>
                              <Text style={styles.notificationItemTextBold}>{feedItem.name}</Text> wants to collaborate.
                            </Text>
                        </View>
                        <View style={{
                        width : 100,
                        height : 30,
                        marginTop : 15,
                        marginBottom : 15,
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
                          {feedItem.status}
                        </Text>
                    </View>
                        </View>
                      </TouchableHighlight>
              )//return
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
  contentPic:{
    flex : 2,
    backgroundColor : '#6563A4',
    flexDirection : 'row',
    borderColor : '#333156',

    borderBottomWidth : 3,
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
    fontFamily : 'GothamRounded-Book'
  },
  listView:{
    flex : 7,
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
      feedData : state.feedData,
      signedInUser : state.signedInUser,
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(FeedPage );
