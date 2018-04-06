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
import {FontAwesome} from './src/assets/icons';
console.disableYellowBox = true;
import {
  RkStyleSheet,
  RkText,
  RkTextInput
} from 'react-native-ui-kitten';
import {GradientButton} from './src/components/';

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
    response: "",
    currentSearch: ""
  };

  constructor(props) {
    super(props)
  }


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
    if (!this.state.loaded) {
      return <AppLoading />;
    }

    // return (
    // <View style={styles.view}>

    //   <RkTextInput autoCapitalize='none'
    //                  autoCorrect={false}
    //                  onChange={(event) => this.setState({currentSearch: event.nativeEvent.text})}
    //                  onSubmit={this.handleSearchSubmit}
    //                   // label={<RkText rkType='awesome'>{FontAwesome.search}</RkText>}
    //                  rkType='row'
    //                  placeholder='Search'/>
    // <GradientButton rkType='large' text='SIGN UP' onPress={this.handleSearchSubmit}/>
    // </View>
    // );

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

let styles = RkStyleSheet.create(theme => ({
  view: {
    marginTop: "30%"
  }
}));

Expo.registerRootComponent(App);
