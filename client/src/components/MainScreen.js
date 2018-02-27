import React, { Component } from "react";
import {
	View,
	Text,
	StyleSheet,
	Platform
} from "react-native";

import HomeTab from'./AppTabNavigator/HomeTab'
import SearchTab from'./AppTabNavigator/SearchTab'
import ProfileTab from'./AppTabNavigator/ProfileTab'


import { TabNavigator } from 'react-navigation'
/*import {Icon} from 'native-base'*/

class MainScreen extends Component {
	static navigationOptions = {
		title: "giv"
	}

	render(){
		return (
			<AppTabNavigator />
		);
	}
}

export default MainScreen;

const AppTabNavigator = TabNavigator({
	HomeTab: {
		screen: HomeTab
	},
	SearchTab: {
		screen: SearchTab

	},
	ProfileTab: {
		screen: ProfileTab

	}
}, {
		animationEnabled:true,
		swipeEnabled:true,
		tabBarPosition:"bottom",
		tabBarOptions: {
			/*required for andriod*/
			style:{
				...Platform.select({
					andriod:{
						/*if not indicated, will show as blue*/
						backgroundColor:'white'
					}
				})
			},
			activeTintColor: '#000',
			inactiveTintColor: '#d1cece',
			/*required for andriod*/
			showLabel:false,
			showIcon:true
		}
	
})
/* end here*/
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'

  }

});
