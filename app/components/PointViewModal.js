import React, {
  Component,
  Image,
  Modal,
  PropTypes,
  StyleSheet,
  Text,
  View
} from 'react-native';
import moment from 'moment';

/**
 * Componente que abre um modal para visualizar a imagem do ponto registrado
 *
 */
class PointViewModal extends Component {

  /**
   * Renderiza o componente
   * @return {ReactElement}
   */
  render() {

    // pega a hora e o minuto do ponto
    let {hour, minute} = this.props.point;

    // pega a image do ponto
    let image = {
      uri: this.props.point.picture ? this.props.point.picture.data : '',
      isStatic: true
    }

    // formata a hora
    let time = moment({hour, minute}).format('HH:mm');
    return (
      <Modal
        animated={false}
        transparent={false}
        visible={this.props.isVisible}
        onRequestClose={()=>this.props.onRequestClose()}
      >
        <View style={styles.container}>
          <View style={[styles.innerContainer]}>
            <Image source={image} style={styles.image}>
              <Text style={styles.imageText}>
                {this.props.point.date} {time}
              </Text>
            </Image>
          </View>
        </View>

      </Modal>
    );
  }
}

// Props do componente
PointViewModal.propTypes = {
  point: PropTypes.shape({
    type: PropTypes.string,
    location: PropTypes.object,
    date: PropTypes.string,
    hour: PropTypes.number,
    minute: PropTypes.number,
    picture: PropTypes.shape({
      uri: PropTypes.string,
      isStatic: PropTypes.bool
    })
  }),
  isVisible: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired
};

// Valor inicial dos props
PointViewModal.defaultProps = {
  isVisible: false,
  point: {
    picture: {
      uri: ''
    }
  }
}

// Estilo do componente
var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  innerContainer: {
    borderRadius: 10,
    alignItems: 'center'
  },
  image: {
    height: 320,
    width: 200,
    justifyContent: "flex-end",
    alignItems: "flex-end"
  },
  imageText: {
    color: 'white'
  },
  row: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    marginBottom: 20,
  },
  rowTitle: {
    flex: 1,
    fontWeight: 'bold',
  }
});

export default PointViewModal;
