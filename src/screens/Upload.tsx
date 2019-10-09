import React from 'react';
import { Text } from 'galio-framework';
import { StyleSheet, View, TouchableOpacity, Image, Platform } from 'react-native';
import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import RNFetchBlob from 'react-native-fetch-blob'

import HeaderTitle from "../components/HeaderTitle";
import { databaseRef, storageRef } from './../utils/firebase';

const S = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22
  },
  cameraContainer: {
    height: hp("60%")
  },
  itemImage: {
    width: '50%',
    height: 90
  }
});

// Prepare Blob support
// const Blob = RNFetchBlob.polyfill.Blob
// const fs = RNFetchBlob.fs
// window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
// window.Blob = Blob


class UploadScreen extends React.Component {
  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
    picURL: null
  };

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  snap = async () => {
    if (this.camera) {
      let photo = await this.camera.takePictureAsync();

      var store = storageRef.ref().child('productImages/');
      const uploadUri = Platform.OS === 'ios' ? photo.uri.replace('file://', '') : photo.uri

      const metadata = {
        contentType: 'image/png'
      };

      console.warn(uploadUri)
      console.warn(store)
    }
  };

  render() {
    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View style={S.container}>
          <HeaderTitle title="Upload" />
          <Camera
            style={S.cameraContainer}
            type={this.state.type}
            ref={ref => {
              this.camera = ref;
            }}
          >
          </Camera> 
          <View
            style={{
              flex: 1,
              backgroundColor: 'transparent',
              flexDirection: 'row',
            }}>
            <Image style={S.itemImage} source={{ uri: this.state.picURL }} />
            <TouchableOpacity
              style={{
                flex: 0.1,
                alignSelf: 'flex-end',
                alignItems: 'center',
              }}
              onPress={() => { this.snap() }}>
              <Text style={{ fontSize: 18, marginBottom: 10, color: 'black' }}> SNAP </Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
  }
};

export default UploadScreen;