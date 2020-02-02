/* eslint-disable prettier/prettier */
import React from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { updateCurrentPhotoIdx } from "../store";

class Confirm extends React.Component {
  render() {
    console.log("STATE IN CONFIRM", this.props.state)
    return (
      <View style={styles.container}>
        {/* <View style={styles.pictureFrame1}>
          <TouchableOpacity onPress={this.props.backToEdit}>
            <Text>Pick an image</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.pictureFrame2}>
          <TouchableOpacity onPress={this.props.backToEdit}>
            <Text>Pick an image</Text>
          </TouchableOpacity>
        </View> */}
        {this.props.keysOfPhotos.map(key => (
          <TouchableOpacity
            style={styles[`pictureFrame${key}`]}
            onPress={() => this.props.backToEdit(key)}
          >
            <Image
              key={key}
              source={{ uri: this.props.photos[key].image.uri }}
              style={styles.pictureFrame1}
            ></Image>
          </TouchableOpacity>
        ))}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderColor: "black",
    borderWidth: 5,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 40,
    paddingHorizontal: 10
  },
  imageContainer: {
    borderColor: "black",
    borderWidth: 5,
    width: 400,
    flex: 5, //in veritcal
    flexDirection: "row" //defining for the image so it wouldn't go beyond the width
  },
  pictureFrame1: {
    width: 400,
    height: 300,
    borderColor: "green",
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
    keysOfPhotos: Object.keys(state.photos),
    photos: state.photos
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    backToEdit: async idx => {
      await dispatch(updateCurrentPhotoIdx(idx));
      ownProps.navigation.navigate("Edit");
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Confirm);
