/* eslint-disable prettier/prettier */
import React from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ImageBackground,
  Image
} from "react-native";
import { connect } from "react-redux";
import { updateCurrentPhotoIdx } from "../../store";
import Bubble from "./bubbleForLayout";
import Filter from "./filter";

class SinglePhoto extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <TouchableOpacity
        style={styles.singlePhoto}
        onPress={() => this.props.backToEdit(this.props.photoIdx)}
      >
        <View
          style={{
            height: this.props.height - 10,
            width: this.props.width - 10,
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          {this.props.filter ? (
            <Filter photoIdx={this.props.photoIdx} />
          ) : (
            <Image
              style={{ width: "100%", height: "100%" }}
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
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  singlePhoto: {
    borderColor: "#658d9e",
    borderWidth: 5,
    overflow: "hidden"
  },
  bubbleWrapper: {
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
    filter: state.photos[ownProps.photoIdx].filter
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

export default connect(mapStateToProps, mapDispatchToProps)(SinglePhoto);
