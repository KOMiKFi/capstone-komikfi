/* eslint-disable prettier/prettier */
import React from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import logo from '../assets/logo.png'

export default class Main extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}></View>
        <View style={styles.instructions}>
          {/* <Text style={styles.name}>KOMiKFi</Text> */}
          {/* <Image source={logo}></Image> */}
          <Text style={styles.easy}>Easy as 1-2-3!</Text>
          <Text style={styles.list}>1. Choose image</Text>
          <Text style={styles.list}>2. Add speech bubbles</Text>
          <Text style={styles.list}>3. Add filters</Text>
        </View>
        <TouchableOpacity
          style={styles.box}
          onPress={() => this.props.navigation.push("Layout")}
        >
          <Text style={styles.text}>Create Comic</Text>
        </TouchableOpacity>
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
    // borderColor: 'red',
    // borderWidth: 6
  },
  box: {
    flex: 1,
    width: '90%',
    // height: '20%',
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
    marginBottom: 40

  },
  text: {
    fontSize: 25,
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
    // borderWidth: 4,
    // borderColor: 'red',
    // width: '90%',
    // height: '40%',
  },
  easy: {
    fontSize: 30,
    fontFamily: "Noteworthy",
    marginBottom: 20,
    color: '#e88010'

  },
  list: {
    fontFamily: "Noteworthy-Light",
    fontSize: 25,
    color: '#e88010'
  },
  header: {
    height: 90,
    // borderWidth: 4,
    // borderColor: 'red',
  },
  box2: {
    flex: 1,
    width: '90%',
    // borderWidth: 4,
    // borderColor: 'red',
  }
});
