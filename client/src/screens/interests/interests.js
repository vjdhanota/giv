import React from 'react';
import {
  FlatList,
  Image,
  View,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import {
  RkText,
  RkCard, RkStyleSheet
} from 'react-native-ui-kitten';
import { CheckBox } from 'react-native-elements'
import { GradientButton } from '../../components/index';
import { AsyncStorage } from 'react-native';
import { NavigationActions } from 'react-navigation';



export class Interests extends React.Component {
  static navigationOptions = {
    title: 'Interests'.toUpperCase()
  };

  constructor(props) {
    super(props);
    this.state = {
      checked: [false,false,false,false,false,false,false,false,false],
      interests: ['Animals','Arts, Cultures, Humanities','Community Development','Education','Environment','Health','Human Services','Civil Rights','Religion',]
    }
  }

  componentDidMount() {
    if(this.props.navigation.state.params) {
      this.setState({user: this.props.navigation.state.params.user[0]})
      // this.setUser(this.props.navigation.state.params.user[0])
    }
  }
  setUser = (user) => {
    //  await AsyncStorage.setItem('user_id', user.id);
  }
  handleInterestsSubmit = async () => {
    let interests = ''
    for(let i = 0; i < this.state.checked.length; i++) {
      if(this.state.checked[i]) {
        interests+= this.state.interests[i] + ','
      }
    }
    let user = await AsyncStorage.getItem('user')
    user = JSON.parse(user);
    user.favorites = interests;
    await AsyncStorage.setItem('user', JSON.stringify(user));
    console.log('userininteee', user);
    const id = user.id;
    const response = await fetch(`http://172.20.10.2:5000/user/favorites/add?userId=${id}&favorites=${interests}`)  

    const resetAction = await NavigationActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'Contacts', params: {user: user, favs: interests}})],
    });
    this.props.navigation.dispatch(resetAction);
    // this.props.navigation.navigate('Contacts', {user: this.state.user});
    
  }

  render() {
    return (
      <ScrollView style={styles.root}>
        <RkText style={styles.searchLabel} rkType='primary'>What are you interested in?</RkText>
        <CheckBox
          title='Animals'
          checkedIcon='dot-circle-o'
          uncheckedIcon='circle-o'
          checked={this.state.checked[0]}
          onPress={() => {
            curr = this.state.checked;
            curr[0] = !curr[0];
            this.setState({checked: curr})
          }}
        />
        <CheckBox
          
          title='Arts, Cultures, Humanities'
          checkedIcon='dot-circle-o'
          uncheckedIcon='circle-o'
          checked={this.state.checked[1]}
          onPress={() => {
            curr = this.state.checked;
            curr[1] = !curr[1];
            this.setState({checked: curr})
          }}
        />
        <CheckBox
          
          title='Community Development'
          checkedIcon='dot-circle-o'
          uncheckedIcon='circle-o'
          checked={this.state.checked[2]}
          onPress={() => {
            curr = this.state.checked;
            curr[2] = !curr[2];
            this.setState({checked: curr})
          }}
        />
        <CheckBox
          
          title='Education'
          checkedIcon='dot-circle-o'
          uncheckedIcon='circle-o'
          checked={this.state.checked[3]}
          onPress={() => {
            curr = this.state.checked;
            curr[3] = !curr[3];
            this.setState({checked: curr})
          }}
          
        />
        <CheckBox
          
          title='Environment'
          checkedIcon='dot-circle-o'
          uncheckedIcon='circle-o'
          checked={this.state.checked[4]}
          onPress={() => {
            curr = this.state.checked;
            curr[4] = !curr[4];
            this.setState({checked: curr})
          }}
        />
        <CheckBox
          
          title='Health'
          checkedIcon='dot-circle-o'
          uncheckedIcon='circle-o'
          checked={this.state.checked[5]}
          onPress={() => {
            curr = this.state.checked;
            curr[5] = !curr[5];
            this.setState({checked: curr})
          }}
        />
        <CheckBox
          
          title='Human Services'
          checkedIcon='dot-circle-o'
          uncheckedIcon='circle-o'
          checked={this.state.checked[6]}
          onPress={() => {
            curr = this.state.checked;
            curr[6] = !curr[6];
            this.setState({checked: curr})
          }}
        />
        <CheckBox
          
          title='Civil Rights'
          checkedIcon='dot-circle-o'
          uncheckedIcon='circle-o'
          checked={this.state.checked[7]}
          onPress={() => {
            curr = this.state.checked;
            curr[7] = !curr[7];
            this.setState({checked: curr})
          }}
        />
   
        <CheckBox
          
          title='Religion'
          checkedIcon='dot-circle-o'
          uncheckedIcon='circle-o'
          checked={this.state.checked[8]}
          onPress={() => {
            curr = this.state.checked;
            curr[8] = !curr[8];
            this.setState({checked: curr})
          }}
        />
        
        <GradientButton style={styles.submit}rkType='medium' text='CONTINUE' onPress={this.handleInterestsSubmit}/>
      </ScrollView>


    );

  }
}

let styles = RkStyleSheet.create(theme => ({
  root: {
    backgroundColor: theme.colors.screen.base,
  },
  submit: {
    margin: 10
  },
  searchLabel: {
    margin: 15
  },
}));