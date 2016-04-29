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

  takePicture() {
    console.log('tira foto');
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
              style={styles.placeholder}
              reiszeMode="container"
              source={{uri: this.props.user.image}}>
            </Image>

          </View>

          <View style={styles.profileBody}>
            <Text style={styles.label}>
              Nome
            </Text>
            <Text style={styles.labelInfo}>
              {this.state.name}
            </Text>
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
              style={styles.placeholder}
              reiszeMode="container"
              source={{uri: this.props.user.image}}>
            </Image>

            <View style={styles.imageButton}>
              <Icon.Button
                name="photo-camera"
                size={30}
                onPress={this.takePicture.bind(this)}
                backgroundColor={Color.color.AccentColor}>
                 <Text style={{fontFamily: 'Arial', fontSize: 15, color: 'white'}}>Tirar foto</Text>
              </Icon.Button>
            </View>

          </View>

          <View style={styles.profileBody}>
            <Text style={styles.label}>
              Nome
            </Text>

            <TextInput
              style={styles.input}
              value={this.state.name}
              autoCapitalize="words"
              onChangeText={(text) => this.setState({name: text})}
            />
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
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  },
  label: {
    marginTop: 10,
    fontSize: 16
  },
  labelInfo: {
    marginTop: 5,
    fontSize: 20,
    fontWeight: 'bold'
  },
  input: {
      fontSize: 20
  },
  imageButton: {
    alignSelf: 'center',
    marginTop: 100
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
