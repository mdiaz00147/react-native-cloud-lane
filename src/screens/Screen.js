import React from "react";
import { Text, View, StyleSheet } from "react-native";

const S = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  }
});

const Screen = (props) => (
  <View style={S.container} >
    {props.children}
  </View>
);


export default Screen;