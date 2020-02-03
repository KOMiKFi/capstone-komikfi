import React from "react";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { StyleSheet, Text, View } from "react-native";
import Main from "./components/Main";
import ChooseLayout from "./components/chooseLayout";
import Edit from "./components/edit";
import ComicLayout from "./components/comicLayout";
import Confirm from "./components/confirm";
import { Provider } from "react-redux";
import store from "./store";

const AppNavigator = createStackNavigator(
  {
    Main: Main,
    ChooseLayout: ChooseLayout,
    ComicLayout: ComicLayout,
    Edit: Edit,
    Confirm: Confirm
  },
  {
    initialRouteName: "Main"
  }
);

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <AppContainer />
      </Provider>
    );
  }
}
