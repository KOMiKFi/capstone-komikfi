/* eslint-disable prettier/prettier */
import React from "react";
import { StyleSheet, View, Image } from "react-native";
import { connect } from "react-redux";
import Bubble from "./bubbleForEdit";
import { FilterA, FilterB, FilterC } from "../util/index";

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
          // transform: [{ translateX: 100 }, { translateY: 100 }, { scale: 2 }]
        }}
      >
        {this.props.filter[2] && <FilterC photoIdx={this.props.photoIdx} />}
        {this.props.filter[0] && <FilterA photoIdx={this.props.photoIdx} />}
        {this.props.filter[1] && <FilterB photoIdx={this.props.photoIdx} />}
        {!this.props.filterSelected && (
          <Image
            style={{
              width: "100%",
              height: "100%"
            }}
            source={{ uri: this.props.currentPhoto.image.uri }}
          />
        )}

        <View style={styles.bubbleWrapper}>
          {this.props.currentPhoto.bubbles[0]
            ? this.props.currentPhoto.bubbles.map((bubble, idx) => {
                return (
                  <Bubble
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
  singlePhoto: {
    borderColor: "#658d9e",
    borderWidth: 5
  },
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
    layout: state.layout.size,
    height: state.layout.height,
    width: state.layout.width,
    filter: state.photos[ownProps.photoIdx].filter,
    filterSelected: state.photos[ownProps.photoIdx].filter.some(element => {
      return element === true;
    })
  };
};

export default connect(mapStateToProps)(SinglePhoto);
