import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  ImageBackground
} from "react-native";
import { connect } from "react-redux";
import { getPhotoFromLibrary, addBubble } from "../../store";
import bubble1 from "../../assets/bubble1.png";
import bubble2 from "../../assets/bubble2.png";
import bubble3 from "../../assets/bubble3.png";

class EditNav extends React.Component {
  constructor() {
    super();
    this.state = {
      bubbleMenuOn: false
    };
    this.toggleBubbleMenu = this.toggleBubbleMenu.bind(this);
  }

  toggleBubbleMenu() {
    this.setState({ bubbleMenuOn: !this.state.bubbleMenuOn });
  }

  render() {
    return (
      <View>
        {this.state.bubbleMenuOn && (
          <View style={styles.navBubble}>
            <TouchableOpacity
              onPress={() =>
                this.props.addBubble(this.props.currentPhotoIdx, 1)
              }
            >
              <Image source={bubble1} style={styles.navIcon} />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() =>
                this.props.addBubble(this.props.currentPhotoIdx, 2)
              }
            >
              <Image source={bubble2} style={styles.navIcon} />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() =>
                this.props.addBubble(this.props.currentPhotoIdx, 3)
              }
            >
              <Image source={bubble3} style={styles.navIcon} />
            </TouchableOpacity>
          </View>
        )}
        <View style={styles.navMain}>
          <TouchableOpacity
            style={styles.textContainer}
            onPress={() =>
              this.props.getPhotoFromLibrary(this.props.currentPhotoIdx)
            }
          >
            <Text style={styles.text}>Image</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.textContainer}
            onPress={() => alert("Coming Soon!")}
          >
            <Text style={styles.text}>Filter</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.textContainer}
            onPress={() => this.toggleBubbleMenu()}
          >
            <Text style={styles.text}>Bubble</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  navContainer: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center"
  },
  navMain: {
    flex: 0,
    width: "100%",
    borderColor: "black",
    borderWidth: 5,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center"
  },
  navBubble: {
    flex: 0,
    width: "100%",
    height: "30%",
    borderColor: "black",
    borderWidth: 5,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "flex-end"
  },
  navIcon: {
    width: 50,
    height: 50
  },
  icomContainer: {
    margin: 5,
    flex: 1,
    width: "30%",
    // borderColor: "green",
    // borderWidth: 5,
    // fontSize: 20,
    justifyContent: "center"
  },
  text: {
    fontSize: 20,
    alignSelf: "center"
  }
});

const mapStateToProps = state => {
  return {
    currentPhotoIdx: state.currentPhotoIdx,
    currentPhoto: state.photos[state.currentPhotoIdx]
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getPhotoFromLibrary: idx => {
      dispatch(getPhotoFromLibrary(idx));
    },
    addBubble: (idx, shape) => {
      dispatch(addBubble(idx, shape));
      // console.log("Dispatched addBubble", shape)
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditNav);
