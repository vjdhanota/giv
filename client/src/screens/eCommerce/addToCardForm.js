import React from 'react';
import {
  View,
  Keyboard,
  TouchableOpacity,
  KeyboardAvoidingView
} from 'react-native';
import {
  RkText,
  RkTextInput,
  RkStyleSheet,
  RkAvoidKeyboard
} from 'react-native-ui-kitten';
import {GradientButton} from '../../components/';
import {PasswordTextInput} from '../../components/passwordTextInput';
import {DatePicker} from '../../components/picker/datePicker';
import {CardInput} from '../../components/cardInput';
import {scale} from '../../utils/scale';
import { AsyncStorage } from 'react-native';

export class AddToCardForm extends React.Component {
  static navigationOptions = {
    title: 'Add Card'.toUpperCase()
  };

  constructor(props) {
    super(props);
    this.state = {
      cardNumber: '',
      nameOnCard: '',
      cardCode: '',
      expireYear: 2018,
      expireMonth: 5,
      pickerVisible: false,
    };
  }

  handlePickedDate(date) {
    console.log(date);
    this.setState({expireMonth: date.month.key, expireYear: date.year});
    this.hidePicker()
  }

  handleCardAdd = async () => {
    const id = JSON.parse(await AsyncStorage.getItem('user')).id;
    console.log('card..',id)
    const date = `${this.state.expireMonth}/${this.state.expireYear}`;
    const response = await fetch(`http://172.20.10.2:5000/card/add?userId=${id}&name=${this.state.nameOnCard}&bank=CitiBank&amount=0&date=${date}&cardNo=${this.state.cardNumber}&type=visa&currency=usd`)
    const body = await response.json();
    this.props.navigation.state.params.addCard(body[0])
    this.props.navigation.goBack()    
  }
  hidePicker() {
    this.setState({pickerVisible: false});
  }

  handleCardNumber = (num) => {
    this.setState({cardNumber: num} );
  }

  render() {
    return (
      <KeyboardAvoidingView
        style={styles.screen}
        // onStartShouldSetResponder={(e) => true}
        // onResponderRelease={(e) => Keyboard.dismiss()}
        behavior="padding"
        >
        <View style={[styles.formContent]}>
          <View>
            <View>
              <View style={[styles.textRow]}>
                <RkText rkType='subtitle'>Card Number</RkText>
              </View>
              <CardInput onNumberChange={this.handleCardNumber}/>
            </View>

            <View style={[styles.content]}>
              <View style={[styles.textRow]}>
                <RkText rkType='subtitle'>Expire date</RkText>
              </View>
              <View style={[styles.expireDateBlock]}>
                <DatePicker
                  onConfirm={(date) => this.handlePickedDate(date)}
                  onCancel={() => this.hidePicker()}
                  selectedYear={this.state.expireYear}
                  selectedMonth={this.state.expireMonth}
                  visible={this.state.pickerVisible}
                  customDateParts={[DatePicker.DatePart.YEAR, DatePicker.DatePart.MONTH]}/>
                <View style={[styles.expireDateInput, styles.balloon]}>
                  <TouchableOpacity onPress={() => this.setState({pickerVisible: true})}>
                    <RkText rkType='medium' style={styles.expireDateInnerInput}>
                      {this.state.expireMonth}
                    </RkText>
                  </TouchableOpacity>
                </View>
                <View style={[styles.expireDateDelimiter]}/>
                <View style={[styles.expireDateInput, styles.balloon]}>
                  <TouchableOpacity onPress={() => this.setState({pickerVisible: true})}>
                    <RkText rkType='medium' style={styles.expireDateInnerInput}>
                      {this.state.expireYear}
                    </RkText>
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            <View style={[styles.content]}>
              <View style={[styles.textRow]}>
                <RkText rkType='subtitle'>Name On Card</RkText>
              </View>
              <RkTextInput rkType='rounded'
                           onChangeText={(nameOnCard) => this.setState({nameOnCard})}
                           value={this.state.nameOnCard}/>
            </View>


            <View style={[styles.content]}>
              <View style={[styles.textRow]}>
                <RkText rkType='subtitle'>Card Code</RkText>
              </View>
              <PasswordTextInput maxLength={3}
                                 keyboardType='numeric'
                                 onChangeText={(cardCode) => this.setState({cardCode})}
                                 value={this.state.cardCode}/>
            </View>

          </View>
          <View>
            <GradientButton style={{marginBottom: 15}}rkType='medium' text='ADD CARD' onPress={this.handleCardAdd}/>
          </View>
        </View>
      </KeyboardAvoidingView>
    )
  }
}

let styles = RkStyleSheet.create(theme => ({
  screen: {
    padding: 15,
    flex: 1,
    backgroundColor: theme.colors.screen.base
  },
  content: {
    marginTop: 5
  },
  formContent: {
    justifyContent: 'space-between',
    flexDirection: 'column',
    flex: 1
  },
  textRow: {
    marginLeft: 20
  },
  expireDateBlock: {
    justifyContent: 'space-between',
    flexDirection: 'row'
  },
  expireDateInput: {
    flex: 0.48,
    marginVertical: 10,
  },
  expireDateInnerInput: {
    textAlign: 'center'
  },
  expireDateDelimiter: {
    flex: 0.04
  },
  balloon: {
    maxWidth: scale(250),
    padding: 15,
    borderRadius: 100,
    borderWidth: 0.5,
    borderColor: theme.colors.border.solid,
  },
}));