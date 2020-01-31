/* eslint-disable prettier/prettier */
import React from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import * as ImagePicker from 'expo-image-picker'

export default class LayoutOne extends React.Component {

  constructor() {
    super()
    this.openImagePicker = this.openImagePicker.bind(this)
  }

async openImagePicker() {
  let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync()

  if (permissionResult.granted === false) {
    alert('Permission to access camera roll is required')
    console.log('Permission to access camera roll is required')
    return
  }
  let pickerResult = await ImagePicker.launchImageLibraryAsync()
  console.log(pickerResult)
}




  render() {
    return (
      <View>
        <TouchableOpacity onPress ={this.openImagePicker}>
         <Text>Pick an image</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
