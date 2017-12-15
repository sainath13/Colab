import React ,{ Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  TouchableHighlight,
  Text,
  TextInput,
  ScrollView,
  View,
  KeyboardAvoidingView,
  Image,
  StatusBar,
  Platform,
  TouchableOpacity,
} from 'react-native';
// import { Card, Button,List, ListItem , ListView } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ActionCreators } from '../../actions'
import { Actions } from 'react-native-router-flux';


var Spinner = require('react-native-spinkit');
class SearchPage extends Component{
constructor(props) {
    super(props)
    this.state = {loadingNiche: false , showingSearchResults : false, loading : false , searching: false, searchInput: '', isNicheSelected : false , isNameSelected : true }
    this.selectName = this.selectName.bind(this);
    this.selectNiche = this.selectNiche.bind(this);
}
componentDidMount(){
  this.setState({loading : true,loadingNiche : true});
  this.props.fetchTrending(this.props.loginInfo.id).then( (res) => {
    this.props.fetchNiche(this.props.loginInfo.id).then((res) =>{
    this.setState({loadingNiche: false })
    })
    this.setState({loading: false })
  })
}

cancelPressed() {
    this.setState({ showingSearchResults : false, });
    this.refs.textInput1.clear();
}
searchNichePressed(nichename){
  this.refs.textInput1.setNativeProps({text : nichename})
    this.setState({ searching: true, showingSearchResults : true, searchInput: nichename});
      this.props.fetchSearch(this.props.loginInfo.id,nichename,this.state.isNameSelected).then( (res) => {
      this.setState({searching: false });
    });
}
searchPressed() {
    this.setState({ searching: true, showingSearchResults : true});
      this.props.fetchSearch(this.props.loginInfo.id,this.state.searchInput,this.state.isNameSelected).then( (res) => {
      this.setState({searching: false });
    });
}
fetchTrendingItems(){
  return Object.keys(this.props.trendingData).map(key =>this.props.trendingData[key]);
}
fetchNicheItems(){
  return Object.keys(this.props.nicheData).map(key => this.props.nicheData[key]);
}
fetchSearch(){
  return Object.keys(this.props.searchData).map(key =>this.props.searchData[key]);
}

selectName(){
  this.setState({
    isNameSelected : true,
    isNicheSelected : false
  })
}
selectNiche(){
  this.setState({
    isNameSelected : false,
    isNicheSelected : true
  })
}

  render() {
    if(!Platform.OS=="ios"){
return(
  <KeyboardAvoidingView style={{flex : 1}}>
    {Platform.OS == "ios"? 
  <StatusBar
    backgroundColor="#6563A4"
    barStyle="dark-content"
  />
  :
  <StatusBar
    backgroundColor="#43416d"
    barStyle="light-content"
  />
  }
  <ScrollView style={{flex:1 , backgroundColor : 'white'}} scrollEnabled={Platform.OS=='ios' ? true : true}>
  <View style={styles.header}>
    <Text style={Platform.OS == "ios" ? styles.headerText: styles.headerTextAndroid}>
      Search
    </Text>
  </View>
  <View behavior="padding" keyboardVerticalOffset={-1000} style = {styles.content}>
  <View style={{flex:1}} scrollEnabled={false}>
    <View style={styles.contentPic}>
      <View style={{flexDirection: 'row', flex: 1}}>
      <TouchableHighlight style={[styles.nicheContainer, this.state.isNicheSelected && styles.nicheContainerHighlighted]} onPress={()=> this.selectNiche()}>
          <View style={styles.headingContainer}>
            <Text style={styles.contentHeadingText}>
              Niche
            </Text>
          </View>
      </TouchableHighlight>
      <TouchableHighlight style={[styles.nicheContainer, !this.state.isNicheSelected && styles.nicheContainerHighlighted]} onPress={()=> this.selectName()}>
        <View style={styles.headingContainer}>
          <Text style={styles.contentHeadingText}>
            Name
          </Text>
        </View>
      </TouchableHighlight>
    </View>
    <View style={{flex: 1}}>
      <View style={styles.searchBarContainer}>
  <View style={styles.searchBarOutside}>
    <View style={styles.searchBarInside}>
      <TextInput
          ref={'textInput1'}
          style={styles.inputBoxStyle}
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
  <TouchableHighlight style={{flex : 1}} onPress={ ()=> this.cancelPressed()} >
<View style={{flex : 1, alignItems : 'center', justifyContent : 'center', marginTop : 5 , marginBottom : 10,}}>
          <Icon name="times-circle-o" size={30} color='#58568f'>
    </Icon> 
</View>
</TouchableHighlight>
</View>
    </View>
    </View>

    <View style={styles.notificationBar}>
      <Text style={styles.notificationBarText}>
       {this.state.showingSearchResults ? "Search results" : "Trending right now"} 
      </Text>
    </View>
    { this.state.searching  || this.state.loading || this.state.loadingNiche ? <View style={{alignItems: 'center' , justifyContent: 'center', }}>
    {console.log("showing this loading")}
    <Spinner style={{flex : 1, }} isVisible={this.state.searching || ( this.state.loading && this.state.loadingNiche) } size={50} type={'ThreeBounce'} color={'#65634A'}/>
  </View>
   : null}
    <View style={styles.listView}>
      <View style={{flex : 1}} >
      {!this.state.showingSearchResults && this.state.isNicheSelected && !this.state.loadingNiche ?
        <View style={{flex: 1,
      flexDirection:'row',
      flexWrap : 'wrap',
      padding : 5,
      justifyContent : 'center',
      alignItems : 'flex-start',
      }}>
    {!this.state.showingSearchResults && this.state.isNicheSelected && !this.state.loadingNiche && this.fetchNicheItems().map((nicheItem)=>{
              return (
                    <TouchableHighlight onPress={ ()=>{ console.log(nicheItem.name);
                       this.searchNichePressed(nicheItem.name)} }key={nicheItem.name} style={{
                        marginTop : 5,
                        marginBottom : 5,
                        marginLeft : 15,
                        marginRight : 15,
                        borderRadius:3,
                        borderColor : 'white',
                        padding : 5,
                        alignItems : 'center',
                        justifyContent: 'center',
                        backgroundColor : '#6563A4',
                    }}>
                    <Text style={{
                        color : 'white',
                            fontSize : 17,
                            fontFamily :'GothamRounded-Book',
                    }}>
                           {nicheItem.name} 
                        </Text>
                    </TouchableHighlight>
                   )//return

    })}
    </View>
    : null}
        {!this.state.showingSearchResults && this.state.isNameSelected && !this.state.loading && this.fetchTrendingItems().map((searchItem) => { 
                 return ( <TouchableHighlight key={searchItem.id}
                       onPress={ ()=>{Actions.VisitProfilePage({clickedUserId : searchItem.id, isBusiness : searchItem.isBusiness}) } }>
                <View style={{flex : 1 ,  flexDirection : 'row', justifyContent : 'center', borderBottomWidth: 0.5, borderBottomColor: '#E0E0E0', }}>
                    <View style={{flex : 1, alignItems : 'center',justifyContent:'center', padding : 3 }}>
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
                         {searchItem.instagram_name} 
                        </Text>
                        <Text style={{
                            fontSize: 16,
                            fontFamily :'GothamRounded-Book',
                            marginLeft : 10,
                        }}>
                      {searchItem.class =="Influencer" ?searchItem.first_name + " " + searchItem.last_name : searchItem.name } 
                        </Text>
                    </View>
                </View>
                </TouchableHighlight>
              )//return
            })//Map
          }
        {! this.state.searching && this.state.showingSearchResults && (this.fetchSearch().length == 0) ?
                <View style={{flex : 1 ,  flexDirection : 'row', justifyContent : 'center', }}>
                    <View style={{flex : 4, justifyContent : 'center', }}>
                        <Text style={{
                            fontSize: 17,
                            fontFamily :'GothamRounded-Medium',
                            marginLeft : 10,
                            color : 'gray'
                        }}>
                        No results found 
                        </Text>
                    </View>
                </View>
:        null  
      
      }
        {! this.state.searching && this.state.showingSearchResults && this.fetchSearch().map((searchItem) => { 
                 return ( <TouchableHighlight key={searchItem.id}
                       onPress={ ()=>{Actions.VisitProfilePage({clickedUserId : searchItem.id, isBusiness : false}) } }>
                <View style={{flex : 1 ,  flexDirection : 'row', justifyContent : 'center', borderBottomWidth: 0.5, borderBottomColor: '#E0E0E0', }}>
                    <View style={{flex : 1, alignItems : 'center',justifyContent:'center', padding : 3 }}>
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
                         {searchItem.instagram_name} 
                        </Text>
                        <Text style={{
                            fontSize: 16,
                            fontFamily :'GothamRounded-Book',
                            marginLeft : 10,
                        }}>
                      {searchItem.class =="Influencer" ?searchItem.first_name + " " + searchItem.last_name : searchItem.name } 
                        </Text>
                    </View>
                </View>
                </TouchableHighlight>
              )//return
            })//Map
          }
      </View>
    </View>
    </View>
  </View>
  </ScrollView>
</KeyboardAvoidingView>
)
    }
    else{
      return (
        <View style={{flex : 1}}>
        {Platform.OS == "ios"? 
      <StatusBar
        backgroundColor="#6563A4"
        barStyle="dark-content"
      />
      :
      <StatusBar
        backgroundColor="#43416d"
        barStyle="light-content"
      />
      }
      <View style={styles.header}>
        <Text style={Platform.OS == "ios" ? styles.headerText: styles.headerTextAndroid}>
          Search
        </Text>
      </View>
      <View style = {styles.content}>
        <View style={styles.contentPic}>
          <View style={{flexDirection: 'row', flex: 1}}>
          <TouchableHighlight style={[styles.nicheContainer, this.state.isNicheSelected && styles.nicheContainerHighlighted]} onPress={()=> this.selectNiche()}>
              <View style={styles.headingContainer}>
                <Text style={styles.contentHeadingText}>
                  Niche
                </Text>
              </View>
          </TouchableHighlight>
          <TouchableHighlight style={[styles.nicheContainer, !this.state.isNicheSelected && styles.nicheContainerHighlighted]} onPress={()=> this.selectName()}>
            <View style={styles.headingContainer}>
              <Text style={styles.contentHeadingText}>
                Name
              </Text>
            </View>
          </TouchableHighlight>
        </View>
        <View style={{flex: 1}}>
          <View style={styles.searchBarContainer}>
      <View style={styles.searchBarOutside}>
        <View style={styles.searchBarInside}>
          <TextInput
              ref={'textInput1'}
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
          <TouchableOpacity onPress={ ()=> this.searchPressed() }>
              <Icon name="search" size={30} color='#58568f' >
        </Icon> 
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity style={{flex : 1}} onPress={ ()=> this.cancelPressed()} >
    <View style={{flex : 1, alignItems : 'center', justifyContent : 'center', marginTop : 5 , marginBottom : 10,}}>
              <Icon name="times-circle-o" size={30} color='#58568f'>
        </Icon> 
    </View>
    </TouchableOpacity>
    </View>
        </View>
        </View>
    
        <View style={styles.notificationBar}>
          <Text style={styles.notificationBarText}>
           {this.state.showingSearchResults ? "Search results" : "Treding right now"} 
          </Text>
        </View>
        { this.state.searching  || this.state.loading || this.state.loadingNiche ? <View style={{alignItems: 'center' , justifyContent: 'center', }}>
        {console.log("showing this loading")}
        <Spinner style={{flex : 1, }} isVisible={this.state.searching || ( this.state.loading && this.state.loadingNiche) } size={50} type={'ThreeBounce'} color={'#65634A'}/>
      </View>
       : null}
        <View style={styles.listView}>
          <ScrollView>
          {!this.state.showingSearchResults && this.state.isNicheSelected && !this.state.loadingNiche ?
            <View style={{flex: 1,
          flexDirection:'row',
          flexWrap : 'wrap',
          padding : 5,
          justifyContent : 'center',
          alignItems : 'flex-start',
          }}>
        {!this.state.showingSearchResults && this.state.isNicheSelected && !this.state.loadingNiche && this.fetchNicheItems().map((nicheItem)=>{
                  return (
                        <TouchableHighlight onPress={ ()=>{ console.log(nicheItem.name);
                           this.searchNichePressed(nicheItem.name)} }key={nicheItem.name} style={{
                            marginTop : 5,
                            marginBottom : 5,
                            marginLeft : 15,
                            marginRight : 15,
                            borderRadius:3,
                            borderColor : 'white',
                            padding : 5,
                            alignItems : 'center',
                            justifyContent: 'center',
                            backgroundColor : '#6563A4',
                        }}>
                        <Text style={{
                            color : 'white',
                                fontSize : 17,
                                fontFamily :'GothamRounded-Book',
                        }}>
                               {nicheItem.name} 
                            </Text>
                        </TouchableHighlight>
                       )//return
    
        })}
        </View>
        : null}
            {!this.state.showingSearchResults && this.state.isNameSelected && !this.state.loading && this.fetchTrendingItems().map((searchItem) => { 
                     return ( <TouchableOpacity key={searchItem.id}
                           onPress={ ()=>{Actions.VisitProfilePage({clickedUserId : searchItem.id, isBusiness : searchItem.isBusiness}) } }>
                    <View style={{flex : 1 ,  flexDirection : 'row', justifyContent : 'center', borderBottomWidth: 0.5, borderBottomColor: '#E0E0E0', }}>
                        <View style={{flex : 1, alignItems : 'center',justifyContent:'center', padding : 3 }}>
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
                             {searchItem.instagram_name} 
                            </Text>
                            <Text style={{
                                fontSize: 16,
                                fontFamily :'GothamRounded-Book',
                                marginLeft : 10,
                            }}>
                          {searchItem.class =="Influencer" ?searchItem.first_name + " " + searchItem.last_name : searchItem.name } 
                            </Text>
                        </View>
                    </View>
                    </TouchableOpacity>
                  )//return
                })//Map
              }
            {! this.state.searching && this.state.showingSearchResults && (this.fetchSearch().length == 0) ?
                    <View style={{flex : 1 ,  flexDirection : 'row', justifyContent : 'center', }}>
                        <View style={{flex : 4, justifyContent : 'center', }}>
                            <Text style={{
                                fontSize: 17,
                                fontFamily :'GothamRounded-Medium',
                                marginLeft : 10,
                                color : 'gray'
                            }}>
                            No results found 
                            </Text>
                        </View>
                    </View>
    :        null  
          
          }
            {! this.state.searching && this.state.showingSearchResults && this.fetchSearch().map((searchItem) => { 
                     return ( <TouchableOpacity key={searchItem.id}
                           onPress={ ()=>{Actions.VisitProfilePage({clickedUserId : searchItem.id, isBusiness : false}) } }>
                    <View style={{flex : 1 ,  flexDirection : 'row', justifyContent : 'center', borderBottomWidth: 0.5, borderBottomColor: '#E0E0E0', }}>
                        <View style={{flex : 1, alignItems : 'center',justifyContent:'center', padding : 3 }}>
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
                             {searchItem.instagram_name} 
                            </Text>
                            <Text style={{
                                fontSize: 16,
                                fontFamily :'GothamRounded-Book',
                                marginLeft : 10,
                            }}>
                          {searchItem.class =="Influencer" ?searchItem.first_name + " " + searchItem.last_name : searchItem.name } 
                            </Text>
                        </View>
                    </View>
                    </TouchableOpacity>
                  )//return
                })//Map
              }
          </ScrollView>
        </View>
      </View>
    </View>
    )}
    };

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
    headerTextAndroid:{
    color : 'white',
    marginTop : 10,
    fontSize : 25,
    fontFamily : 'GothamRounded-Bold',
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
    padding: 2,
    fontSize : 20,
    margin: 2,
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
  inputBoxStyle:{
flex: 1,
          fontSize : 18,
          paddingBottom : 3,
          margin : Platform.OS=="ios" ? 10 : 0,
          marginLeft : 10,
          fontFamily:'GothamRounded-Book', color: 'black',
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
    // borderColor: 'white',
    // borderWidth : 2,
  },
  nicheContainerHighlighted: {
    flex : 1,
    // backgroundColor : '#f3f3f1',
    // backgroundColor : 'red',
    margin : 5,
    marginLeft : 20,
    marginRight : 20,
    borderRadius : 5,
    marginTop : 10,
    marginBottom : 10,
    borderColor: 'white',
    borderWidth : 2,
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
    flexDirection : 'row',
  },
  searchBarOutside:{
    flex : 6,
    backgroundColor : 'white',
    marginTop : 0,
    marginLeft : 5,
    marginRight : 0,
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
    marginTop : 10,
    fontSize: 20,
    fontFamily : 'GothamRounded-Book'
  },
  listView:{
    flex : 7,
    marginTop : 10,
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
      loginInfo : state.loginInfo,
      searchData : state.searchData,
      trendingData : state.trendingData,
      nicheData : state.nicheData,
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage);
