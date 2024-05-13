import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {signInWithEmailAndPassword} from '@firebase/auth';
import {auth} from '../firebase';

const Login = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [errorMsgVisible, setErrorMsgVisible] = useState(false);

  const loginHandler = () => {
    if (!email || !password) {
      setErrorMsgVisible(true);
      setErrorMsg(<Text style={styles.errorMsg}>Please fill all fields</Text>);
      return;
    }

    setErrorMsg('');
    signInWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        navigation.navigate('MainStack');
      })
      .catch(error => {
        setErrorMsgVisible(true);
        if (
          error.code === 'auth/user-not-found' ||
          error.code === 'auth/invalid-email'
        ) {
          setErrorMsg(
            <Text style={styles.errorMsg}>
              User not found. Please register.
            </Text>,
          );
        } else {
          setErrorMsg(
            <Text style={styles.errorMsg}>
              Login failed. Please try again.
            </Text>,
          );
        }
      });
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Email"
        placeholderTextColor="#383b10"
        style={styles.textInput}
        value={email}
        onChangeText={txt => setEmail(txt)}
      />
      <TextInput
        placeholder="Password"
        placeholderTextColor="#383b10"
        style={styles.textInput}
        value={password}
        onChangeText={txt => setPassword(txt)}
        secureTextEntry
      />
      {errorMsgVisible && errorMsg}
      <TouchableOpacity onPress={loginHandler}>
        <Text style={styles.button}>LOGIN</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('register')}>
        <Text style={styles.createAccount}>Create Account</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Login;

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
  errorMsg: {
    fontSize: 18,
    color: 'red',
  },
});
