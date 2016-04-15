import React,{
  AsyncStorage,
  Component,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { connect } from 'react-redux';

class Home extends Component {
  constructor(props){
    super(props);
    this.state = {
      user: null
    }
  }
  componentWillMount() {
    AsyncStorage.getItem('user').then((user) => {
      this.setState({user: JSON.parse(user)});
    })
  }

  saudation() {
    return (
      <Text>
        Welcome back, {this.props.authentication.user.email}!
      </Text>
    )
  }
  render() {
    return (
        <View style={styles.container}>
          {this.saudation()}
        </View>
      );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

function mapStateToProps(state) {
  return {
    authentication: state.authentication
  };
}

export default connect(mapStateToProps)(Home);
