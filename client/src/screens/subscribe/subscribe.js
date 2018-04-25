import React from "react";
import { View, ScrollView, Picker, Text, TouchableOpacity } from "react-native";
import {
  RkStyleSheet,
  RkText,
  RkPicker,
  RkTextInput,
  RkChoiceGroup,
  RkChoice,
  RkButton
} from "react-native-ui-kitten";
import { Avatar } from "../../components";
import { Gallery } from "../../components";
import { GradientButton } from "../../components";
import { data } from "../../data";
import formatNumber from "../../utils/textUtils";
const Dimensions = require("Dimensions");
import { AsyncStorage } from 'react-native';
import {Dropdown} from 'react-native-material-dropdown';

export class Subscribe extends React.Component {
  static navigationOptions = {
    title: "Subscribe".toUpperCase()
  };
  constructor(props) {
    super(props);
    this.user = data.getUser();
    let {params} = this.props.navigation.state;
    let charity = params ? params.data : ''
    this.state = {
      frequency: "Monthly",
      pikerVisible: false,
      amount: '$',
      charity: charity,
      cards: [],
      cardsDict: {},
      cardDropdown: [],
      card: "Please select a card...",
      cardForPayment: {}

    };
  }

  componentWillMount() {
    this.getUserCards().then(cards => {
      this.setState({cards: cards}); 
    }).then(() => this.populateCardDropdown())
  }
  populateCardDropdown = async () => {
    this.state.cards.map( card  => {
      this.setState({cardDropdown: [...this.state.cardDropdown, {value: `${card.name}'s card ending in ${card.cardNo}`}]})
      this.state.cardsDict[`${card.name}'s card ending in ${card.cardNo}`] = card;
    });

  }

  addCard = (card) => {
    console.log(card);
    this.setState({cardDropdown: [...this.state.cardDropdown, {value: `${card.name}'s card ending in ${card.cardNo}`}]})
    this.state.cardsDict[`${card.name}'s card ending in ${card.cardNo}`] = card;
  }

  getUserCards = async () => {
    const id = await AsyncStorage.getItem('user_id');
    const response = await fetch(`http://localhost:5000/cards/${id}`)    
    const body = await response.json();
    return body;
  }
  setFrequency = freq => this.setState({frequency: freq});
  setCard = card => this.setState({card: this.state.cardsDict[card]});
    
  
  handleSubscribe = async () => {
    const id = await AsyncStorage.getItem('user_id');
    let req = {charity_ein: this.state.charity.ein, frequency: this.state.frequency, amount: this.state.amount, userId: id}
    const response = await fetch(`http://localhost:5000/subscribe/${JSON.stringify(req)}`)    
    const body = await response.json();
  }

  render() {
    let name = `${this.user.firstName} ${this.user.lastName}`;
    let images = this.user.images;
    let frequencies = [{
      value: 'Weekly'
    },
    {
      value:'Monthly',
    },
    {
      value:'Yearly',
    }]

    let cards = this.state.cardDropdown.length > 0 ? this.state.cardDropdown : [{value: 'card'}]
    // let dropdown = 
    return (
      <ScrollView style={styles.root}>
        <View style={{marginTop: 15, marginLeft: 5}}>
        <RkText style={{ marginLeft: 10}} rkType="primary">Amount</RkText>
        <View style={{flexDirection: "row"}}>
          <RkTextInput rkType='form' style={styles.moneyInput} value={this.state.amount} placeholder='Amount' onChange={(event) => this.setState({amount: event.nativeEvent.text})}/>
        </View>
          
        <View style={{marginTop: 60, marginLeft: 5}} >
          <RkText style={{marginLeft: 5}}  rkType="primary">Frequency</RkText>
          <View style={styles.dropdown}>
            <Dropdown onChangeText={(freq) => this.setFrequency(freq) }value={this.state.frequency} data={frequencies}/>
          </View>
        </View>

      <View style={{marginTop: 60, marginLeft: 5}} >
        <RkText style={{marginLeft: 5}}  rkType="primary">Payment Info</RkText>
        <View style={styles.dropdown}>
          <Dropdown  onChangeText={(card) => this.setCard(card) }value={this.state.card} data={cards}/>
        </View> 
        <RkButton style={{marginLeft:5,marginTop: 10}} rkType='primary' onPress={() => this.props.navigation.navigate('AddToCardForm', {addCard: this.addCard})} >Add Card</RkButton>
      </View>

        <GradientButton style={styles.save} rkType='medium' text='SUBSCRIBE' onPress={this.handleSubscribe}/>
          
         
        </View>
      </ScrollView>
    );
  }
}

let styles = RkStyleSheet.create(theme => ({
  root: {
    backgroundColor: theme.colors.screen.base,
  },
  moneyInput: {
    border: 'none'
  },
  save: {
    marginTop: 130,
    width: "95%",
    marginLeft: 10,
    marginRight: 13,
    
  },
  dropdown: {
    marginLeft: 5,
    marginRight: 5
  },
  header: {
    alignItems: "center",
    paddingTop: 25,
    paddingBottom: 17
  },
  userInfo: {
    flexDirection: "row",
    paddingVertical: 18
  },
  bordered: {
    borderBottomWidth: 1,
    borderColor: theme.colors.border.base
  },
  section: {
    flex: 1,
    alignItems: "center"
  },
  space: {
    marginBottom: 3
  },
  separator: {
    backgroundColor: theme.colors.border.base,
    alignSelf: "center",
    flexDirection: "row",
    flex: 0,
    width: 1,
    height: 42
  },
  buttons: {
    flexDirection: "row",
    paddingVertical: 8
  },
  button: {
    marginTop: 18,
    width: 140
  }
}));
