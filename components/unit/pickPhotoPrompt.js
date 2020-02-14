/* eslint-disable prettier/prettier */
import React from "react";
import { StyleSheet, View, Image, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { getPhotoFromLibrary, accessingCamera } from "../../store";
const photoIcon = require("../../assets/photos-icon.png")
const cameraIcon = require("../../assets/camera-icon.png")

class PickPhotoPrompt extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.props.getPhotoFromLibrary}>
          <Image
            source={photoIcon}
            style={styles.icon}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={this.props.accessingCamera}>
          <Image
            source={cameraIcon}
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-evenly"
  },
  icon: {
    height: 50,
    width: 50,
    margin: 20
  }
});

const mapStateToProps = state => {
  return {
    currentPhotoIndex: state.currentPhotoIndex
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getPhotoFromLibrary: async () => {
      const result = await dispatch(getPhotoFromLibrary(ownProps.photoIdx));
      if (!result) {
        ownProps.navigation.push("Edit");
      }
    },
    accessingCamera: async () => {
      const result = await dispatch(accessingCamera(ownProps.photoIdx));
      if (!result) {
        ownProps.navigation.push("Edit");
      }
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PickPhotoPrompt);
