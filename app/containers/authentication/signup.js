import React, {Component, StyleSheet, Text, TextInput, View} from 'react-native';
import {Actions} from 'react-native-router-flux';
import MK, {MKButton, MKColor, MKSpinner} from 'react-native-material-kit';
import { connect } from 'react-redux';
import {signUp} from '../../actions/authentication_actions';

const SignUpButton = new MKButton.coloredButton().withBackgroundColor(MKColor.Indigo).withText('REGISTRAR').build();

const HaveAccountButton = new MKButton.coloredButton().withBackgroundColor(MKColor.Silver).withTextStyle({
    color: '#212121',
    fontWeight: 'bold',
  }).withText('JÁ TENHO UMA CONTA...').build();

class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            passwordConfirmation: '',
            errorMessage: ''
        };
        this.onPress = this.onPress.bind(this);
    }

    render() {
      if(this.props.authentication.isFetching) {
        return (
          <View style={styles.container}>
            <MKSpinner style={styles.spinner}/>
            <Text style={styles.legendLabel}>Aguarde...</Text>
          </View>
        )
      }
        return (
            <View style={styles.container}>
              <Text style={styles.label}>Username:</Text>
              <TextInput
                style={styles.input}
                value={this.state.email}
                onChangeText={(text) => this.setState({email: text})}
                placeholder={'email@example.com'} />
              <Text style={styles.label}>Senha:</Text>
              <TextInput
                secureTextEntry={true}
                style={styles.input}
                value={this.state.password}
                onChangeText={(text) => this.setState({password: text})} />
              <Text style={styles.label}>Confirmar Senha:</Text>
              <TextInput
                secureTextEntry={true}
                style={styles.input}
                value={this.state.passwordConfirmation}
                onChangeText={(text) => this.setState({passwordConfirmation: text})} />
              <Text>{this.state.errorMessage}</Text>
              <View style={styles.buttonGroup}>
                <SignUpButton onPress={this.onPress}/>
              </View>
              <View style={styles.buttonGroup}>
                <HaveAccountButton onPress={() => {this.props.navigator.pop()}}/>
              </View>
            </View>
        )
    }

    onPress() {
      if (this.state.password !== this.state.passwordConfirmation) {
          return this.setState({errorMessage: 'Senha não confere!'});
      }
      this.props.signUp(this.state);
    }
    componentWillReceiveProps(nextProps) {
      if(nextProps.authentication.user) {
        return this.props.navigator.immediatelyResetRouteStack([{name: 'home'}]);
      }
      if(nextProps.authentication.error) {
        this.setState({
          errorMessage: nextProps.authentication.error
        });
      }
    }
}

function mapStateToProps(state) {
  return {
    authentication: state.authentication
  };
}

function mapDispatchToProps(dispatch) {

  return {
    signUp: (user) => {dispatch(signUp(user))}
  };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    input: {
        padding: 4,
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        margin: 5,
        alignSelf: 'center'
    },
    label: {
        fontSize: 18,
        alignSelf: 'flex-start',
        marginLeft: 5
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
