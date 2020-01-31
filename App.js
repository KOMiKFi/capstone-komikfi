import React from "react";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { StyleSheet, Text, View } from "react-native";
import Main from "./components/Main";
import Layout from "./components/Layout";
import Edit from "./components/edit";
import LayoutOne from "./components/layoutOne";

const AppNavigator = createStackNavigator(
  {
    Main: Main,
    Layout: Layout,
    LayoutOne: LayoutOne,
    Edit: Edit
  },
  {
    initialRouteName: "Main"
  }
);

const AppContainer = createAppContainer(AppNavigator);

export default function App() {
  return <AppContainer />;
}
