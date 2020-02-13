/* eslint-disable prettier/prettier */
import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { connect } from "react-redux";
import { Shaders, Uniform, Node, GLSL } from "gl-react";
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
  //   colorify: {
  //     frag: GLSL`
  // precision highp float;
  // varying vec2 uv;
  // uniform sampler2D children, colorScale;
  // float greyscale (vec3 c) { return 0.2125 * c.r + 0.7154 * c.g + 0.0721 * c.b; }
  // void main() {
  //   vec4 original = texture2D(children, uv);
  //   vec4 newcolor = texture2D(colorScale, vec2(greyscale(original.rgb), 1));
  //   gl_FragColor = vec4(newcolor.rgb, original.a * newcolor.a);
  // }
  // `
  //   }
  colorify: {
    frag: GLSL`
precision highp float;
varying vec2 uv;
uniform sampler2D colorScale, children;
uniform float childrenRatio;
void main () {
vec2 aspect = vec2(max(1.0, 0.6/childrenRatio), max(1.0, childrenRatio));
vec2 p = uv * aspect + (1.0 - aspect) / 2.0;
if (0.0>p.x||1.0<p.x||0.0>p.y||1.0<p.y) {
  gl_FragColor = vec4(0.0);
}
else {
  vec3 childrenC = texture2D(children, p).rgb;
  gl_FragColor = vec4(
    vec3(1.0) * texture2D(colorScale, p).r +
    childrenC * mix(step(0.5, childrenC.r), 0.1, 0.2),
  1.0);
}
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
      children,
      childrenRatio: Uniform.textureSizeRatio(children)
    }}
  />
);

class Example extends Component {
  render() {
    return (
      <Surface style={styles.singlePhoto}>
        <Saturate resizeMode="contain" {...this.props}>
          <Colorify {...this.props}>
            {{ uri: this.props.currentPhoto.image.uri }}
          </Colorify>
        </Saturate>
      </Surface>
    );
  }
  static defaultProps = {
    contrast: 1,
    saturation: 2,
    brightness: 1,
    interpolation: "linear",
    colorScale: colorScales[Object.keys(colorScales)[1]]
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
