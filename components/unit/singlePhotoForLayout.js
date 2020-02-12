/* eslint-disable prettier/prettier */
import React from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ImageBackground
} from "react-native";
import { connect } from "react-redux";
import { updateCurrentPhotoIdx } from "../../store";
import Bubble from "./bubbleForLayout";
// import { FilterImage } from 'expo-pixi';
// // import * as PIXI from 'pixi.js'
import Expo from 'expo';
import { FilterImage } from 'expo-pixi';
import { GLView } from 'expo-gl'
// import bubble1 from '../../assets/bubble1.png'




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

        {/* <FilterImage
          source={this.props.currentPhoto.image.uri}
          resizeMode="cover"
          filters={new PIXI.filters.DotFilter(0.5)}
        /> */}

        {/* 
        <GLView
          style={{ flex: 1, height: this.props.height - 10, width: this.props.width - 10 }}
          onContextCreate={async context => {
            const app = new PIXI.Application({ context });
            const sprite = await PIXI.sprite.from(bubble1)
            // filter({
            //   filters: [DotFilter(0.5)],
            //   uri: this.props.currentPhoto.image.uri
            // }
            // )
            app.stage.addChild(sprite);
            console.log('*******', sprite)
          }}
        /> */}

        {/* <FilterImage
          source={{ uri: this.props.currentPhoto.image.uri }}
          // resizeMode="cover"
          // filters={new PIXI.filters.DotFilter(0.5)}
          // style={{
          //   height: this.props.height - 10,
          //   width: this.props.width - 10,
          // }}
        > */}
        <ImageBackground
        source={{ uri: this.props.currentPhoto.image.uri }}
          style={{
            height: this.props.height - 10,
            width: this.props.width - 10,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
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
        </ImageBackground>
      </TouchableOpacity >
    );
  }
}

const styles = StyleSheet.create({
  singlePhoto: {
    borderColor: "#658d9e",
    borderWidth: 5,
    overflow: 'hidden'
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
    width: state.layout.width
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
