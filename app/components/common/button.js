import React, {Component, Text, PropTypes, StyleSheet} from 'react-native';
import Touchable from './Touchable';

/**
 * Componente botão
 */
class Button extends Component {

  /**
   * Renderiza o componente
   * @return {ReactElement}
   */
  render() {
    return (
      <Touchable style={styles.button} onPress={this.props.onPress}>
        <Text style={styles.buttonText}>
          {this.props.text}
        </Text>
      </Touchable>
    );
  }
}

// Props do componente
Button.propTypes = {
  text: PropTypes.string,
  onPress: PropTypes.func
}

// Estilos do componente
const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
    borderColor: 'black',
    marginTop: 10
  },
  buttonText: {
    flex: 1,
    alignSelf: 'center',
    fontSize: 20
  }
});

export default Button;
