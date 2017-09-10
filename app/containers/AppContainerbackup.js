import React , { Component } from 'react'
import {
    View,
    Text,
    TouchableHighlight,
} from 'react-native';

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ActionCreators } from '../actions'

class AppContainer extends Component{
    addRecipe(){
        this.props.addRecipe();
        this.props.fetchMessages();
        // console.log(this.props.messageObj);
    }

    render(){
        return (
            <View>
                <Text style={{ marginTop : 20}}>
                im a app container ! recipe count : { this.props.recipeCount}
                </Text>
                <TouchableHighlight onPress={()=> {this.addRecipe() }}>
                <Text>
                    add Recipe
                </Text>
                </TouchableHighlight>
            </View>
        )
    }
}
// AppContainer.propTypes = {
//   // dispatch: PropTypes.func.isRequired,
// }

function mapDispatchToProps(dispatch){
    return bindActionCreators( ActionCreators, dispatch);
}


export default connect((state) => { return {
    recipeCount: state.recipeCount,
    messageObj : state.messageObj

} }, mapDispatchToProps)(AppContainer);
