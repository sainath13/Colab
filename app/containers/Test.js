import React, { Component, PropTypes } from 'react';
import { Text } from 'react-native';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ActionCreators } from '../actions'

class Test extends Component {
  static propTypes = {
    routes: PropTypes.object,
  };
componentWillMount(){
  this.props.fetchMessages()
  this.props.signIn("hi","sf");
  console.log("im props",this.props);
  console.log("im props",this.props.data);

}

  render () {
    const {routes} = this.context;
    console.log("hi there",this.props.recipeCount);
    // console.log(this.props.fetchMessages());
    return (
      <Text>
        The current scene is titled
      </Text>
    );
  }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators( ActionCreators, dispatch);
}
// export default connect(({routes}) => ({routes}))(Test);
function mapStateToProps(state){
    return {
      recipeCount : state.recipeCount,
      messageObj : state.messageObj,

    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Test);
// export default connect(mapStateToProps)(Test);
