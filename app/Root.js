import React, { Component } from 'react-native';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import HourBank from './hourBank';


// Classe inicial da aplicação
class Root extends Component {

  // Construtor
  constructor() {
    super();
    this.state = {
      isLoading: true,
      store: configureStore(() => this.setState({isLoading: false}))
    };
  }

  // render
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
