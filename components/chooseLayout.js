/* eslint-disable prettier/prettier */
import React from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import { settingLayout } from '../store/index'
import { connect } from 'react-redux'

export class ChooseCase extends React.Component {
  render() {

    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.subLayout}
          onPress={() => {
            this.props.settingLayout(1)
            this.props.navigation.navigate("ComicLayout")
          }}
        >
          <Text>Layout 1</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.subLayout}
          onPress={() => {
            this.props.settingLayout(2)
            this.props.navigation.navigate("ComicLayout")
          }}
        >
          <Text>Format 2</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.subLayout}
          onPress={() => {
            this.props.settingLayout(3)
            this.props.navigation.navigate("ComicLayout")
          }}
        >
          <Text>Format 3</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.subLayout}
          onPress={() => {
            this.props.settingLayout(4)
            this.props.navigation.navigate("ComicLayout")
          }}
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
    marginHorizontal: 10
  }
});


const mapDispatchToProps = (dispatch) => ({
  settingLayout: (layout) => dispatch(settingLayout(layout))
})

export default connect(null, mapDispatchToProps)(ChooseCase)