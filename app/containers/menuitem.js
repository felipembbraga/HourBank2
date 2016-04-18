import React, {Component, StyleSheet, Text, View} from 'react-native';
import Touchable from '../components/common/Touchable';
import Icon from 'react-native-vector-icons/Ionicons';

class MenuItem extends Component {
  render() {
    let icon = "home";
    if (this.props.icon) {
      icon = this.props.icon;
    }

    let badge;
    if (this.props.badge) {
      badge = (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>
            {this.props.badge}
          </Text>
        </View>
      );
    }

    var selectedTitleStyle = this.props.selected && styles.selectedTitle;
    var selectedIconStyle = this.props.selected && styles.selectedIcon;
    return (
      <Touchable onPress={this.props.onPress}>
        <View style={styles.container}>
          <Icon name={icon} style={[styles.icon, selectedIconStyle]} />
          <Text style={[styles.title, selectedTitleStyle]}>{this.props.title}</Text>
          {badge}
        </View>
      </Touchable>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 50,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  icon: {
    marginRight: 20,
    color: '#7F91A7',
    fontSize: 17
  },
  selectedIcon: {
    color: '#032250'
  },
  title: {
    flex: 1,
    fontSize: 17,
    color: '#7F91A7',
  },
  selectedTitle: {
    color: '#032250'
  },
  badge: {
    backgroundColor: '#DC3883',
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderRadius: 10,
  },
  badgeText: {
    fontSize: 12,
    color: 'white',
  },
});

export default MenuItem;
