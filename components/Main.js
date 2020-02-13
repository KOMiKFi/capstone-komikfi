/* eslint-disable prettier/prettier */
import React from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import splash from '../assets/splash.png'

export default class Main extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}></View>
        <View style={styles.instructions}>
          <Text style={styles.name}>KOMiKFi</Text>
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
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",

    backgroundColor: "#dfe3e6",
    borderRadius: 4
  },
  box: {
    width: '90%',
    height: '30%',
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
    justifyContent: 'space-around',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: 'red',
    width: '90%',
    height: '50%',
  },
  easy: {
    fontSize: 20,
    fontFamily: "Noteworthy-Light"
  },
  list: {
    fontFamily: "Noteworthy-Light",
    fontSize: 20
  },
  header: {
    height: 90
  }
});
