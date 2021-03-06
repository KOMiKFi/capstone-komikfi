/* eslint-disable prettier/prettier */
import React from "react";
import { StyleSheet, View, Text, TouchableOpacity, Alert } from "react-native";
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
import PickPhotoPrompt from "./pickPhotoPrompt";
import SinglePhoto from "./singlePhoto/wrapperLayout";

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
      Alert.alert(
        "Awesome Job!",
        "Your comic is now saved in your Camera Roll"
      );
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    const newArr = new Array(this.props.layout).fill(0);
    const findDimension = event => {
      this.props.gettingHeight(
        event.nativeEvent.layout.height,
        event.nativeEvent.layout.width
      );
    };
    return (
      <View style={styles.page}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("Layout")}
          >
            <Text style={styles.back1}>Back</Text>
          </TouchableOpacity>
          <Text style={styles.layout}>Layout</Text>
          <Text style={styles.back2}>Back</Text>
        </View>
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
                    navigation={this.props.navigation}
                    photoIdx={index}
                    currentView="layout"
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
    justifyContent: "center",
    backgroundColor: "#dfe3e6"
  },
  container1: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#658d9e",
    borderWidth: 5
  },
  container2: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#658d9e",
    borderWidth: 5
  },
  container3: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#658d9e",
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
    borderColor: "#658d9e",
    borderWidth: 5
  },
  pictureFrame: {
    flex: 1,
    width: "100%",
    borderColor: "#658d9e",
    borderWidth: 5,
    alignItems: "center",
    justifyContent: "space-around"
  },
  pictureFrame4: {
    height: "50%",
    width: "50%",
    borderColor: "#658d9e",
    borderWidth: 5,
    alignItems: "center",
    justifyContent: "space-around"
  },
  nav: {
    flex: 0.1,
    width: "100%",
    borderColor: "#dfe3e6",
    borderWidth: 5,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center"
  },
  navItem: {
    color: "#e88010",
    fontFamily: "Noteworthy",
    fontSize: 20,
    paddingBottom: 10
  },
  header: {
    height: 90,
    width: "100%",
    justifyContent: "space-around",
    flexDirection: "row",
    alignItems: "flex-end"
  },
  layout: {
    fontFamily: "Noteworthy-Light",
    fontSize: 30,
    color: "#658d9e"
  },
  back1: {
    fontFamily: "Noteworthy",
    fontSize: 25,
    color: "#e88010"
  },
  back2: {
    fontFamily: "Noteworthy",
    fontSize: 25,
    color: "#dfe3e6"
  }
});

const mapStateToProps = state => {
  return {
    state: state,
    photos: state.photos,
    layout: state.layout.size
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getPhotoFromLibrary: async idx => {
      await dispatch(getPhotoFromLibrary(idx));
    },
    backToEdit: async index => {
      await dispatch(updateCurrentPhotoIdx(index));
      ownProps.navigation.push("Edit");
    },
    clearPhotos: async () => {
      await dispatch(clearPhotos());
    },
    gettingHeight: (height, width) => dispatch(gettingHeight(height, width))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ComicLayout);
