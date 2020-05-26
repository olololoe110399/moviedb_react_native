import React, {useState, useEffect} from 'react';
import {
  View,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import SliderBox from '../components/Slide';
import Movie from '../components/Movie';
const HomeScreen = ({navigation}) => {
  const [movieData, setMovieData] = useState ([]);
  const [images, setImages] = useState ([]);
  const [isLoading, setIsLoading] = useState (false);
  useEffect (() => {
    setIsLoading (true);
    const movies = async () => {
      try {
        let response = await fetch (
          'https://api.themoviedb.org/3/movie/popular?api_key=b0d56c5554893fb919ee71c349c8e0f3&language=en-US'
        );
        let responseData = await response.json ();
        {
          var images = [];
          const arr = responseData.results;
          for (var i = 0; i < 3; i++) {
            images.push (
              `https://image.tmdb.org/t/p/w500${arr[i].backdrop_path}`
            );
          }
          setImages (images);
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
        ? <View style={{flex:1,justifyContent: 'center', alignItems: 'center'}}>
            <ActivityIndicator
              style={{justifyContent: 'center'}}
              size="large"
              color="orange"
            />
          </View>
        : <View style={{flex: 1}}>
            <FlatList
              style={{marginTop: 10}}
              data={movieData}
              ListHeaderComponent={<SliderBox images={images} />}
              keyExtractor={item => item.id.toString ()}
              renderItem={itemData => {
                return (
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate ('Detail', {
                        movieID: itemData.item.id,
                      })}
                  >
                    <Movie itemData={itemData} />
                  </TouchableOpacity>
                );
              }}
            />
          </View>}
    </View>
  );
};

export default HomeScreen;
