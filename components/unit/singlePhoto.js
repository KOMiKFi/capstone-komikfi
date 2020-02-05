/* eslint-disable prettier/prettier */
import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  ImageBackground,
  Dimensions
} from "react-native";
import { connect } from "react-redux";
import { updateCurrentPhotoIdx } from "../../store";
import bubble from "../../assets/bubble.png";

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
        <ImageBackground
          source={{ uri: this.props.currentPhoto.image.uri }}
          style={this.props.layout === 1 ? styles.imageBackground1 : styles.imageBackground2}
        >
          <View>
            {this.props.currentPhoto.bubble.uri ? (
              <Image source={bubble} style={styles.bubble} />
            ) : null}
          </View>
        </ImageBackground>
      </TouchableOpacity >
    );
  }
}

const dimensions = Dimensions.get('screen');
const imageHeight = dimensions.height-190
const imageHeight2 = dimensions.height-200
const imageWidth = dimensions.width-20
console.log('***HEIGHT',imageHeight)
console.log('***WIDTH',imageWidth)


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
  imageBackground1: {
    width: imageWidth,
    height: imageHeight,
    alignItems: "center",
    justifyContent: 'center',
  },
  imageBackground2: {
    width: imageWidth,
    height: imageHeight2/2,
    alignItems: "center",
    justifyContent: 'center',
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
    currentPhoto: state.photos[ownProps.photoIdx],
    layout: state.layout
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    backToEdit: async () => {
      await dispatch(updateCurrentPhotoIdx(ownProps.photoIdx));
      ownProps.navigation.navigate("Edit");
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SinglePhoto);
