import React, { Component } from "react";
import {
	View,
	Text,
	StyleSheet,
	TextInput
} from "react-native";
import { Button,Header, Container, Item, Input} from 'native-base'

import {Icon} from 'native-base'

class SearchTab extends Component {
	static navigationOptions = {
		tabBarIcon: ({tintColor})=>(
			<Icon name="ios-search" style={{color:tintColor}
		} />
	)
}

	render(){
		return (
			<Container>
				<Header searchBar rounded>
					<Item>
						<Icon name="ios-search" />
           			 	<Input placeholder="Search" />
           			 	<Icon name="ios-people" />
           			 </Item>
           			 <Button transparent>
           			 	<Text>Search</Text>
           			 </Button>
        		</Header>
      		</Container>
		);
	}
}

export default SearchTab;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'

  },

});