import React, {Component, StyleSheet, Text, View} from 'react-native';
import {connect} from 'react-redux';
import MK, {MKButton, MKColor, MKSpinner} from 'react-native-material-kit';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';



const SignOutButton = new MKButton.coloredButton().withBackgroundColor(MKColor.Indigo).withText('SAIR').build();

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null
        }

        this.onPress = this.onPress.bind(this);
    }
    componentWillMount() {}

    saudation() {
        return (
            <Text>
                Welcome back, {this.props.user.email}!
            </Text>
        )
    }
    render() {
        return (
            <View style={styles.container}>
              {this.saudation()}
              <SignOutButton onPress={this.onPress}/>
              <ActionButton buttonColor="rgba(231,76,60,1)" onPress={() => {
                console.log("hi")
              }}>
                <ActionButton.Item buttonColor='#ff004c' title="Saída" onPress={() => {}}>
                  <Icon name="arrow-left-c" style={styles.actionButtonIcon}/>
                </ActionButton.Item>
                <ActionButton.Item buttonColor='#1abc9c' title="Entrada" onPress={() => {}}>
                  <Icon name="arrow-right-c" style={styles.actionButtonIcon}/>
                </ActionButton.Item>
              </ActionButton>
            </View>
        );
        // return (
        //   <DrawerLayout renderNavigationView={() => <View></View>}>
        //     {view}
        //   </DrawerLayout>
        // );
    }

    onPress() {
        this.props.navigator.immediatelyResetRouteStack([
            {
                name: 'signin'
            }
        ]);
    }
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    actionButtonIcon: {
        fontSize: 20,
        height: 22,
        color: 'white',
    }
});

function mapStateToProps(state) {
    return {user: state.user};
}

export default connect(mapStateToProps)(Home);
