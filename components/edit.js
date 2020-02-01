/* eslint-disable prettier/prettier */
import React from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import { connect } from "react-redux";

class Edit extends React.Component {
  render() {
    console.log(this.props.photos[0].image.uri);
    return (
      <View style={styles.container}>
        <View style={styles.confirm}>
          <TouchableOpacity>
            <Text>confirm</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={{ uri: this.props.photos[0].image.uri }}
          />
        </View>
        <View style={styles.filterPlaceHolder}></View>
        <View style={styles.nav}>
          <TouchableOpacity style={styles.textContainer}>
            <Text style={styles.text}>Filter</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.textContainer}>
            <Text style={styles.text}>Bubble</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10
  },
  confirm: {
    flex: 0.8
  },

  imageContainer: {
    borderColor: "black",
    borderWidth: 5,
    width: 400,
    flex: 5, //in veritcal
    flexDirection: "row" //defining for the image so it wouldn't go beyond the width
  },
  image: {
    flex: 1,
    width: 400 //same as the layout component
  },
  filterPlaceHolder: {
    flex: 2
  },
  nav: {
    flex: 1,
    borderColor: "black",
    borderWidth: 5,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "flex-end"
  },
  textContainer: {
    margin: 5,
    flex: 1,
    // borderColor: "green",
    // borderWidth: 5,
    fontSize: 20,
    justifyContent: "center"
  },
  text: { fontSize: 20, alignSelf: "center" }
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
