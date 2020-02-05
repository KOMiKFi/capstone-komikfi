/* eslint-disable prettier/prettier */
import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
} from "react-native";
import { connect } from "react-redux";
import { updateCurrentPhotoIdx } from "../../store";
import bubble from "../../assets/bubble.png";


class SinglePhoto extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    let componentSize = this.props.componentSize
    return (
      <TouchableOpacity
        style={styles.singlePhoto}
        onPress={() => this.props.backToEdit(this.props.photoIdx)}
      >
        <ImageBackground
          source={{ uri: this.props.currentPhoto.image.uri }}
          style={this.props.layout !== 4 ? {height: componentSize -10,
            width: imageWidth,
            alignItems: "center",
            justifyContent: 'center'} : {height: componentSize -10,
              width: imageWidth /2 - 5,
              alignItems: "center",
              justifyContent: 'center'}}
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

const imageWidth = Dimensions.get('screen').width - 20



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
    // flex: 1,
    width: imageWidth,
    // height: 1,
    alignItems: "center",
    justifyContent: 'center',
  },
  imageBackground2: {
    width: imageWidth,
    height: 1,
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
    layout: state.layout,
    componentSize: ownProps.componentSize
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
