/* eslint-disable prettier/prettier */
import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';

export default class Main extends React.Component {
  render() {
    return (
      <View>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('Layout')}>
          <Text>Button 1</Text>
        </TouchableOpacity>
          <Text>Button 2</Text>
      </View>

    );
  }
}