import React from "react";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import Main from "./components/Main";
import ChooseLayout from "./components/chooseLayout";
import Edit from "./components/edit";
import ComicLayout from "./components/comicLayout";
import { Provider } from "react-redux";
import store from "./store";
import { Asset } from 'expo-asset'



const AppNavigator = createStackNavigator(
  {
    Main: Main,
    Layout: ChooseLayout,
    Preview: ComicLayout,
    Edit: {
      screen: Edit,
      navigationOptions: {
        headerShown: false
      },
    },
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: "#dfe3e6",
        elevation: 0,
        shadowOpacity: 0,
        height: 90,
      },
      headerTintColor: "#e88010",
      headerTitleStyle: {
        color: "#dfe3e6",
      },

    }
  }
);

const AppContainer = createAppContainer(AppNavigator);

function preloadImages(images) {
  return images.map((image) => {
    console.log(image)
    Asset.fromModule(image).downloadAsync()})
  }

function preloadAssetsAsync(images = []) {
  return Promise.all([...preloadImages(images)])
}

export default class App extends React.Component {
  constructor() {
    super()
    this.state = {
      assetsLoaded: false
    }
  }

  async componentDidMount() {
    await this.loadAssetsAsync()
  }

  async loadAssetsAsync() {
    try {
      const loadedImages = await preloadAssetsAsync(
        [
          require('./assets/bubble1.png'),
          require('./assets/bubble2.png'),
          require('./assets/bubble3.png'),
          require('./assets/example.png'),
          require('./assets/splash.png'),
          require('./assets/photos-icon.png'),
          require('./assets/camera-icon.png'),
          "https://cdn1.iconfinder.com/data/icons/social-17/48/photos2-512.png",
          "https://pngimage.net/wp-content/uploads/2018/05/camera-icon-png-transparent-background-3.png"
        ]
      )
      console.log(loadedImages)
    }
    catch (error) {
      console.log(error)
    }
    finally {
      this.setState({assetsLoaded: true})
    }
  }

  render() {
    return (
        <Provider store={store}>
          <AppContainer />
        </Provider>
    );
  }
}
