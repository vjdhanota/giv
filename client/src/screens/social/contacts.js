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
  RkCard
} from 'react-native-ui-kitten';
import {data} from '../../data';
import {Avatar} from '../../components/avatar';
import {FontAwesome} from '../../assets/icons';
import {SocialBar} from '../../components';
import Spinner from 'react-native-loading-spinner-overlay';

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
      loading: true
    };

    this.filter = this._filter.bind(this);
    this.setData = this._setData.bind(this);
    this.fetchUserRecommendations();
    
    this.renderHeader = this._renderHeader.bind(this);
    this.renderRow = this._renderRow.bind(this);

  }

  _setData(data) {
    let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.setState({
      data: ds.cloneWithRows(data)
    })
  }

  _renderRow(row) {
    let name = `${row.charityName}` ;
    let tagLine = `${row.tagLine}`; 
    let rating = `${row.currentRating.rating}`;
    // let cause = `${row.cause.causeName}`;
    return (
      <TouchableOpacity >
      <RkCard rkType='horizontal' style={styles.card}>
      {/*<Avatar rkType='circle' style={styles.avatar} img={row.cause.image}/>
      <Image rkCardImg source={row.cause.image}/>*/}

        <View rkCardContent >
          <RkText numberOfLines={2} style={styles.cardText} rkType='header6' >{name}</RkText>
          <RkText style={styles.cardText} numberOfLines={3} rkType='secondary1'>{tagLine}</RkText>
          {/* <RkText style={styles.post} numberOfLines={3} rkType='secondary1'>{cause}</RkText> */}
          <RkText style={styles.cardText} rkType='secondary6 hintColor'>Charity Rating: {rating}</RkText>
          <SocialBar style={styles.cardText} rkType='space' showLabel={true}/>
      </View>
      <View rkCardFooter>
      </View>
    </RkCard>
    </TouchableOpacity>
    )
  }

  renderSeparator(sectionID, rowID) {
    return (
      <View style={styles.separator}/>
    )
  }

  fetchCharities = async (e) => {
    const response = await fetch(`http://localhost:5000/charity-search/${e.nativeEvent.text}`);
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    this.setState({header: 'Search Results:'});
    this.setData(body);
  }

  fetchUserRecommendations = async () => {
     
    const id = await AsyncStorage.getItem('user_id');
    const response = await fetch(`http://localhost:5000/recommendations/${id}`);
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    this.setState({header: 'Recommended For You:', loading:false});
    this.setData(body);

  }

  _renderHeader() {
    return (
      <View style={styles.searchContainer}>
        <RkTextInput autoCapitalize='none'
                     autoCorrect={false}
                    //  onChange={(event) => this._filter(event.nativeEvent.text)}
                     label={<RkText rkType='awesome'>{FontAwesome.search}</RkText>}
                     rkType='row'
                     onSubmitEditing={this.fetchCharities}
                     placeholder='Find Charities...'/>
        <Text style={styles.searchLabel}>{this.state.header}</Text>
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
    return (
        <View style={{ flex: 1 }}>
        <Spinner visible={this.state.loading} textContent={"Getting Recommendations..."} animation='fade' color='#000' textStyle={{color: '#000'}} overlayColor='#FFF' />
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
    paddingVertical: 8,
    // paddingHorizontal: 14,
    flexDirection: 'row',
  },
  searchContainer: {
    backgroundColor: theme.colors.screen.bold,
    width: '90%',
    paddingVertical: 10,
    height: 80,
    marginLeft: 10
    // alignItems: 'center'
  },
  searchLabel: {
    marginTop: 8
  },
  avatar: {
    marginRight: 16
  },
  separator: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
  },
  card: {
    marginVertical: 8,
    height: 150,
    width: 390
  },
  cardText: {
    marginTop: 5 
  },
  post: {
   // marginTop: 5
  }
}));