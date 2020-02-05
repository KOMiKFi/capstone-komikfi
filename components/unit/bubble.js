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
    //pinch
    // this._baseScale = new Animated.Value(1);
    // this._pinchScale = new Animated.Value(1);
    // this._scale = Animated.multiply(this._baseScale, this._pinchScale);
    // this._lastScale = 1;
    // this._onPinchGestureEvent = Animated.event(
    //   [{ nativeEvent: { scale: this._pinchScale } }],
    //   { useNativeDriver: true }
    // );
    // _onPinchHandlerStateChange = event => {
    //   if (event.nativeEvent.oldState === State.ACTIVE) {
    //     this._lastScale *= event.nativeEvent.scale;
    //     this._baseScale.setValue(this._lastScale);
    //     this._pinchScale.setValue(1);
    //   }
    // };

    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
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
          console.log("detect two", event.nativeEvent.changedTouches);
          // this.setState({
          //   ...this.state,
          //   scaleX:
          //     gesture.dx * Math.cos(this.state.rotationZ) +
          //     gesture.dy * Math.sin(this.state.rotationZ),
          //   translateY:
          //     gesture.dy * Math.cos(this.state.rotationZ) -
          //     gesture.dx * Math.sin(this.state.rotationZ)
          // });
        }
      }
    });
    this.state = {
      text: "",
      rotationZ: 0.5,
      translateX: 0,
      translateY: 0,
      scaleX: 1,
      scaleY: 1
    };
    // this.onPinch(){}
  }
  render() {
    return (
      // <PinchGestureHandler
      //   ref={this.pinchRef}
      //   simultaneousHandlers={this.rotationRef}
      //   onGestureEvent={this._onPinchGestureEvent}
      //   onHandlerStateChange={this._onPinchHandlerStateChange}
      // >
      <View {...this.panResponder.panHandlers}>
        <View
          style={{
            borderColor: "purple",
            borderWidth: 5,
            transform: [
              { rotateZ: this.state.rotationZ },
              // { rotateZ: `${this.state.rotationZ}deg` },
              { translateX: this.state.translateX },
              { translateY: this.state.translateY },
              { scaleX: 1.5 },
              { scaleY: 1.5 }
            ]
            // postition: "relative",
            // transform: [{ translateX: this.state.translateX }]
          }}
        >
          <ImageBackground
            source={require("../../assets/bubble1.png")}
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
      // </PinchGestureHandler>
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
