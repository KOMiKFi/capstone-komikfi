/* eslint-disable prettier/prettier */
import React from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { connect } from "react-redux";
import { updateCurrentPhotoIdx } from "../../store";
import Bubble from "./bubble";

class SinglePhoto extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <TouchableOpacity
        style={styles.singlePhoto}
        onPress={() => this.props.backToEdit(this.props.photoIdx)}
      >
        <ImageBackground
          source={{ uri: this.props.currentPhoto.image.uri }}
          style={
            this.props.layout !== 4
              ? {
                height: this.props.height - 10,
                width: this.props.width - 10,
                alignItems: "center",
                justifyContent: "center"
              }
              : {
                height: this.props.height - 10,
                width: this.props.width - 10,
                alignItems: "center",
                justifyContent: "center"
              }
          }
        >
          <View>
            {bubbleArray[0]
              ? bubbleArray.map((bubble, idx) => (
                <Bubble key={idx} {...bubble} />
              ))
              : null}
          </View>
        </ImageBackground>
      </TouchableOpacity>
    );
  }
}

const bubbleArray = [
  {
    x: 1,
    y: 1,
    rotation: 30,
    text: "geasf",
    uri: "../../assets/bubble.png",
    height: 200,
    width: 200
  }
];

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
  bubble: {
    height: 200,
    width: 200,
    position: "absolute",
    alignSelf: "center"
  }
});

const mapStateToProps = (state, ownProps) => {
  return {
    currentPhoto: state.photos[ownProps.photoIdx],
    layout: state.layout.size,
    height: state.layout.height,
    width: state.layout.width
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    backToEdit: async () => {
      await dispatch(updateCurrentPhotoIdx(ownProps.photoIdx));
      ownProps.navigation.push("Edit");
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SinglePhoto);
