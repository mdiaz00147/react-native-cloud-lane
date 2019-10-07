import React from 'react';
import { StyleSheet, View, TouchableHighlight, Image } from 'react-native';
import { Text } from 'galio-framework'
import { Input, Block } from 'galio-framework';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const S = StyleSheet.create({
  primaryTextColor: { color: '#1973b1' },
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  headerLogo: {
    marginTop:hp('10%'),
    width: 50, 
    height: 50
  },
  input: {
    width: wp('85%'),
  },
  loginButton: {
    width: wp('85%'),
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#1973b1',
    height: hp('5%'),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5
  },
  footerContainer:{
    width: wp('95%'),
    borderColor: '#c7d1d8',
    borderTopWidth: 1,
    padding: 15,
    paddingTop: hp('2%'),
  },
  footerLinks:{
    textDecorationLine:'underline'
  }
});


class LoginScreen extends React.Component {

  render() {
    return (
      <View style={S.container}>
        <Image style={S.headerLogo} source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png' }} />
        <Block>
          <Input style={S.input} borderless topHelp={false} placeholder="Email" />
          <Input style={S.input} borderless viewPass placeholder="Password" password />

          <TouchableHighlight style={S.loginButton}   onPress={() => this.props.navigation.navigate('UploadScreen')} underlayColor={'transparent'}>
            <Text style={S.primaryTextColor} >Login</Text>
          </TouchableHighlight>
        </Block>
        <Block>
          <Text p style={S.primaryTextColor}>Forgot password?</Text>
        </Block>
        <Block>
          <Text p>Don't have an account? <Text style={S.primaryTextColor}>Sing up</Text></Text>
        </Block>
        <Block style={S.footerContainer}>
          <Text muted>When you "Log in", you agre to APP <Text style={[S.primaryTextColor, S.footerLinks]}>Terms of service.</Text>  We will manage information about  you as described in our <Text style={[S.primaryTextColor, S.footerLinks]}>Privacy Policy</Text>, and Cookie Policy.</Text>
        </Block>
      </View>
    );
  }
}

export default LoginScreen;