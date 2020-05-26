import React, {useState, useEffect} from 'react';
import {View, ActivityIndicator} from 'react-native';
import Movies from '../components/Movies';
import {SearchBar} from 'react-native-elements';

const SearchScreen = ({navigation}) => {
  const [state, setState] = useState ('');
  const [movieData, setMovieData] = useState ([]);
  const [isLoading, setIsLoading] = useState (false);
  const updateSearch = search => {
    setState (search);
  };
  const selectHandle = id => {
    navigation.navigate ('Detail', {
      movieID: id,
    });
  };
  useEffect (
    () => {
      setIsLoading (true);
      const movies = async () => {
        try {
          let response = await fetch (
            `https://api.themoviedb.org/3/search/movie?api_key=b0d56c5554893fb919ee71c349c8e0f3&language=en-US&page=1&query=${state}`
          );
          let responseData = await response.json ();
          {
            setMovieData (responseData.results);
            setIsLoading (false);
          }
        } catch (error) {
          console.log (error);
        }
      };
      movies ();
    },
    [state]
  );
  return (
    <View style={{flex: 1}}>
      <SearchBar
        placeholder="Type Here..."
        onChangeText={updateSearch}
        value={state}
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

export default SearchScreen;
