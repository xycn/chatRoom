/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View
} from 'react-native';

class chatRoom extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          动喵聊天室
        </Text>
        <Text style={styles.instructions}>
          正式开工了！
        </Text>
        <Text style={styles.instructions}>
          we are ready to bootstrap the chatRoom!
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('chatRoom', () => chatRoom);
