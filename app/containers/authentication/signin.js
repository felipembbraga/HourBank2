import React, {
    Component,
    StyleSheet,
    Text,
    TextInput,
    View,
    Image
} from 'react-native';
import ProgressBar from '../../components/common/ProgressBar';
import MK, {MKButton, MKColor} from 'react-native-material-kit';
import { connect } from 'react-redux';
import {signIn, resetAuth} from '../../actions/authentication';

// import BaseRef from '../../base';

const SignInButton = new MKButton.coloredButton()
  .withBackgroundColor(MKColor.Indigo).withText('ENTRAR').build();

const CreateAccountButton = new MKButton.coloredButton()
  .withBackgroundColor(MKColor.Silver).withTextStyle({
    color: '#212121',
    fontWeight: 'bold',
  }).withText('NÂO TENHO CADASTRO').build();

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

    componentDidMount() {
        this.props.resetAuth();
    }

    render() {
        if(this.props.fetchData.isFetching) {
          return (
            <ProgressBar text={this.props.fetchData.message} />
          )
        }
        return (
            <View style={styles.container}>

              <View style={styles.header}>
                <Image
                  source={require('../img/clock.png')}
                  style={{width: 150, height: 150}} />
              </View>

              <View style={styles.body}>

                <Text style={styles.label}>Email:</Text>
                <TextInput
                  style={styles.input}
                  value={this.state.email}
                  onChangeText={(text) => this.setState({email: text})}
                  keyboardType="email-address"
                />

                <Text style={styles.label}>Senha:</Text>
                <TextInput
                  secureTextEntry={true}
                  style={styles.input}
                  value={this.state.password}
                  onChangeText={(text) => this.setState({password: text})}
                />

                <Text>{this.props.user.error}</Text>

                <View style={styles.buttonSignin}>
                  <SignInButton onPress={this.onPress}/>
                </View>

                <Text style={styles.divider}>
                  Ou
                </Text>

                <View style={styles.buttonSignup}>
                  <CreateAccountButton onPress={() => {this.props.navigator.push({name: 'signup', title: 'Registre-se'})}}/>
                </View>

              </View>

            </View>
        )
    }

    onPress() {
        console.log(this.state);
        this.props.signIn(this.state);
    }


    componentDidUpdate(prevProps, prevState) {
      if(this.props.user.isLoggedIn) {
        this.props.navigator.immediatelyResetRouteStack([{name: 'home'}]);
      }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'stretch'
    },
    header: {
      flex: 1,
      justifyContent: 'flex-end'

    },
    body: {
        flex: 1.5,
        justifyContent: 'center',
        width: 300,
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
    buttonSignin: {
        marginTop: 20,
        width: 290,
        justifyContent: 'flex-start'
    },
    buttonSignup: {
        justifyContent: 'center',
        alignItems: 'stretch',
        width: 290
    },
    divider: {
      marginTop: 5,
      marginBottom:5,

    },
    labelHeader: {
      fontSize: 20,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 10
    }


});

function mapStateToProps(state) {
  return {
    fetchData: state.fetchData,
    user: state.user
  };
}

function mapDispatchToProps(dispatch) {

  return {
    signIn: (user) => {dispatch(signIn(user))},
    resetAuth: ()=> {dispatch(resetAuth())}
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
