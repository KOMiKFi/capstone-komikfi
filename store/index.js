import { createStore, combineReducers, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import * as ImagePicker from "expo-image-picker";

const middleware = applyMiddleware(
  thunkMiddleware,
  createLogger({ collapsed: true })
);

// REDUCER
const initialState = {
  photos: []
};
// state will look like this:
// const sampleState = {
//   photos: [
//     {image: {uri, cancelled, type, swidth, height},
//       filter: true,
//       bubble: [{position: {'x':0, 'y':0, 'z':0}, uri: '', text: '', rotation: 'degree', scale: {'x':0, 'y':0}}]
//     },
//     {},
//   ]
// }

const GOT_PHOTO = "GOT_PHOTO";

const gotPhoto = image => {
  return {
    type: GOT_PHOTO,
    image: image
  };
};

export const getPhotoFromLibrary = () => async dispatch => {
  try {
    let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required");
      return;
    }
    let image = await ImagePicker.launchImageLibraryAsync();
    dispatch(gotPhoto(image));
  } catch (error) {
    console.error(error);
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GOT_PHOTO:
      return { ...state, photos: [...state.photos, { image: action.image }] };
    default:
      return state;
  }
};

const store = createStore(reducer, middleware);

export default store;
