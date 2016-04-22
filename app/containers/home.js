import React, {
  Alert,
  Component,
  Linking,
  ListView,
  StyleSheet,
  Text,
  TimePickerAndroid,
  ToastAndroid,
  View
} from 'react-native';
import {connect} from 'react-redux';

import Icon from 'react-native-vector-icons/Ionicons';
import moment from 'moment';
import ptBr from 'moment/locale/pt-br';
import PointList from '../components/PointList';
import Color from '../resource/color'; //Importa a palheta de cores
import ActButton from '../components/common/action-button';

class Home extends Component {
    constructor(props) {
        super(props);
        const dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            user: null,
            date: moment(),
            points: [],
            dataSource
        }

        this.onPress = this.onPress.bind(this);
    }

    async hitPoint(type) {

      let lastPoint = this.state.points.slice(-1)[0];
      if(lastPoint && lastPoint.type === type) {
        ToastAndroid.show('', ToastAndroid.SHORT);
      }

      try{
        const {action, minute, hour} = await TimePickerAndroid.open();
        if(action === TimePickerAndroid.dismissedAction) {
          ToastAndroid.show('Cancelado', ToastAndroid.SHORT);
          return;
        }

        const point = {type,hour,minute};
        navigator.geolocation.getCurrentPosition((location) => {
          point.location = location;
          let points = this.state.points.concat([point]);
          this.setState({
            points,
            dataSource : this.state.dataSource.cloneWithRows(points)
          });
        });

      } catch ({code, message}) {
        ToastAndroid.show('This is a toast with short duration', ToastAndroid.SHORT);
      }
    }

    linkingLocation(point) {
      let {latitude, longitude} = point.location.coords;
      let url = `https://www.google.com/maps/@${latitude},${longitude},18z`;
      // console.log(point.location.coords);
      Linking.openURL(url);
    }

    render() {

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
          onPress: this.hitPoint.bind(this, pointItem.type)
        }


        return (
            <View style={styles.container}>
              <View style={[styles.clockContainer]}>
                <Text style={[styles.date, styles.clockText]}>{this.state.date.format('DD/MMMM/YYYY')}</Text>
                <Text style={[styles.clockText]}>{this.state.date.format('dddd')}</Text>
              </View>
              <View style={[styles.pointListContainer]}>
                <PointList
                  points={this.state.points}
                  onEditPress={()=>Alert.alert('editando...')}
                  onLocationPress={this.linkingLocation.bind(this)}
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
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'stretch',
        paddingTop: 24
    },
    clockContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: Color.color.PrimaryColor
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
    }
});

function mapStateToProps(state) {
    return {user: state.user};
}

export default connect(mapStateToProps)(Home);
