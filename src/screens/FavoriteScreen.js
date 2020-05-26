import React, {useState, useEffect} from 'react';
import {View, ActivityIndicator} from 'react-native';
import Movies from '../components/Movies';
import {SearchBar} from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';
import {useFocusEffect} from '@react-navigation/native';
const FavoriteScreen = ({navigation}) => {
  const [query, setQuery] = useState ('');
  const [isLoading, setILoading] = useState (false);
  const [movieData, setMovieData] = useState ({});
  const favorite = 'favorite';
  const selectHandle = id => {
    navigation.navigate ('Detail', {
      movieID: id,
    });
  };
  useEffect (
    () => {
      setILoading (true);
      const search = async () => {
        try {
          let response = await AsyncStorage.getItem (favorite);
          let favoriteArray = await JSON.parse (response);
          let data = await favoriteArray.filter (item => {
            return (
              item.title.toLowerCase ().indexOf (query.toLowerCase ()) > -1
            );
          });
          setMovieData (data);
          setILoading (false);
        } catch (error) {
          console.log (error);
        }
      };
      search ();
    },
    [query]
  );
  useFocusEffect (
    React.useCallback (
      () => {
        const fetchUser = async () => {
          setILoading (true);
          try {
            let response = await AsyncStorage.getItem (favorite);
            setMovieData (JSON.parse (response));
            setILoading (false);
          } catch (err) {
            console.log (err);
          }
        };
        fetchUser ();
      },
      [favorite]
    )
  );
  return (
    <View style={{flex: 1}}>
      <SearchBar
        value={query}
        onChangeText={query => setQuery (query)}
        placeholder="Type Here..."
      />
      <View style={{flex: 1}}>
        {isLoading
          ? <View style={{flex:1,justifyContent: 'center',alignItems:'center'}}>
              <ActivityIndicator size="large" color="orange" />
            </View>
          : <Movies movieData={movieData} selectHandle={selectHandle} />}
      </View>
    </View>
  );
};

export default FavoriteScreen;
