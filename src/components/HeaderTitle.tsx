import React from 'react';
import { Text } from 'galio-framework';
import { FlatList, StyleSheet, View } from 'react-native';

const S = StyleSheet.create({
  container: {
    width: '100%',
    marginTop:10,
    padding: 10,
    borderColor: '#c7d1d8',
    borderBottomWidth: 0.5,
    display:'flex',
    alignItems: 'center'
  }
});

const HeaderTitle = ({title}) => (
  <View style={S.container}>
    <Text p >
      {title}
    </Text>
  </View>
);

export default HeaderTitle;