import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
const LoginScreen=({navigation})=> {
  const [username, setUsername] = useState ('');
  const [password, setPassword] = useState ('');
  const checkUser= (indexUser) =>{
    if (indexUser != -1) {
      return true;
    } else {
      return false;
    }
  }
  const validate =(username, password)=> {
    if (username && password) {
      if (password.length < 6) {
        return 'Password must be greater than 6 characters';
      } else {
        return null;
      }
    } else {
      return 'Do not enough information';
    }
  }

  const checkLogin = async () => {
    const checkValidate = validate (username, password);
    if (checkValidate) {
      Alert.alert (checkValidate);
    } else {
      let users = await AsyncStorage.getItem ('users');
      if (users) {
        let usersArray = await JSON.parse (users);
        let indexUser = await usersArray.findIndex (
          (item, index) => item.username === username
        );
        if (checkUser (indexUser)) {
          let indexPassword = await usersArray.findIndex (
            _item => _item.password === password
          );
          if (checkUser (indexPassword)) {
            navigation.replace ('HomeNavigator');
          } else {
            Alert.alert ('Incorrect password!!');
          }
        } else {
          Alert.alert ('Unregistered account!');
        }
      } else {
        Alert.alert ('Unregistered account!');
      }
    }
  };
  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={0}
      style={styles.screen}
      {...Platform.OS === 'ios' && {behavior: 'padding'}}
    >
      <View>
        <Image
          style={{width: 210, height: 150}}
          source={require ('../images/logo.png')}
        />
      </View>
      <View style={styles.card}>
        <ScrollView>
          <View style={{justifyContent: 'flex-end'}}>
            <View style={styles.inputContainer}>
              <Text style={styles.email}>Email</Text>
              <TextInput
                value={username}
                style={styles.inputUser}
                onChangeText={username => setUsername (username)}
              />

              <Text style={styles.pass}>Password</Text>
              <TextInput
                value={password}
                style={styles.inputPass}
                secureTextEntry={true}
                onChangeText={password => setPassword (password)}
              />
            </View>
            <TouchableOpacity
              onPress={() => checkLogin ()}
              style={styles.buttonStyle}
            >
              <Text style={styles.textButton}>
                Sign In
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.replace ('Register')}
              style={styles.buttonStyle}
            >
              <Text style={styles.textButton}>
                Sign Up
              </Text>
            </TouchableOpacity>
          </View>
          <View />
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
}

export default LoginScreen;

const styles = StyleSheet.create ({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    padding: 10,
    margin: 20,
    width: '80%',
    maxHeight: 300,
    justifyContent: 'center',
    flexDirection: 'row',
    shadowColor: 'rgb(0, 0, 0)',
    shadowOffset: {
      width: 3,
      height: 3,
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 3,
    backgroundColor: 'white',
    padding: 10,
    margin: 10,
    borderRadius: 10,
  },
  inputContainer: {
    paddingHorizontal: 20,
    marginTop: 10,
  },
  inputUser: {
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    width: '100%',
  },
  inputPass: {
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    width: '100%',
  },
  email: {
    fontWeight: 'bold',
  },
  pass: {
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    margin: 10,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  error: {
    color: 'red',
  },
  buttonStyle: {
    backgroundColor: 'orange',
    borderRadius: 25,
    borderWidth: 1,
    borderColor: 'gray',
    width: '100%',
    marginTop: 10,
    marginBottom: 5,
    shadowColor: 'rgb(0, 0, 0)',
    shadowOffset: {
      width: 3,
      height: 3,
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 2,
    padding: 10,
  },
  textButton: {
    textAlign: 'center',
    width: '100%',
    color: 'white',
  },
});
