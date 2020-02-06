/* eslint-disable prettier/prettier */
import React from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ImageBackground
} from "react-native";
import { connect } from "react-redux";
import { updateCurrentPhotoIdx } from "../../store";
import Bubble from "./bubble";

const bubbleArray = [
  {
    translateX: 1,
    translateY: 1,
    rotationZ: 30,
    text: "geasf",
    shape: 1
  }
];

class SinglePhoto extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View
        style={styles.singlePhoto}
        // onPress={() => this.props.backToEdit(this.props.photoIdx)}
      >
        <ImageBackground
          source={{ uri: this.props.currentPhoto.image.uri }}
          style={{
            height: this.props.height - 10,
            width: this.props.width - 10,
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <View>
            {bubbleArray[0]
              ? bubbleArray.map((bubble, idx) => {
                  console.log(bubble);
                  return <Bubble key={idx} {...bubble} />;
                })
              : null}
          </View>
        </ImageBackground>
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
