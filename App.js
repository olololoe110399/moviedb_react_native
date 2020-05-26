import 'react-native-gesture-handler';

import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import SplashScreen from './src/screens/SpashScreen';
import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/HomeScreen';
import SearchScreen from './src/screens/SearchScreen';
import DetailScreen from './src/screens/DetailScreen';
import YoutubeScreen from './src/screens/YoutubeScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import ListScreen from './src/screens/ListScreen';
import FavoriteScreen from './src/screens/FavoriteScreen';
import Menu, {MenuItem} from 'react-native-material-menu';
import {Image, TouchableOpacity} from 'react-native';

function App () {
  const StackNavigator = createStackNavigator ();
  return (
    <NavigationContainer>
      <StackNavigator.Navigator mode="modal" headerMode="none">
        <StackNavigator.Screen name="Splash" component={SplashScreen} />
        <StackNavigator.Screen name="Login" component={LoginScreen} />
        <StackNavigator.Screen name="Register" component={RegisterScreen} />
        <StackNavigator.Screen name="HomeNavigator" component={HomeNavigator} />
      </StackNavigator.Navigator>
    </NavigationContainer>
  );
}

const Tab = createBottomTabNavigator ();
function HomeNavigator () {
  return (
    <Tab.Navigator
      tabBarOptions={{activeTintColor: 'orange', inactiveTintColor: 'gray'}}
    >
      <Tab.Screen
        color="orange"
        name="Home"
        component={HomeStack}
        options={{
          tabBarIcon: ({color}) => <Icon color={color} name="home" size={25} />,
        }}
      />
      <Tab.Screen
        color="orange"
        name="Search"
        component={SeacrhStack}
        options={{
          tabBarIcon: ({color}) => (
            <Icon color={color} name="magnify" size={25} />
          ),
        }}
      />
      <Tab.Screen
        color="orange"
        name="Favorite"
        component={FavoriteStack}
        options={{
          tabBarIcon: ({color}) => (
            <Icon color={color} name="heart" size={25} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const stackNavigator = createStackNavigator ();
function HomeStack({navigation}) {
  return (
    <stackNavigator.Navigator>
      <stackNavigator.Screen
        options={{
          headerRight: () => <TopNavigation navigation={navigation} />,
        }}
        name="Home"
        component={HomeScreen}
      />
      <stackNavigator.Screen name="Detail" component={DetailScreen} />
      <stackNavigator.Screen name="List" component={ListScreen} />
      <stackNavigator.Screen name="Youtube" component={YoutubeScreen} />
    </stackNavigator.Navigator>
  );
}
const seacrhNavigator = createStackNavigator ();
function SeacrhStack () {
  return (
    <seacrhNavigator.Navigator>
      <seacrhNavigator.Screen
        name="Search"
        component={SearchScreen}
        options={{headerShown: false}}
      />
      <seacrhNavigator.Screen name="Detail" component={DetailScreen} />
      <seacrhNavigator.Screen name="List" component={ListScreen} />
      <seacrhNavigator.Screen name="Youtube" component={YoutubeScreen} />

    </seacrhNavigator.Navigator>
  );
}
const favoriteNavigator = createStackNavigator ();
function FavoriteStack () {
  return (
    <favoriteNavigator.Navigator>
      <favoriteNavigator.Screen
        name="Favorite"
        component={FavoriteScreen}
        options={{headerShown: false}}
      />
      <favoriteNavigator.Screen name="Detail" component={DetailScreen} />
      <favoriteNavigator.Screen name="List" component={ListScreen} />
      <favoriteNavigator.Screen name="Youtube" component={YoutubeScreen} />

    </favoriteNavigator.Navigator>
  );
}

const TopNavigation = ({menu, navigation}) => (
  <Menu
    ref={ref => (menu = ref)}
    button={
      <TouchableOpacity
        onPress={() => menu.show ()}
        style={{
          paddingHorizontal: 16,
          height: '100%',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Icon name="dots-vertical" size={25} />
      </TouchableOpacity>
    }
  >
    <MenuItem
      onPress={() => {
        menu.hide ();
      }}
      textStyle={{color: '#000', fontSize: 16}}
    >
      About us
    </MenuItem>
    <MenuItem
      onPress={() => {
        menu.hide ();
        navigation.replace ('Login');
      }}
      textStyle={{color: '#000', fontSize: 16}}
    >
      Logout
    </MenuItem>
  </Menu>
);



export default App;
