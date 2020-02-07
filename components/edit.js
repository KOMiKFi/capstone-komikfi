/* eslint-disable prettier/prettier */
import React from "react";
import { StyleSheet, View, Text, ImageBackgsdround } from "react-native";
import { connect } from "react-redux";
import { getPhotoFromLibrary, addBubble } from "../store";
import SinglePhoto from "./unit/singlePhotoForEdit";
import EditNav from "./unit/editNav";

class Edit extends React.Component {
  render() {
    let imageStyle = this.props.layout === 1 ? styles.editContainerOne : styles.editContainer
    return (
      <View style={styles.container}>
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
    backgroundColor: '#dfe3e6',
  },
  editContainer: {
    marginTop: 50, 
    flex: 1,
    justifyContent: 'center'
  },
  editContainerOne: {
    flex: 1
  },
  nav: {
  justifyContent: "flex-end",
  flex: 0.3
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
