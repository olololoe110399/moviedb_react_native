import React from 'react';
import { Image, View} from 'react-native';
const SpashScreen = ({navigation}) => {
  setTimeout (() => {
    navigation.replace ('Login');
  }, 1000);
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Image
        style={{width: 210, height: 150}}
        source={require ('../images/logo.png')}
      />
    </View>
  );
};
export default SpashScreen;
