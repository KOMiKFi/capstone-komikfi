/* eslint-disable prettier/prettier */
import React from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import * as ImagePicker from 'expo-image-picker'
import {connect} from 'react-redux'
import {getPhotoFromLibrary} from '../store'

class LayoutOne extends React.Component {

  constructor() {
    super()
    // this.openImagePicker = this.openImagePicker.bind(this)
  }

// async openImagePicker() {
//   let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync()

//   if (permissionResult.granted === false) {
//     alert('Permission to access camera roll is required')
//     console.log('Permission to access camera roll is required')
//     return
//   }
//   let pickerResult = await ImagePicker.launchImageLibraryAsync()
//   console.log(pickerResult)
// }

  render() {
    console.log('STATE', this.props.state)
    return (
      <View>
        <TouchableOpacity onPress ={this.props.getPhotoFromLibrary}>
         <Text>Pick an image</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    state: state
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    getPhotoFromLibrary: () => {
      dispatch(getPhotoFromLibrary())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LayoutOne)
