import React from 'react';
import {
  View,
  Image,
  Dimensions,
  Keyboard,
  KeyboardAvoidingView
  
} from 'react-native';
import {
  RkButton,
  RkText,
  RkTextInput,
  RkAvoidKeyboard,
  RkStyleSheet,
  RkTheme
} from 'react-native-ui-kitten';
import {FontAwesome} from '../../assets/icons';
import {GradientButton} from '../../components/gradientButton';
import {scale, scaleModerate, scaleVertical} from '../../utils/scale';
import { AsyncStorage } from 'react-native';
import { NavigationActions } from 'react-navigation';

export class LoginV1 extends React.Component {
  static navigationOptions = {
    header: null,
  };
  state = {
    loginInfo: {
      email: "",
      password: ""
    } 
  }

  constructor(props) {
    super(props);
    this.handleLoggedInUser();    
  }
  handleLoggedInUser = async () => {
    const user = JSON.parse(await AsyncStorage.getItem('user'));
    
    if(user) {
      const user = await fetch(`http://172.20.10.2:5000/user/${user.id}`);
      const userJson = await user.json();
      try {
        await AsyncStorage.setItem('user', JSON.stringify(userJson));
      } catch(e) {
        console.log(e)
      }

      const resetAction = NavigationActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: 'ProfileV1' })],
      });
      this.props.navigation.dispatch(resetAction);
    }
  }
  _renderImage(image) {
    let contentHeight = scaleModerate(375, 1);
    let height = Dimensions.get('window').height - contentHeight;
    let width = Dimensions.get('window').width;

    if (RkTheme.current.name === 'light')
      image = (<Image style={[styles.image, {height, width}]}
                      source={require('../../assets/images/backgroundLoginV1.png')}/>);
    else
      image = (<Image style={[styles.image, {height, width}]}
                      source={require('../../assets/images/backgroundLoginV1DarkTheme.png')}/>);
    //return image;
  }

  handleLoginSubmit = async () => {
    const response = await fetch(`http://172.20.10.2:5000/user/sign-in/${JSON.stringify(this.state.loginInfo)}`);    
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
      try {
        console.log(body)
        await AsyncStorage.setItem('user', JSON.stringify(body));
      } catch (err) {
        console.log(err);
      }
      //this is browse page
     const resetAction = NavigationActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'ProfileV1' })],
    });
    this.props.navigation.dispatch(resetAction);
    
    
    
  }

  render() {
    let image = this._renderImage();

    return (
      <KeyboardAvoidingView
      style={styles.screen}
      // onStartShouldSetResponder={ (e) => true}
      // onResponderRelease={ (e) => Keyboard.dismiss()}
      behavior="padding"
      >
        {image}
        <View style={styles.container}>
          <RkText rkType='primary' style={styles.hero}>giv</RkText>
          <RkTextInput rkType='rounded' placeholder='Email' onChange={(event) => this.setState({loginInfo: {...this.state.loginInfo, email: event.nativeEvent.text}})}/>
          <RkTextInput rkType='rounded' placeholder='Password' secureTextEntry={true} onChange={(event) => this.setState({loginInfo: {...this.state.loginInfo, password: event.nativeEvent.text}})}/>
          <GradientButton onPress={this.handleLoginSubmit} rkType='large' style={styles.save} text='LOGIN'/>
          <View style={styles.footer}>
            <View style={styles.textRow}>
              <RkText rkType='primary3'>Don’t have an account?</RkText>
              <RkButton rkType='clear'>
                <RkText rkType='header6' onPress={() => this.props.navigation.navigate('SignUp')}> Sign up
                  now </RkText>
              </RkButton>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    )
  }
}

let styles = RkStyleSheet.create(theme => ({
  screen: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: theme.colors.screen.base
  },
  image: {
    resizeMode: 'cover',
    marginBottom: scaleVertical(10),
  },
  hero: {
    fontSize: 37,
    marginBottom: 10
  },
  container: {
    paddingHorizontal: 17,
    paddingBottom: scaleVertical(22),
    // alignItems: 'center',
    // flex: -1
    marginTop: 80,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  },
  footer: {
    // justifyContent: 'flex-end',
    flex: 1
  },
  buttons: {
    flexDirection: 'row',
    marginBottom: scaleVertical(24)
  },
  button: {
    marginHorizontal: 14
  },
  save: {
    marginVertical: 9
  },
  textRow: {
    justifyContent: 'center',
    flexDirection: 'row',
  }
}));