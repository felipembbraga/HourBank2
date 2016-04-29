import React, {
  Component,
  View,
  Text,
  StyleSheet,
  Image,
  TextInput
} from 'react-native';
import {connect} from 'react-redux';
import Header from '../components/common/Header';
import Color from '../resource/color'; //Importa a palheta de cores
import * as HBStyleSheet from '../components/common/HBStyleSheet';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {changeProfile} from '../actions/profile';

class Profile extends Component {


  constructor(props) {
    super(props);

    this.state = {
      user: null,
      edit: false,
      name: this.props.user.name,
      key: this.props.user.key
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

  onPress() {
    console.log(this.state.icon);
    if ( ! this.state.edit) {
      this.setState({edit: true});
    } else {
      this.setState({edit: false});
      this.props.changeProfile(this.state);
    }
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

      if ( ! this.state.edit) {
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
              source={{uri: this.props.user.image}}>
            </Image>
            <Text style={styles.labelTitle}>
              {this.state.name}
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
            onPress={this.onPress.bind(this)}
            icon={<Icon
              name="edit"
              size={30}
              color="#ccc" />} >

          </ActionButton>

        </View>

      </View>
    );
  } else {
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
              source={{uri: this.props.user.image}}>
            </Image>

            <TextInput
              style={styles.input}
              value={this.state.name}
              onChangeText={(text) => this.setState({name: text})}
            />

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
            onPress={this.onPress.bind(this)}
            icon={<Icon
              name="check"
              size={30}
              color="#ccc" />} >

          </ActionButton>

        </View>

      </View>
    );
  }
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
    marginTop: 20,
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
  },
  input: {
      padding: 4,
      height: 40,
      borderColor: 'gray',
      borderWidth: 1,
      borderRadius: 5,
      fontSize: 30,
      marginLeft: 40,
      marginRight: 40,
      marginTop: 20,
      margin: 5,
      alignSelf: 'center'
  }
});

function mapStateToProps(state) {
    return {
      user: state.user
    };
}

function mapDispatchToProps(dispatch) {
  return { changeProfile: (profile) => {dispatch(changeProfile(profile))} };
}


export default connect(mapStateToProps,mapDispatchToProps)(Profile);
