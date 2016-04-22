import React, {
  Component,
  ListView,
  PropTypes,
  StyleSheet,
  Text,
  View
} from 'react-native';

import PointListItem from './PointListItem';

class PointList extends Component {

  constructor(props) {
    super(props);
    const dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource
    }
  }

  componentDidMount() {
    this.setState({
      dataSource : this.state.dataSource.cloneWithRows(this.props.points)
    });
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      dataSource : this.state.dataSource.cloneWithRows(newProps.points)
    });
  }

  renderRow(point, idSec, idRow) {
    return (
      <PointListItem
        point={point}
        onEditPress={this.props.onEditPress}
        onLocationPress={this.props.onLocationPress} />
    );
  }

  renderPointList() {
      if(this.props.points.length === 0) {
          return (
              <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                  <Text style={{fontSize: 20}}>Você ainda não bateu o ponto Hoje!</Text>
              </View>
          );
      }

      return (
          <ListView
            dataSource={this.state.dataSource}
            renderRow={this.renderRow.bind(this)}
            style={styles.listView}
          />
      );
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderPointList()}
      </View>
    );
  }
}

PointList.propTypes = {
  points: PropTypes.array.isRequired,
  onEditPress: PropTypes.func.isRequired,
  onLocationPress: PropTypes.func.isRequired
}


var styles = StyleSheet.create({
    container: {
        flex: 1
    },
    listView: {
      backgroundColor: '#F5FCFF'
    }
});

export default PointList;
