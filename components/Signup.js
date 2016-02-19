var React = require('react-native');

var Actions = require('react-native-router-flux').Actions;
var { View, Text, TextInput, TouchableHighlight } = React;
var Button = require('react-native-button');
var baseStyles = require('../baseStyles');

export default class Signup extends React.Component {

  constructor(props) {
    super(props);
    this.register = this.register.bind(this);

    this.state = {
      username: '',
      password: '',
      loading: false
    }
  }

  register() {
    var self = this;
    this.setState({loading: true});

    var userData = {
      username: this.state.username,
      password: this.state.password
    };

    Actions.chat({username: this.state.username});

    //Authentication.register(userData).then((result) => {
    //  self.setState({loading: false});
    //  Actions.tabbar();
    //}).catch((err) => {
    //  self.setState({loading: false});
    //  Alert(err.message);
    //});
  }

  render() {
    return (
      <View style={baseStyles.container}>
        <TouchableHighlight onPress={Actions.pop} underlayColor="transparent"
                            style={baseStyles.backButtonContainer}>
          <Text style={baseStyles.backButtonText}>DONE</Text>
        </TouchableHighlight>
        <Text style={baseStyles.welcomeText}>Sign up</Text>

        <View style={baseStyles.inputs}>
          <View style={baseStyles.inputContainer}>

            <TextInput
              style={[baseStyles.input, baseStyles.whiteFont]}
              autoFocus={true}
              placeholder="Username"
              placeholderTextColor="#AAA"
              value={this.state.username}
              onChangeText={(text) => this.setState({username: text})}
            />
          </View>
          <View style={baseStyles.inputContainer}>

            <TextInput
              password={true}
              style={[baseStyles.input, baseStyles.whiteFont]}
              placeholder="Password"
              placeholderTextColor="#AAA"
              value={this.state.password}
              onChangeText={(text) => this.setState({password: text})}
            />
          </View>
          {this.renderButton()}
        </View>
      </View>);
  }

  renderButton() {
    if (this.state.loading) {
      return (
        <View style={{alignItems: 'center'}}>
          <Text>Creating account...</Text>
        </View>
      );
    }
    return (
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <Button style={[baseStyles.baseButton, baseStyles.primaryButton]} onPress={this.register}>Create account</Button>
      </View>
    )
  }
}