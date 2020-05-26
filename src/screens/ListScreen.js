import React, {useState, useEffect} from 'react';
import {
  View,
  ActivityIndicator,
} from 'react-native';
import Movies from '../components/Movies';
const ListScreen = ({route, navigation}) => {
  const [movieData, setMovieData] = useState ([]);
  const [isLoading, setIsLoading] = useState (false);
  const {id, type} = route.params;
  var url = '';
  switch (type) {
    case 'with_cast':
      url = `https://api.themoviedb.org/3/discover/movie?api_key=b0d56c5554893fb919ee71c349c8e0f3&language=en-US&with_cast=${id}`;
      break;
    case 'with_companies':
      url = `https://api.themoviedb.org/3/discover/movie?api_key=b0d56c5554893fb919ee71c349c8e0f3&language=en-US&with_companies=${id}`;
      break;
  }
  const selectHandle = id => {
    navigation.navigate ('Detail', {
      movieID: id,
    });
  };
  useEffect (() => {
    setIsLoading (true);
    const movies = async () => {
      try {
        let response = await fetch (url);
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
  }, []);

  return (
    <View style={{flex: 1}}>
      {isLoading
        ? <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
          >
            <ActivityIndicator
              style={{justifyContent: 'center'}}
              size="large"
              color="orange"
            />
          </View>
        :<Movies movieData={movieData} selectHandle={selectHandle} />}
    </View>
  );
};
export default ListScreen;
