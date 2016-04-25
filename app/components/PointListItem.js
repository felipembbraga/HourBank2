import React, {
  Alert,
  Component,
  PropTypes,
  StyleSheet,
  Text,
  View
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Touchable from './common/Touchable';
import moment from 'moment';
import ptBr from 'moment/locale/pt-br';


/**
 * Componente chamado pelo PointList para renderizar cada ponto batido
 */
class PointListItem extends Component {

  /**
   * Renderiza o componente
   * @return {ReactElement}
   */
  render() {

    // pega a hora e o minuto do ponto
    let {hour, minute} = this.props.point;

    // formata usando o moment
    let time = moment({hour, minute}).format('HH:mm');

    // define o icone de acordo com o tipo de ponto (in/out)
    let icon = `log-${this.props.point.type}`;

    // define o estilo do icone de acordo com o tipo de ponto (in/out)
    let iconStyle = this.props.point.type === 'in' ? styles.iconIn : styles.iconOut;

    // recebe estilo definido no props
    let style = this.props.style || {};
    return (
      <View style={[styles.container, ...style]}>

        {/*Ĩcone*/}
        <View style={styles.fluxIconWrapper}>
          <Icon name={icon} style={[styles.icon, iconStyle]} />
        </View>

        {/*Hora*/}
        <View style={styles.timeWrapper}>
          <Text style={styles.time}>{time}</Text>
        </View>

        {/*Botões*/}
        <View style={styles.buttonsGroupWrapper}>

          {/*botão de localização*/}
          <Touchable
            onPress={()=>this.props.onLocationPress(this.props.point)}
          >
            <View style={styles.button}>
              <Icon
                name="location"
                style={[styles.icon, styles.iconLocation]} />
            </View>
          </Touchable>

          {/*Botão de visualização*/}
          <Touchable
            onPress={()=>this.props.onViewPress(this.props.point)}
          >
            <View style={styles.button}>
              <Icon name="eye" style={styles.icon} />
            </View>
          </Touchable>
        </View>
      </View>
    );
  }
}

// Props do componente
PointListItem.propTypes = {
  point: PropTypes.object.isRequired,
  onViewPress: PropTypes.func.isRequired,
  onLocationPress: PropTypes.func.isRequired
}

// Estilos do componente
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
  time: {
    fontSize: 20
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
