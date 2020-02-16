/* eslint-disable prettier/prettier */
import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { getPhotoFromLibrary, addBubble } from "../store";
import SinglePhoto from "./unit/wrapperEdit";
import EditNav from "./unit/editNav";

class Edit extends React.Component {
  render() {
    let imageStyle =
      this.props.layout === 1 ? styles.editContainerOne : styles.editContainer;
    return (
      <View style={styles.container}>
        <View style={styles.topNav}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("Preview")}
          >
            <Text style={styles.topNavLeft}>Done</Text>
          </TouchableOpacity>
          <Text style={styles.topNavCenter}>Edit Photo</Text>
          <Text style={styles.topNavRight}>Done</Text>
        </View>
        <View style={imageStyle}>
          <SinglePhoto
            photoIdx={this.props.currentPhotoIdx}
            navigation={this.props.navigation}
          />
        </View>
        <View style={styles.bottomNav}>
          <EditNav />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#dfe3e6"
  },
  editContainer: {
    marginTop: 50,
    flex: 1,
    justifyContent: "center"
  },
  editContainerOne: {
    flex: 1
  },
  singlePhoto: {
    borderColor: "#658d9e",
    borderWidth: 20
  },
  bottomNav: {
    justifyContent: "flex-end",
    flex: 0.3
  },
  topNav: {
    height: 90,
    width: "100%",
    justifyContent: "space-around",
    flexDirection: "row",
    alignItems: "flex-end"
  },
  topNavCenter: {
    fontFamily: "Noteworthy-Light",
    fontSize: 30,
    color: "#658d9e"
  },
  topNavLeft: {
    fontFamily: "Noteworthy",
    fontSize: 25,
    color: "#e88010"
  },
  topNavRight: {
    fontFamily: "Noteworthy",
    fontSize: 25,
    color: "#dfe3e6"
  }
});

const mapStateToProps = state => {
  return {
    currentPhotoIdx: state.currentPhotoIdx,
    currentPhoto: state.photos[state.currentPhotoIdx],
    layout: state.layout.size,
    height: state.layout.height,
    width: state.layout.width
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getPhotoFromLibrary: idx => {
      dispatch(getPhotoFromLibrary(idx));
    },
    addBubble: idx => {
      dispatch(addBubble(idx));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Edit);
