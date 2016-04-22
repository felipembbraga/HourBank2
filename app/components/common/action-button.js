import React, { Component, PropTypes, StyleSheet, View } from 'react-native';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';


class ActButton extends Component {

  render() {
    return (
        <ActionButton {...this.props} offsetX={20} offsetY={1}>
          {this.props.actionItems.map(item => {
            return (
              <ActionButton.Item key={item.title} buttonColor={item.buttonColor} title={item.title} onPress={() => {item.onPress()}}>
                <Icon name={item.iconName} style={styles.actionButtonIcon} />
              </ActionButton.Item>
            );
          })}
        </ActionButton>
    );
  }

}

ActButton.propTypes = {
  actionItems: PropTypes.arrayOf(
    PropTypes.shape({
      buttonColor: PropTypes.string,
      title: PropTypes.string,
      iconName: PropTypes.string,
      onPress: PropTypes.func
    })
  )
}

ActButton.defaultProps = {
  actionItems: []
}

const styles = StyleSheet.create({
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
});

export default ActButton;
