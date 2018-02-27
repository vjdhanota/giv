import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StackNavigator } from 'react-navigation'
import MainScreen from './src/components/MainScreen'

export default class App extends React.Component {
  state = {
    response: ""
  };

  componentDidMount() {
    this.callApi()
      .then(res => this.setState({ response: res }))
      .catch(err => console.log(err));
  }

  callApi = async () => {
    const response = await fetch("http://localhost:5000/user");
    const body = await response.json();
    console.log(body);
    if (response.status !== 200) throw Error(body.message);

    return JSON.stringify(body);
  };

  render() {
    return (
      <AppStackNavigator />
    );
  }
}
const AppStackNavigator = StackNavigator ({
  Main: {
    screen: MainScreen
  }
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'

  },
});
