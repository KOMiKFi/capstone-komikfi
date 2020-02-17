/* eslint-disable prettier/prettier */
import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { connect } from "react-redux";
import { Shaders, Uniform, Node, GLSL } from "gl-react";
import GLImage from "gl-react-image";
import { Surface } from "gl-react-expo";
import colorScales from "./colorScales";

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
  },
  colorify: {
    frag: GLSL`
  precision highp float;
  varying vec2 uv;

  uniform sampler2D children, colorScale;
  float greyscale (vec3 c) { return 0.2125 * c.r + 0.7154 * c.g + 0.0721 * c.b; }
  float greyscale2 (vec3 c) { return c.b; }

  void main() {
    vec4 original = texture2D(children, uv);
    vec4 newcolor = texture2D(colorScale, vec2(greyscale(original.rgb), 0.5));


    gl_FragColor = vec4(newcolor.rgb, original.a * newcolor.a);
    gl_FragColor = vec4(vec3(greyscale(original.rgb)), 1.0);


  }
  `
  }
});

const Saturate = ({ contrast, saturation, brightness, children }) => (
  <Node
    shader={shaders.Saturate}
    uniforms={{ contrast, saturation, brightness, t: children }}
  />
);
export const Colorify = ({ children, colorScale, interpolation }) => (
  <Node
    shader={shaders.colorify}
    uniformsOptions={{ colorScale: { interpolation } }}
    uniforms={{
      colorScale,
      children
    }}
  />
);

class Example extends Component {
  render() {
    return (
      <Surface style={styles.surface}>
        {/* <Saturate resizeMode="contain" {...this.props}> */}
        <Colorify {...this.props}>
          <GLImage source={{ uri: this.props.currentPhoto.image.uri }} />
        </Colorify>
        {/* </Saturate> */}
      </Surface>
    );
  }
  static defaultProps = {
    contrast: 1,
    saturation: -10,
    brightness: 1,
    interpolation: "nearest",
    colorScale: colorScales[Object.keys(colorScales)[8]]
  };
}
const styles = StyleSheet.create({
  surface: {
    height: "100%",
    width: "100%"
  }
});
const mapStateToProps = (state, ownProps) => {
  return {
    currentPhoto: state.photos[ownProps.photoIdx]
  };
};

export default connect(mapStateToProps)(Example);
