import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';

function Notification() {
  const sendNotification = () => {
    Alert.alert(
      'Test Notification',
      'This is a test notification!',
      [
        { text: 'OK', onPress: () => console.log('OK Pressed') }
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={sendNotification} style={styles.buttonContainer}>
        <Text style={styles.buttonText}>Press Button</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    backgroundColor: 'red',
    borderRadius: 5,
    paddingVertical: 15,
    paddingHorizontal: 30,
    shadowColor: 'black',
    shadowOpacity: 0.4,
    elevation: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    textAlign: 'center',
  },
});

export default Notification;
