/* eslint-disable prettier/prettier */
import React from "react";
import { StyleSheet, View } from "react-native";
import { connect } from "react-redux";
import BubbleForEdit from "../bubbles/bubbleForEdit";
import BubbleForLayout from "../bubbles/bubbleForLayout";

import FilterWrapper from "./filterWrapper";

class SinglePhoto extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View
        style={{
          height: this.props.height - 10,
          width: this.props.width - 10,
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <FilterWrapper photoIdx={this.props.photoIdx} />

        <View style={styles.bubbleWrapper}>
          {this.props.currentPhoto.bubbles[0]
            ? this.props.currentPhoto.bubbles.map((bubble, idx) => {
                return this.props.currentView === "edit" ? (
                  <BubbleForEdit
                    key={idx}
                    photoIdx={this.props.photoIdx}
                    {...bubble}
                    bubbleIdx={idx}
                  />
                ) : (
                  <BubbleForLayout
                    key={idx}
                    photoIdx={this.props.photoIdx}
                    {...bubble}
                    bubbleIdx={idx}
                  />
                );
              })
            : null}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  bubbleWrapper: {
    borderColor: "#658d9e",
    position: "absolute",
    height: "100%",
    width: "100%"
  }
});

const mapStateToProps = (state, ownProps) => {
  return {
    currentPhoto: state.photos[ownProps.photoIdx],
    height: state.layout.height,
    width: state.layout.width,
    filter: state.photos[ownProps.photoIdx].filter,
    filterSelected: state.photos[ownProps.photoIdx].filter.some(element => {
      return element === true;
    })
  };
};

export default connect(mapStateToProps)(SinglePhoto);
