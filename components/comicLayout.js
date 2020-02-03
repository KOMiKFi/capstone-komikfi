/* eslint-disable prettier/prettier */
import React from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { getPhotoFromLibrary } from "../store";
import PickPhotoPrompt from "./unit/pickPhotoPrompt"
import SinglePhoto from "./unit/singlePhoto"

class ComicLayout extends React.Component {
  constructor() {
    super();
    // this.openImagePicker = this.openImagePicker.bind(this)
  }

  render() {
    console.log("STATE IN LAYOUT-ONE", this.props.state)
    const newArr = new Array(this.props.layout).fill(0)
    console.log(newArr)

    return (
      <View style={styles.container}>
        {newArr.map( (element, index) => { return (
          <View
            key={index}
            style={styles.pictureFrame1}>
            {/* {
              !!this.props.photos[index].image.uri ? <SinglePhoto photoIdx={index}/> : <PickPhotoPrompt photoIdx={index}/>
            } */}
            <PickPhotoPrompt photoIdx={index}/>

          </View>
        )}
      )}
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
    state: state,
    photos: state.photos,
    layout: state.layout
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
