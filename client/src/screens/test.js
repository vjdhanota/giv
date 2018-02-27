import React, { Component } from 'react';
import { ActivityIndicator, ListView, Text, View } from 'react-native';

export default class Test extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
    };
  }
  componentDidMount() {
    return fetch('http://localhost:3000/')
      .then(response => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.setState(
          {
            isLoading: false,
            dataSource: ds.cloneWithRows(responseJson.movies),
          },
          () => {
            // do something with new state
          },
        );
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, paddingTop: 20 }}>
          <ActivityIndicator />
        </View>
      );
    }

    return (
      <View style={{ flex: 1, paddingTop: 20 }}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={rowData => (
            <Text>
              {rowData.title}, {rowData.releaseYear}
            </Text>
          )}
        />
      </View>
    );
  }
}
