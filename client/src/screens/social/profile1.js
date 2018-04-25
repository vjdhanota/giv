import React from 'react';
import {
  View,
  ScrollView,
  ListView
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
      subscriptions: []
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
      let subs = this.state.subscriptions.map(sub =>{
        let subInfo = this.getCharityInfo(sub.charity_ein);
        sub.subInfo = subInfo;
          return sub;
      })
      this.setState({subscriptions: subs},()=> console.log(this.state.subscriptions))
      //console.log(subs)
     })
    })
    
  }

getCharityInfo = async (ein) => {
  const response = await fetch(`http://10.252.200.66:5000/charityinfo/${ein}`)    
  const body = await response.json();

 return body;
}
  getUser = async () => {
   const id = await AsyncStorage.getItem('user_id');
   
    const response = await fetch(`http://10.252.200.66:5000/user/${id}`)    
    const body = await response.json();
    this.setState({userId: id})
    return body;
    
  }

  getSubscriptions = async () => {
    const response = await fetch(`http://10.252.200.66:5000/subscriptions/${this.state.userId}`)    
    const body = await response.json();
  
   return body;
  }

 
  renderRow(row) {

  
    console.log(row)
    return (
      <View style={stylez.container}>
        {/* <Avatar img={row.user.photo}
                rkType='circle'
                style={stylez.avatar}
                badge={row.type}/> */}
      <RkText>hi</RkText>
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
        <View style={styles.buttons, styles.section}>
          <RkButton style={styles.button, styles.bordered} rkType='clear link'>Subscriptions</RkButton>
          <RkButton style={styles.button, styles.bordered} rkType='clear link'>Past Payments</RkButton>
          <RkButton style={styles.button, styles.bordered} rkType='clear link' onPress={() => this.props.navigation.navigate('Settings')}>Settings</RkButton>
          <RkButton style={styles.button, styles.bordered} rkType='clear link' onPress={() => this.props.navigation.navigate('Login1')}>Log out</RkButton>
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
    paddingTop: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderColor: theme.colors.border.base
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
    height: 42
  },
  buttons: {
    flexDirection: 'row',
    paddingVertical: 8,
  },
  button: {
    flex: 1,
    alignSelf: 'center'
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
    flex: 1,
    marginLeft: 16,
    marginRight: 0
  },
  mainContent: {
    marginRight: 60
  },
  img: {
    height: 50,
    width: 50,
    margin: 0
  },
  attachment: {
    position: 'absolute',
    right: 0,
    height: 50,
    width: 50
  }
}));