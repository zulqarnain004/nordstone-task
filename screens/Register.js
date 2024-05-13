import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {createUserWithEmailAndPassword, updateProfile} from 'firebase/auth';
import {auth} from '../firebase';
const Register = props => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [errorMsgVisible, setErrorMsgVisible] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const createUser = () => {
    if (!email || !password || !name) {
      setErrorMsgVisible(true);
      setErrorMsg(<Text style={styles.errorMsg}>Please fill all fields</Text>);
      return;
    }
    setErrorMsg('');
    createUserWithEmailAndPassword(auth, email, password)
      .then(async userCredential => {
        const user = userCredential.user;
        await updateProfile(user, {
          displayName: name,
        });
      })
      .catch(error => {
        setErrorMsgVisible(true);
        setErrorMsg(error.message);
      });
    setEmail('');
    setName('');
    setPassword('');
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Name"
        placeholderTextColor="#383b10"
        style={styles.textInput}
        value={name}
        onChangeText={txt => setName(txt)}></TextInput>
      <TextInput
        placeholder="Email"
        placeholderTextColor="#383b10"
        value={email}
        onChangeText={txt => setEmail(txt)}
        style={styles.textInput}></TextInput>
      <TextInput
        placeholder="Password"
        placeholderTextColor="#383b10"
        value={password}
        onChangeText={txt => setPassword(txt)}
        style={styles.textInput}
        secureTextEntry></TextInput>

      {errorMsgVisible ? errorMsg : ''}
      <TouchableOpacity onPress={() => createUser()}>
        <Text style={styles.button}>Register</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => props.navigation.navigate('login')}>
        <Text style={styles.createAccount}>
          I Have Account <Text style={styles.login}>Login</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#383b40',
    color: '#fff',
    fontSize: 20,
    textAlign: 'center',
    padding: 20,
    borderRadius: 5,
    width: 300,
    height: 65,
  },
  textInput: {
    color: 'black',
    width: 300,
    height: 65,
    fontSize: 20,
    borderWidth: 2,
    marginBottom: 15,
    borderColor: 'lightgray',
    borderRadius: 5,
  },
  createAccount: {
    fontSize: 20,
    margin: 15,
    color: '#383b40',
  },
  login: {
    fontWeight: 'bold',
    color: '#383b40',
  },

  errorMsg: {
    fontSize: 24,
    color: 'red',
  },
});
