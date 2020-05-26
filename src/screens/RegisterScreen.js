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
const RegisterScreen=({navigation})=> {
  const [username, setUsername] = useState ('');
  const [password, setPassword] = useState ('');
  const [confirm_password, setConfirm_password] = useState ('');
  const [full_name, setFull_name] = useState ('');
  const insertUser = async () => {
    const checkValidate = validate (
      username,
      password,
      confirm_password,
      full_name
    );
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
          Alert.alert ('User is already exists !');
        } else {
          let user = {username, password, confirm_password, full_name};
          usersArray.push (user);
          await AsyncStorage.setItem ('users', JSON.stringify (usersArray));
          navigation.replace ('HomeNavigator');
        }
      } else {
        let user = {username, password, confirm_password, full_name};
        await AsyncStorage.setItem ('users', JSON.stringify ([user]));
        navigation.replace ('HomeNavigator');
      }
    }
  };
  const checkUser= (indexUser)=> {
    if (indexUser != -1) {
      return true;
    } else {
      return false;
    }
  }
  const validate = (username, password, confirm_password, full_name)=> {
    if (username && password && confirm_password && full_name) {
      if (password === confirm_password) {
        if (password.length < 6) {
          return 'Password must be greater than 6 characters';
        } else {
          return null;
        }
      } else {
        return 'Password not match!';
      }
    } else {
      return 'Do not enough information';
    }
  }
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
                onChangeText={password => setPassword (password)}
                secureTextEntry={true}
              />
              <Text style={styles.pass}>Confirm Password</Text>
              <TextInput
                value={confirm_password}
                style={styles.inputPass}
                onChangeText={confirm_password =>
                  setConfirm_password (confirm_password)}
                secureTextEntry={true}
              />
              <Text style={styles.email}>Full name</Text>
              <TextInput
                value={full_name}
                style={styles.inputUser}
                onChangeText={full_name => setFull_name (full_name)}
              />
              <TouchableOpacity
                onPress={() => insertUser ()}
                style={styles.buttonStyle}
              >
                <Text style={styles.textButton}>
                  Register
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.replace ('Login')}
                style={styles.buttonStyle}
              >
                <Text style={styles.textButton}>
                  Back
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View />
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
}

export default RegisterScreen;

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
