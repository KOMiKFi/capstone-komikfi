import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import { connect } from "react-redux";
import {
  getPhotoFromLibrary,
  addBubble,
  addFilter,
  deleteFilter
} from "../../store";
import FilterNav from "./filterNav"
import BubbleNav from "./bubbleNav"

class EditNav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bubbleMenuOn: false,
      filterMenuOn: false
    };
    this.toggleBubbleMenu = this.toggleBubbleMenu.bind(this);
    this.toggleFilterMenu = this.toggleFilterMenu.bind(this);
  }

  toggleBubbleMenu() {
    this.setState({ ...this.state, bubbleMenuOn: !this.state.bubbleMenuOn });
  }

  toggleFilterMenu() {
    this.setState({ ...this.state, filterMenuOn: !this.state.filterMenuOn });
  }

  render() {
    return (
      <View>

        <View style={styles.navBubble}>
          {this.state.bubbleMenuOn && (
              <BubbleNav />
          )}
        </View>

        <View style={styles.navBubble}>
          {this.state.filterMenuOn && (
              <FilterNav />
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
            onPress={this.toggleFilterMenu}
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
    height: "30%",
    borderColor: "#658d9e",
    borderTopWidth: 5,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center"
  },
  navBubble: {
    width: "100%",
    height: "30%"
  },
  navFilter: {
    width: "100%",
    height: "30%"
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
