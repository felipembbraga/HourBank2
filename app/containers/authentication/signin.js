import React, {
    AsyncStorage,
    Component,
    StyleSheet,
    Text,
    TextInput,
    View
} from 'react-native';
import MK, {MKButton, MKColor, MKSpinner} from 'react-native-material-kit';
import { connect } from 'react-redux';
import {signIn} from '../../actions/authentication_actions';

// import BaseRef from '../../base';

const SignInButton = new MKButton.coloredButton().withBackgroundColor(MKColor.Indigo).withText('ENTRAR').build();

const CreateAccountButton = new MKButton.coloredButton().withBackgroundColor(MKColor.Silver).withTextStyle({
    color: '#212121',
    fontWeight: 'bold',
  }).withText('PRECISO DE UMA CONTA...').build();

class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        };
        // this.baseRef = BaseRef;

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

              <Text style={styles.label}>Email:
              </Text>
              <TextInput
                style={styles.input}
                value={this.state.email}
                onChangeText={(text) => this.setState({email: text})}
                keyboardType="email-address"
              />
              <Text style={styles.label}>Password</Text>
              <TextInput
                secureTextEntry={true}
                style={styles.input}
                value={this.state.password}
                onChangeText={(text) => this.setState({password: text})}
              />
              <Text>{this.props.authentication.error}</Text>

              <View style={styles.buttonGroup}>
                <SignInButton onPress={this.onPress}/>
              </View>
              <View style={styles.buttonGroup}>
                <CreateAccountButton onPress={() => {this.props.navigator.push({name: 'signup', title: 'Registre-se'})}}/>
              </View>
            </View>
        )
    }

    onPress() {
        this.props.signIn(this.state);
    }
    componentWillReceiveProps(nextProps) {
      if(nextProps.authentication.user) {
        this.props.navigator.immediatelyResetRouteStack([{name: 'home'}]);
      }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'stretch'
    },
    form: {
        flex: 2,
        justifyContent: 'space-around',
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
    },
    buttonGroup: {
        justifyContent: 'center',
        marginTop: 20,
        alignItems: 'stretch'
    },
    button: {
    }

});

function mapStateToProps(state) {
  return {
    authentication: state.authentication
  };
}

function mapDispatchToProps(dispatch) {

  return {
    signIn: (user) => {dispatch(signIn(user))}
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
