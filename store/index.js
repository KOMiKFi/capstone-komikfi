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
      bubbles: []
    },
    3: {
      image: {},
      bubbles: []
    }
  },
  currentPhotoIdx: 0,
  layout: { size: 0, height: 0, width: 0 }
};
// state will look like this:

// const sampleStateInObject = {
//   photos: {
//     0: {
//       image: { uri, cancelled, type, swidth, height },
//       filter: true,
//       bubble: [
//         {
//           shape:1,
//           text: "",
//           rotateZ: radiant,
//           scale: 1,
//           translateX:0,
//           translateX:Y,
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
const CLEAR_PHOTOS = "CLEAR_PHOTOS";
const IMAGE_HEIGHT = "IMAGE_HEIGHT";
const UPDATE_BUBBLE = "UPDATE_BUBBLE";
const TAKE_PHOTO = 'TAKE_PHOTO'

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

export const updateBubble = (bubble, bubbleIdx, photoIdx) => {
  return {
    type: UPDATE_BUBBLE,
    bubble,
    bubbleIdx,
    photoIdx
  };
};

export const setLayout = layout => ({ type: SET_LAYOUT, layout });
export const clearPhotos = () => ({ type: CLEAR_PHOTOS });
export const imageHeight = (height, width) => ({ type: IMAGE_HEIGHT, height, width });
export const takePhoto = (image, idx) => ({ type: TAKE_PHOTO, image, idx });


export const getPhotoFromLibrary = (idx) => async dispatch => {
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

export const accessingCamera = idx => async dispatch => {
  try {
    let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("Permission to access camera is required");
      return;
    }
    let camera = await ImagePicker.launchCameraAsync();
    dispatch(takePhoto(camera, idx));
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
  return dispatch => {
    try {
      dispatch(imageHeight(height, width));
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
            bubbles: state.photos[action.idx].bubbles
          }
        },
        currentPhotoIdx: action.idx
      };
    case TAKE_PHOTO:
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
            ...state.photos[action.idx],
            bubbles: [
              ...state.photos[action.idx].bubbles,
              { shape: action.shape }
            ]
          }
        },
        currentPhotoIdx: action.idx
      };
    case UPDATE_BUBBLE:
      return {
        ...state,
        photos: {
          ...state.photos,
          [action.photoIdx]: {
            ...state.photos[action.photoIdx],
            bubbles: [...state.photos[action.photoIdx].bubbles].map(
              (bubble, index) => {
                if (action.bubbleIdx === index) {
                  return { ...bubble, ...action.bubble };
                } else {
                  return bubble;
                }
              }
            )
          }
        }
      };
    case SET_LAYOUT:
      return {
        ...state,
        layout: { ...state.layout, size: action.layout }
      };
    case CLEAR_PHOTOS:
      return {
        ...state,
        photos: { ...initialState.photos },
        currentPhotoIdx: 0
      };
    case IMAGE_HEIGHT:
      return {
        ...state,
        layout: { ...state.layout, height: action.height, width: action.width }
      };
    default:
      return state;
  }
};

const store = createStore(reducer, middleware);

export default store;
