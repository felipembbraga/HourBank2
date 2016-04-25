import React, {
  BackAndroid,
  Component,
  Navigator,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  View
} from 'react-native';
import {connect} from 'react-redux';
import SignIn from './containers/authentication/signin';
import SignUp from './containers/authentication/signup';
import SideMenu from './containers/sidemenu';

/**
 * Componente que cria o navigator e implementa as funções
 * para o botão de backdo android
 */
class HBNavigator extends Component {

  /**
   * construtor do componente
   * @param  {object} props
   * @return {void}
   */
  constructor(props) {
    super(props);

    // lista dos handlers
    this._handlers = [];

    //vincula as funções com o componente
    this.renderScene = this.renderScene.bind(this);
    this.addBackButtonListener = this.addBackButtonListener.bind(this);
    this.removeBackButtonListener = this.removeBackButtonListener.bind(this);
    this.handleBackButton = this.handleBackButton.bind(this);
  }

  /**
   * Component Lifecycle Method
   * @return {void}
   */
  componentDidMount() {
    // Adiciona uma função de callback para o evento
    // de apertar o botão voltar do Android
    BackAndroid.addEventListener('hardwareBackPress', this.handleBackButton);
  }

  /**
   * Component Lifecycle Method
   * @return {void}
   */
  componentWillUnmount() {
    // Remove uma função de callback quando o componente é removido
    BackAndroid.removeEventListener('hardwareBackPress', this.handleBackButton);
  }

  /**
   * define os contexts para os componentes filhos
   * @return {object}
   */
  getChildContext() {
    return {
      addBackButtonListener: this.addBackButtonListener,
      removeBackButtonListener: this.removeBackButtonListener,
    };
  }

  /**
   * adiciona o listener do botão retornar na lista de handlers
   * @param {object} listener
   * @return {void}
   */
  addBackButtonListener(listener) {
    this._handlers.push(listener);
  }

  /**
   * remove o listener do botão retornar na lista de handlers
   * @param {object} listener
   * @return {void}
   */
  removeBackButtonListener(listener) {
    this._handlers = this._handlers.filter((handler) => handler !== listener);
  }

  /**
   * Manipula o botão de voltar.
   * @return {boolean} -> retorna false caso seja para sair da aplicação
   */
  handleBackButton() {
    // percorre os handlers do fim para o começo
    for (let i = this._handlers.length - 1; i >= 0; i--) {
      // caso exista alguma execução a ser feita, executa e retorna true
      if (this._handlers[i]()) {
        return true;
      }
    }

    // verifica o navigator
    const {navigator} = this.refs;

    // caso exista uma cena empilhada no navigator, remove a rota do topo
    if (navigator && navigator.getCurrentRoutes().length > 1) {
      navigator.pop();
      return true;
    }

    // sai da aplicação
    return false;
  }

  /**
   * Renderiza o componente
   * @return {ReactElement}
   */
  render() {
    return (
        <View style={styles.sceneContainer}>
          <Navigator
            ref="navigator"
            style={styles.container}
            configureScene={(route) => {
              // caso seja android, faz a transição de baixo pra cima
              if (Platform.OS === 'android') {
                return Navigator.SceneConfigs.FloatFromBottomAndroid;
              }
              // No caso do IOS, faz a transição da esquerda pra direita
              return Navigator.SceneConfigs.FloatFromRight;
            }}
            initialRoute={{}}
            renderScene={this.renderScene}
          />
        </View>
    );
  }

  /**
   * Renderiza o componente referente à cena requisitada
   * @param  {object} route -> rota requisitada
   * @param  {object} navigator -> navigator utilizado
   * @return {ReactElement} -> retorna o componente referenta à rota
   */
  renderScene(route, navigator) {
      switch(route.name){
          case 'signin':
            return (<SignIn route={route} navigator={navigator} />);
          case 'signup':
            return (<SignUp route={route} navigator={navigator} />);
          case 'home':
            return (<SideMenu route={route} navigator={navigator} />);
          default:
            // se o usuário está logado, retorna o sidemenu,
            // senão, retorna a tela de login
            if(this.props.user.isLoggedIn){
                return (<SideMenu route={route} navigator={navigator} />);
            }

            return (<SignIn route={route} navigator={navigator} />);
      }
  }
}

// tipos de contextos filhos
HBNavigator.childContextTypes = {
  addBackButtonListener: React.PropTypes.func,
  removeBackButtonListener: React.PropTypes.func,
};

// Estilos do componente
var styles = StyleSheet.create({
  container: {
    flex: 1
  },
  sceneContainer: {
      flex: 1
  }
});


/**
 * função que mapeia o state do redux para os props do componente
 * @param  {object} state
 * @return {object}
 */
function mapStateToProps(state) {
  return {
    user: state.user
  };
}

export default connect(mapStateToProps)(HBNavigator);
