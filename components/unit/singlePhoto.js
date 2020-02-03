/* eslint-disable prettier/prettier */
import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  ImageBackground
} from "react-native";
import { connect } from "react-redux";
import { updateCurrentPhotoIdx } from "../../store";
import bubble from "../../assets/bubble.png";

class SinglePhoto extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    console.log("STATE IN SinglePhoto", this.props.currentPhoto);

    return (
      // <View style={styles.container}>
      <TouchableOpacity
        style={styles.singlePhoto}
        onPress={() => this.props.backToEdit(key)}
      >
        <ImageBackground
          key={key}
          source={{ uri: this.props.currentPhoto.image.uri }}
          style={styles.pictureFrame1}
        >
          <View>
            {this.props.currentPhoto.bubble.uri ? (
              <Image source={bubble} style={styles.bubble} />
            ) : null}
          </View>
        </ImageBackground>
      </TouchableOpacity>
      // </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderColor: "black",
    borderWidth: 5,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 40,
    paddingHorizontal: 10
  },
  imageContainer: {
    borderColor: "black",
    borderWidth: 5,
    width: 400,
    flex: 5, //in veritcal
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
    //defining for the image so it wouldn't go beyond the width
  },
  singlePhoto: {
    flexDirection: "row",
    width: 400,
    height: 300,
    borderColor: "green",
    borderWidth: 5,
    alignItems: "flex-start",
    justifyContent: "space-around",
    marginHorizontal: 10,
    position: "relative"
  },
  bubble: {
    height: 200,
    width: 200,
    position: "absolute",
    alignSelf: "center"
  }
});

const mapStateToProps = (state, ownProps) => {
  return {
    currentPhoto: state.photos(ownProps.key)
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    backToEdit: async () => {
      await dispatch(updateCurrentPhotoIdx(ownProps.key));
      ownProps.navigation.navigate("Edit");
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SinglePhoto);
