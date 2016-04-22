import React, {
  Alert,
  Component,
  Dimensions,
  Linking,
  ListView,
  Modal,
  Text,
  TimePickerAndroid,
  ToastAndroid,
  View
} from 'react-native';
import { MKSpinner } from 'react-native-material-kit';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import moment from 'moment';
import ptBr from 'moment/locale/pt-br';
import PointList from '../components/PointList';
import Color from '../resource/color'; //Importa a palheta de cores
import ActButton from '../components/common/action-button';
import Header from '../components/common/Header';
import * as HBStyleSheet from '../components/common/HBStyleSheet';
import {getTime} from '../resource/timezonedb';
import Touchable from '../components/common/Touchable';
import PointViewModal from '../components/PointViewModal';

var ImagePickerManager = require('NativeModules').ImagePickerManager;

class Home extends Component {
    constructor(props) {
        super(props);
        this.cameraOptions = {
          title: 'Select Avatar', // specify null or empty string to remove the title
          cancelButtonTitle: 'Cancelar',
          takePhotoButtonTitle: 'Capturar...', // specify null or empty string to remove this button
          chooseFromLibraryButtonTitle: 'Buscar na biblioteca...', // specify null or empty string to remove this button
          cameraType: 'front', // 'front' or 'back'
          aspectX: 1, // android only - aspectX:aspectY, the cropping image's ratio of width to height
          aspectY: 1, // android only - aspectX:aspectY, the cropping image's ratio of width to height
          quality: 0.2, // 0 to 1, photos only
          angle: 0, // android only, photos only
          allowsEditing: true, // Built in functionality to resize/reposition the image after selection
        };

        const dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            modal: {
              point: {},
              isVisible: false,
            },
            user: null,
            currentDate: moment(),
            points: [],
            dataSource,
            isLoading: false
        }

        this.onPress = this.onPress.bind(this);
    }

    /**
     * bater o ponto
     * @param  {string} type -> tipo entrada/saída
     * @return {void}
     */
    _hitPoint(type) {
      this.setState({isLoading: true});
      // busca a localização
      navigator.geolocation.getCurrentPosition(async (location) => {
        try {
          // busca a hora no timezonedb
          let timezone = await getTime(location);

          // pega a Imagem
          ImagePickerManager.launchCamera(this.cameraOptions, (response)  => {
            if(response.didCancel) {
              this.setState({isLoading: false});
              ToastAndroid.show('Cancelado.', ToastAndroid.SHORT);
              return;
            }
            if(response.error) {
              this.setState({isLoading: false});
              ToastAndroid.show('Erro ao receber a foto', ToastAndroid.SHORT);
              console.log(error);
              return;
            }

            console.log(response);
            // converte o timestamp
            let time = moment.unix(timezone.timestamp).add(3, 'hour');

            // extrai da data
            let date = time.format('DD/MM/YYYY');

            // gera o ponto
            point = {
              type,
              location,
              date,
              hour: time.hour(),
              minute: time.minute(),
              picture: {uri: 'data:image/jpeg;base64,' + response.data, isStatic: true}
            }

            // salva no state
            let points = this.state.points.concat([point]);
            this.setState({
              isLoading: false,
              points,
              dataSource : this.state.dataSource.cloneWithRows(points)
            });

          });


        } catch ({error, message}) {
          this.setState({isLoading: false});
          ToastAndroid.show('Erro em receber a hora da rede', ToastAndroid.SHORT);
        }
      }, () => {
        this.setState({isLoading: false});
        ToastAndroid.show('Erro em receber o ponto geográfico', ToastAndroid.SHORT);
      });
    }

    _linkingLocation(point) {
      let {latitude, longitude} = point.location.coords;
      let url = `https://www.google.com/maps/@${latitude},${longitude},18z`;
      // console.log(point.location.coords);
      Linking.openURL(url);
    }

    _viewPoint(point) {
      this.setState({
        modal: {
          point: point,
          isVisible: true
        }
      });

    }

    _onModalClose() {
      this.setState({
        modal: {
          point: {},
          isVisible: false
        }
      });
    }

    render() {
      if(this.state.isLoading) {
        return (
          <View style={styles.modalContainer}>
            <MKSpinner style={styles.spinner}/>
          </View>
        )
      }

      let lastPoint = this.state.points.slice(-1)[0];
      let pointItem = {
        color: '#1abc9c',
        title: 'Entrada',
        icon: 'arrow-right-c',
        type: 'in'
      };

      // Se o último ponto foi de entrada, altera o botão para saída
      if(lastPoint && lastPoint.type === 'in') {
        pointItem = {
          color: '#ff004c',
          title: 'Saída',
          icon: 'arrow-left-c',
          type: 'out'
        };
      }

      let actionItem = {
        buttonColor: pointItem.color,
        title: pointItem.title,
        iconName: pointItem.icon,
        onPress: this._hitPoint.bind(this, pointItem.type)
      }


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
            title="Hour bank"
            leftItem={leftItem} >
          </Header>

          <PointViewModal
            {...this.state.modal}
            onRequestClose={this._onModalClose.bind(this)}
          />
          <View style={[styles.clockContainer]}>
            <Text style={[styles.date, styles.clockText]}>{this.state.currentDate.format('DD/MMMM/YYYY')}</Text>
            <Text style={[styles.clockText]}>{this.state.currentDate.format('dddd')}</Text>
          </View>
          <View style={[styles.pointListContainer]}>
            <PointList
              points={this.state.points}
              onViewPress={this._viewPoint.bind(this)}
              onLocationPress={this._linkingLocation.bind(this)}
            />
          </View>

          {/*Action Button*/}

          <ActButton
            buttonColor={Color.color.AccentColor}
            actionItems={[actionItem]}
          />

        </View>
      );
    }

    borderStylus(color) {
      return {
        borderWidth: 1,
        borderColor: color
      }
    }

    onPress() {
        this.props.navigator.immediatelyResetRouteStack([
            {
                name: 'signin'
            }
        ]);
    }

    handleShowMenu() {
      this.context.openDrawer();
    }
}


Home.contextTypes = {
  openDrawer: React.PropTypes.func,
};

var styles = HBStyleSheet.create({
  container: {
    flex: 1,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  innerContainer: {
    borderRadius: 10,
    alignItems: 'center',
  },
  header: {
    android: {
      backgroundColor: Color.color.PrimaryColor,
    },
  },
  clockContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.color.SecondText
  },
  clockText: {
    color: 'white'
  },
  date: {
      fontSize: 40,
  },
  pointListContainer: {
    flex: 2,
    padding: 5
  },
  listView: {
    backgroundColor: '#F5FCFF'
  },
  listItem: {
    flex: 1,
    padding: 5
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    color: '#000',
    padding: 10,
    margin: 40
  }
});

function mapStateToProps(state) {
    return {user: state.user};
}

export default connect(mapStateToProps)(Home);
