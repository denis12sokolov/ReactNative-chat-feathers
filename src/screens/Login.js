'use strict';

import React, {Component} from 'react';
import {
  Alert,
  BackAndroid,
  Image,
  Keyboard,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableHighlight,
  TouchableWithoutFeedback
} from 'react-native';

import {time, autobind} from 'core-decorators';
import Icon from 'react-native-vector-icons/Ionicons';
import {Button} from 'react-native-elements';

const baseStyles = require('../baseStyles');
const utils = require('../utils');

@autobind
export default class Login extends Component {
  static navigationOptions = {
    title: 'LOGIN',
    header: ({goBack}) => {
      const left = (<Icon name='ios-close' style={baseStyles.closeIcon} onPress={() => goBack()}/>);
      return {
        left
      };
    }
  };

  constructor(props) {
    super(props);

    this.store = this.props.screenProps.store;

    this.state = {
      emailBorder: 'transparent',
      passwordBorder: 'transparent',
      email: 'cory.m.smith@gmail.com',
      password: '1234',
      loading: false
    }
  }

  componentDidMount() {
    //BackAndroid.addEventListener('hardwareBackPress', () => Actions.pop());
  }

  login() {
    if (!utils.validateEmail(this.state.email) || !utils.validatePassword(this.state.password)) {
      Alert.alert('Error', 'Please enter a valid email or password.');
      return;
    }

    this.setState({loading: true});

    this.store.authenticate({
      strategy: 'local',
      email: this.state.email,
      password: this.state.password
    }).then(response => {
      console.log('LOGIN', 'success authenticating', response);
      // console.log('authenticated!');
      // console.log(response);
      this.setState({loading: false});
      // re-route to chat app
      // Actions.main();
      this.props.navigation.navigate('Chat');
    }).catch(error => {
      console.log('LOGIN', 'ERROR', JSON.stringify(error), error.message);
      Alert.alert('Error', 'Please enter a valid email or password.');
      this.setState({loading: false});
      return;
    });
  }

  onChangeEmail(text) {
    this.setState({email: text});
    if (!utils.validateEmail(text)) {
      this.setState({
        emailBorder: '#FFC200'
      })
    } else {
      this.setState({
        emailBorder: 'transparent'
      })
    }
  }

  onChangePassword(text) {
    this.setState({password: text});
    if (!utils.validatePassword(text)) {
      this.setState({
        passwordBorder: '#FFC200'
      })
    } else {
      this.setState({
        passwordBorder: 'transparent'
      })
    }
  }

  // _close() {
  //   this._dismissKeyboard();
  //   // Actions.pop();
  // }

  // _dismissKeyboard(el) {
  //   Key
  // }

 render() {

    if(this.state.loading) {
      return (
        <View style={{alignItems: 'center', justifyContent: 'center', flex: 1, backgroundColor: 'white'}}>
          <Text>Signing in...</Text>
        </View>
      );
    }
    
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={baseStyles.container}>
          <View style={baseStyles.inputs}>
            <View style={baseStyles.inputContainer}>
              <TextInput
                style={[baseStyles.input, baseStyles.greyFont, {borderWidth: 1, borderColor: this.state.emailBorder}]}
                autoFocus={true}
                placeholder="Email"
                placeholderTextColor="#AAA"
                autoCorrect={false}
                autoCapitalize='none'
                keyBoardType='email-address'
                returnKeyType='next'
                value={this.state.email}
                onChangeText={this.onChangeEmail}
              />
            </View>
            <View style={baseStyles.inputContainer}>
              <TextInput
                secureTextEntry={true}
                style={[baseStyles.input, baseStyles.greyFont, {borderWidth: 1, borderColor: this.state.passwordBorder}]}
                placeholder="Password"
                placeholderTextColor="#AAA"
                autoCorrect={false}
                autoCapitalize='none'
                returnKeyType='send'
                value={this.state.password}
                onChangeText={this.onChangePassword}
              />
            </View>
            <View style={{height: 60}}>
              <Button title='Login'
                      onPress={this.login}
                      backgroundColor='#31D8A0'
                      buttonStyle={{marginTop: 10, borderRadius: 5}}/>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }

}