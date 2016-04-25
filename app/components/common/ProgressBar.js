import React, {
  Component,
  ProgressBarAndroid,
  PropTypes,
  StyleSheet,
  Text,
  View
} from 'react-native';
import Color from '../../resource/color'; //Importa a palheta de cores

class ProgressBar extends Component {
  render() {
    
    return (
      <View style={styles.container}>
        <Text>{this.props.text}</Text>
        <ProgressBarAndroid {...this.props.options} />
      </View>
    );
  }
}

ProgressBar.propTypes = {
  options: PropTypes.object,
  text: PropTypes.string
}

ProgressBar.defaultProps = {
  options: {
    styleAttr: "Large",
    color: Color.color.PrimaryColor
  },
  text: ''
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default ProgressBar;
