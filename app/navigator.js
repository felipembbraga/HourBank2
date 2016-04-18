import React, {
  BackAndroid,
  Component,
  Navigator,
  Platform,
  PropTypes,
  StatusBar,
  StyleSheet,
  Text,
  View
} from 'react-native';
import {connect} from 'react-redux';
import SignIn from './containers/authentication/signin';
import SignUp from './containers/authentication/signup';
import Home from './containers/home';


const ROUTES = {
    authentication: {
        signin: SignIn
    }
};

class HBNavigator extends Component {

  constructor(props) {
    super(props);
    this._handlers = [];

    this.renderScene = this.renderScene.bind(this);
  }

  componentDidMount() {
    BackAndroid.addEventListener('hardwareBackPress', this.handleBackButton);
  }

  componentWillUnmount() {
    BackAndroid.removeEventListener('hardwareBackPress', this.handleBackButton);
  }

  getChildContext() {
    return {
      addBackButtonListener: this.addBackButtonListener,
      removeBackButtonListener: this.removeBackButtonListener,
    };
  }

  addBackButtonListener(listener) {
    this._handlers.push(listener);
  }

  removeBackButtonListener() {
    this._handlers = this._handlers.filter((handler) => handler !== listener);
  }

  handleBackButton() {
    for (let i = this._handlers.length - 1; i >= 0; i--) {
      if (this._handlers[i]()) {
        return true;
      }
    }

    const {navigator} = this.refs;
    if (navigator && navigator.getCurrentRoutes().length > 1) {
      navigator.pop();
      return true;
    }
    return false;
  }

  render() {
    return (
        <View style={styles.sceneContainer}>
          <StatusBar
            translucent={true}
            backgroundColor="blue"
            barStyle="light-content"
          />
      <Navigator
        ref="navigator"
        style={styles.container}
        configureScene={(route) => {
          if (Platform.OS === 'android') {
            return Navigator.SceneConfigs.FloatFromBottomAndroid;
          }
          // TODO: Proper scene support
          if (route.shareSettings || route.friend) {
            return Navigator.SceneConfigs.FloatFromRight;
          } else {
            return Navigator.SceneConfigs.FloatFromBottom;
          }
        }}
        initialRoute={{}}
        renderScene={this.renderScene}
      />
  </View>
    );
  }

  renderScene(route, navigator) {
      const scene = null;
      switch(route.name){
          case 'signin':
            return (<SignIn route={route} navigator={navigator} />);
          case 'signup':
            return (<SignUp route={route} navigator={navigator} />);
          case 'home':
            return (<Home route={route} navigator={navigator} />);
          default:
            if(this.props.user.isLoggedIn){
                return (<Home route={route} navigator={navigator} />);
            }

            return (<SignIn route={route} navigator={navigator} />);
      }
  }
}

HBNavigator.childContextTypes = {
  addBackButtonListener: PropTypes.func,
  removeBackButtonListener: PropTypes.func,
};

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

var styles = StyleSheet.create({
  container: {
    flex: 1
  },
  sceneContainer: {
      flex: 1
  }
});

export default connect(mapStateToProps)(HBNavigator);
