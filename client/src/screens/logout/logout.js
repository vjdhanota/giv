import React from 'react';
import { NavigationActions } from 'react-navigation';
import { AsyncStorage } from 'react-native';
import { View, ScrollView, Picker, Text, TouchableOpacity } from "react-native";
import {
  RkStyleSheet,
  RkText,
  RkPicker,
  RkTextInput,
  RkChoiceGroup,
  RkChoice,
  RkButton
} from "react-native-ui-kitten";

export class Logout extends React.Component {
  static navigationOptions = {
    title: 'Logout'.toUpperCase()
  };
  constructor(props) {
    super(props)
    this.logout()
  }

  logout = async () => {
    await AsyncStorage.clear()

    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'LoginV1' })],
    });
    this.props.navigation.dispatch(resetAction);
  }

  render() {
    return <ScrollView style={styles.root}></ScrollView>
  }
}


let styles = RkStyleSheet.create(theme => ({
  root: {
    backgroundColor: theme.colors.screen.base,
  }
}));