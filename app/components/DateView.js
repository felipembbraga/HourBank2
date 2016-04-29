import React, {
  Component,
  PropTypes,
  StyleSheet,
  Text,
  View
} from 'react-native';
import Touchable from './common/Touchable';
import Color from '../resource/color'; //Importa a palheta de cores

class DateView extends Component {
  constructor(props) {
    super(props);
    this.onPress = this.onPress.bind(this);
  }

  onPress() {
    this.props.onDatePress && this.props.onDatePress();
  }
  render() {
    let date = this.props.date.format('DD/MM/YYYY');
    let weekDay = this.props.date.format('dddd');
    return (
      <View style={[styles.container]}>
        <Touchable onPress={this.props.onPress}>
          <View style={{alignItems: 'center'}}>
            <Text style={[styles.date, styles.text]}>{date}</Text>
            <Text style={[styles.text]}>{weekDay}</Text>
          </View>
        </Touchable>
      </View>
    );
  }
}

DateView.proptypes = {
  date: PropTypes.any,
  onPress: PropTypes.func
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.color.SecondText
  },
  text: {
    color: 'white'
  },
  date: {
      fontSize: 40,
  }
});

export default DateView;
