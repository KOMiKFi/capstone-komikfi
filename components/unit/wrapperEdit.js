/* eslint-disable prettier/prettier */
import React from "react";
import { StyleSheet, View, Image, ScrollView } from "react-native";
import { connect } from "react-redux";
import { updateCurrentPhotoIdx } from "../../store";
import SinglePhoto from "./singlePhoto";

class EditWrapper extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <ScrollView
        style={{ ...styles.singlePhoto, height: 1000 }}
        scrollEnabled={false}
      >
        <SinglePhoto photoIdx={this.props.photoIdx} />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  singlePhoto: {
    borderColor: "#658d9e",
    borderWidth: 12
  }
});

const mapStateToProps = (state, ownProps) => {
  return {
    currentPhoto: state.photos[ownProps.photoIdx],
    layout: state.layout.size,
    height: state.layout.height,
    width: state.layout.width,
    filter: state.photos[ownProps.photoIdx].filter,
    filterSelected: state.photos[ownProps.photoIdx].filter.some(element => {
      return element === true;
    })
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    backToEdit: async () => {
      await dispatch(updateCurrentPhotoIdx(ownProps.photoIdx));
      ownProps.navigation.push("Edit");
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditWrapper);
