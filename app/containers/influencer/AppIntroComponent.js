import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Image,
  Text,
  View
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import Swiper from 'react-native-swiper';

var styles = StyleSheet.create({
  wrapper: {
  },
  slide: {
    flex: 1,
    backgroundColor: '#6463a4',
    padding : 10,
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

var AppIntroComponent = React.createClass({
  render: function() {
    return (
      <Swiper style={styles.wrapper} showsButtons={false} dotColor={'#454576'} activeDotColor={'#a2a1c8'}>
        <View style={styles.slide}>
        <View style={styles.middle}>
          </View>
        <View style={styles.bottom}>
          <Text style={styles.BottomText}>Explore and filter thousands of influencers and brands looking for collaborations</Text>
          </View>
        </View>
        <View style={styles.slide}>
        <View style={styles.middle}>
          </View>
        <View style={styles.bottom}>
          <Text style={styles.BottomText}>Chat seamlessly with your collaborations, fix the rates and time for a post</Text>
          </View>
        </View>
        <View style={styles.slide}>
        <View style={styles.middle}>
          </View>
        <View style={styles.bottom}>
          <Text style={styles.BottomText}>Build long lasting relationships with content creators and brands </Text>
          </View>
        </View>
      </Swiper>
    )
  }
})

export default AppIntroComponent
