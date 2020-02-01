import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import * as ImagePicker from "expo-image-picker";

export default async function openImagePickerAsync() {
  let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();

  if (permissionResult.granted === false) {
    alert("Permission to access camera roll is required!");
    return;
  }

  let pickerResult = await ImagePicker.launchImageLibraryAsync();
}
