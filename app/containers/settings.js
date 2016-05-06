import React, {
  Component,
  View,
  Text,
  StyleSheet
} from 'react-native';

import Touchable from '../components/common/Touchable';

import {connect} from 'react-redux';
import Header from '../components/common/Header';
import * as HBStyleSheet from '../components/common/HBStyleSheet';
import Icon from 'react-native-vector-icons/MaterialIcons';
import moment from 'moment';
import Color from '../resource/color'; //Importa a palheta de cores
import Notification from 'react-native-system-notification';

class Settings extends Component {

  handleShowMenu() {
    this.context.openDrawer();
  }

  notification() {

    // Notification.create({
    //   subject: 'Scheduled Notification',
    //   message: 'This notification will show on every Friday morning at 8:30 AM, starts at 2015/9/9 and end after 10 times.',
    //   sendAt: new Date(2016, 4, 6, 8, 0),
    //   repeatEvery: 'day',
    //   count: 10
    // });
    Notification.create({
      subject: 'Scheduled Notification',
      message: 'This notification will show on every Friday morning at 8:30 AM, starts at 2015/9/9 and end after 10 times.'
    });
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
      <View style={styles.container} >
        <Header
          style={styles.header}
          title="Configurações"
          leftItem={leftItem} >
        </Header>

        <Touchable onPress={this.notification.bind(this)}>
              <View>
                <Text>
                  Notificação
                </Text>
              </View>
        </Touchable>

      </View>
    );
  }

}

Settings.contextTypes = {
  openDrawer: React.PropTypes.func,
};

var styles = HBStyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    android: {
      backgroundColor: Color.color.PrimaryColor,
    },
  },
  body: {
    flex: 1
  }
});

// function mapStateToProps(state) {
//     return {
//       fetchData: state.fetchData,
//       user: state.user
//     };
// }

// function mapDispatchToProps(dispatch) {
//   return {
//     changeImageUser: (userId, picture, profile) => dispatch(changeImageUser(userId, picture, profile)),
//     changeProfile: (userId, profile) => {dispatch(changeProfile(userId, profile))}
//   };
// }


export default connect()(Settings);
