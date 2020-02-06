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
      bubbles: []
    },
    1: {
      image: {},
      bubbles: []
    },
    2: {
      image: {},
      bubbles:[]
    },
    3: {
      image: {},
      bubbles: []
    }
  },
  currentPhotoIdx: 0,
  layout: {size: 0, height: 0, width: 0}
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
const CLEAR_PHOTOS = "CLEAR_PHOTOS"
const IMAGE_HEIGHT = 'IMAGE_HEIGHT'

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

export const addBubble = (idx, shape) => {
  return {
    type: ADD_BUBBLE,
    idx: idx,
    shape: shape
  };
};

export const setLayout = layout => ({ type: SET_LAYOUT, layout });
export const clearPhotos = () => ({ type: CLEAR_PHOTOS })
export const imageHeight = (height, width) => ({ type: IMAGE_HEIGHT, height, width })


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
      dispatch(setLayout(format));
    } catch (err) {
      console.error(err);
    }
  };
};

export const gettingHeight = (height, width) => {
  console.log('height',height)
  console.log('width', width)
  return dispatch => {
    try {
      dispatch(imageHeight(height, width))
    } catch (err) {
      console.error(err)
    }
  }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GOT_PHOTO:
      return {
        ...state,
        photos: {
          ...state.photos,
          [action.idx]: {
            image: action.image,
            bubbles: state.photos[action.idx].bubbles
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
            ...state.photos[action.idx], bubbles: [...state.photos[action.idx].bubbles, {shape: action.shape} ]
          }
        },
        currentPhotoIdx: action.idx
      };
    case SET_LAYOUT:
      return {
        ...state, layout: {...state.layout, size: action.layout}
      };
    case CLEAR_PHOTOS:
      return {
        ...state,
        photos: { ...initialState.photos },
        currentPhotoIdx: 0,
      };
    case IMAGE_HEIGHT:
      return {
        ...state, layout: {...state.layout, height: action.height, width: action.width}
      }
    default:
      return state;
  }
};

const store = createStore(reducer, middleware);

export default store;
