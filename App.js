import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  StatusBar,
  FlatList,
  Image,
} from 'react-native';

import ReversedFlatList from 'react-native-reversed-flat-list';

import { send, subscribe } from 'react-native-training-chat-server';
import Header from './Header';

const NAME = '@PiotrBerebecki';
const CHANNEL = 'Reactivate';
const AVATAR =
  'https://avatars3.githubusercontent.com/u/17753038?v=3&u=228d96db8fd7030163412fcf89e6e64d297f0bc8&s=400';

export default class App extends React.Component {
  state = {
    typing: '',
    messages: [],
  };

  componentDidMount() {
    subscribe(CHANNEL, messages => {
      this.setState({ messages });
    });
  }

  sendMessage = async () => {
    // read message from component state
    const message = this.state.typing;

    // send message to our channel, with sender name
    await send({
      channel: CHANNEL,
      sender: NAME,
      avatar: AVATAR,
      message,
    });

    // set the component state (clears text input)
    this.setState({
      typing: '',
    });
  };

  renderItem({ item }) {
    return (
      <View style={styles.row}>
        <Image style={styles.avatar} source={{ uri: item.avatar }} />
        <View style={styles.rowText}>
          <Text style={styles.sender}>{item.sender}</Text>
          <Text style={styles.message}>{item.message}</Text>
        </View>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <Header title={CHANNEL} />
        <ReversedFlatList
          data={this.state.messages}
          renderItem={this.renderItem}
        />
        <KeyboardAvoidingView behavior="padding">
          <View style={styles.footer}>
            <TextInput
              value={this.state.typing}
              onChangeText={text => this.setState({ typing: text })}
              style={styles.input}
              underlineColorAndroid="transparent"
              placeholder="Type something nice"
            />
            <TouchableOpacity onPress={this.sendMessage}>
              <Text style={styles.send}>Send</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  row: {
    flexDirection: 'row',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  avatar: {
    borderRadius: 20,
    width: 40,
    height: 40,
    marginRight: 10,
  },
  rowText: {
    flex: 1,
  },
  message: {
    fontSize: 18,
  },
  sender: {
    fontWeight: 'bold',
    paddingRight: 10,
  },
  footer: {
    flexDirection: 'row',
    backgroundColor: '#eee',
  },
  input: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    fontSize: 18,
    flex: 1,
  },
  send: {
    alignSelf: 'center',
    color: 'tomato',
    fontSize: 16,
    fontWeight: 'bold',
    padding: 20,
  },
});
