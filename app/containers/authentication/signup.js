import React, {
  Component,
  StyleSheet,
  Text,
  TextInput,
  ToolbarAndroid,
  View} from 'react-native';

import MK, {
  MKButton,
  MKColor,
  MKSpinner} from 'react-native-material-kit';

import { connect } from 'react-redux';

import {signUp, resetAuth} from '../../actions/authentication';

const SignUpButton = new MKButton.coloredButton()
  .withBackgroundColor(MKColor.Indigo).withText('REGISTRAR').build();

const HaveAccountButton = new MKButton.coloredButton()
  .withBackgroundColor(MKColor.Silver).withTextStyle({
    color: '#212121',
    fontWeight: 'bold',
  }).withText('JÁ TENHO CADASTRO').build();

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

    componentDidMount() {
        this.props.resetAuth();
    }

    render() {
      if(this.props.user.isFetching) {
        return (
          <View style={styles.container}>
            <MKSpinner style={styles.spinner}/>
            <Text style={styles.legendLabel}>Aguarde...</Text>
          </View>
        )
      }
        return (
            <View style={styles.container}>

              <View style={styles.header}>
                <ToolbarAndroid
                  title="Cadastro"
                  titleColor="white"
                  style={styles.toolbar}/>
              </View>

              <View style={styles.body}>
                <Text style={styles.label}>Email:</Text>
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

                <View style={styles.buttonSubmit}>
                  <SignUpButton onPress={this.onPress}/>
                </View>

                <Text style={styles.divider}>
                  Ou
                </Text>

                <View style={styles.buttonSignin}>
                  <HaveAccountButton onPress={() => {
                          this.props.resetAuth();
                          this.props.navigator.pop();
                      }}/>
                </View>
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
      if(nextProps.user.user) {
        return this.props.navigator.immediatelyResetRouteStack([{name: 'home'}]);
      }
      if(nextProps.user.error) {
        this.setState({
          errorMessage: nextProps.user.error
        });
      }
    }
}

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

function mapDispatchToProps(dispatch) {

  return {
    signUp: (user) => {dispatch(signUp(user))},
    resetAuth: (user) => {dispatch(resetAuth(user))}
  };
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    header: {
      marginTop: 24
    },
    body: {
        flex: 1,
        justifyContent: 'center',
        width: 300,
        alignSelf: 'center'
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
    },
    buttonSignin: {
      width: 290
    },
    buttonSubmit: {
      marginTop: 20,
      width: 290
    },
    divider: {
      marginTop: 5,
      marginBottom:5,
      alignSelf: 'center'

    },
    toolbar: {
      height: 56,
      backgroundColor: '#3F51B5'
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
