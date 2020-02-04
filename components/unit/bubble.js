/* eslint-disable prettier/prettier */
import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  ImageBackground,
  TextInput
} from "react-native";
import { connect } from "react-redux";
import { updateCurrentPhotoIdx } from "../../store";
import bubble from "../../assets/bubble.png";

class Bubble extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      rotationZ: 0,
      translateX: 0,
      scaleX: 1,
      scaleY: 1
    };
    this.handleMove=this.handleMove.bind(this)
  }
  handleMove()
  render() {
    console.log("in bubble", this.state);
    return (
      <View style={styles.container} >
        <ImageBackground
          source={require("../../assets/bubble1.png")}
          style={{ ...styles.bubble, height: this.props.height }}
        >
          <TextInput
            style={{ ...styles.text, top: this.props.height / 5 }}
            multiline
            numberOfLines={2}
            editable
            onChangeText={text => this.setState({ ...this.state, text: text })}
            value={this.state.text}
          ></TextInput>
        </ImageBackground>
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
  console.log("OWN PROPS IN BUBBLE", ownProps);
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
