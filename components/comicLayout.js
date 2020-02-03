/* eslint-disable prettier/prettier */
import React from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { getPhotoFromLibrary } from "../store";

class ComicLayout extends React.Component {
  constructor() {
    super();
    // this.openImagePicker = this.openImagePicker.bind(this)
  }

  render() {
    console.log("STATE IN LAYOUT-ONE", this.props.state)
    return (
      <View style={styles.container}>
        <View style={styles.pictureFrame1}>
          <TouchableOpacity onPress={() => this.props.getPhotoFromLibrary(0)}>
            <Text>Pick an image</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.pictureFrame2}>
          <TouchableOpacity onPress={ () => this.props.getPhotoFromLibrary(1)}>
            <Text>Pick an image</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 40,
    paddingHorizontal: 10
  },
  pictureFrame1: {
    width: 400,
    height: 300,
    borderColor: "black",
    borderWidth: 5,
    alignItems: "center",
    justifyContent: "space-around",
    marginHorizontal: 10
  },
  pictureFrame2: {
    width: 400,
    height: 300,
    borderColor: "black",
    borderBottomWidth: 5,
    borderLeftWidth: 5,
    borderRightWidth: 5,
    alignItems: "center",
    justifyContent: "space-around",
    marginHorizontal: 10
  }
});

const mapStateToProps = state => {
  return {
    state: state
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getPhotoFromLibrary: async idx => {
      await dispatch(getPhotoFromLibrary(idx));
      ownProps.navigation.push("Edit");
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ComicLayout);