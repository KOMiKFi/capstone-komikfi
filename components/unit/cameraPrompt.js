// /* eslint-disable prettier/prettier */
// import React from "react";
// import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
// import { connect } from "react-redux";
// import { accessingCamera } from "../../store";
// import { Camera } from 'expo-camera';


// class CameraPrompt extends React.Component {
//   constructor(props) {
//     super(props);
//   }

//   render() {
//     return (
//       <View>
//         <TouchableOpacity onPress={Camera}>
//           <Text>Camera</Text>
//         </TouchableOpacity>
//       </View>
//     );
//   }
// }

// const mapStateToProps = state => {
//   return {
//     currentPhotoIndex: state.currentPhotoIndex
//   };
// };

// const mapDispatchToProps = (dispatch, ownProps) => {
//   return {
//     accessingCamera: async () => {
//       await dispatch(accessingCamera(ownProps.photoIdx));
//       // ownProps.navigation.push("Edit");
//     }
//   };
// };

// export default connect(mapStateToProps, mapDispatchToProps)(CameraPrompt);



import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';

export default function CameraPrompt() {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View style={{ flex: 1 }}>
      <Camera style={{ flex: 1}} type={type}>
        <View>
          <TouchableOpacity
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}>
            <Text style={{ fontSize: 8, color: 'black' }}> Flip </Text>
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
}