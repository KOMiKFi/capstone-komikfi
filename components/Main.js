/* eslint-disable prettier/prettier */
import React from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import logo from '../assets/logo.png'

export default class Main extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}></View>
        <Image source={logo} style={{height: 120, width: 280}}></Image>
        <View style={styles.box3}></View>        
        <View style={styles.instructions}>
          <Text style={styles.easy}>Easy as 1-2-3!</Text>
          <Text style={styles.list}>1. Choose image</Text>
          <Text style={styles.list}>2. Add speech bubbles</Text>
          <Text style={styles.list}>3. Add filters</Text>
        </View>
        <View style={styles.box2}></View>
        <TouchableOpacity
          style={styles.box}
          onPress={() => this.props.navigation.push("Layout")}
        >
          <Text style={styles.text}>Create Comic</Text>
        </TouchableOpacity>
        <View style={styles.box2}></View>
        <View style={styles.box2}></View>
        <View style={styles.box2}></View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-evenly",
    backgroundColor: "#dfe3e6",
    borderRadius: 4,
  },
  box: {
    flex: 1,
    width: '90%',
    backgroundColor: "#658d9e",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { height: 3 },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
    borderWidth: 5,
    borderColor: "#244654",
    borderRadius: 4,
  },
  text: {
    fontSize: 30,
    fontFamily: "Noteworthy-Light"
  },
  name: {
    fontSize: 50,
    fontFamily: "Noteworthy-Light"
  },
  instructions: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%'
  },
  easy: {
    fontSize: 30,
    fontFamily: "Noteworthy",
    marginBottom: 50,
    color: '#c96e0a'
  },
  list: {
    fontFamily: "Noteworthy-Light",
    fontSize: 25,
    color: '#e88010'
  },
  header: {
    flex: 1,
    width: '100%',
    height: '100%'
  },
  box2: {
    flex: 0.5,
    width: '100%',
    height: '100%'
  },
  box3:{
    flex: 0.5,
    width: '80%',
    height: '100%',
    borderTopWidth: 3,
    borderTopColor: '#244654'
  }
});
