/* eslint-disable prettier/prettier */
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
import { getPhotoFromLibrary, addBubble } from "../store";
import bubble from "../assets/bubble.png";
import SinglePhoto from './unit/singlePhoto'

class Edit extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.confirm}></View>
        <SinglePhoto
          photoIdx={this.props.currentPhotoIdx}
          navigation={this.props.navigation}
        />
        <View style={styles.filterPlaceHolder}></View>
        <View style={styles.nav}>
          <TouchableOpacity
            style={styles.textContainer}
            onPress={() =>
              this.props.getPhotoFromLibrary(this.props.currentPhotoIdx)
            }
          >
            <Text style={styles.text}>Library</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.textContainer}>
            <Text style={styles.text}>Filter</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.textContainer}
            onPress={() => this.props.addBubble(this.props.currentPhotoIdx)}
          >
            <Text style={styles.text}>Bubble</Text>
          </TouchableOpacity>
      </View>
    </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10
  },
  confirm: {
    flex: 0.8
  },

  imageContainer: {
    borderColor: "red",
    borderWidth: 5,
    width: "100%",
    height: "100%",
    flex: 5, //in veritcal
    flexDirection: "row" //defining for the image so it wouldn't go beyond the width
  },
  image: {
    flex: 1,
    //same as the layout component
    height: "100%"
  },
  filterPlaceHolder: {
    flex: 2
  },
  nav: {
    flex: 1,
    borderColor: "black",
    borderWidth: 5,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "flex-end"
  },
  textContainer: {
    margin: 5,
    flex: 1,
    // borderColor: "green",
    // borderWidth: 5,
    fontSize: 20,
    justifyContent: "center"
  },
  text: {
    fontSize: 20,
    alignSelf: "center"
  },
  bubble: {
    height: 300,
    width: 300,
    position: "absolute"
  }
});

const mapStateToProps = (state) => {
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
    addBubble: idx => {
      dispatch(addBubble(idx));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Edit);
