import React from 'react';
import {
  View,
  Image,
  Keyboard
} from 'react-native';
import {
  RkButton,
  RkText,
  RkTextInput,
  RkStyleSheet,
  RkTheme,
  RkAvoidKeyboard
} from 'react-native-ui-kitten';
import {GradientButton} from '../../components/';
import {scale, scaleModerate, scaleVertical} from '../../utils/scale';
import { AsyncStorage } from 'react-native';

export class SignUp extends React.Component {
  static navigationOptions = {
    header: null,
  };

  state = {
    loginInfo: {
      name: "",
      email: "",
      password: ""
    }
  }

  constructor(props) {
    super(props);
    this.print();
  }
  print = async () => {
    console.log(await AsyncStorage.getItem('user_id'));
  }
  handleSignUp = async () => {
    const response = await fetch(`http://localhost:5000/user/sign-up/${JSON.stringify(this.state.loginInfo)}`);
    //const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    // console.log("before")
    // await AsyncStorage.setItem('user_id', this.state.loginInfo.email);   
    // console.log("HERE" + await AsyncStorage.getItem('user_id'));
  }
  render() {
    let renderIcon = () => {
      if (RkTheme.current.name === 'light'){
        return <Image style={styles.image} source={require('../../assets/images/logo.png')}/>;
      }
      return <Image style={styles.image} source={require('../../assets/images/logoDark.png')}/>
    };
    return (
      <RkAvoidKeyboard
        style={styles.screen}
        onStartShouldSetResponder={ (e) => true}
        onResponderRelease={ (e) => Keyboard.dismiss()}>
        <View style={{alignItems: 'center'}}>
          {renderIcon()}
          <RkText rkType='h1'>Registration</RkText>
        </View>
        <View style={styles.content}>
          <View>
            <RkTextInput rkType='rounded' placeholder='Name' onChange={(event) => this.setState({loginInfo: {...this.state.loginInfo, name: event.nativeEvent.text}})}/>
            <RkTextInput rkType='rounded' placeholder='Email' onChange={(event) => this.setState({loginInfo: {...this.state.loginInfo, email: event.nativeEvent.text}})}/>
            <RkTextInput rkType='rounded' placeholder='Password' secureTextEntry={true} onChange={(event) => this.setState({loginInfo: {...this.state.loginInfo, password: event.nativeEvent.text}})}/>
            <RkTextInput rkType='rounded' placeholder='Confirm Password' secureTextEntry={true}/>
            <GradientButton style={styles.save} rkType='large' text='SIGN UP' onPress={this.handleSignUp}/>
          </View>
          <View style={styles.footer}>
            <View style={styles.textRow}>
              <RkText rkType='primary3'>Already have an account?</RkText>
              <RkButton rkType='clear'  onPress={() => this.props.navigation.navigate('Login1')}>
                <RkText rkType='header6'> Sign in now </RkText>
              </RkButton>
            </View>
          </View>
        </View>
      </RkAvoidKeyboard>
    )
  }
}

let styles = RkStyleSheet.create(theme => ({
  screen: {
    padding: 16,
    flex: 1,
    justifyContent: 'space-around',
    backgroundColor: theme.colors.screen.base
  },
  image: {
    marginBottom: 10,
    height:scaleVertical(77),
    resizeMode:'contain'
  },
  content: {
    justifyContent: 'space-between'
  },
  save: {
    marginVertical: 20
  },
  buttons: {
    flexDirection: 'row',
    marginBottom: 24,
    marginHorizontal: 24,
    justifyContent: 'space-around'
  },
  footer:{
    justifyContent:'flex-end'
  },
  textRow: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
}));