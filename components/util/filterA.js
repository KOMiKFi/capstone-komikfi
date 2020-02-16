/* eslint-disable prettier/prettier */
import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { connect } from "react-redux";
import GLImage from "gl-react-image";
import { updateCurrentPhotoIdx } from "../../store";
import { Shaders, Node, GLSL } from "gl-react";
import { Surface } from "gl-react-expo";

const shaders = Shaders.create({
  Saturate: {
    frag: GLSL`
  precision highp float;
  varying vec2 uv;
  uniform sampler2D t;
  uniform float contrast, saturation, brightness;
  const vec3 L = vec3(0.2125, 0.7154, 0.0721);
  void main() {
  vec4 c = texture2D(t, uv);
  vec3 brt = c.rgb * brightness;
  gl_FragColor = vec4(mix(vec3(0.5), mix(vec3(dot(brt, L)), brt, saturation), contrast), c.a);
  }`
  }
});

const Saturate = ({ contrast, saturation, brightness, children }) => (
  <Node
    shader={shaders.Saturate}
    uniforms={{ contrast, saturation, brightness, t: children }}
  />
);

class Example extends Component {
  render() {
    return (
      <Surface style={{ width: "100%", height: "100%" }}>
        <Saturate resizeMode="contain" {...this.props}>
          <GLImage
            style={{
              height: this.props.height - 10,
              width: this.props.width - 10
            }}
            source={{ uri: this.props.currentPhoto.image.uri }}
          />
          {/* {{ uri: this.props.currentPhoto.image.uri }} */}
        </Saturate>
      </Surface>
    );
  }
  static defaultProps = {
    contrast: 2,
    saturation: 5,
    brightness: 2
  };
}
const styles = StyleSheet.create({
  singlePhoto: {
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

export default connect(mapStateToProps)(Example);
