

import React, {
  AppState,
  Component,
  StyleSheet,
  View,
  StatusBar,
  Text
} from 'react-native';
import { connect } from 'react-redux';
import HBNavigator from './HBNavigator';

/**
 * Componente principal do app. Aqui é definido o navigator, o statusbar e
 * são controlados os states do app no device.
 */
class HourBank extends Component {

  /**
   * Component Lifecycle method
   * @return {void}
   */
  componentDidMount() {
    // adiciona uma função de callback quando mudar o state do app
    AppState.addEventListener('change', this.handleAppStateChange);
  }

  /**
   * Component Lifecycle method
   * @return {void}
   */
  componentWillUnmount() {
    //remove a função de callback quando o componente for removido
    AppState.removeEventListener('change', this.handleAppStateChange);
  }

  /**
   * Função chamada quando o state do app no device mudar
   * @param  {string} appState: state do app. (active|background|inactive)
   * @return {void}
   */
  handleAppStateChange(appState) {

  }

  /**
   * Renderiza o componente
   * @return {ReactElement}
   */
  render() {
    return (
      <View style={styles.container}>
        {/*Status bar*/}
        <StatusBar
          translucent={true}
          backgroundColor="#303F9F"
          barStyle="light-content"
        />
        {/*Navigator*/}
        <HBNavigator />
      </View>
    );
  }
}

// Estilos do componente
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

/**
 * função de mapeamento do state do redux para o props do componente
 * @param  {object} state -> state atual
 * @return {object} ->
 */
function mapStateToProps(state) {
  return {
    isLoggedIn: state.user.isLoggedIn
  };
}

// conecta o redux com o componente e exporta a classe.
export default connect(mapStateToProps)(HourBank);
