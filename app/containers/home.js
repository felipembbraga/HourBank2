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
import MK, {MKButton, MKColor, MKSpinner} from 'react-native-material-kit';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import moment from 'moment';
import ptBr from 'moment/locale/pt-br';

import PointListItem from '../components/PointListItem';

const SignOutButton = new MKButton.coloredButton().withBackgroundColor(MKColor.Indigo).withText('SAIR').build();

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
    componentWillMount() {

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

    renderRow(point, idSec, idRow) {
      return (
        <PointListItem
          point={point}
          onEditPress={()=>Alert.alert('editando...')}
          onLocationPress={this.linkingLocation.bind(this, point)} />
      );
    }

    renderFooter() {
      let total = this.state.points.reduce((a, b) => {

      }, 0);
      return (
        <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
          <Text>Total:</Text>
          <Text>teste</Text>
        </View>
      );
    }

    render() {

        let lastPoint = this.state.points.slice(-1)[0];
        let pointItem = {
          color: '#1abc9c',
          title: 'Entrada',
          type: 'in'
        };

        // Se o último ponto foi de entrada, altera o botão para saída
        if(lastPoint && lastPoint.type === 'in') {
          pointItem = {
            color: '#ff004c',
            title: 'Saída',
            type: 'out'
          };
        }

        return (
            <View style={styles.container}>
              <View style={[styles.clockContainer, this.borderStylus('red')]}>
                <Text style={styles.date}>{this.state.date.format('DD/MMMM/YYYY')}</Text>
                <Text>{this.state.date.format('dddd')}</Text>
              </View>
              <View style={[styles.pointListContainer, this.borderStylus('blue')]}>
                <ListView
                  dataSource={this.state.dataSource}
                  renderRow={this.renderRow.bind(this)}
                  renderFooter={this.renderFooter.bind(this)}
                  style={styles.listView}
                />
              </View>

              {/*Action Button*/}
              <ActionButton buttonColor="#3C43E7" onPress={() => {
                console.log("hi")
              }}>

                <ActionButton.Item
                  buttonColor={pointItem.color}
                  title={pointItem.title}
                  onPress={this.hitPoint.bind(this, pointItem.type)}
                >
                  <Icon name="arrow-right-c" style={styles.actionButtonIcon}/>
                </ActionButton.Item>

              </ActionButton>
            </View>
        );
        // return (
        //   <DrawerLayout renderNavigationView={() => <View></View>}>
        //     {view}
        //   </DrawerLayout>
        // );
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
        paddingTop: 25
    },
    clockContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
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
