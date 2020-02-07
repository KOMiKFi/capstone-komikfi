/* eslint-disable prettier/prettier */
import React from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";


export default class Main extends React.Component {
  render() {
    return (
      <View 
      style={styles.container}>
        <TouchableOpacity
          style={styles.box}
          onPress={() => this.props.navigation.navigate("ChooseLayout")}
        >
          <Text style={styles.text}>Create Own</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.box}>
          <Text style={styles.text}>Theme</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-evenly",
    backgroundColor: '#dfe3e6',
    borderRadius: 4,
  },
  box: {
    width: 300, 
    height: 200, 
    backgroundColor: "#658d9e",
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: "#000",
    shadowOffset: { height: 3 },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
    borderWidth: 5,
    borderColor: '#244654',
    borderRadius: 4,
  },
  text: {
    fontSize: 25,
    fontFamily: 'Noteworthy-Light',
    // color: '#e88010'
  }
});
