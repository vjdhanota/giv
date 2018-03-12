import React from 'react';
import {
  DrawerNavigator,
  StackNavigator
} from 'react-navigation';
import {withRkTheme} from 'react-native-ui-kitten';
import {AppRoutes} from './src/config/navigation/routesBuilder';
import * as Screens from './src/screens';
import {bootstrap} from './src/config/bootstrap';
import track from './src/config/analytics';
import {data} from './src/data'
import {AppLoading, Font} from 'expo';
import {View, Text} from "react-native";

bootstrap();
data.populateData();

function getCurrentRouteName(navigationState) {
  if (!navigationState) {
    return null;
  }
  const route = navigationState.routes[navigationState.index];
  if (route.routes) {
    return getCurrentRouteName(route);
  }
  return route.routeName;
}

let SideMenu = withRkTheme(Screens.SideMenu);
const KittenApp = StackNavigator({
  First: {
    screen: Screens.SplashScreen
  },
  Home: {
    screen: DrawerNavigator({
        ...AppRoutes,
      },
      {
        drawerOpenRoute: 'DrawerOpen',
        drawerCloseRoute: 'DrawerClose',
        drawerToggleRoute: 'DrawerToggle',
        contentComponent: (props) => <SideMenu {...props}/>
      })
  }
}, {
  headerMode: 'none',
});

export default class App extends React.Component {
  state = {
    loaded: false,
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

  componentWillMount() {
    this._loadAssets();
  }

  _loadAssets = async() => {
    await Font.loadAsync({
      'fontawesome': require('./src/assets/fonts/fontawesome.ttf'),
      'icomoon': require('./src/assets/fonts/icomoon.ttf'),
      'Righteous-Regular': require('./src/assets/fonts/Righteous-Regular.ttf'),
      'Roboto-Bold': require('./src/assets/fonts/Roboto-Bold.ttf'),
      'Roboto-Medium': require('./src/assets/fonts/Roboto-Medium.ttf'),
      'Roboto-Regular': require('./src/assets/fonts/Roboto-Regular.ttf'),
      'Roboto-Light': require('./src/assets/fonts/Roboto-Light.ttf'),
    });
    this.setState({loaded: true});
  };

  render() {
    return (
      <Text styles={this.styles}>
      JDIWAjdiajdiawjdiawjdiajdaiejfeaifjaei
        {this.state.response}
      </Text>
    );
    if (!this.state.loaded) {
      return <AppLoading />;
    }

    return (
      <View style={{flex: 1}}>
        <KittenApp
          onNavigationStateChange={(prevState, currentState) => {
            const currentScreen = getCurrentRouteName(currentState);
            const prevScreen = getCurrentRouteName(prevState);

            if (prevScreen !== currentScreen) {
              track(currentScreen);
            }
          }}
        />
      </View>
    );
  }
}

Expo.registerRootComponent(App);
