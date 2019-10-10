import React from 'react';
import { Text } from 'galio-framework';
import { FlatList, StyleSheet, View, Image, Platform } from 'react-native';
import { Card, ListItem, Button, Icon } from 'react-native-elements'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import HeaderTitle from "./../../components/HeaderTitle";
import API from "./../../utils/api";
import { databaseRef, storageRef } from './../../utils/firebase';

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
  itemImage: {
    width: ("100%"),
    height: hp("25%")
  }
});

class PicsListScreen extends React.Component {
  state = {
    listEX: []
  };

  componentDidMount() {
    // databaseRef.ref('users/').child(12).set({name:'mario', pics:[2,1,4]}); 
    // databaseRef.ref('users/').child(12).child('pics').push(5544); 


    databaseRef.ref('users/').child(12).child('pics').on('value', (snapshot) => {
      let values = Object.keys(snapshot.val());

      let objects = Object.values(snapshot.val()).map((item, index) => {
        return {
          id: values[index],
          avatar_url: item,
          name:'uno'
        }
      }).reverse();
      // console.warn(objects)
      this.setState({ listEX: objects })
 
    });


  };

  render() {
    console.warn(this.state.listEX);
    return (
      <View style={S.container}>
        <HeaderTitle title="Home" />
        <FlatList
          data={this.state.listEX}
          renderItem={({ item }) => (
            <Card key={item.id} title="CARD WITH DIVIDER">
              {
                <View>
                  <Image
                    style={S.itemImage}
                    source={{ uri: item.avatar_url }}
                  />
                  <Text  >{item.id}</Text>
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