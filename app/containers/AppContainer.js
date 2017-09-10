import React , { Component } from 'react'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ActionCreators } from '../actions'

import Home from './Home'

class AppContainer extends Component{
    // addRecipe(){
    //     this.props.addRecipe();
    //     this.props.fetchMessages();
    //     // console.log(this.props.messageObj);
    // }

    render(){
        return <Home {...this.props}/>
    }
}
// AppContainer.propTypes = {
//   // dispatch: PropTypes.func.isRequired,
// }

function mapDispatchToProps(dispatch){
    return bindActionCreators( ActionCreators, dispatch);
}


export default connect((state) => { return {} }, mapDispatchToProps)(AppContainer);
