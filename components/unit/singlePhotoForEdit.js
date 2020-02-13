/* eslint-disable prettier/prettier */
import React from "react";
import {
  StyleSheet,
  View,
  Image,
  ImageBackground,
  ScrollView
} from "react-native";
import { connect } from "react-redux";
import { updateCurrentPhotoIdx } from "../../store";
import Bubble from "./bubbleForEdit";
import { FilterA, FilterB, FilterC } from "../util/index";

class SinglePhoto extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    console.log(this.props.filter)
    return (
      <View style={{ height: this.props.height - 10 }}>
        <ScrollView
          style={styles.singlePhoto}
          scrollEnabled={false}
          onPress={() => this.props.backToEdit(this.props.photoIdx)}
        >
          <View
            //these are original imageBackground css
            style={{
              height: this.props.height - 10,
              width: this.props.width - 10,
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            {/*turnary*/}
            {this.props.filter ? (
              <FilterC photoIdx={this.props.photoIdx} />
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
        </ScrollView>
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
    borderWidth: 5,
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
