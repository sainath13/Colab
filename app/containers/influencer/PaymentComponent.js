import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Image,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
  View
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {ActionCreators} from '../../actions'
import {Actions} from 'react-native-router-flux';
import { NativeModules } from 'react-native'
const { InAppUtils } = NativeModules;

import Swiper from 'react-native-swiper';

var styles = StyleSheet.create({
  wrapper: {
  },
  slide: {
    flex: 1,
    backgroundColor: 'white',
  },
  text: {
    color: 'black',
    fontSize: 30,
    fontWeight: 'bold',
  },
  title: {
    color: 'black',
    fontFamily: 'GothamRounded-Medium',
    fontSize:19
  },
  top:{
    flex : 0,
    justifyContent : 'center',
  },
  middle:{
    flexDirection : 'row',
    flex : 1.3,
    paddingLeft : 10,
    alignItems : 'flex-start'
  },
  bottom : {
    flex :3,
  },
  BottomText : {
    paddingTop : 25,
    paddingBottom: 25,
    color: 'white',
    fontFamily: 'GothamRounded-Medium',
    fontSize:35
  },
  oneLogos:{
    fontSize:55
  }


})

class PaymentComponent extends Component {
  constructor(props) {
    super(props);
    this.buy = this.buy.bind(this);
  }
  buy(plan){
    console.log(plan);
    var productIdentifier ;
    if(plan == "SILVER"){
        productIdentifier = "colabplus" 
    }
    else if (plan == "GOLD"){
      productIdentifier = "colabpremium"
    }
InAppUtils.purchaseProduct(productIdentifier, (error, response) => {
   if(response && response.productIdentifier) {
      Alert.alert('Purchase Successful',);
   }
   else{
     console.log("Payment didn't work")
   }
   if(error){
     Alert.alert("Purchase failed")
   }
});
  }
  render(){
    return (
      <Swiper style={styles.wrapper} showsButtons={false}  loop={false}  activeDotColor={'#454576'} dotColor={'#a2a1c8'} >

        <View style={styles.slide}>
          <View style={{flex : 2, backgroundColor : '#6463a4', margin : 20, borderRadius: 5}}>
          <View style={{flex : 0.8, backgroundColor : '#5a5994',
              borderRadius: 5,alignItems : 'center',justifyContent : 'center',
              borderBottomColor : 'white',
              borderBottomWidth : 1,
              }}>
            <Text style={{flex : 1,
            paddingTop : 17,
            color : 'white',
              fontFamily: 'GothamRounded-Medium',
              fontSize:30,
            }}>
           Colab Free 
            </Text>
          </View>
          <View style={{flex : 3,backgroundColor : '#7473ad',borderRadius : 5}}>
          <ScrollView style={{margin : 10}}>
          <Text style={{
    color: 'white',
    fontFamily: 'GothamRounded-Medium',
          }}>
 1) Upto 15 collaborations for first month 
          </Text>
          <Text style={{
           marginTop :10, 
    color: 'white',
    fontFamily: 'GothamRounded-Medium',
          }}>
 2) Upto 5 collaborations for next 3 months
          </Text>
          <Text style={{
           marginTop :10, 
    color: 'white',
    fontFamily: 'GothamRounded-Medium',
          }}>
 3) Chat seamlessly with you collaborations 
          </Text>
          <Text style={{
           marginTop :10, 
    color: 'white',
    fontFamily: 'GothamRounded-Medium',
          }}>
 4) More features comming soon 
          </Text>
          </ScrollView>
          </View>
          </View>
          <View style={{flex : 1 }}>
          <TouchableOpacity style={{flex : 1 , backgroundColor : '#6463a4',margin : 20, borderRadius :5 , alignItems : 'center', justifyContent:'center'}}
          onPress={() => {
                  Actions.WebViewPage({PageName : "Subscription"});
          }}
          >
          <Text style={{
            fontSize : 25,
    color: 'white',
    fontFamily: 'GothamRounded-Medium',
          }}>
         {this.props.subscrition.subscriptionActive == 'colabfree' ? "Active" : "Manage"} 
          </Text>
          </TouchableOpacity>
          <View style={{flex : 1}}>
          </View>
        </View>
        </View>





        <View style={styles.slide}>
          <View style={{flex : 2, backgroundColor : '#6463a4', margin : 20, borderRadius: 5}}>
          <View style={{flex : 0.8, backgroundColor : '#5a5994',
              borderRadius: 5,alignItems : 'center',justifyContent : 'center',
              borderBottomColor : 'white',
              borderBottomWidth : 1,
              }}>
            <Text style={{flex : 1,
            paddingTop : 17,
            color : 'white',
              fontFamily: 'GothamRounded-Medium',
              fontSize:30,
            }}>
           Colab Silver 
            </Text>
          </View>
          <View style={{flex : 3,backgroundColor : '#7473ad',borderRadius : 5}}>
          <ScrollView style={{margin : 10}}>
          <Text style={{
    color: 'white',
    fontFamily: 'GothamRounded-Medium',
          }}>
 1) Upto 15 collaborations for first month 
          </Text>
          <Text style={{
           marginTop :10, 
    color: 'white',
    fontFamily: 'GothamRounded-Medium',
          }}>
 2) Upto 5 collaborations for next 3 months
          </Text>
          <Text style={{
           marginTop :10, 
    color: 'white',
    fontFamily: 'GothamRounded-Medium',
          }}>
 3) Chat seamlessly with you collaborations 
          </Text>
          <Text style={{
           marginTop :10, 
    color: 'white',
    fontFamily: 'GothamRounded-Medium',
          }}>
 4) More features comming soon 
          </Text>
          </ScrollView>
          </View>
          </View>
          <View style={{flex : 1 }}>
          <TouchableOpacity style={{flex : 1 , backgroundColor : '#6463a4',margin : 20, borderRadius :5 , alignItems : 'center', justifyContent:'center'}}
          onPress={() => {
           this.buy("SILVER") 
          }}
          >
          <Text style={{
            fontSize : 25,
    color: 'white',
    fontFamily: 'GothamRounded-Medium',
          }}>
         {this.props.subscrition.subscriptionActive == 'colabplus' ? "Active" : 
          this.props.silverPlanString + "per month" }
          </Text>
          </TouchableOpacity>
          <View style={{flex : 1}}>
          </View>
        </View>
        </View>


        <View style={styles.slide}>
          <View style={{flex : 2, backgroundColor : '#6463a4', margin : 20, borderRadius: 5}}>
          <View style={{flex : 0.8, backgroundColor : '#5a5994',
              borderRadius: 5,alignItems : 'center',justifyContent : 'center',
              borderBottomColor : 'white',
              borderBottomWidth : 1,
              }}>
            <Text style={{flex : 1,
            paddingTop : 17,
            color : 'white',
              fontFamily: 'GothamRounded-Medium',
              fontSize:30,
            }}>
           Colab Gold 
            </Text>
          </View>
          <View style={{flex : 3,backgroundColor : '#7473ad',borderRadius : 5}}>
          <ScrollView style={{margin : 10}}>
          <Text style={{
    color: 'white',
    fontFamily: 'GothamRounded-Medium',
          }}>
 1) Upto 15 collaborations for first month 
          </Text>
          <Text style={{
           marginTop :10, 
    color: 'white',
    fontFamily: 'GothamRounded-Medium',
          }}>
 2) Upto 5 collaborations for next 3 months
          </Text>
          <Text style={{
           marginTop :10, 
    color: 'white',
    fontFamily: 'GothamRounded-Medium',
          }}>
 3) Chat seamlessly with you collaborations 
          </Text>
          <Text style={{
           marginTop :10, 
    color: 'white',
    fontFamily: 'GothamRounded-Medium',
          }}>
 4) More features comming soon 
          </Text>
          </ScrollView>
          </View>
          </View>
          <View style={{flex : 1 }}>
          <TouchableOpacity style={{flex : 1 , backgroundColor : '#6463a4',margin : 20, borderRadius :5 , alignItems : 'center', justifyContent:'center'}}
          onPress={() => {
           this.buy("GOLD") 
          }}
          >
          <Text style={{
            fontSize : 25,
    color: 'white',
    fontFamily: 'GothamRounded-Medium',
          }}>
         {this.props.subscrition.subscriptionActive == 'colabpremium' ? "Active" : 
         this.props.goldPlanString + "per month" }
          </Text>
          </TouchableOpacity>
          <View style={{flex : 1}}>
          </View>
        </View>
        </View>






      </Swiper>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}
// export default connect(({routes}) => ({routes}))(Test);
function mapStateToProps(state) {
  return {
    subscrition : state.subscription
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PaymentComponent);