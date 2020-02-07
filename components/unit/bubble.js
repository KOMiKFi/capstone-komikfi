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
import bubble1 from "../../assets/bubble1.png";
import bubble2 from "../../assets/bubble2.png";
import bubble3 from "../../assets/bubble3.png";

const bubbleImages = [bubble1, bubble2, bubble3];

class Bubble extends React.Component {
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

          // for zooming
          if (!this._initialDistance) {
            this._initialDistance = Math.sqrt(
              Math.pow(currentY1 - currentY0, 2) +
                Math.pow(currentX1 - currentX0, 2)
            );
          } else {
            this._initialDistance = this._currentDistance;
          }
          this._currentDistance = Math.sqrt(
            Math.pow(currentY1 - currentY0, 2) +
              Math.pow(currentX1 - currentX0, 2)
          );

          //for rotating
          if (!this._initialAngle) {
            this._initialAngle = Math.atan(
              (currentX0 - currentX1) / (currentY1 - currentY0)
            );
          } else {
            this._initialAngle = this._currentAngle;
          }
          this._currentAngle = Math.atan(
            (currentX0 - currentX1) / (currentY1 - currentY0)
          );
          this._diffAngle = this._currentAngle - this._initialAngle;

          if (this._initialDistance !== 0) {
            this.setState({
              ...this.state,
              scale:
                (this.state.scale / this._initialDistance) *
                this._currentDistance,
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
      text: "",
      rotationZ: 0,
      translateX: 0,
      translateY: 0,
      scale: 1
    };
  }
  render() {
    // console.log("in bubble", this.props);

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
            source={bubbleImages[this.props.shape - 1]}
            style={styles.bubble}
          >
            <TextInput
              style={{ ...styles.text }}
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
    top: "10%",
    left: "15%",
    fontSize: 20,
    width: "60%",
    height: "40%"
  }
});

const mapStateToProps = (state, ownProps) => {
  return {
    // currentPhoto: state.photos[ownProps.photoIdx]
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    // backToEdit: async () => {
    //   await dispatch(updateCurrentPhotoIdx(ownProps.photoIdx));
    //   ownProps.navigation.navigate("Edit");
    // }
    updateBubble: bubble =>
      dispatch(updateBubble(bubble, ownProps.bubbleIdx, ownProps.photoIdx))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Bubble);
