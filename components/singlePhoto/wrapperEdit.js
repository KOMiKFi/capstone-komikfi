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
      <View style={{ height: this.props.height - 10 }}>
        <ScrollView style={styles.singlePhoto} scrollEnabled={false}>
          <SinglePhoto photoIdx={this.props.photoIdx} currentView="edit" />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  singlePhoto: {
    borderColor: "#658d9e",
    borderWidth: 10
  }
});

const mapStateToProps = (state, ownProps) => {
  return {
    height: state.layout.height
  };
};

export default connect(mapStateToProps, null)(EditWrapper);
