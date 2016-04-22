import React, {Alert, Component, StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Touchable from './common/Touchable';
import moment from 'moment';
import ptBr from 'moment/locale/pt-br';

class PointListItem extends Component {
  render() {
    let {hour, minute} = this.props.point;
    let time = moment({hour, minute}).format('HH:mm')

    let icon = `log-${this.props.point.type}`;
    let iconStyle = this.props.point.type === 'in' ? styles.iconIn : styles.iconOut;
    let style = this.props.style || {};
    return (
      <View style={[styles.container, ...style]}>
        <View style={styles.fluxIconWrapper}>
          <Icon name={icon} style={[styles.icon, iconStyle]} />
        </View>
        <View style={styles.timeWrapper}>
          <Text>{time}</Text>
        </View>
        <View style={styles.buttonsGroupWrapper}>
          <Touchable onPress={()=>this.props.onLocationPress(this.props.point)}>
            <View style={styles.button}>
              <Icon name="location" style={[styles.icon, styles.iconLocation]} />
            </View>
          </Touchable>
          <Touchable onPress={()=>this.props.onLocationPress(this.props.point)}>
            <View style={styles.button}>
              <Icon name="edit" style={[styles.icon]} />
            </View>
          </Touchable>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10
  },
  icon: {
    fontSize: 20
  },
  fluxIconWrapper: {
    flex: 1,
    alignItems: 'center'
  },
  iconIn: {
    color: 'green'
  },
  iconOut: {
    color: 'red'
  },

  timeWrapper: {
    flex: 5,
    paddingHorizontal: 5
  },

  buttonsGroupWrapper: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  button: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius:50,
    backgroundColor: 'rgba(170, 180, 182, 0.64)'
  },
  iconLocation: {
    color: 'red'
  }
});

export default PointListItem;
