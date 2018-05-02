import React from 'react';
import {
  ListView,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Text,
  AsyncStorage
} from 'react-native';
import _ from 'lodash';
import {
  RkStyleSheet,
  RkText,
  RkTextInput,
  RkCard,
  RkTheme
} from 'react-native-ui-kitten';
import {data} from '../../data';
import {Avatar} from '../../components/avatar';
import {FontAwesome} from '../../assets/icons';
import {SocialBar} from '../../components';
import Spinner from 'react-native-loading-spinner-overlay';
const Dimensions = require('Dimensions');
export class Contacts extends React.Component {
  static navigationOptions = {
    title: 'SEARCH'.toUpperCase()
    };


  constructor(props) {
    super(props);
    this.charityarticles = data.getcharityArticles();
    let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      data: ds.cloneWithRows(this.charityarticles),
      showingRecommendations: false,
      header: "Recommended For You:",
      loading: true,
      recs: []
    };
    
    this.filter = this._filter.bind(this);
    this.setData = this._setData.bind(this);
    this.addData = this._addData.bind(this);
    this.renderHeader = this._renderHeader.bind(this);
    this.renderRow = this._renderRow.bind(this);

  }
  componentDidMount() {
    // this.getUser().then(user => this.setState({user: user}))   
    let params = this.props.navigation.state.params 
    if(params && params.user) {
      this.setState({user: params.user}, () => {
        this.fetchUserRecommendations();
      })
    } else {
      this.getUser().then(user => this.setState({user: user}, () => {
        console.log('found user.. getting recs')
        this.fetchUserRecommendations();
      })
    );
            
    }

    if(params && params.favs) {
      // first time user is signing in
      this.setState({interests: params.favs});
    } else {
      this.getUser().then(user => this.setState({interests: user.favorites}))
    }

    
  } 

  getUser = async () => {
    const user = JSON.parse(await AsyncStorage.getItem('user'));
    return user;
  }
  _setData(data) {
    let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.setState({
      data: ds.cloneWithRows(data)
    })
  }

  _addData(newData) {
    // let ds = this.state.data.concat(newData)
    // this.setState({
    //   data: ds.cloneWithRows(this.state.data)
    // })
  }

   _renderRow(row) {
    let name = row.charityName ;
    // let city = row.mailingAddress.city;
    // let state = row.mailingAddress.stateOrProvince;
    // let query = name+' '+city+','+state;
    let cause = row.cause.causeName;
    
    return (
      <TouchableOpacity onPress={() => this.navigateToDetails(row)}>
      <RkCard rkType='horizontal' style={styles.card}>
        <Image style={styles.image} source={{uri: row.cause.image}}/>

        <View rkCardContent >
          <RkText numberOfLines={2} style={styles.cardText} rkType='header6' >{name}</RkText>
          <RkText style={styles.cardText} numberOfLines={3} rkType='secondary2'>{cause}</RkText>
          <RkText style={styles.cardText} rkType='secondary6 hintColor'>Charity Rating: <Image style={{width: 31, height: 8}} source={{uri: row.currentRating.ratingImage.small}}/></RkText>
        </View>
        <View rkCardFooter></View>
    </RkCard>
    </TouchableOpacity>
    )
  }

  navigateToDetails = (row) => {
    this.props.navigation.navigate('Article', {charity: row})
  }

  renderSeparator(sectionID, rowID) {
    return (
      <View style={styles.separator}/>
    )
  }

  fetchCharities = async (e) => {
    const response = await fetch(`http://172.20.10.2:5000/charity-search/${e.nativeEvent.text}`);
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    this.setState({header: 'Search Results:'});
    this.setData(body);
  }

  fetchUserRecommendations = async () => {
     console.log(this.state)
    const id = this.state.user.id
    const response = await fetch(`http://172.20.10.2:5000/recommendations/${id}`);
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    if(body) {
      
    this.setState({recs: body})
    this.setData(this.state.recs);
    }
    this.setState({header: 'Recommended For You:'});
    console.log(body)
    this.fetchInterestReccomendations();

  }
  fetchInterestReccomendations = async () => {
    const interests = this.state.interests
    let recs = this.state.recs;
    const response = await fetch(`http://172.20.10.2:5000/recommendations/real/${interests}`);
    const body = await response.json();
    console.log(body)
    if (response.status !== 200) throw Error(body.message);
      recs = recs.concat(body)
      this.setData(recs);
    
    this.setState({header: 'Recommended For You:', loading:false});
  }

  _renderHeader() {
    return (
      <View>
      <View style={styles.searchContainer}>
        <RkTextInput autoCapitalize='none'
                     autoCorrect={false}
                    //  onChange={(event) => this._filter(event.nativeEvent.text)}
                     label={<RkText rkType='awesome'>{FontAwesome.search}</RkText>}
                     rkType='row'
                     onSubmitEditing={this.fetchCharities}
                     placeholder='Find Charities...'/>
      </View>
        <RkText style={styles.searchLabel} rkType='primary'>{this.state.header}</RkText>
      </View>              
    )
  }

  _filter(text) {
    let pattern = new RegExp(text, 'i');
    let charityarticles = _.filter(this.charityarticles, (charityarticles) => {

      if (charityarticles.charityName.search(pattern) != -1
        || charityarticles.tagLine.search(pattern) != -1 )
        return charityarticles;
    });
    this.setData(charityarticles);
  }

  render() {
    const isLoading = this.state.loading;    
    const spinner = RkTheme.current.name == 'light' ? 
      <Spinner visible={this.state.loading} textContent={"Getting Recommendations..."} animation='fade' color='#000' textStyle={{color: '#000'}} overlayColor='#FFF' /> 
      : <Spinner visible={this.state.loading} textContent={"Getting Recommendations..."} animation='fade' color='#fff' textStyle={{color: '#fff'}} overlayColor='#000' />

    return isLoading? spinner : (
        <View style={{ flex: 1 }}>
        
        <ListView
        style={styles.container}
        dataSource={this.state.data}
        renderRow={this.renderRow}
        renderSeparator={this.renderSeparator}
        renderHeader={this.renderHeader}
        enableEmptySections={true}/>
      </View>
        
    )
  }

      
        
    
  
}

let styles = RkStyleSheet.create(theme => ({ 
  container: {
    backgroundColor: theme.colors.screen.scroll,
    // paddingVertical: 8,
    // paddingHorizontal: 14,
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
    padding: 9,
  },
  searchContainer: {
    backgroundColor: theme.colors.screen.bold,
    width: Dimensions.get('window').width - 15,
    paddingVertical: 10,
    height: 60,

  },
  searchLabel: {
    marginTop: 8
  },
  image: {
    width: 75, height: 75, marginLeft: 8, borderRadius:37
  },
  separator: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
  },
  card: {
    marginVertical: 8,
    height: 115,
    width: Dimensions.get('window').width - 17,
    alignItems: 'center',
    borderRadius: 15
  },
  cardText: {
    marginTop: 5,
    flexWrap: 'wrap',    

  },
  post: {
  }
}));