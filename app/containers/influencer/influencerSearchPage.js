import React ,{ Component } from 'react';
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
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ActionCreators } from '../../actions'


class influencerSearchPage extends Component{
constructor(props) {
    super(props)
    this.state = { searching: true, searchInput: '' }
}

searchPressed() {
    this.setState({ searching: true });
      this.props.fetchSearch(this.props.signedInUser.headers,this.props.signedInUser.data.id,this.props.signedInUser.data.email, this.state.searchInput).then( (res) => {
      this.setState({searching: false });
    });
}

fetchSearch(){
  return Object.keys(this.props.searchData).map(key =>this.props.searchData[key]);
}

  render() {
return(
  <View style={{flex : 1}}>
  <StatusBar
    backgroundColor="#6563A4"
    barStyle="dark-content"
  />
  <View style={styles.header}>
    <Text style={styles.headerText}>
      Search
    </Text>
  </View>
  <View style = {styles.content}>
    <View style={styles.contentPic}>
      <View style={{flexDirection: 'row', flex: 1}}>
      <View style={styles.nicheContainer}>
          <View style={styles.headingContainer}>
            <Text style={styles.contentHeadingText}>
              Niche
            </Text>
          </View>
      </View>
      <View style={styles.nameContainer}>
        <View style={styles.headingContainer}>
          <Text style={styles.contentHeadingText}>
            Name
          </Text>
        </View>
      </View>
    </View>
    <View style={{flex: 1}}>
      <View style={styles.searchBarContainer}>
  <View style={styles.searchBarOutside}>
    <View style={styles.searchBarInside}>
      <TextInput
          style={{flex: 1,
          fontSize : 18,
          paddingBottom : 3,
          marginLeft : 10,
          fontFamily:'GothamRounded-Book', color: 'black',}}
          underlineColorAndroid={'transparent'}
          onChangeText={(searchInput) => this.setState({searchInput})}>
      </TextInput>
    </View>
    <View style={styles.searchIcon}>
      <TouchableHighlight onPress={ ()=> this.searchPressed() }>
        <Icon name="search" size={30} color='#58568f' >
        </Icon>
      </TouchableHighlight>
    </View>
  </View>
</View>
    </View>
    </View>

    <View style={styles.notificationBar}>
      <Text style={styles.notificationBarText}>
        Search Results
      </Text>
    </View>
    <View style={styles.listView}>
      <ScrollView>
        {! this.state.fetching && this.fetchSearch().map((searchItem) => { console.log("one item",searchItem);
        return ( <TouchableHighlight key={searchItem.id}
                       onPress={ ()=>{console.log(searchItem.id) } }>
                       <View style={styles.listElement}>
                         <View style={styles.notificationIcon}>
                         <Image
                           style = {{width: 50, height: 50, borderRadius: 40}}
                           source = {require('../images/new.jpg')}
                         />
                         </View>
                         <View style={styles.notificationItem}>
                           <Text style={styles.notificationItemText}>
                             <Text style={styles.notificationItemTextBold}>{searchItem.instagram_name}</Text> has shown interest in you.
                           </Text>
                         </View>
                       </View>
                </TouchableHighlight>
              )//return
            })//Map
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
     backgroundColor: '#6563A4',
     justifyContent : "center",
    //  marginTop : 20,
    //  backgroundColor: 'white',
    },
    notificationIcon:{
      flex : 2,
      alignItems : 'center',
      justifyContent : 'center',
      // backgroundColor : 'black',
    },
    notificationItemText:{
      paddingLeft : 20,
      fontSize : 16,
      color : '#424242',
      fontFamily : 'GothamRounded-Book',
    },
    notificationItemTextBold:{
      paddingLeft : 20,
      fontSize : 16,
      // fontWeight : 'bold',
      color : '#212121',
      fontFamily : 'GothamRounded-Medium',
    },
    notificationItem:{
      flex : 7,
      // borderColor : 'red',
      // borderBottomWidth : 1,
      // borderBottomRightRadius : 5,
      // borderBottomColor : 'black',
      // alignItems : 'center',
      paddingRight : 10,
      justifyContent : 'center',
      // backgroundColor : 'red',
    },
  headerText:{
    color : 'white',
    fontSize : 25,
    paddingTop : 25,
    fontFamily : 'GothamRounded-Bold',
    // color : '#6563A4',    // fontFamily : 'arial'
  },
  listElement:{
    margin : 1,
    height : 65,
    flexDirection : 'row'
  },
  headingContainer:{
    flex : 2,
    // marginBottom : 1,
    // elevation: 5,
    paddingRight: 20,
    paddingLeft : 20,
    backgroundColor : '#43416d',
    borderRadius : 5,
    borderColor : 'red',
    alignItems: 'center',
    // flexWrap : 'wrap',
    justifyContent: 'center',
  },
  contentHeadingText:{
    fontSize : 20,
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
    fontFamily : 'GothamRounded-Medium'
  },
  content:{
    flex : 9,
    backgroundColor : '#FFFFFF',
  },
  contentPic:{
    flex : 2,
    backgroundColor : '#6563A4',
    // flexDirection : 'row',
    // borderColor : 'red',
    // alignItems: 'space-around',
    justifyContent : 'space-around',
    borderColor : '#333156',

    borderBottomWidth : 3,
    // borderWidth : 3,
  },
  nicheContainer:{
    flex : 1,
    // backgroundColor : '#f3f3f1',
    // backgroundColor : 'red',
    margin : 5,
    marginLeft : 20,
    marginRight : 20,
    borderRadius : 5,
    marginTop : 10,
    marginBottom : 10,
    // borderColor: 'red',
    // borderWidth : 2,
  },
  nameContainer:{
    flex : 1,
    // backgroundColor : '#f3f3f1',
    // backgroundColor : 'red',
    margin : 5,
    marginLeft : 20,
    marginRight : 20,
    borderRadius : 5,
    marginTop : 9,
    marginBottom : 9,
    borderColor : 'white',

    // borderColor: 'red',
    borderWidth : 2,
  },
  searchBarContainer:{
    flex : 1,
    backgroundColor : '#6563A4',
    flexDirection : 'row'
  },
  searchBarOutside:{
    flex : 1,
    backgroundColor : 'white',
    marginTop : 0,
    marginLeft : 10,
    marginRight : 10,
    marginBottom : 10,
    marginTop : 5,
    borderRadius : 3,
    borderColor : '#43416d',
    borderWidth : 1,
    flexDirection :'row',
  },
  searchBarInside:{
    flex : 5,
    // borderWidth : 1,
    // borderColor : 'white',
  },
  searchIcon:{
    flex : 1,
    justifyContent : 'center',
    alignItems : 'center',
  },
  brandContainer:{
    flex : 1,
    backgroundColor : '#f3f3f1',
    margin : 10,
    borderRadius : 5
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
function mapStateToProps(state){
    return {
      //not calling any api actions here yet, but will be required later
      signedInUser : state.signedInUser,
      searchData : state.searchData,
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(influencerSearchPage);
