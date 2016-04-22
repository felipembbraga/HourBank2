import React, {Alert, Component, Image, StyleSheet, Text, View} from 'react-native';
import {connect} from 'react-redux';
import DrawerLayout from '../components/common/DrawerLayout';
import MenuItem from './menuitem';
import Home from './home';
import {switchTab} from '../actions/navigation';

class SideMenu extends Component {


  constructor(props) {
    super(props);
    this.renderNavigationView = this.renderNavigationView.bind(this);
    this.openDrawer = this.openDrawer.bind(this);
  }

  getChildContext() {
    return {
      openDrawer: this.openDrawer,
    };
  }

  openDrawer() {
    this.refs.drawer.openDrawer();
  }

  renderView() {
    switch (this.props.navigation.tab) {
      case 'home':
        return <Home navigator={this.props.navigator} />
      default:

    }
  }

  onTabSelect(tab) {
    if (this.props.tab !== tab) {
      this.props.switchTab(tab);
    }
    this.refs.drawer.closeDrawer();
  }

  onExit() {
    Alert.alert(
      'Fazendo logout',
      'Deseja mesmo sair da sua conta?',
      [
        {text: 'Cancelar', onPress: () => {}, style: 'cancel'},
        {text: 'OK', onPress: () => this.props.navigator.immediatelyResetRouteStack([{name:'signin'}])},
      ]
    )
  }

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
          badge={'20'}
          onPress={this.onTabSelect.bind(this, 'home')} />
        <MenuItem
          title="Sair"
          icon="android-exit"
          onPress={this.onExit.bind(this)} />
      </View>
    );
  }

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

SideMenu.childContextTypes = {
  openDrawer: React.PropTypes.func,
};

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

function mapStateToProps(state) {
  return {
    navigation: state.navigation
  }
}

function mapDispatchToProps(dispatch) {

  return {
    switchTab: (tab) => dispatch(switchTab(tab))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SideMenu);
