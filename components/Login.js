'use strict';

var React = require('react-native');
var {View, Text, TextInput, TouchableHighlight} = React;
var Actions = require('react-native-router-flux').Actions;
var baseStyles = require('../baseStyles');
var Button = require('react-native-button');
var Icon = require('react-native-vector-icons/Ionicons');
var utils = require('../utils');

//import Spinner from "../Spinner"
//import Alert from "../../../alert"

export default class Login extends React.Component {

  constructor(props) {
    super(props);

    this.login = this.login.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);

    this.state = {
      usernameBorder: 'transparent',
      passwordBorder: 'transparent',
      username: '',
      password: '',
      loading: false
    }
  }

  login() {
    if(!utils.validateUsername(this.state.username) || !utils.validatePassword(this.state.password)) {
      utils.showAlert('Please enter a valid username or password.');
      return;
    }
    let self = this;
    this.setState({loading: true});
    let loginData = {username: this.state.username.toLowerCase(), password: this.state.password};
    Actions.main({username: this.state.username});

    //Authentication.login(loginData).then((result) => {
    //  self.setState({loading: false});
    //  Actions.tabbar();
    //}).catch((error) => {
    //  self.setState({loading: false});
    //  console.log(error);
    //  Alert(error + "");
    //});
  }

  onChangeUsername(text) {
    this.setState({username: text});
    if (!utils.validateUsername(text)) {
      this.setState({
        usernameBorder: '#FFC200'
      })
    } else {
      this.setState({
        usernameBorder: 'transparent'
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

  render() {
    return (
      <View style={baseStyles.container}>
        <TouchableHighlight onPress={Actions.pop} underlayColor="transparent"
                            style={[baseStyles.backButtonContainer, {top:10, left: 10}]}>
          <Icon name="close-round" size={30} color="#999"/>
        </TouchableHighlight>
        <Text style={baseStyles.welcomeText}>WELCOME BACK</Text>

        <View style={baseStyles.inputs}>
          <View style={baseStyles.inputContainer}>

            <TextInput
              style={[baseStyles.input, baseStyles.greyFont, {borderWidth: 1, borderColor: this.state.usernameBorder}]}
              autoFocus={true}
              placeholder="Username"
              placeholderTextColor="#AAA"
              value={this.state.username}
              onChangeText={this.onChangeUsername}
            />
          </View>
          <View style={baseStyles.inputContainer}>
            <TextInput
              password={true}
              style={[baseStyles.input, baseStyles.greyFont, {borderWidth: 1, borderColor: this.state.passwordBorder}]}
              placeholder="Password"
              placeholderTextColor="#AAA"
              value={this.state.password}
              onChangeText={this.onChangePassword}
            />
          </View>
          {this.renderLoginButton()}
        </View>
      </View>);
  }

  renderLoginButton() {
    if (this.state.loading) {
      return (
        <View style={{alignItems: 'center'}}>
          <Text>Logging in...</Text>
        </View>
      );
    }
    return (
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <Button style={[baseStyles.baseButton, baseStyles.primaryButton]} onPress={this.login}>Login</Button>
      </View>
    );
  }
}