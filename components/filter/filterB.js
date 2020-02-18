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

  comicfy: {
    frag: GLSL`
precision highp float;
varying vec2 uv;
uniform sampler2D children;
void main () {
  vec3 childrenC = texture2D(children, uv).rgb;
  gl_FragColor = vec4(
    childrenC * mix(step(0.5, childrenC.r), 0.1, 0.2),
    1.0
  );
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
export const Comicfy = ({ children, colorScale, interpolation }) => (
  <Node
    shader={shaders.comicfy}
    uniformsOptions={{ colorScale: { interpolation } }}
    uniforms={{
      children
    }}
  />
);

class Example extends Component {
  render() {
    return (
      <Surface style={styles.surface}>
        <Saturate {...this.props}>
          <Comicfy {...this.props}>
            <GLImage source={{ uri: this.props.currentPhoto.image.uri }} />
            {/* {{ uri: this.props.currentPhoto.image.uri }} */}
          </Comicfy>
        </Saturate>
      </Surface>
    );
  }
  static defaultProps = {
    contrast: 1,
    saturation: 1,
    brightness: 1,
    interpolation: "linear",
    colorScale: colorScales[Object.keys(colorScales)[1]]
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
