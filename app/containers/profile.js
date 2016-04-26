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
            <Text style={styles.nameLabel}>
              Will Smith
            </Text>
          </View>

          <View style={styles.profileBody}>
          </View>

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
    flex: 1.5,
    backgroundColor: Color.color.LightPrimaryColor
  },
  profileBody: {
    flex: 2
  },
  placeholder: {
    width: 170,
    height: 170,
    alignSelf: 'center',
    marginTop: 10,
    borderRadius: 80,
  },
  nameLabel: {
    fontSize: 30,
    color: Color.color.PrimaryText,
    alignSelf: 'center'
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
