import React from 'react';
import { Text } from 'galio-framework';
import { FlatList, StyleSheet, View, Image } from 'react-native';
import { Card, ListItem, Button, Icon } from 'react-native-elements'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

import HeaderTitle from "./../../components/HeaderTitle";

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
    height: hp("95%")
  }
});

class HomeScreen extends React.Component {
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

export default HomeScreen;