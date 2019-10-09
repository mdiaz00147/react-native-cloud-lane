import React from 'react';
import { Text } from 'galio-framework';
import { FlatList, StyleSheet, View, Image } from 'react-native';
import { Card, ListItem, Button, Icon } from 'react-native-elements'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

import HeaderTitle from "./../../components/HeaderTitle";
import API from "./../../utils/api";
import {usersRef} from './../../utils/firebase';

const S = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  itemImage:{
    width: ("100%"),
    height: hp("25%")
  }
});

class PicsListScreen extends React.Component {
  state = {
    listEX: [
      {
        name: 'Amy Farha',
        avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
        subtitle: 'Vice President'
      },
      {
        name: 'Chris Jackson',
        avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
        subtitle: 'Vice Chairman'
      }
    ]
  };

  componentDidMount(){
    // let response = API.get(`/users`).then(res => {
    //     const persons = res.data;
    //     this.setState({ persons });
    //   }).catch((error) => {
    //     console.warn(error)
    //   })
    //   console.warn(response)
    usersRef.push().set({hola:'hola'});
  };

  render() {
    return (
      <View style={S.container}>
        <HeaderTitle title="Home" />
        <FlatList
          data={this.state.listEX}
          renderItem={({ item }) => (
            <Card title="CARD WITH DIVIDER">
              {
                <View   >
                  <Image
                    style={S.itemImage}
                    source={{ uri: item.avatar_url }}
                  />
                  <Text  >{item.name}</Text>
                </View>
              }
            </Card>
          )}
        />
      </View>
    );
  }
};

export default PicsListScreen;