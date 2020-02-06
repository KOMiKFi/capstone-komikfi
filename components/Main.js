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
    justifyContent: "space-around"
  },
  box: {
    width: 300, 
    height: 200, 
    backgroundColor: "#83acc9",
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    fontSize: 25,
    fontFamily: 'Avenir-LightOblique'
  }
});
