/* eslint-disable prettier/prettier */
import React from "react";
import {
  StyleSheet,
  View,
  ImageBackground,
  TextInput,
  PanResponder,
  Keyboard,
  Dimensions
} from "react-native";
import { Header } from "react-navigation-stack";
import { connect } from "react-redux";
import { updateBubble, deleteBubble } from "../../store";
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
      onPanResponderGrant: (event, gesture) => {
        console.log("in grant", gesture);
        if (gesture.numberActiveTouches === 1) {
          this.setState({ ...this.state, isOnDrag: true });
        }
      },

      onPanResponderMove: (event, gesture) => {
        if (gesture.numberActiveTouches === 1) {
          const layout = this.props.layout;
          const windowWidth = Dimensions.get("window").width;
          const trashCanX = windowWidth / 2;
          const range = 15;
          let trashCanY;
          if (layout.size !== 4) {
            trashCanY = Header.HEIGHT + (layout.height * (layout.size - 1)) / 2;
          } else {
            trashCanY = Header.HEIGHT + 0.5 * layout.height;
          }
          console.log(
            "asdf",
            trashCanX,
            trashCanY,
            gesture.moveX,
            gesture.moveY,
            layout.height
          );
          if (
            gesture.moveX < trashCanX + range &&
            gesture.moveX > trashCanX - range &&
            gesture.moveY < trashCanY + 4 * range &&
            gesture.moveY > trashCanY
          ) {
            this.props.deleteBubble();
          }

          if (!this._initialX || !this._initialY) {
            this._initialX =
              gesture.dx * Math.cos(this.state.bubble.rotateZ) +
              gesture.dy * Math.sin(this.state.bubble.rotateZ);
            this._initialY =
              gesture.dy * Math.cos(this.state.bubble.rotateZ) -
              gesture.dx * Math.sin(this.state.bubble.rotateZ);
          } else {
            this._initialX = this._currentX;
            this._initialY = this._currentY;
          }
          this._currentX =
            gesture.dx * Math.cos(this.state.bubble.rotateZ) +
            gesture.dy * Math.sin(this.state.bubble.rotateZ);
          this._currentY =
            gesture.dy * Math.cos(this.state.bubble.rotateZ) -
            gesture.dx * Math.sin(this.state.bubble.rotateZ);

          this.setState({
            ...this.state,
            bubble: {
              ...this.state.bubble,
              translateX:
                this.state.bubble.translateX + this._currentX - this._initialX,
              translateY:
                this.state.bubble.translateY + this._currentY - this._initialY
            }
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
              bubble: {
                ...this.state.bubble,
                scale:
                  (this.state.bubble.scale / this._initialDistance) *
                  this._currentDistance,
                rotateZ: this.state.bubble.rotateZ + this._diffAngle
              }
            });
          }
        }
      },
      onPanResponderRelease: (event, gestureState) => {
        this.props.updateBubble(this.state.bubble);
        this.setState({ ...this.state, isOnDrag: false });
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
      bubble: {
        text: this.props.text || "",
        rotateZ: this.props.rotateZ || 0,
        translateX: this.props.translateX || 0,
        translateY: this.props.translateY || 0,
        scale: this.props.scale || 1
      },
      isOnDrag: false
    };
  }
  componentWillUnmount() {
    this.props.updateBubble(this.state.bubble);
  }
  render() {
    console.log(this.state);
    return (
      <View {...this._panResponder.panHandlers}>
        {this.state.isOnDrag ? <View style={styles.trash}></View> : null}

        <View
          style={{
            transform: [
              { rotateZ: this.state.bubble.rotateZ },
              { translateX: this.state.bubble.translateX },
              { translateY: this.state.bubble.translateY },
              { scale: this.state.bubble.scale }
            ],
            position: "absolute",
            top: "35%",
            left: "20%"
          }}
        >
          <ImageBackground
            source={bubbleImages[this.props.shape - 1]}
            style={styles.bubble}
          >
            <TextInput
              style={styles[`text${this.props.shape}`]}
              multiline
              numberOfLines={2}
              editable
              placeholder={"TYPE HERE!!!"}
              onChangeText={text =>
                this.setState({
                  ...this.state,
                  bubble: { ...this.state.bubble, text: text }
                })
              }
              onSubmitEditing={() => {
                this.props.updateBubble(this.state.bubble);
                Keyboard.dismiss();
              }}
              value={this.state.bubble.text}
            ></TextInput>
          </ImageBackground>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  bubble: {
    height: 150,
    width: 170
  },
  text1: {
    position: "relative",
    top: "23%",
    left: "18%",
    fontSize: 15,
    width: "58%",
    height: "25%"
  },
  text2: {
    position: "relative",
    top: "30%",
    left: "14%",
    fontSize: 15,
    width: "70%",
    height: "25%"
  },
  text3: {
    position: "relative",
    top: "37%",
    left: "28%",
    fontSize: 18,
    width: "40%",
    height: "30%"
  },
  trash: {
    position: "absolute",
    borderWidth: 5,
    borderColor: "white",
    width: 20,
    height: 30,
    zIndex: 2,
    alignSelf: "center"
  }
});
const mapStatetoProps = state => {
  return {
    layout: state.layout
  };
};
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    updateBubble: bubble => {
      dispatch(updateBubble(bubble, ownProps.bubbleIdx, ownProps.photoIdx));
    },
    deleteBubble: () => {
      dispatch(deleteBubble(ownProps.photoIdx, ownProps.bubbleIdx));
    }
  };
};

export default connect(mapStatetoProps, mapDispatchToProps)(Bubble);
