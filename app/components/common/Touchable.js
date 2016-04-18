
import React, {
  Component,
  TouchableHighlight,
  TouchableNativeFeedback,
  Platform,
} from 'react-native';

class Touchable extends Component {
  render() {
    if(Platform.OS !== 'android')
    {
      return (
        <TouchableHighlight
          accessibilityTraits="button"
          underlayColor="#3C5EAE"
          {...this.props}
        />
      );
    }

    return <TouchableNativeFeedback {...this.props} />
  }
}

export default Touchable;
