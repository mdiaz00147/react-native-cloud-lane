import React from 'react';
import { Text } from 'galio-framework';
import { StyleSheet, View, TouchableOpacity, ImageBackground, ActivityIndicator } from 'react-native';
import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Ionicons';

import HeaderTitle from "../components/HeaderTitle";
import { databaseRef, storageRef } from './../utils/firebase';

const S = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22
  },
  cameraContainer: {
    height: hp("100%"),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  itemImage: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: hp("100%"),
    opacity: 0.9
  },
  actionsContainer: {
    display: 'flex',
    height: hp("6.8%"), 
    width: wp("14.5%"),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hp("40%"),
    borderRadius: wp("40%")
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
    if (this.camera) {
      let photo = await this.camera.takePictureAsync();
      this.setState({ picURL: photo.uri });
      this.uploadAsFile(photo.uri);
    } 
  };

  uploadAsFile = async (uri) => {
    this.setState({ loading: true });
    let ref = storageRef.ref();
    ref = ref.child('dos.jpg');

    const response  = await fetch(uri);
    const blob      = await response.blob();

    var metadata = {
      contentType: 'image/jpeg',
    };
    const task = ref.put(blob, metadata).then((snapshot) => {
      this.setState({ loading: false });

    });

  }

  render() {
    const { hasCameraPermission } = this.state;
    let loadingColor = this.state.loading ? ({backgroundColor: '#c8b476' }) : ({backgroundColor: '#666666'});
     
    const actions = (
      <View
        style={[S.actionsContainer, loadingColor ]}>
        {
          this.state.loading ? (
            <TouchableOpacity>
              <ActivityIndicator size={"large"} color="#fff" />
            </TouchableOpacity>
          ) : (
              <TouchableOpacity
                onPress={() => { this.snap() }}>
                <Icon name="ios-american-football" size={30} color={'white'} />
              </TouchableOpacity>
            )
        }
      </View>);

    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View style={S.container}>
          <HeaderTitle title="Upload" />
          {this.state.loading ? (
            <ImageBackground style={S.itemImage} source={{ uri: this.state.picURL }} >
              {actions}
            </ImageBackground>
          ) : (
              <Camera
                style={S.cameraContainer}
                type={this.state.type}
                ref={ref => { this.camera = ref; }}
              >
                {actions}
              </Camera>
            )}
        </View>
      );
    }
  }
};

export default UploadScreen;