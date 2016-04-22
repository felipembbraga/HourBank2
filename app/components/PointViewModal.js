import React, {
  Component,
  Image,
  Linking,
  Modal,
  PropTypes,
  StyleSheet,
  Text,
  View
} from 'react-native';

class PointViewModal extends Component {
  render() {

    return (
      <Modal
        animated={false}
        transparent={false}
        visible={this.props.isVisible}
        onRequestClose={()=>this.props.onRequestClose()}
      >
        <View style={styles.container}>
          <View style={[styles.innerContainer]}>
            <Image source={this.props.point.picture} style={styles.image}>
              <Text style={styles.imageText}>
                {this.props.point.date} {this.props.point.hour}:{this.props.point.minute}
              </Text>
            </Image>
          </View>
        </View>

      </Modal>
    );
  }
}

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

PointViewModal.defaultProps = {
  isVisible: false,
  point: {
    picture: {}
  }
}

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
