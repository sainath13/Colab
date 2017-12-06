import React, { Component } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  TextInput,
  StatusBar,
  Image
} from 'react-native';
const Dimensions = require('Dimensions');
import Checkbox from 'react-native-custom-checkbox';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ActionCreators } from '../../actions'
import Icon from 'react-native-vector-icons/FontAwesome';

import { Actions } from 'react-native-router-flux';
console.ignoredYellowBox = [
  // https://github.com/facebook/react-native/issues/9093
  'Warning: You are manually calling a React.PropTypes validation',
];
// influencerViewPage
class  NicheSelectPage extends Component {
constructor(props) {
  super(props)
  this.state = { fetching: true ,
  }
  this._onPressInfluencerUpdateInfoSave = this._onPressInfluencerUpdateInfoSave.bind(this);
}
componentDidMount(){
    this.setState({ fetching: true })
    //Data fetching should happen here only.
    this.props.fetchNiche(this.props.loginInfo.id).then( (res) => {
      // console.log("response is *****",res)
      this.setState({fetching: false })
    })
}
 _onPressInfluencerUpdateInfoSave(){
   var nicheString = "";
   for (var k in this.props.nicheData){
    if(this.props.nicheData[k].value)
    {
      nicheString = nicheString + this.props.nicheData[k].name+ ","
    }
   }
   this.props.updateNiche(this.props.loginInfo.id,nicheString);
   //after the response only go back
    Actions.pop();
}
fetchNicheItems(){
 return Object.keys(this.props.nicheData).map(key =>this.props.nicheData[key])
}
render() {
return(
  <View style={{flex : 1}}>
  <StatusBar
    backgroundColor="#6563A4"
    barStyle="light-content"
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
Niches
    </Text>
  </View>
  <TouchableHighlight style={{flex : 1, alignItems : 'center', justifyContent : 'center', marginTop: 16 }}  onPress={ ()=>{ Actions.pop(); } } >
  <View style={{}}>
  </View>
  </TouchableHighlight>
  </View>
  <View style={styles.content}>
  <ScrollView style={{flex : 9}}>
  {! this.state.fetching && this.fetchNicheItems().map((nicheItem) => {
    return ( <TouchableHighlight key={nicheItem.name}
                             onPress={ ()=>{   console.log(nicheItem.name); this.props.toggleNiche(nicheItem.name);}}
    >
      <View style={styles.slot_element}>{
        nicheItem.value ?
        <Icon name="check-square-o" size={20} color='#58568f' >
        </Icon> : 
        <Icon name="square-o" size={20} color='#58568f' >
        </Icon>
      }
          <View style={styles.slot_text}>
            <Text style={styles.slot_text1}>
             {nicheItem.name}
            </Text>
          </View>
      </View>
    </TouchableHighlight>
    )})}
    </ScrollView>

    </View>

      <TouchableHighlight style={{
          flex: 1,
          alignItems : "center",
          justifyContent : "center",
          backgroundColor: '#6563a4',
        }}onPress = {this._onPressInfluencerUpdateInfoSave}>
      <View style={{
          }}>
          <Text style={{
            color: 'white',
            fontSize : 25,
            fontFamily : 'GothamRounded-Medium',
            }}>
            Save
          </Text>
      </View>
          </TouchableHighlight>
    </View>
)}
}

var styles = StyleSheet.create({
  header: {
     flex: 1,
    //  alignItems : "center",
    //  justifyContent : "center",
    //  paddingTop : 20,
    //  marginTop : 20,
    //  backgroundColor: 'white',
     backgroundColor: '#6563A4',
    borderColor : '#333156',
    borderBottomWidth : 3,
    flexDirection : 'row'
    },
  headerText:{
// color : '#6563A4',
  color: 'white',
  fontSize : 25,
  paddingTop : 25,
  fontFamily : 'GothamRounded-Bold'
// fontFamily : 'arial'
  },
  content:{
    flex : 8,
    backgroundColor : '#FFFFFF',
  },
  slot:{
    flex: 2,
      flexDirection: 'row',
      //borderWidth : 1,
      //borderColor : 'red',
  },
  slot_element: {
    flex : 1,
    backgroundColor : '#F8F9F9',
    marginLeft: 5,
    marginRight: 5,
    marginTop: 7,
    marginBottom: 7,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 5,
    flexDirection: 'row',
  alignItems : 'center',
  },
  slot_text: {
    marginLeft: 5,
  },
  slot_text1: {
    color: '#6563A4',
    fontSize: 17,
    fontFamily : 'GothamRounded-Book'
  },
});
function mapDispatchToProps(dispatch){
    return bindActionCreators( ActionCreators, dispatch);
}
function mapStateToProps(state){
    return {
      nicheData : state.nicheData,
      loginInfo : state.loginInfo
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(NicheSelectPage);
