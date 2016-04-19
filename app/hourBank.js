import React, { AppState, Component, StyleSheet, View, StatusBar,Text } from 'react-native';
import {connect} from 'react-redux';
import HBNavigator from './navigator';

class HourBank extends Component {

  componentDidMount() {
    AppState.addEventListener('change', this.handleAppStateChange);
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this.handleAppStateChange);
  }

  handleAppStateChange(appState) {

  }

  render() {
    // if (!this.props.isLoggedIn) {
    //   return <Text>Loge-se!</Text>;
    // }
    return (
      <View style={styles.container}>
        <StatusBar
          translucent={true}
          backgroundColor="rgba(255, 214, 0, 0.8)"
          barStyle="light-content"
        />
        <HBNavigator />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

function mapStateToProps(state) {
  return {
    isLoggedIn: state.user.isLoggedIn
  };
}

export default connect(mapStateToProps)(HourBank);
