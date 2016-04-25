

import React, { Component } from 'react-native';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import HourBank from './HourBank';


/**
 * Componente raiz. Aqui o store do redux é inicializado
 */
class Root extends Component {

  // Construtor
  constructor() {
    super();
    this.state = {
      isLoading: true,
      // store do redux
      store: configureStore(() => this.setState({isLoading: false}))
    };
  }

  /**
   * Renderiza o componente
   * @return {ReactElement}
   */
  render() {
    // Se está carregando, retorna nada
    if(this.state.isLoading) {
      return null;
    }

    return (
      <Provider store={this.state.store}>
        <HourBank />
      </Provider>
    );
  }
}

export default Root;
