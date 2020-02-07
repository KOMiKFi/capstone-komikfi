/* eslint-disable prettier/prettier */
import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ImageBackground
} from "react-native";
import { connect } from "react-redux";
import { getPhotoFromLibrary, addBubble } from "../store";
import SinglePhoto from "./unit/singlePhotoForEdit";
import EditNav from "./unit/editNav";

class Edit extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.textContainer}> 
        <Text>Edit</Text>
        </View>
        <View style={styles.editContainer}>
          <SinglePhoto
            photoIdx={this.props.currentPhotoIdx}
            navigation={this.props.navigation}
          />
        </View>
        <View style={styles.nav}>
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
    paddingHorizontal: 10
  },
  editContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  nav: {
    justifyContent: "flex-end",
    flex: 0.3
  },
  textContainer: {
    flex: 0.1,
    fontSize: 20,
    justifyContent: "center"
  },
  text: {
    fontSize: 20,
    alignSelf: "center"
  },

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
    addBubble: idx => {
      dispatch(addBubble(idx));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Edit);
