import { createStore, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import * as ImagePicker from "expo-image-picker";

const middleware = applyMiddleware(
  thunkMiddleware,
  createLogger({ collapsed: true })
);

// REDUCER
const initialState = {
  photos: {
    0: {
      image: {},
      bubble: { uri: "" }
    },
    1: {
      image: { uri: "" },
      bubble: { uri: "" }
    }
  },
  currentPhotoIdx: 0,
  layout: 0
};
// state will look like this:

// const sampleStateInObject = {
//   photos: {
//     0: {
//       image: { uri, cancelled, type, swidth, height },
//       filter: true,
//       bubble: [
//         {
//           position: { x: 0, y: 0, z: 0 },
//           uri: "",
//           text: "",
//           rotation: "degree",
//           scale: { x: 0, y: 0 }
//         }
//       ]
//     },
//     1: {}
//   }
// };

const GOT_PHOTO = "GOT_PHOTO";
const UPDATE_CURRENT_PHOTO_IDX = "UPDATE_CURRENT_PHOTO_IDX";
const ADD_BUBBLE = "ADD_BUBBLE";
const SET_LAYOUT = "SET_LAYOUT";

const gotPhoto = (image, idx) => {
  return {
    type: GOT_PHOTO,
    image,
    idx
  };
};

export const updateCurrentPhotoIdx = idx => {
  return {
    type: UPDATE_CURRENT_PHOTO_IDX,
    idx
  };
};

export const addBubble = idx => {
  return {
    type: ADD_BUBBLE,
    idx,
    bubble_uri: "bubble.png"
  };
};

export const setLayout = layout => ({ type: SET_FORMAT, layout });

export const getPhotoFromLibrary = idx => async dispatch => {
  try {
    let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required");
      return;
    }
    let image = await ImagePicker.launchImageLibraryAsync();
    dispatch(gotPhoto(image, idx));
  } catch (error) {
    console.error(error);
  }
};

export const settingLayout = format => {
  return dispatch => {
    try {
      dispatch(setFormat(format));
    } catch (err) {
      console.error(err);
    }
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GOT_PHOTO:
      return {
        ...state,
        photos: {
          ...state.photos,
          [action.idx]: {
            image: action.image,
            bubble: state.photos[action.idx].bubble
          }
        },
        currentPhotoIdx: action.idx
      };
    case UPDATE_CURRENT_PHOTO_IDX:
      return { ...state, currentPhotoIdx: action.idx };
    case ADD_BUBBLE:
      return {
        ...state,
        photos: {
          ...state.photos,
          [action.idx]: {
            image: state.photos[action.idx].image,
            bubble: { uri: action.bubble_uri }
          }
        },
        currentPhotoIdx: action.idx
      };
    case SET_LAYOUT:
      return {
        ...state,
        layout: action.layout
      };
    default:
      return state;
  }
};

const store = createStore(reducer, middleware);

export default store;
