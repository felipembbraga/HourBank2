import React, {
  Component,
  View,
  Text,
  StyleSheet,
  Image
} from 'react-native';
import {connect} from 'react-redux';
import Header from '../components/common/Header';
import Color from '../resource/color'; //Importa a palheta de cores
import * as HBStyleSheet from '../components/common/HBStyleSheet';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/MaterialIcons';

class Profile extends Component {

  constructor(props) {
    super(props);

    this.state = {
      user: null
    };

  }

  handleShowMenu() {
    this.context.openDrawer();
  }

  componentDidMount() {
    console.log(this.props.user);
  }

  componentWillReceiveProps(newProps) {
    console.log(newProps);
  }

  render() {

    leftItem = {
        title: 'Menu',

        /**
         * Ao passar um numero maior que zero muda
         * o icone indicando que á notificações
         */
        icon: 0
          ? require('../resource/img/hamburger-unread.png')
          : require('../resource/img/hamburger.png'),
        onPress: this.handleShowMenu.bind(this),
      };


    return (
      <View style={styles.container}>

        <Header
          style={styles.header}
          title="Profile"
          leftItem={leftItem} >
        </Header>

        <View style={styles.body}>

          <View style={styles.profileHeader}>
            <Image
              style={styles.placeholder}white
              source={require('../resource/img/will.jpg')}>
            </Image>
            <Text style={styles.labelTitle}>
              Will Smith
            </Text>

          </View>

          <View style={styles.profileBody}>
            <Text style={styles.label}>
              Email
            </Text>
            <Text style={styles.labelInfo}>
              {this.props.user.email}
            </Text>
          </View>

          <ActionButton
            buttonColor={Color.color.AccentColor}
            icon={<Icon
              name="edit"
              size={30}
              color="#ccc" />} >

          </ActionButton>

        </View>

      </View>
    );
  }

}

Profile.contextTypes = {
  openDrawer: React.PropTypes.func,
};

var styles = HBStyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    android: {
      backgroundColor: Color.color.PrimaryColor,
    },
  },
  body: {
    flex: 1
  },
  profileHeader: {
    flex: 1.7,
    backgroundColor: Color.color.DimGray
  },
  profileBody: {
    flex: 2,
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 10
  },
  placeholder: {
    width: 170,
    height: 170,
    alignSelf: 'center',
    marginTop: 10,
    borderRadius: 80,
  },
  labelTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    alignSelf: 'center',

  },
  label: {
    fontSize: 16
  },
  labelInfo: {
    fontSize: 20,
    fontWeight: 'bold'
  }
});

function mapStateToProps(state) {
    return {
      user: state.user
    };
}

// function mapDispatchToProps(dispatch) {
//   return ;
// }


export default connect(mapStateToProps)(Profile);
