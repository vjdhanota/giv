import React from "react";
import { View, ScrollView, Picker, Text, TouchableOpacity } from "react-native";
import {
  RkStyleSheet,
  RkText,
  RkPicker,
  RkTextInput,
  RkChoiceGroup,
  RkChoice
} from "react-native-ui-kitten";
import { Avatar } from "../../components";
import { Gallery } from "../../components";
import { GradientButton } from "../../components";
import { data } from "../../data";
import formatNumber from "../../utils/textUtils";
const Dimensions = require("Dimensions");
import { AsyncStorage } from 'react-native';

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
      charity: charity
    };
  }
  setFrequency = (index) => {
    let freq = ['Weekly', 'Monthly', 'Yearly'];
    this.setState({frequency: freq[parseInt(index)]});
  }

  handleSubscribe = async () => {
    const id = await AsyncStorage.getItem('user_id');
    let req = {charity_ein: this.state.charity.ein, frequency: this.state.frequency, amount: this.state.amount, userId: id}
    const response = await fetch(`http://localhost:5000/subscribe/${JSON.stringify(req)}`)    
    const body = await response.json();
  }

  render() {
    let name = `${this.user.firstName} ${this.user.lastName}`;
    let images = this.user.images;

    return (
      <ScrollView style={styles.root}>
        <View>
        <RkText style={{marginTop: 5, marginLeft: 5}} rkType="primary">Amount</RkText>
        <View style={{flexDirection: "row", margin: 10}}>
          <RkTextInput rkType='form' value={this.state.amount} placeholder='Amount' onChange={(event) => this.setState({amount: event.nativeEvent.text})}/>
        </View>
          
        <RkText style={{marginLeft: 5}}  rkType="primary">Frequency</RkText>
          <RkChoiceGroup onChange={(index) => this.setFrequency(index)} style={{margin: 5}} selectedIndex={2} radio>
            <View style={{flexDirection: "row", alignItems: "center"}}>
            <TouchableOpacity choiceTrigger>
              <View style={{ flexDirection: "row", alignItems: "center", marginLeft:10 }}>
                <RkChoice rkType="radio" />
                <Text>Weekly</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity choiceTrigger>
              <View style={{ flexDirection: "row", alignItems: "center",  marginLeft:10 }}>
                <RkChoice rkType="radio" />
                <Text>Monthly</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity choiceTrigger>
              <View style={{ flexDirection: "row", alignItems: "center",  marginLeft:10 }}>
                <RkChoice rkType="radio" />
                <Text>Yearly</Text>
              </View>
            </TouchableOpacity>
            </View>
          </RkChoiceGroup>

          <GradientButton style={styles.save} rkType='medium' text='SUBMIT' onPress={this.handleSubscribe}/>
          
         
        </View>
      </ScrollView>
    );
  }
}

let styles = RkStyleSheet.create(theme => ({
  root: {
    backgroundColor: theme.colors.screen.base,
  },
  save: {
    marginVertical: 20,
    width: "40%",
    marginLeft: 10,
    
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
