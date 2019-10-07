import React from 'react';
import { Text } from 'galio-framework';
import { StyleSheet, View, TouchableOpacity, Image } from 'react-native';
import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera';

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import HeaderTitle from "../components/HeaderTitle";

const S = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22
  },
  cameraContainer: { 
    height: hp("60%")
  },
  itemImage:{
    width: '50%',
    height: 90
  }
});

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
      console.warn(photo)
      this.setState({picURL: photo.uri})
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
              <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}> Flip </Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
  }
};

export default UploadScreen;