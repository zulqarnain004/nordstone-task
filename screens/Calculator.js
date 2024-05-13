import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';

const Calculator = () => {
  const [num1, setNum1] = useState('');
  const [num2, setNum2] = useState('');
  const [operator, setOperator] = useState('');
  const [result, setResult] = useState('');

  const calculate = () => {
    let calculatedResult;
    switch (operator) {
      case 'add':
        calculatedResult = parseFloat(num1) + parseFloat(num2);
        break;
      case 'subtract':
        calculatedResult = parseFloat(num1) - parseFloat(num2);
        break;
      case 'multiply':
        calculatedResult = parseFloat(num1) * parseFloat(num2);
        break;
      default:
        calculatedResult = 'Invalid operator';
    }
    setResult(calculatedResult.toString());
  };

  return (
    <View>
      <TextInput
        style={styles.textInput}
        placeholder="Enter First Number"
        placeholderTextColor="#383b10"
        keyboardType="numeric"
        value={num1}
        onChangeText={text => setNum1(text)}
      />
      <Picker
        style={styles.piker}
        selectedValue={operator}
        onValueChange={itemValue => setOperator(itemValue)}>
        <Picker.Item label="Select operator" value="" />
        <Picker.Item label="Addition (+)" value="add"/>
        <Picker.Item label="Subtraction (-)" value="subtract"/>
        <Picker.Item label="Multiplication (*)" value="multiply"/>
      </Picker>
      <TextInput
        style={styles.textInput}
        placeholder="Enter Second Number"
        placeholderTextColor="#383b10"
        keyboardType="numeric"
        value={num2}
        onChangeText={text => setNum2(text)}
      />
      <TouchableOpacity>
        <Text style={styles.button} onPress={calculate}>
          Calculate
        </Text>
      </TouchableOpacity>
      <Text style={styles.resultText}>Result = {result}</Text>
    </View>
  );
};

export default Calculator;

const styles = StyleSheet.create({
  textInput: {
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    width: 370,
    marginLeft: 20,
    marginTop: 20,
    fontSize:20,
    color:"black"
  },
  button: {
    backgroundColor: '#383b40',
    color: '#fff',
    fontSize: 15,
    textAlign: 'center',
    padding: 15,
    borderRadius: 5,
    width: 370,
    height: 50,
    marginLeft: 20,
  },
  resultText: {
    fontSize: 30,
    color: '#383b40',
    marginLeft: 30,
    marginTop: 30,
  },
  piker: {
    marginLeft: 20,
    marginTop: 10,
    color:"black"
  },
});
