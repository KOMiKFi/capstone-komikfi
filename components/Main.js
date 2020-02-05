/* eslint-disable prettier/prettier */
import React from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";

export default class Main extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.creat_own}
          onPress={() => this.props.navigation.navigate("ChooseLayout")}
        >
          <Text>Create Own</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.theme}>
          <Text>Theme</Text>
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
  creat_own: {
    width: 300,
    height: 200,
    backgroundColor: "#83acc9",
    alignItems: "center",
    justifyContent: "space-around"
  },
  theme: {
    width: 300,
    height: 200,
    backgroundColor: "#83acc9",
    alignItems: "center",
    justifyContent: "space-around"
  }
});
