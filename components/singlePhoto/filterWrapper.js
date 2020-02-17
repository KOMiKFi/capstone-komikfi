/* eslint-disable prettier/prettier */
import React from "react";
import { StyleSheet, View, Image } from "react-native";
import { connect } from "react-redux";
import { FilterA, FilterB, FilterC } from "../filter/index";

class FilterWrapper extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={styles.main}>
        {this.props.filter[2] && <FilterC photoIdx={this.props.photoIdx} />}
        {this.props.filter[0] && <FilterA photoIdx={this.props.photoIdx} />}
        {this.props.filter[1] && <FilterB photoIdx={this.props.photoIdx} />}
        {!this.props.filterSelected && (
          <Image
            style={styles.image}
            source={{ uri: this.props.currentPhoto.image.uri }}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main: {
    height: "100%",
    width: "100%"
  },
  image: {
    height: "100%",
    width: "100%"
  }
});

const mapStateToProps = (state, ownProps) => {
  return {
    currentPhoto: state.photos[ownProps.photoIdx],
    filter: state.photos[ownProps.photoIdx].filter,
    filterSelected: state.photos[ownProps.photoIdx].filter.some(element => {
      return element === true;
    })
  };
};

export default connect(mapStateToProps)(FilterWrapper);
