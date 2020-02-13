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
import {
  getPhotoFromLibrary,
  addBubble,
  addFilter,
  deleteFilter
} from "../../store";
import bubble1 from "../../assets/bubble1.png";
import bubble2 from "../../assets/bubble2.png";
import bubble3 from "../../assets/bubble3.png";

class EditNav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bubbleMenuOn: false,
      filterOn: false
    };
    this.toggleBubbleMenu = this.toggleBubbleMenu.bind(this);
    this.toggleFilter = this.toggleFilter.bind(this);
  }

  toggleBubbleMenu() {
    this.setState({ ...this.state, bubbleMenuOn: !this.state.bubbleMenuOn });
  }

  toggleFilter() {
    if (!this.state.filterOn) {
      this.props.addFilter(this.props.currentPhotoIdx);
    } else {
      this.props.deleteFilter(this.props.currentPhotoIdx);
    }
    this.setState({ ...this.state, filterOn: !this.state.filterOn });
  }

  render() {
    console.log("editnavstate", this.state);
    return (
      <View>
        <View style={styles.navBubble}>
          {this.state.bubbleMenuOn && (
            <View style={styles.iconContainer}>
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
        </View>
        <View style={styles.navMain}>
          <TouchableOpacity
            style={styles.textContainer}
            onPress={() =>
              this.props.getPhotoFromLibrary(this.props.currentPhotoIdx)
            }
          >
            <Text style={styles.text}>Library</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.textContainer}
            onPress={this.toggleFilter}
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
  iconContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center"
  },
  navMain: {
    width: "100%",
    height: "50%",
    borderColor: "#658d9e",
    borderTopWidth: 5,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center"
  },
  navBubble: {
    width: "100%",
    height: "50%"
  },
  navIcon: {
    width: 50,
    height: 50
  },
  text: {
    fontSize: 20,
    alignSelf: "center",
    fontFamily: "Noteworthy-Light",
    color: "#e88010"
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
    },
    addFilter: idx => {
      dispatch(addFilter(idx));
    },
    deleteFilter: idx => {
      dispatch(deleteFilter(idx));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditNav);
