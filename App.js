import React from "react";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import Main from "./components/Main";
import ChooseLayout from "./components/chooseLayout";
import Edit from "./components/edit";
import ComicLayout from "./components/comicLayout";
import { Provider } from "react-redux";
import store from "./store";


const AppNavigator = createStackNavigator(
  {
    Main: Main,
    ChooseLayout: ChooseLayout,
    ComicLayout: ComicLayout,
    Edit: Edit,
    Confirm: ComicLayout,
  },
  // {
  //   initialRouteName: 'Main'
  // },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#dfe3e6',
        elevation: 0,
        shadowOpacity: 0
      },
      headerTintColor: '#e88010',
      headerTitleStyle: {
        color: '#dfe3e6'
      }
    }
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
