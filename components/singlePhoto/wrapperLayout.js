/* eslint-disable prettier/prettier */
import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { updateCurrentPhotoIdx } from "../../store";
import SinglePhoto from "./singlePhoto";

class LayoutWrapper extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <TouchableOpacity
        style={styles.singlePhoto}
        onPress={() => this.props.backToEdit(this.props.photoIdx)}
      >
        <SinglePhoto photoIdx={this.props.photoIdx} />
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  singlePhoto: {
    borderColor: "#658d9e",
    borderWidth: 5,
    overflow: "hidden"
  }
});

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    backToEdit: async () => {
      await dispatch(updateCurrentPhotoIdx(ownProps.photoIdx));
      ownProps.navigation.push("Edit");
    }
  };
};

export default connect(null, mapDispatchToProps)(LayoutWrapper);
