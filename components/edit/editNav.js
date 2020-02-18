import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { getPhotoFromLibrary } from "../../store";
import FilterNav from "./filterNav";
import BubbleNav from "./bubbleNav";

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
    this.setState({
      ...this.state,
      bubbleMenuOn: !this.state.bubbleMenuOn,
      filterMenuOn: false
    });
  }

  toggleFilterMenu() {
    this.setState({
      ...this.state,
      filterMenuOn: !this.state.filterMenuOn,
      bubbleMenuOn: false
    });
  }

  render() {
    return (
      <View>
        <View style={styles.navPopup}>
          {this.state.bubbleMenuOn && <BubbleNav />}
          {this.state.filterMenuOn && <FilterNav />}
        </View>

        <View style={styles.navMain}>
          <TouchableOpacity
            onPress={() =>
              this.props.getPhotoFromLibrary(this.props.currentPhotoIdx)
            }
          >
            <Text style={styles.text}>Library</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={this.toggleFilterMenu}>
            <Text style={styles.text}>Filter</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => this.toggleBubbleMenu()}>
            <Text style={styles.text}>Bubble</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  navMain: {
    width: "100%",
    height: "50%",
    borderColor: "#658d9e",
    borderTopWidth: 5,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center"
  },
  navPopup: {
    width: "100%",
    height: "50%"
  },
  text: {
    fontSize: 20,
    alignSelf: "center",
    fontFamily: "Noteworthy",
    color: "#e88010"
  }
});

const mapStateToProps = state => {
  return {
    currentPhotoIdx: state.currentPhotoIdx
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getPhotoFromLibrary: idx => {
      dispatch(getPhotoFromLibrary(idx));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditNav);
