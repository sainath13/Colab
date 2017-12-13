import React, { Component } from 'react';
import { WebView ,
    StyleSheet,
    
    StatusBar,
    TouchableHighlight,
  View,
  Text,
} from 'react-native';

import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';
class WebViewPage extends Component {
  render() {
    return (
<View
 style={{flex : 1}}>
  <StatusBar
    backgroundColor="#6563A4"
    barStyle="dark-content"
  />
  <View style={styles.header}>
  <TouchableHighlight style={{flex : 1, alignItems : 'center', justifyContent : 'center', marginTop: 16 }}  onPress={ ()=>{  Actions.pop(); } } >
  <View style={{}}>
                <Icon name="chevron-left" size={25} color='white' >
                </Icon>
  </View>
  </TouchableHighlight>
  <View style={{flex : 7, alignItems : 'center', justifyContent : 'center'}}>
    <Text style={styles.headerText}>
RoadMap
    </Text>
  </View>
  <View style={{flex : 1, alignItems : 'center', justifyContent : 'center', marginTop: 16 }} >
  </View>
  </View>
  <View style = {styles.content}>
  <WebView
        source={{uri: 'https://github.com/facebook/react-native'}}
      />
  </View>

  </View>
    )
  }
}

const styles = StyleSheet.create({
content:{
  flex : 9,
  backgroundColor : '#FFFFFF',
    // paddingTop : 20,
},
header: {
    borderColor : '#333156',
    borderBottomWidth : 3,
  flexDirection : 'row',
  flex: 1,
  backgroundColor: '#6563a4',
},
headerText:{
// color : '#6563A4',
  color: 'white',
  fontSize : 22,
  paddingTop : 25,
  fontFamily : 'GothamRounded-Bold'
// fontFamily : 'arial'
},
container: {
  flex: 9,
},
picInfoHolder: {
  flexDirection:'row' ,
  borderBottomWidth : 2 ,
  borderBottomColor : '#F6F5FA'
},
picHolder : {
  flex : 1,
  alignItems : 'center',
  justifyContent:'center',
},
infoHolder:{
  flex : 2.5,
  flexDirection : 'column',
},
infoTextHolder : {
  flex : 1,
  alignItems : 'center',
  justifyContent  : 'center',
},
infoText: {
  color : 'black',
  fontSize : 20,
  fontFamily : 'GothamRounded-Bold',
},
 infoTextSubinfo:{
  fontSize : 17,
  fontFamily : 'GothamRounded-Medium',
 },
row:{
    flexDirection : 'row' ,
    backgroundColor : '#F6F5FA',
    borderBottomColor : '#6563A4' ,
    borderBottomWidth  : 2,
},
rowLeft:{
    flex : 1,  
    justifyContent : 'center',
    marginLeft : 10
},
rowLeftText:{
fontSize : 17,
fontFamily : 'GothamRounded-Book',
padding : 5,
},
coloredWrapper:{
          flex : 1,
          marginTop : 10,
          marginBottom : 10,
          marginLeft : 5,
          marginRight : 10,
          borderRadius:2,
          borderColor:'#fefefe',
          borderWidth : 3/2,
          paddingTop: 5,
          paddingBottom: 5,
          justifyContent: 'center',
          backgroundColor : '#6563A4',
            borderRadius : 5
},
wrappedText:{
    color : 'white',
    fontSize : 17,
    fontFamily :'GothamRounded-Bold',
    paddingLeft : 20,
},
});
export default WebViewPage;