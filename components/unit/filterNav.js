import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import { connect } from "react-redux";
import {
  addFilter,
  deleteFilter
} from "../../store";

class FilterNav extends React.Component {

  render() {
    return (
    <View style={styles.iconContainer}>
      <TouchableOpacity
        onPress={() =>
          this.props.deleteFilter(this.props.currentPhotoIdx)
        }
      >
        <Text style={styles.text}>Original</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() =>
          this.props.addFilter(this.props.currentPhotoIdx, 0)
        }
      >
        <Text style={styles.text}>Saturate</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() =>
          this.props.addFilter(this.props.currentPhotoIdx, 1)
        }
      >
        <Text style={styles.text}>Comic</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() =>
          this.props.addFilter(this.props.currentPhotoIdx, 2)
        }
      >
        <Text style={styles.text}>Scream</Text>
      </TouchableOpacity>
    </View>
    )
  }
}

const styles = StyleSheet.create({
  iconContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  text: {
    fontSize: 20,
    alignSelf: "center",
    fontFamily: "Noteworthy",
    color: "#e88010"
  }
})

  const mapStateToProps = state => {
    return {
      currentPhotoIdx: state.currentPhotoIdx,
      currentPhoto: state.photos[state.currentPhotoIdx]
    };
  };

  const mapDispatchToProps = dispatch => {
    return {
      addFilter: (photoIdx, filterIdx)  => {
        dispatch(addFilter(photoIdx, filterIdx));
      },
      deleteFilter: photoIdx => {
        dispatch(deleteFilter(photoIdx));
      }
    };
  };

  export default connect(mapStateToProps, mapDispatchToProps)(FilterNav);
