/* eslint-disable prettier/prettier */
import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  PanResponder,
  Animated
} from "react-native";
import {
  PinchGestureHandler,
  RotationGestureHandler,
  State
} from "react-native-gesture-handler";
import { connect } from "react-redux";

class Bubble extends React.Component {
  rotationRef = React.createRef();
  pinchRef = React.createRef();
  constructor(props) {
    super(props);

    this.initialDistance;
    this.currentDistance;

    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: event => {},
      onPanResponderMove: (event, gesture) => {
        if (gesture.numberActiveTouches === 1) {
          this.setState({
            ...this.state,
            translateX:
              gesture.dx * Math.cos(this.state.rotationZ) +
              gesture.dy * Math.sin(this.state.rotationZ),
            translateY:
              gesture.dy * Math.cos(this.state.rotationZ) -
              gesture.dx * Math.sin(this.state.rotationZ)
          });
        } else if (gesture.numberActiveTouches === 2) {
          const touches = event.nativeEvent.touches;

          let currentX0 = touches[0].pageX;
          let currentY0 = touches[0].pageY;
          let currentX1 = touches[1].pageX;
          let currentY1 = touches[1].pageY;
          if (!this.initialDistance) {
            this.initialDistance = Math.sqrt(
              ((currentY1 - currentY0) ^ 2) + ((currentX1 - currentX0) ^ 2)
            );
          } else {
            this.initialDistance = this.currentDistance;
          }
          this.currentDistance = Math.sqrt(
            ((currentY1 - currentY0) ^ 2) + ((currentX1 - currentX0) ^ 2)
          );
          console.log(this.initialDistance, this.currentDistance);

          this.setState({
            ...this.state,
            scale:
              (this.state.scale / this.initialDistance) * this.currentDistance
          });
        }
      },
      onPanResponderRelease: (event, gestureState) => {
        this.initialX0 = null;
      }
    });
    this.state = {
      text: "",
      rotationZ: 0.5,
      translateX: 0,
      translateY: 0,
      scale: 1
    };
  }
  render() {
    return (
      <View {...this._panResponder.panHandlers}>
        <View
          style={{
            borderColor: "purple",
            borderWidth: 5,
            transform: [
              { rotateZ: this.state.rotationZ },
              { translateX: this.state.translateX },
              { translateY: this.state.translateY },
              { scale: this.state.scale }
            ],
            postition: "relative"
          }}
        >
          <ImageBackground
            source={require("../../assets/bubble2.png")}
            style={{ ...styles.bubble, height: this.props.height }}
          >
            <TextInput
              style={{ ...styles.text, top: this.props.height / 5 }}
              multiline
              numberOfLines={2}
              editable
              onChangeText={text =>
                this.setState({ ...this.state, text: text })
              }
              value={this.state.text}
            ></TextInput>
          </ImageBackground>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    borderColor: "purple",
    borderWidth: 5,
    transform: [
      { rotateZ: "30deg" },
      { translateX: -100 },
      { translateY: 100 },
      { scaleX: 1.5 },
      { scaleY: 1.5 }
    ]
  },
  bubble: {
    height: 200,
    width: 200,
    position: "relative",
    alignSelf: "center"
  },
  text: {
    // zIndex: 1,
    position: "relative",
    left: "15%",
    bottom: "20%",
    fontSize: 20,
    width: "60%",
    height: "40%"
  }
});

const mapStateToProps = (state, ownProps) => {
  return {
    currentPhoto: state.photos[ownProps.photoIdx]
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    // backToEdit: async () => {
    //   await dispatch(updateCurrentPhotoIdx(ownProps.photoIdx));
    //   ownProps.navigation.navigate("Edit");
    // }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Bubble);
