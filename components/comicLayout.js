/* eslint-disable prettier/prettier */
import React from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity, PixelRatio } from "react-native";
import { CameraRoll } from 'react-native-cameraroll'
import { connect } from "react-redux";
import { getPhotoFromLibrary, updateCurrentPhotoIdx } from "../store";
import PickPhotoPrompt from "./unit/pickPhotoPrompt";
import SinglePhoto from "./unit/singlePhoto";
import { captureRef } from "react-native-view-shot"
import * as Permissions from "expo-permissions";
import * as MediaLibrary from "expo-media-library"


class ComicLayout extends React.Component {
  constructor() {
    super();
    this.state = {
      width: 0,
      height: 0
    }
  }

  async savePhoto() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL)
    if (status !== "granted") {
      alert("The app needs permissions to save to camera roll")
    }

    try {

      let uri = await captureRef(this.comicView, {
        format: 'png',
      })

      const asset = await MediaLibrary.createAssetAsync(uri)

      const { localUri } = await MediaLibrary.getAssetInfoAsync(asset)

      let savedComic = await MediaLibrary.saveToLibraryAsync(localUri)
    }
    catch (error) {
      console.error(error)
    }


    // const targetPixelCount = 1080
    // const pixelRatio = PixelRatio.get()
    // const pixels = targetPixelCount / pixelRatio

    // const result = await takeSnapshotAsync(this._container, {
    //   result: "comic",
    //   height: pixels,
    //   width: pixels,
    //   quality: 1,
    //   format: "png"
    // })
  }


  render() {
    const newArr = new Array(this.props.layout).fill(0);

    const findDimension = (event) => {
      this.setState({
        width: event.nativeEvent.layout.width,
        height: event.nativeEvent.layout.height
      })
    }
    console.log('comic state', this.state)
    return (
      <View
        style={styles.page}>
        <View
          ref={view => { this.comicView = view }}
          style={styles[`container${this.props.layout}`]}
        >
          {newArr.map((element, index) => {
            return (
              <TouchableOpacity
                key={index}
                style={this.props.layout === 4 ? styles.pictureFrame4 : styles.pictureFrame}
                onLayout={(event) => { findDimension(event) }}
              >
                {!!this.props.photos[index].image.uri ? (
                  <SinglePhoto
                    imageHeight={this.state.height}
                    imageWidth={this.state.width}
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
            onPress={() => { this.savePhoto() }}
          >
            <Text style={styles.navItem} >Save to Camera Roll</Text>
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
    flexWrap: 'wrap',
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
    justifyContent: "space-around",
  },
  pictureFrame4: {
    height: "50%",
    width: "50%",
    borderColor: "green",
    borderWidth: 5,
    alignItems: "center",
    justifyContent: "space-around",
  },
  image: {
    flex: 1,
    width: "100%",
    borderColor: "green",
    borderWidth: 5,
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
    layout: state.layout
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getPhotoFromLibrary: async idx => {
      await dispatch(getPhotoFromLibrary(idx));
    },
    backToEdit: async (index) => {
      await dispatch(updateCurrentPhotoIdx(index));
      ownProps.navigation.navigate("Edit");
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ComicLayout);
