import React, {useState} from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';

const TextScreen = () => {
  const [text, setText] = useState('');
  return (
    <View style={{flex: 1, padding: 20}}>
      <TextInput
        placeholder="Enter text"
        placeholderTextColor="#383b10"
        style={styles.textInput}
        onChangeText={text => setText(text)}
      />
      <Text style={styles.textOnShapshot}>Text on Snapshot : {text}</Text>
    </View>
  );
};

export default TextScreen;

const styles = StyleSheet.create({
  textOnShapshot: {
    fontSize: 20,
    color: '#383b40',
    marginTop: 20,
  },
  textInput: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    fontSize:20,
    color:"black"
  },
});
