import React from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';

export default class Header extends React.Component {
  render() {
    return (
      <View style={styles.header}>
        <StatusBar backgroundColor="tomato" barStyle="light-content" />
        <Text style={styles.title}>
          #{this.props.title}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    height: 80,
    backgroundColor: 'tomato',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: 10,
  },
  title: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 24,
  },
});
