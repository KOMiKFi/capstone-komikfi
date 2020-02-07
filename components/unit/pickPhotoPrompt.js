/* eslint-disable prettier/prettier */
import React from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { getPhotoFromLibrary } from "../../store";

class PickPhotoPrompt extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.main}>
        <TouchableOpacity onPress={this.props.getPhotoFromLibrary}>
          <Image source={{ uri: 'https://cdn1.iconfinder.com/data/icons/social-17/48/photos2-512.png'}} 
          style={{height: 50, width: 50, margin: 100}}
          />
        </TouchableOpacity>
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
});

const mapStateToProps = state => {
  return {
    currentPhotoIndex: state.currentPhotoIndex
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getPhotoFromLibrary: async () => {
      await dispatch(getPhotoFromLibrary(ownProps.photoIdx));
      ownProps.navigation.push("Edit");
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PickPhotoPrompt);
