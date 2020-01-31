/* eslint-disable prettier/prettier */
import React from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";

export default class Layout extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.subLayout}
          onPress={() => this.props.navigation.navigate("LayoutOne")}
        >
          <Text>Layout 1</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.subLayout}
          onPress={() => this.props.navigation.navigate("Format")}
        >
          <Text>Format 2</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.subLayout}
          onPress={() => this.props.navigation.navigate("Format")}
        >
          <Text>Format 3</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.subLayout}
          onPress={() => this.props.navigation.navigate("Format")}
        >
          <Text>Format 4</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap",
    paddingVertical: 40,
    paddingHorizontal: 10
  },

  subLayout: {
    width: 150,
    height: 250,
    backgroundColor: "green",
    alignItems: "center",
    justifyContent: "space-around",
    marginVertical: 30,
    marginHorizontal: 20
  }
});
