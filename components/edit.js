/* eslint-disable prettier/prettier */
import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { getPhotoFromLibrary, addBubble } from "../store";
import SinglePhoto from "./unit/singlePhotoForEdit";
import EditNav from "./unit/editNav";

class Edit extends React.Component {
  render() {
    let imageStyle =
      this.props.layout === 1 ? styles.editContainerOne : styles.editContainer;
    return (
      <View style={styles.container}>
        <View style={styles.text}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Preview')}>
            <Text style={styles.done1}>Done</Text>
          </TouchableOpacity>
          <Text style={styles.edit}>Edit Photo</Text>
          <Text style={styles.done2}>Done</Text>
        </View>
        <View style={imageStyle}>
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
  nav: {
    justifyContent: "flex-end",
    flex: 0.3
  },
  text: {
    height: 90,
    width: '100%',
    justifyContent: 'space-around',
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  edit: {
    fontFamily: "Noteworthy",
    fontSize: 30,
    color: "#658d9e",
  },
  done1: {
    fontFamily: "Noteworthy",
    fontSize: 25,
    color: "#e88010",
  },
  done2: {
    fontFamily: "Noteworthy",
    fontSize: 25,
    color: '#dfe3e6'
  }
});

const mapStateToProps = state => {
  return {
    currentPhotoIdx: state.currentPhotoIdx,
    currentPhoto: state.photos[state.currentPhotoIdx],
    layout: state.layout.size
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
