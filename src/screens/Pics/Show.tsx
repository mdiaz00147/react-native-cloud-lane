import React from 'react';

import { View } from 'react-native';
import { Text, Button } from 'galio-framework'
import { theme, withGalio, GalioProvider } from 'galio-framework'
import { Card } from 'galio-framework';



class DetailsScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Details Screen</Text>
      </View>
    );
  }
}

export default DetailsScreen;