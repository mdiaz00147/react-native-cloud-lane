import React from 'react';
import { Text } from 'galio-framework';
import { StyleSheet, View, TouchableOpacity, Image, Platform } from 'react-native';
import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import RNFetchBlob from "react-native-fetch-blob";
import * as FileSystem from 'expo-file-system';
import { Base64 } from 'js-base64';

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

class UploadScreen extends React.Component {
  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
    picURL: null,
    loading: false
  };

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  snap = async () => {
    this.setState({ loading: true })
    if (this.camera) {
      let photo = await this.camera.takePictureAsync();
      this.uploadAsFile(photo.uri)
    }
  };

  uploadAsFile = async (uri) => {
    let ref = storageRef.ref();
    ref = ref.child('Ariaana.jpg');

    const response = await fetch(uri);
    const blob = await response.blob();

    var metadata = {
      contentType: 'image/jpeg',
    };
    const task = ref.put(blob, metadata).then(function(snapshot) {
      console.warn('Uploaded a base64 string!');
    });
    
  }

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
            {
              this.state.loading ? (<Text style={{ fontSize: 18, marginBottom: 10, color: 'black' }}> Subiendo puta foto </Text>) : (
                <TouchableOpacity
                  style={{
                    flex: 0.1,
                    alignSelf: 'flex-end',
                    alignItems: 'center',
                  }}
                  onPress={() => { this.snap() }}>
                  <Text style={{ fontSize: 18, marginBottom: 10, color: 'black' }}> SNAP </Text>
                </TouchableOpacity>
              )
            }
          </View>
        </View>
      );
    }
  }
};

export default UploadScreen;