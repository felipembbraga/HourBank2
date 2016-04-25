import React, {
  Component,
  Dimensions,
  Linking,
  ListView,
  Modal,
  ProgressBarAndroid,
  Text,
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
import ActButton from '../components/common/ActButton';
import Header from '../components/common/Header';
import * as HBStyleSheet from '../components/common/HBStyleSheet';
import {getTime} from '../resource/timezonedb';
import Touchable from '../components/common/Touchable';
import PointViewModal from '../components/PointViewModal';
import ProgressBar from '../components/common/ProgressBar';
import {hitPoint} from '../actions/point';
var ImagePickerManager = require('NativeModules').ImagePickerManager;

/**
 * Container da tela Home
 */
class Home extends Component {

  /**
   * construtor do componente
   * @param  {any} props
   * @return {void}
   */
  constructor(props) {
    super(props);

    // opções do ImagePickerManager
    this.cameraOptions = {
      title: 'Select Avatar',
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

    // instancia o dataSource do listView
    const dataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });


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

    // Vincula as funções com o componente
    this.onPress = this.onPress.bind(this);
  }

    /**
     * bater o ponto
     * @param  {string} type -> 'in' | 'out'
     * @return {void}
     */
    _hitPoint(type) {
      let time = moment();
      // pega a Imagem
      ImagePickerManager.launchCamera(this.cameraOptions, (response)  => {

        // se o usuário cancelou, notifica na tela
        if(response.didCancel) {
          ToastAndroid.show('Cancelado.', ToastAndroid.SHORT);
          return;
        }

        // se deu erro, notifica na tela
        if(response.error) {
          ToastAndroid.show('Erro ao receber a foto', ToastAndroid.SHORT);
          console.log(error);
          return;
        }
        this.props.hitPoint(type, {uri: response.uri, isStatic: true});

        // // extrai da data
        // let date = time.format('DD/MM/YYYY');
        //
        // // gera o ponto
        // point = {
        //   type,
        //   location,
        //   date,
        //   hour: time.hour(),
        //   minute: time.minute(),
        //   // picture: {uri: 'data:image/jpeg;base64,' + response.data, isStatic: true}
        //   picture: {uri: response.uri, isStatic: true}
        // }
        //
        // // salva no state
        // let points = this.state.points.concat([point]);
        // this.setState({
        //   isLoading: false,
        //   points,
        //   dataSource : this.state.dataSource.cloneWithRows(points)
        // });

      });
      // busca a localização
      // navigator.geolocation.getCurrentPosition(async (location) => {
      //   try {
      //     // busca a hora no timezonedb
      //     let timezone = await getTime(location);
      //     // converte o timestamp
      //     time = moment.unix(timezone.timestamp).add(3, 'hour');
      //
      //
      //   } catch ({error, message}) {
      //     this.setState({isLoading: false});
      //     ToastAndroid.show('Erro em receber a hora da rede', ToastAndroid.SHORT);
      //   } finally {
      //
      //   }
      // }, () => {
      //   this.setState({isLoading: false});
      //   ToastAndroid.show('Erro em receber o ponto geográfico', ToastAndroid.SHORT);
      // });
    }

    _linkingLocation(point) {
      let {latitude, longitude} = point.location.coords;
      let url = `https://www.google.com/maps/@${latitude},${longitude},18z`;
      // console.log(point.location.coords);
      Linking.openURL(url);
    }

    _viewPoint(point) {


    }

    _onModalClose() {

    }

    render() {
      if(this.props.fetchData.isFetching) {
        return (
          <ProgressBar text={this.props.fetchData.message} />
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
              points={[]}
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
    return {
      fetchData: state.fetchData,
      user: state.user
    };
}

function mapDispatchToProps(dispatch) {
  return {
    hitPoint: (pointType, picture) => dispatch(hitPoint(pointType, picture))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
