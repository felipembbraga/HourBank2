import React, {
  Component,
  View,
  Text,
  StyleSheet,
  ProgressBarAndroid,
  Image,
  TextInput,
  ToastAndroid,
} from 'react-native';
import {connect} from 'react-redux';
import Header from '../components/common/Header';
import Color from '../resource/color'; //Importa a palheta de cores
import * as HBStyleSheet from '../components/common/HBStyleSheet';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ProgressBar from '../components/common/ProgressBar';
import {changeProfile, changeImageUser} from '../actions/profile';
import moment from 'moment';
var ImagePickerManager = require('NativeModules').ImagePickerManager;

class Profile extends Component {


  constructor(props) {
    super(props);

    // opções do ImagePickerManager
    this.cameraOptions = {
      title: 'Selecionar imagem',
      cancelButtonTitle: 'Cancelar',
      takePhotoButtonTitle: 'Capturar...',
      chooseFromLibraryButtonTitle: 'Buscar na biblioteca...',
      cameraType: 'front',
      aspectX: 1,
      aspectY: 1,
      quality: 0.2,
      angle: 0,
      allowsEditing: true
    };

    this.state = {
      user: null,
      edit: false,
      name: this.props.user.name,
      isFetching: false
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
      this.props.changeProfile(this.props.user.id, this.state);
    }
  }

  takePicture() {

      console.log('tirando foto');

          // this.setState({
          //   isFetching: true
          // });

          let time = moment();
          // pega a Imagem
          ImagePickerManager.showImagePicker(this.cameraOptions, (response)  => {

            // se o usuário cancelou, notifica na tela
            if(response.didCancel) {
              ToastAndroid.show('Cancelado.', ToastAndroid.SHORT);
              this.setState({
                isFetching: false
              });
              return;
            }

            // se deu erro, notifica na tela
            if(response.error) {
              ToastAndroid.show('Erro ao receber a foto', ToastAndroid.SHORT);
              console.log(error);
              this.setState({
                isFetching: false
              });
              return;
            }


            console.log(response);
            console.log(this.props.user.id);
            // action de bater o Ponto
            // @see app/actions/point.js
            this.props.changeImageUser(
              this.props.user.id, {
              uri: response.uri,
              data: 'data:image/jpeg;base64,' + response.data
              } , this.state);

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

      if(this.state.isFetching) {
        return (
          <ProgressBar text={this.props.fetchData.message} />
        )
      }

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
      fetchData: state.fetchData,
      user: state.user
    };
}

function mapDispatchToProps(dispatch) {
  return {
    changeImageUser: (userId, picture, profile) => dispatch(changeImageUser(userId, picture, profile)),
    changeProfile: (userId, profile) => {dispatch(changeProfile(userId, profile))}
  };
}


export default connect(mapStateToProps,mapDispatchToProps)(Profile);
