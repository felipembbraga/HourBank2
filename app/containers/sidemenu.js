import React, {
  Alert,
  Component,
  Image,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { connect } from 'react-redux';
import DrawerLayout from '../components/common/DrawerLayout';
import MenuItem from '../components/MenuItem';
import Home from './home';
import Profile from './profile';
import Settings from './settings';
import { switchTab } from '../actions/navigation';
import { loadPoints } from '../actions/point';

/**
 * Componente principal para aplicar o DrawerLayout e os conteúdos do mesmo
 */
class SideMenu extends Component {

  /**
   * Construtor do componente
   * @param  {any} props
   * @return {void}
   */
  constructor(props) {
    super(props);

    // vincula as funções ao componente
    this.renderNavigationView = this.renderNavigationView.bind(this);
    this.openDrawer = this.openDrawer.bind(this);
  }

  /**
   * define os contextos para os componentes filhos
   * @return {Object}
   */
  getChildContext() {
    return {
      openDrawer: this.openDrawer,
    };
  }

  /**
   * Função que abre o Drawer pelo controlador (this.refs.drawer)
   * @return {void}
   */
  openDrawer() {
    this.refs.drawer.openDrawer();
  }

  /**
   * renderiza a "tab" selecionada
   * @return {ReactElement}
   */
  renderView() {
    switch (this.props.navigation.tab) {
      case 'home':
        return <Home navigator={this.props.navigator} />
      case 'profile':
        return <Profile navigator={this.props.navigator} />
      case 'settings':
        return <Settings navigator={this.props.navigator} />
      default:
        return <Home navigator={this.props.navigator} />
    }
  }

  /**
   * Função de callback executada quando o componente muda de "tab"
   * @param  {string} tab
   * @return {void}
   */
  onTabSelect(tab) {
    // se a tab mudou, altera a tab
    if (this.props.tab !== tab) {
      // dispara a action
      this.props.switchTab(tab);
    }
    // fecha o drawer após a ação
    this.refs.drawer.closeDrawer();
  }

  /**
   * Função do menu "Sair", que faz logout do sistema
   * @return {void}
   */
  onExit() {
    Alert.alert(
      'Fazendo logout',
      'Deseja mesmo sair da sua conta?',
      [
        {
          text: 'Cancelar',
          onPress: () => {},
          style: 'cancel'
        },
        {
          text: 'OK',
          onPress: () => this.props.navigator.immediatelyResetRouteStack(
            [{name:'signin'}]
          )
        }
      ]
    )
  }

  /**
   * renderiza a parte interna do Drawer (Menu lateral)
   * @return {ReactElement}
   */
  renderNavigationView() {
    return(
      <View style={styles.drawer}>
        <Image
          style={styles.header}
          source={require('./img/menu_background.jpg')}>
          <Text style={styles.name}>Hour Bank</Text>
        </Image>

        <MenuItem
          title="Home"
          selected={this.props.tab === 'home'}
          onPress={this.onTabSelect.bind(this, 'home')} />

        <MenuItem
          title="Profile"
          icon="person"
          selected={this.props.tab === 'profile'}
          onPress={this.onTabSelect.bind(this, 'profile')} />

          <MenuItem
            title="Configurações"
            icon="ios-gear"
            selected={this.props.tab === 'settings'}
            onPress={this.onTabSelect.bind(this, 'settings')} />

        <MenuItem
          title="Sair"
          icon="android-exit"
          onPress={this.onExit.bind(this)} />
      </View>
    );
  }

  /**
   * Renderiza o componente
   * @return {ReactElement}
   */
  render() {
    return (
      <DrawerLayout
        ref="drawer"
        drawerWidth={290}
        drawerPosition="left"
        renderNavigationView={this.renderNavigationView}>
        {this.renderView()}
      </DrawerLayout>
    );
  }

}

// Contextos filhos do componente
SideMenu.childContextTypes = {
  openDrawer: React.PropTypes.func,
};

// Estilos do componente
const styles = StyleSheet.create({
  drawer: {
    flex: 1,
    paddingTop: 24,
    backgroundColor: 'white'
  },
  content: {
    flex: 1,
  },
  header: {
    padding: 18,
    height: 200,
    justifyContent: 'flex-end',
  },
  name: {
    marginTop: 10,
    color: '#666666',
    fontWeight: '800',
    fontSize: 50
  }
});

/**
 * mapeia o state com os props do componente
 * @param  {any} state
 * @return {object}
 */
function mapStateToProps(state) {
  return {
    navigation: state.navigation
  }
}

/**
 * Mapeia as actions com os props do component
 * @param  {function} dispatch
 * @return {object}
 */
function mapDispatchToProps(dispatch) {
  return {
    switchTab: (tab) => dispatch(switchTab(tab))
  };
}

// Conecta o componente com o redux e exporta-o
export default connect(mapStateToProps, mapDispatchToProps)(SideMenu);
