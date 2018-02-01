import React, {Component} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  StatusBar,
  Alert,
  Platoform,
  Image,
  Platform
} from 'react-native';
const Dimensions = require('Dimensions');
import Checkbox from 'react-native-custom-checkbox';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {ActionCreators} from '../../actions'
import Icon from 'react-native-vector-icons/FontAwesome';

import {Actions} from 'react-native-router-flux';
console.ignoredYellowBox = [// https://github.com/facebook/react-native/issues/9093
  'Warning: You are manually calling a React.PropTypes validation'];
// influencerViewPage
class NicheSelectPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      fetching: true
    }
    this._onPressInfluencerUpdateInfoSave = this
      ._onPressInfluencerUpdateInfoSave
      .bind(this);
      this.nicheNumberCheck = this.nicheNumberCheck.bind(this);
  }
  componentDidMount() {
    this.setState({fetching: true})
    this
      .props
      .fetchNiche(this.props.loginInfo.id)
      .then((res) => {
        this.setState({fetching: false})
      })
  }
  nicheNumberCheck(){
    var count = 0;
    test = this.props.nicheData
    Object.keys(this.props.nicheData).forEach(function(key,value){
      if(test[key].value){
        count++;
      }
    }
  )
      if(count < 5) {return true} else { return false}
  }
  _onPressInfluencerUpdateInfoSave() {
    var nicheString = "";
    for (var k in this.props.nicheData) {
      if (this.props.nicheData[k].value) {
        nicheString = nicheString + this.props.nicheData[k].name + ","
      }
    }
    this
      .props
      .updateNiche(this.props.loginInfo.id, nicheString);
    Actions.pop();
  }
  fetchNicheItems() {
    return Object
      .keys(this.props.nicheData)
      .map(key => this.props.nicheData[key])
  }
  render() {
    return (
      <View style={{
        flex: 1
      }}>
        <StatusBar backgroundColor="#6563A4" barStyle="light-content"/>
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
              Niches
            </Text>
          </View>
          <View
            style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 16
          }}
            onPress={() => {
            Actions.pop();
          }}></View>
        </View>
        <View style={styles.content}>
          <ScrollView style={{
            flex: 9
          }}>
            {!this.state.fetching && this
              .fetchNicheItems()
              .map((nicheItem) => {
                return (
                  <TouchableOpacity
                    key={nicheItem.name}
                    onPress={() => {
                    if(this.nicheNumberCheck() || this.props.nicheData[nicheItem.name].value){
                    this
                      .props
                      .toggleNiche(nicheItem.name);
                    }
                    else{
                      Alert.alert(
                        'You have reached Niche select limit😴',
                        'Only 5 allowed!',
                        [
                          {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                          {text: 'OK', onPress: () => console.log('OK Pressed')},
                        ],
                        { cancelable: true}
                      )
                    }
                    }
                }>
                    <View style={styles.slot_element}>{nicheItem.value
                        ? <Icon name="check-square-o" size={20} color='#58568f'></Icon>
                        : <Icon name="square-o" size={20} color='#58568f'></Icon>
}
                      <View style={styles.slot_text}>
                        <Text style={styles.slot_text1}>
                          {nicheItem.name}
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                )
              })}
          </ScrollView>

        </View>

        <TouchableOpacity
          style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: '#6563a4'
        }}
          onPress={this._onPressInfluencerUpdateInfoSave}>
          <View>
            <Text
              style={{
              color: 'white',
              fontSize: 25,
              fontFamily: 'GothamRounded-Medium'
            }}>
              Save
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    )
  }
}

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
  content: {
    flex: 8,
    backgroundColor: '#FFFFFF'
  },
  slot: {
    flex: 2,
    flexDirection: 'row',
    //borderWidth : 1, borderColor : 'red',
  },
  slot_element: {
    flex: 1,
    backgroundColor: '#F8F9F9',
    marginLeft: 5,
    marginRight: 5,
    marginTop: 7,
    marginBottom: 7,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 5,
    flexDirection: 'row',
    alignItems: 'center'
  },
  slot_text: {
    marginLeft: 5
  },
  slot_text1: {
    color: '#6563A4',
    fontSize: 17,
    fontFamily: 'GothamRounded-Book'
  }
});
function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}
function mapStateToProps(state) {
  return {nicheData: state.nicheData, loginInfo: state.loginInfo};
}

export default connect(mapStateToProps, mapDispatchToProps)(NicheSelectPage);
