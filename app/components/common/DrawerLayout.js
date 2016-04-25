import React, {
  Component,
   DrawerLayoutAndroid
 } from 'react-native';

/**
 * Componente que implementa o DrawerLayoutAndroid.
 */
class DrawerLayout extends Component {

  // Drawer do componente
  _drawer: ?DrawerLayoutAndroid;

  /**
   * construtor do component
   * @param  {any} props
   * @param  {any} context
   * @return {void}
   */
  constructor(props, context) {
    super(props, context);

    // vincula as funções com o componente
    this.openDrawer = this.openDrawer.bind(this);
    this.closeDrawer = this.closeDrawer.bind(this);
    this.onDrawerOpen = this.onDrawerOpen.bind(this);
    this.onDrawerClose = this.onDrawerClose.bind(this);
    this.handleBackButton = this.handleBackButton.bind(this);
  }

  /**
   * renderiza o componente'
   * @return {ReactElement}
   */
  render() {
    const {drawerPosition, ...props} = this.props;
    const {Right, Left} = DrawerLayoutAndroid.positions;
    return (
      <DrawerLayoutAndroid
        ref={(drawer) => this._drawer = drawer}
        {...props}
        drawerPosition={drawerPosition === 'right' ? Right : Left}
        onDrawerOpen={this.onDrawerOpen}
        onDrawerClose={this.onDrawerClose}
      />
    );
  }

  /**
   * Component Lifecycle Method
   * @return {void}
   * @see app/HBNavigator.js linha 84
   */
  componentWillUnmount() {
    // Remove o evento de fechar o DrawerLayout do BackButton.
    this.context.removeBackButtonListener(this.closeDrawer);
    // limpa a variável que controlava o drawer
    this._drawer = null;
  }

  /**
   * controle do back button do android
   * @return {boolean} retorna true para não fechar a aplicação
   * @see app/container/sidemenu.js linha 92
   */
  handleBackButton(): boolean {
    this.closeDrawer();
    return true;
  }

  /**
   * Função de callback quando o Drawer é aberto
   * @return {void}
   * @see app/HBNavigator linha 75
   */
  onDrawerOpen() {
    // Adiciona o controle do backButton ao contexto
    this.context.addBackButtonListener(this.handleBackButton);

    // caso tenha uma função definida no props, executa.
    this.props.onDrawerOpen && this.props.onDrawerOpen();
  }

  /**
   * Função de callback quando o Drawer é fechado
   * @return {void}
   * @see app/HBNavigator.js linha 84
   */
  onDrawerClose() {
    // Remove o controle do backButton do contexto
    this.context.removeBackButtonListener(this.handleBackButton);

    // caso tenha uma função definida no props, executa.
    this.props.onDrawerClose && this.props.onDrawerClose();
  }

  /**
   * Fecha o Drawer através do controlador (this._drawer)
   * @return {void}
   */
  closeDrawer() {

    this._drawer && this._drawer.closeDrawer();
  }

  /**
   * Abre o Drawer através do controlador (this._drawer)
   * @return {void}
   */
  openDrawer() {
    this._drawer && this._drawer.openDrawer();
  }
}

// Contexts do component
DrawerLayout.contextTypes = {
  addBackButtonListener: React.PropTypes.func,
  removeBackButtonListener: React.PropTypes.func,
};

export default DrawerLayout;
