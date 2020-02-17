import React from "react";
import { StyleSheet, View, TouchableOpacity, Image } from "react-native";
import { connect } from "react-redux";
import { addBubble } from "../../store";
import bubble1 from "../../assets/bubble1.png";
import bubble2 from "../../assets/bubble2.png";
import bubble3 from "../../assets/bubble3.png";

class BubbleNav extends React.Component {
  render() {
    return (
      <View style={styles.iconContainer}>
        <TouchableOpacity
          onPress={() => this.props.addBubble(this.props.currentPhotoIdx, 1)}
        >
          <Image source={bubble1} style={styles.navIcon} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => this.props.addBubble(this.props.currentPhotoIdx, 2)}
        >
          <Image source={bubble2} style={styles.navIcon} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => this.props.addBubble(this.props.currentPhotoIdx, 3)}
        >
          <Image source={bubble3} style={styles.navIcon} />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  iconContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center"
  },
  navIcon: {
    width: 50,
    height: 50
  }
});

const mapStateToProps = state => {
  return {
    currentPhotoIdx: state.currentPhotoIdx
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addBubble: (idx, shape) => {
      dispatch(addBubble(idx, shape));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BubbleNav);
