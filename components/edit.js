/* eslint-disable prettier/prettier */
import React from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import { connect } from "react-redux";

class Edit extends React.Component {
  render() {
    console.log(this.props);
    return (
      <View>
        <View style={styles.nav}>
          <Text>Prev</Text>
          <Text>Next</Text>
        </View>
        <Image
          style={styles.image}
          source={{ uri: this.props.photos[0].image.uri }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 40,
    paddingHorizontal: 10
  },
  nav: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between"
  },

  image: {
    width: 400,
    height: 300,
    borderColor: "black",
    borderTopWidth: 5,
    borderLeftWidth: 5,
    borderRightWidth: 5,
    alignItems: "center",
    justifyContent: "space-around",
    marginHorizontal: 10
  }
});

const mapStateToProps = state => {
  return {
    photos: state.photos
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getPhotoFromLibrary: () => {
      dispatch(getPhotoFromLibrary());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Edit);
