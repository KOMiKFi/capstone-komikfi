/* eslint-disable prettier/prettier */
import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  PixelRatio,
  Alert
} from "react-native";
import { connect } from "react-redux";
import { captureRef } from "react-native-view-shot";
import * as Permissions from "expo-permissions";
import * as MediaLibrary from "expo-media-library";
import {
  getPhotoFromLibrary,
  updateCurrentPhotoIdx,
  clearPhotos,
  gettingHeight
} from "../store";
import PickPhotoPrompt from "./unit/pickPhotoPrompt";
import SinglePhoto from "./unit/singlePhoto";

class ComicLayout extends React.Component {
  constructor() {
    super();
    this.state = {
      width: 0,
      height: 0
    };
  }

  async savePhoto() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status !== "granted") {
      alert("The app needs permissions to save to camera roll");
    }
    try {
      let uri = await captureRef(this.comicView, {
        format: "png"
      });
      const asset = await MediaLibrary.createAssetAsync(uri);
      alert("Awesome Job! The comic is now saved in your Camera Roll");
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    const newArr = new Array(this.props.layout).fill(0);

    const findDimension = event => {
      this.props.gettingHeight(event.nativeEvent.layout.height, event.nativeEvent.layout.width)
    };
    return (
      <View style={styles.page}>
        <View
          collapsable={false}
          ref={view => {
            this.comicView = view;
          }}
          style={styles[`container${this.props.layout}`]}
        >
          {newArr.map((element, index) => {
            return (
              <TouchableOpacity
                key={index}
                style={
                  this.props.layout === 4
                    ? styles.pictureFrame4
                    : styles.pictureFrame
                }
                onLayout={event => {
                  findDimension(event);
                }}
              >
                {!!this.props.photos[index].image.uri ? (
                  <SinglePhoto
                    style={styles.image}
                    navigation={this.props.navigation}
                    photoIdx={index}
                  />
                ) : (
                  <PickPhotoPrompt
                    navigation={this.props.navigation}
                    photoIdx={index}
                  />
                )}
              </TouchableOpacity>
            );
          })}
        </View>
        <View style={styles.nav}>
          <TouchableOpacity
            position={{ x: 0 }}
            onPress={() => {
              this.savePhoto();
            }}
          >
            <Text style={styles.navItem}>Save</Text>
          </TouchableOpacity>
          <TouchableOpacity
            position={{ x: 0 }}
            onPress={() => {
              this.props.clearPhotos();
            }}
          >
            <Text style={styles.navItem}>Clear</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  page: {
    display: "flex",
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  container1: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    borderColor: "green",
    borderWidth: 5
  },
  container2: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    borderColor: "green",
    borderWidth: 5
  },
  container3: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    borderColor: "green",
    borderWidth: 5
  },
  container4: {
    display: "flex",
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    width: "100%",
    alignContent: "stretch",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    borderColor: "green",
    borderWidth: 5
  },
  pictureFrame: {
    flex: 1,
    width: "100%",
    borderColor: "green",
    borderWidth: 5,
    alignItems: "center",
    justifyContent: "space-around"
  },
  pictureFrame4: {
    height: "50%",
    width: "50%",
    borderColor: "green",
    borderWidth: 5,
    alignItems: "center",
    justifyContent: "space-around"
  },
  image: {
    flex: 1,
    width: "100%",
    borderColor: "green",
    borderWidth: 5
  },
  nav: {
    flex: 0.1,
    width: "100%",
    borderColor: "white",
    backgroundColor: "white",
    borderWidth: 5,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center"
  },
  navItem: {
    color: "blue"
  }
});

const mapStateToProps = state => {
  return {
    state: state,
    photos: state.photos,
    layout: state.layout.size,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getPhotoFromLibrary: async idx => {
      await dispatch(getPhotoFromLibrary(idx));
    },
    backToEdit: async index => {
      await dispatch(updateCurrentPhotoIdx(index));
      ownProps.navigation.navigate("Edit");
    },
    clearPhotos: async () => {
      await dispatch(clearPhotos());
    },
    gettingHeight: (height, width) => dispatch(gettingHeight(height, width))

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ComicLayout);
