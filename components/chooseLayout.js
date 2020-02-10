/* eslint-disable prettier/prettier */
import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { settingLayout } from "../store/index";
import { connect } from "react-redux";

export class ChooseCase extends React.Component {
  render() {
    return (
      <View style={styles.main}>

        <View style={styles.message}>
          <Text style={styles.layout}>Select a layout</Text>
        </View>
        <View style={styles.container}>
          <TouchableOpacity
            style={styles.subLayout}
            onPress={() => {
              this.props.settingLayout(1);
              this.props.navigation.push("ComicLayout");
            }}
          >
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.subLayout}
            onPress={() => {
              this.props.settingLayout(2);
              this.props.navigation.push("ComicLayout");
            }}
          >
            <View style={styles.two} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.subLayout}
            onPress={() => {
              this.props.settingLayout(3);
              this.props.navigation.push("ComicLayout");
            }}
          >
            <View style={styles.three} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.subLayout}
            onPress={() => {
              this.props.settingLayout(4);
              this.props.navigation.push("ComicLayout");
            }}
          >
            <View style={styles.four} />
            <View style={styles.four2} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main: {
    height: '100%',
    backgroundColor: '#dfe3e6'
  },
  message: {
    flex: 2,
    justifyContent: 'center',
        alignItems: 'center',

  },
  container: {
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    flexWrap: 'wrap',
    flex: 9,
    shadowColor: "#000",
    shadowOffset: { height: 3 },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
  back: {
    flex: 1.5,
    justifyContent: 'flex-end',
    paddingLeft: 30,
    // borderBottomColor: 'red',
    // borderBottomWidth: 5,
  },
  subLayout: {
    width: '40%',
    height: '38%',
    backgroundColor: "#658d9e",
    justifyContent: "center",
    marginVertical: 10,
    borderWidth: 4,
    borderColor: '#244654',
    borderRadius: 4,
  },
  two: {
    borderColor: '#244654',
    borderTopWidth: 2,
    borderBottomWidth: 2
  },
  three: {
    height: '38%',
    borderTopWidth: 4,
    borderBottomWidth: 4,
    borderColor: '#244654',
  },
  four: {
    height: '100%',
    marginLeft: '50%',
    marginRight: '50%',
    borderWidth: 2,
    position: 'absolute',
    borderColor: '#244654',
  },
  four2: {
    width: '100%',
    borderTopWidth: 2,
    borderBottomWidth: 2,
    position: 'absolute',
    borderColor: '#244654',
  },
  layout: {
    fontSize: 40,
    fontFamily: 'Noteworthy-Light',
    color: '#e88010',
    textDecorationLine: 'underline'
  }
});

const mapDispatchToProps = dispatch => ({
  settingLayout: layout => dispatch(settingLayout(layout))
});

export default connect(null, mapDispatchToProps)(ChooseCase);
