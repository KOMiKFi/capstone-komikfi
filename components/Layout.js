/* eslint-disable prettier/prettier */
import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';

export default class Layout extends React.Component {
  render() {
    return (
      <View>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('Image')}>
          <Text>Layout 1</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('Format')}>
          <Text>Format 2</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('Format')}>
          <Text>Format 3</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('Format')}>
          <Text>Format 4</Text>
        </TouchableOpacity>
      </View>

    );
  }
}