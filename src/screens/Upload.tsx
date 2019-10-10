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
    loading: false,
    currentUploadProgress: 0
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

    const response = await fetch(uri);
    const blob = await response.blob();
    let name = new Date().getTime() + "-media";
    ref = ref.child(name + '.jpg');

    var metadata = {
      contentType: 'image/jpeg',
    };

    const task = ref.put(blob, metadata);

    task.on('state_changed', (snapshot) => {
      // Observe state change events such as progress, pause, and resume
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      // console.warn('Upload is ' + progress + '% done');
      this.setState({currentUploadProgress: progress.toFixed(1)  });

      switch (snapshot.state) {
        case firebase.storage.TaskState.PAUSED: // or 'paused'
          // console.warn('Upload is paused');
          break; 
        case firebase.storage.TaskState.RUNNING: // or 'running'
          // console.warn('Upload is running');
          break;
      }
    },  (error) => {
      // Handle unsuccessful uploads
    },  () => {
      this.setState({loading:false})
      // Handle successful uploads on complete
      // For instance, get the download URL: https://firebasestorage.googleapis.com/...
      task.snapshot.ref.getDownloadURL().then(function (downloadURL) {
        databaseRef.ref('users/').child(12).child('pics').push(downloadURL);
        // console.warn('File available at', downloadURL);
      });
    });

  }

  render() {
    const { hasCameraPermission } = this.state;
    let loadingColor = this.state.loading ? ({ backgroundColor: '#c8b476' }) : ({ backgroundColor: '#666666' });

    const actions = (
      <View
        style={[S.actionsContainer, loadingColor]}>
        {
          this.state.loading ? (
            <TouchableOpacity>
              <Text  style={{color:'white'}}>{this.state.currentUploadProgress}%</Text>
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