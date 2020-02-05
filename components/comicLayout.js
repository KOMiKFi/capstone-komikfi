/* eslint-disable prettier/prettier */
import React from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { getPhotoFromLibrary } from "../store";
import PickPhotoPrompt from "./unit/pickPhotoPrompt";
import SinglePhoto from "./unit/singlePhoto";

class ComicLayout extends React.Component {
  constructor() {
    super();
  }

  render() {
    const newArr = new Array(this.props.layout).fill(0);

    return (
      <View style={styles.container}>
        <TouchableOpacity position={{ x: 0 }}>
          <Text>confirm</Text>
        </TouchableOpacity>
        <View>
          {newArr.map((element, index) => {
            return (
              <View
                key={index}
                style={styles.pictureFrame}
                // height={200 / this.props.layout}
              >
                {!!this.props.photos[index].image.uri ? (
                  <SinglePhoto
                    navigation={this.props.navigation}
                    photoIdx={index}
                  />
                ) : (
                  <PickPhotoPrompt
                    navigation={this.props.navigation}
                    photoIdx={index}
                  />
                )}
              </View>
            );
          })}
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
    paddingHorizontal: 10,
    borderColor: "red",
    borderWidth: 5
  },
  pictureFrame: {
    flex: 1,
    width: 400,
    borderColor: "black",
    borderWidth: 5,
    alignItems: "center",
    justifyContent: "space-around",
    marginHorizontal: 10
  }
});

const mapStateToProps = state => {
  return {
    state: state,
    photos: state.photos,
    layout: state.layout
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getPhotoFromLibrary: async idx => {
      await dispatch(getPhotoFromLibrary(idx));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ComicLayout);
