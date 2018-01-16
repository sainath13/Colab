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
      <Swiper style={styles.wrapper} showsButtons={false}>
        <View style={styles.slide}>
        <View style={styles.middle}>
          </View>
        <View style={styles.bottom}>
          <Text style={styles.BottomText}>Explore and filter thousand of influencers and brands who are ready to work with you</Text>
          </View>
        </View>
        <View style={styles.slide}>
        <View style={styles.middle}>
          </View>
        <View style={styles.bottom}>
          <Text style={styles.BottomText}>Create profile, connect to Instagram and start collaboring</Text>
          </View>
        </View>
        <View style={styles.slide}>
        <View style={styles.middle}>
          </View>
        <View style={styles.bottom}>
          <Text style={styles.BottomText}>Chat directly with your collaborations and fix rates and dates</Text>
          </View>
        </View>
      </Swiper>
    )
  }
})

export default AppIntroComponent
