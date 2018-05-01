import React from 'react';
import {
  ScrollView,
  Image,
  View,
  TouchableOpacity,
  AsyncStorage
} from 'react-native';
import {
  RkCard,
  RkText,
  RkStyleSheet,
  RkButton
} from 'react-native-ui-kitten';
import {data} from '../../data';
import {Avatar} from '../../components';
import {SocialBar} from '../../components';
let moment = require('moment');
import { NavigationActions } from 'react-navigation';

export class Article extends React.Component {
  static navigationOptions = {
    title: 'Article View'.toUpperCase()
  };
  state = {
    img: '',
    isSubbed: false
  }
  constructor(props) {
    super(props);
    let {params} = this.props.navigation.state;
    // this.setState({subId: params.sub.id})
    let id = params ? params.id : 1;
    this.data = params.charity;

    let regex = /(<([^>]+)>)/ig
    ,   body = this.data.mission
    ,   result = body.replace(regex, "");
    this.data.mission = result;
    this.getImage(this.data);
  }

  componentDidMount() {
    this.checkIfSubbed().then(subbed => this.setState({isSubbed: subbed}));
    if(this.props.navigation.state.params.sub) {
      this.setState({subId: this.props.navigation.state.params.sub.id})
    }
  }

  checkIfSubbed = async () => {
    const userId = await AsyncStorage.getItem('user_id');
    const charityId = this.data.ein
    const response = await fetch(`http://localhost:5000/charity/check?userId=${userId}&ein=${charityId}`)    
    const body = await response.json();
    return body;    
  }
  getImage = async (row) => {
    let city = row.mailingAddress.city;
    let state = row.mailingAddress.stateOrProvince;
    let query = row.charityName+' '+city+','+state;

    const response = await fetch(`http://localhost:5000/charityImage/${query}`);
    this.setState({img: response._bodyText});
    console.log(this.state.img);
  }

  navigateToSub = () => {
    this.props.navigation.navigate('Subscribe', {data: this.data});
  }

  handleUnsubscribe = async () => {
    const response = await fetch(`http://localhost:5000/charity/delete/${this.state.subId}`);
    const body = await response.json()
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'ProfileV1' })],
    });
    this.props.navigation.dispatch(resetAction);
  }
  render() {
    const subButton = this.state.isSubbed ? <RkButton style={{width: '90%'}} onPress={() => this.handleUnsubscribe()}>Unsubscribe</RkButton>
                                          : <RkButton style={{width: '90%'}} onPress={() => this.navigateToSub()}>Subscribe</RkButton>
    
    return (
      <ScrollView style={styles.root}>
        <RkCard rkType='article'>
          <Image style={styles.img}rkCardImg source={{uri: this.state.img}}/>
          <View rkCardHeader>
            <View>
              <RkText style={styles.title} rkType='header4'>{this.data.charityName}</RkText>
              {/* <RkText rkType='secondary2 hintColor'>{moment().add(this.data., 'seconds').fromNow()}</RkText> */}
            </View>
            <TouchableOpacity>
              <Image style={styles.image} source={{uri: this.data.cause.image}}/>
            </TouchableOpacity>
          </View>
          <View rkCardContent>
            <View>
              <RkText rkType='primary3 bigLine'>{this.data.mission}</RkText>
            </View>
          </View>
          <View rkCardFooter>
          {subButton}
          <SocialBar/>
          </View>
        </RkCard>
      </ScrollView>
    )
  }
}

let styles = RkStyleSheet.create(theme => ({
  root: {
    backgroundColor: theme.colors.screen.base
  },
  title: {
    marginBottom: 5
  },
  image: {
    width: 40, height: 40, marginLeft: 8, borderRadius:20
  },
  img: {
    height: 300
  }
}));