import React from 'react';
import {
  View,
  ScrollView,
  ListView,
  Image,
  TouchableOpacity
} from 'react-native';
import {
  RkText,
  RkButton, RkStyleSheet
} from 'react-native-ui-kitten';
import {Avatar} from '../../components/avatar';
import {Gallery} from '../../components/gallery';
import {data} from '../../data/';
import formatNumber from '../../utils/textUtils';
import { AsyncStorage } from 'react-native';
import {MainRoutes} from '../../config/navigation/routes';


export class ProfileV1 extends React.Component {
  static navigationOptions = {
    title: 'User Profile'.toUpperCase()
  };


  constructor(props) {
    super(props);
    let {params} = this.props.navigation.state;
    let id = params ? params.id : 1;
    //this.user = data.getUser(id);
    this.state= {
      user: {
        name: " ",
        email: " "
      },
      subscriptions: [],
      subInfo: []
      }
     this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    
   
  }

  componentDidMount() {
    this.getUser().then(res=>{
      this.setState({user: res})
    }).then(() => {
      this.getSubscriptions().then(res => {
        this.setState({ subscriptions: res });
  
        if (!Array.isArray(this.state.subscriptions)) {
          this.setState({ subscriptions: [this.state.subscriptions] });
      } 
     
      this.data = this.ds.cloneWithRows(this.state.subscriptions);
      let i = 0;
      let subs = this.state.subscriptions.map(sub =>{
         this.getCharityInfo(sub.charity_ein).then(info =>{
           let tmp = this.state.subscriptions;
           tmp[i].subInfo = info;
           i++;
          this.setState({subscriptions: tmp})
         });
      })
     
     })
    })
    
  }

getCharityInfo = async (ein) => {
  const response = await fetch(`http://172.20.10.2:5000/charityinfo/${ein}`)    
  const body = await response.json();

 return body;
}
  getUser = async () => {
   const id = JSON.parse(await AsyncStorage.getItem('user')).id;
    const response = await fetch(`http://172.20.10.2:5000/user/${id}`)    
    const body = await response.json();
    this.setState({userId: id})
    await AsyncStorage.setItem('user', JSON.stringify(body));
    return body;
    
  }

  getSubscriptions = async () => {
    const response = await fetch(`http://172.20.10.2:5000/subscriptions/${this.state.userId}`)    
    const body = await response.json();
  
   return body;
  }

  getHumanDate = (date) => new Date(date).toDateString();
  navigateToDetails = (row) => {
    this.props.navigation.navigate('Article', {charity: row.subInfo, sub: row})
  }
 
  renderRow = (row) => {

  
    const subs = this.state.subscriptions;
    
    const view = row.subInfo ? <View style={stylez.container}>
    <TouchableOpacity onPress={() => this.navigateToDetails(row)}>
    <View style={stylez.content}>
    <Image source={{uri: row.subInfo.cause.image}}
                style={{width: 50, height: 50, marginRight: 8, borderRadius: 25, alignSelf: 'center'}}
               />
      <View style={stylez.mainContent}>
        <View style={stylez.text}>
          <RkText>
            <RkText rkType='header6'>{row.subInfo.charityName}</RkText>
            {"\n"}
            <RkText>
              <RkText rkType='secondary2'> Frequency: </RkText>
              <RkText rkType='primary2'> {row.frequency}</RkText>
            </RkText>
            {"\n"}
            <RkText>
              <RkText rkType='secondary2'>Amount: </RkText>
              <RkText rkType='primary2'> {row.amount}</RkText>
            </RkText>
            {"\n"}
            <RkText>
              <RkText rkType='secondary2'>Suscriber since: </RkText>
              <RkText rkType='primary2'> {this.getHumanDate(row.createdAt) }</RkText>
            </RkText>

          </RkText>
        </View>
    
      </View>
    </View>
    </TouchableOpacity>
  </View> : <View></View>

    return (
      <View >
        {view}  
      </View>
    )
  }
  render() {
    let name = this.state.user.name;
    //let images = this.user.images;
    let navigate = this.props.navigation.navigate;

    return (
      
      <ScrollView style={styles.root}>
        <View style={[styles.header, styles.bordered]}>
          {/* <Avatar img={this.user.photo} rkType='big'/> */}
          <RkText rkType='header2'>{name}</RkText>
        </View>
        <View style={[styles.userInfo, styles.bordered]}>
          <View style={styles.section}>
            <RkText rkType='header6' style={styles.space}>{this.state.user.email}</RkText>
            <RkText rkType='secondary1 hintColor'>Email</RkText>
          </View>
          <View style={styles.section}>
            <RkText rkType='header3' style={styles.space}>{this.state.subscriptions.length}</RkText>
            <RkText rkType='secondary1 hintColor'>Subscriptions</RkText>
          </View>
        </View>
        <View style={styles.buttons}>
          <RkButton style={styles.button} rkType='clear link'>Subscriptions</RkButton>
          {/* <RkButton style={styles.button} rkType='clear link' onPress={() => this.props.navigation.navigate('Settings')}>Settings</RkButton> */}
        </View>
        <View>
        <ListView
        style={styles.root}
        dataSource={this.ds.cloneWithRows(this.state.subscriptions)}
        renderRow={this.renderRow}/>
      </View>
      </ScrollView> 
    )
  }
}

let styles = RkStyleSheet.create(theme => ({
  root: {
    backgroundColor: theme.colors.screen.base
  },
  header: {
    alignItems: 'center',
    paddingTop: 25,
    paddingBottom: 17
  },
  userInfo: {
    flexDirection: 'row',
    paddingVertical: 18,
  },
  bordered: {
    
  },
  container: {
    padding: 16,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: theme.colors.border.base,
    alignItems: 'flex-start'
  },
  section: {
    flex: 1,
    alignItems: 'center'
  },
  space: {
    marginBottom: 3
  },
  separator: {
    backgroundColor: theme.colors.border.base,
    alignSelf: 'center',
    flexDirection: 'row',
    flex: 0,
    width: 1,
    height: 42,
    
  },
  buttons: {
    flexDirection: 'row',
    paddingVertical: 8,
    paddingTop: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderColor: theme.colors.border.base
  },
  button: {
    flex: 1,
    alignSelf: 'center',
    // paddingTop: 20,
    // paddingBottom: 20,
    // borderBottomWidth: 1,
    // borderColor: theme.colors.border.base
  }
}));
let stylez = RkStyleSheet.create(theme => ({
  root: {
    backgroundColor: theme.colors.screen.base
  },
  container: {
    padding: 16,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: theme.colors.border.base,
    alignItems: 'flex-start'
  },
  avatar: {},
  text: {
    marginBottom: 5,
  },
  content: {
    flexDirection: 'row',
    marginLeft: 5,
    marginRight: 0
  },
  mainContent: {
    marginRight: 60
  },
  img: {
    height: 50,
    width: 50,
  },
  attachment: {
    position: 'absolute',
    right: 0,
    height: 50,
    width: 50
  }
}));