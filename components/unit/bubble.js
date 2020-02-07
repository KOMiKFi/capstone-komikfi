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
  PanResponder
} from "react-native";

import { connect } from "react-redux";
import { updateBubble } from "../../store";

class Bubble extends React.Component {
  rotationRef = React.createRef();
  pinchRef = React.createRef();
  constructor(props) {
    super(props);
    this._initialX = 0;
    this._initialY = 0;
    this._currentX = 0;
    this._currentY = 0;
    this._initialDistance = 0;
    this._currentDistance = 0;
    this._initialAngle = 0;
    this._currentAngle = 0;
    this._diffAngle = 0;

    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: event => {},
      onPanResponderMove: (event, gesture) => {
        if (gesture.numberActiveTouches === 1) {
          if (!this._initialX || !this._initialY) {
            this._initialX =
              gesture.dx * Math.cos(this.state.rotationZ) +
              gesture.dy * Math.sin(this.state.rotationZ);
            this._initialY =
              gesture.dy * Math.cos(this.state.rotationZ) -
              gesture.dx * Math.sin(this.state.rotationZ);
          } else {
            this._initialX = this._currentX;
            this._initialY = this._currentY;
          }
          this._currentX =
            gesture.dx * Math.cos(this.state.rotationZ) +
            gesture.dy * Math.sin(this.state.rotationZ);
          this._currentY =
            gesture.dy * Math.cos(this.state.rotationZ) -
            gesture.dx * Math.sin(this.state.rotationZ);

          this.setState({
            ...this.state,
            translateX: this.state.translateX + this._currentX - this._initialX,
            translateY: this.state.translateY + this._currentY - this._initialY
          });
        } else if (gesture.numberActiveTouches === 2) {
          const touches = event.nativeEvent.touches;

          let currentX0 = touches[0].pageX;
          let currentY0 = touches[0].pageY;
          let currentX1 = touches[1].pageX;
          let currentY1 = touches[1].pageY;
          //for zooming
          if (!this._initialDistance) {
            this._initialDistance =
              Math.round(
                Math.sqrt(
                  ((currentY1 - currentY0) ^ 2) + ((currentX1 - currentX0) ^ 2)
                ) * 100
              ) / 100;
          } else {
            this._initialDistance = this._currentDistance;
          }
          this._currentDistance =
            Math.round(
              Math.sqrt(
                ((currentY1 - currentY0) ^ 2) + ((currentX1 - currentX0) ^ 2)
              ) * 100
            ) / 100;

          //for rotating
          if (!this._initialAngle) {
            this._initialAngle =
              Math.round(
                Math.atan((currentX0 - currentX1) / (currentY1 - currentY0)) *
                  1000
              ) / 1000;
          } else {
            this._initialAngle = this._currentAngle;
          }
          this._currentAngle =
            Math.round(
              Math.atan((currentX0 - currentX1) / (currentY1 - currentY0)) *
                1000
            ) / 1000;
          this._diffAngle = this._currentAngle - this._initialAngle;

          if (this._initialDistance !== 0 && this._initialDistance !== NaN) {
            this.setState({
              ...this.state,
              scale:
                Math.round(
                  (this.state.scale / this._initialDistance) *
                    this._currentDistance *
                    1000
                ) / 1000,
              rotationZ: this.state.rotationZ + this._diffAngle
            });
          }
        }
      },
      onPanResponderRelease: (event, gestureState) => {
        // this.props.updateBubble(this.state);
        this._initialX = 0;
        this._initialY = 0;
        this._currentX = 0;
        this._currentY = 0;
        this._initialDistance = 0;
        this._currentDistance = 0;
        this._initialAngle = 0;
        this._currentAngle = 0;
        this._diffAngle = 0;
      }
    });
    this.state = {
      shape: this.props.shape,
      text: "",
      rotationZ: 0,
      translateX: 0,
      translateY: 0,
      scale: 1
    };
  }
  render() {
    console.log("in bubble", this.type);
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
            // source={require(`../../assets/bubble${this.props.type}.png`)}
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
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    borderColor: "purple",
    borderWidth: 5,
    transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }]
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
    updateBubble: bubble => dispatch(updateBubble(bubble))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Bubble);
