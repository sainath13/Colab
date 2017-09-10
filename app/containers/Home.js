import React , { Component } from 'react'
import {
    View,
    Text,
    TouchableHighlight,
    ScrollView,
} from 'react-native';
import { Actions } from 'react-native-router-flux';

import { connect } from 'react-redux'
// import { bindActionCreators } from 'redux'
// import { ActionCreators } from '../actions'

class Home extends Component{
    addRecipe(){
        // this.props.addRecipe();
        this.props.fetchMessages();
        Actions.test({data:"Custom data", title:'Custom title'});
        // console.log(this.props.messageObj);
    }
    // messages(){
    //   return Object.keys(this.props.messages).map(key =>this.props.messages[key])
    // }
showmessages(){
  // console.log(this.props.messageObj);
  return Object.keys(this.props.messageObj).map(key =>this.props.messageObj[key])
}
// onPress(key){
//   console.log("hie im here");
// }
// onPress={ () => this.props.navigate({ key: 'Detail', id: recipe.id}) }
// use actions from ruoter here
    render(){
      console.log(this.showmessages())
      return (
        <View style={{ marginTop : 20}}>
          <Text>
hi
          </Text>
        <TouchableHighlight onPress={()=> {this.addRecipe() }}>
        <Text>
            add Recipe
        </Text>
        </TouchableHighlight>
        <ScrollView>
          {this.showmessages().map((message)=>{
            return <TouchableHighlight
              key={message.email}
              onPress={ ()=>{console.log(message.email) } }
              >
              <Text>
                gender {message.gender}
              </Text>
            </TouchableHighlight>

          })}
        </ScrollView>
        </View>
        )
    }
}
// AppContainer.propTypes = {
//   // dispatch: PropTypes.func.isRequired,
// }
function mapStateToProps(state){
    return {
      recipeCount : state.recipeCount,
      messageObj : state.messageObj,
    };
}

export default connect(mapStateToProps)(Home);


