/* eslint-disable prettier/prettier */
import React from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import { settingFormat } from '../store/index'
import { connect } from 'react-redux'

export class ChooseCase extends React.Component {
  render() {
    console.log("LAYOUT", this.props.state)
  
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.subLayout}
          onPress={() => {
            this.props.settingFormat(1)
            this.props.navigation.navigate("ComicLayout")
          }}
        >
          <Text>Layout 1</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.subLayout}
          onPress={() => {
            this.props.settingFormat(2)
            this.props.navigation.navigate("ComicLayout")
          }}
        >
          <Text>Format 2</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.subLayout}
          onPress={() => {
            this.props.settingFormat(3)
            this.props.navigation.navigate("ComicLayout")
          }}
        >
          <Text>Format 3</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.subLayout}
          onPress={() => {
            this.props.settingFormat(4)
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

const mapStateToProps = (state) => ({
  format: state.format
})

const mapDispatchToProps = (dispatch) => ({
  settingFormat: (format) => dispatch(settingFormat(format))
})

export default connect(mapStateToProps, mapDispatchToProps)(ChooseCase)