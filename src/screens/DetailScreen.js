import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ImageBackground,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useFocusEffect} from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
const DetailScreen = ({route, navigation}) => {
  const [movieData, setMovieData] = useState ({});
  const [castData, setCastData] = useState ([]);
  const [produceData, setProduceData] = useState ([]);
  const [trailerData, setTrailerData] = useState ([]);
  const {movieID} = route.params;
  const [isLoading, setIsLoading] = useState (false);
  const [isFavorite, setFavorite] = useState ();
  const checkFavorite = indexFavorite => {
    if (indexFavorite != -1) {
      return true;
    } else {
      return false;
    }
  };
  const storeData = async () => {
    let favorites = await AsyncStorage.getItem ('favorite');
    if (favorites) {
      let favoritesArray = await JSON.parse (favorites);
      let indexFavorite = await favoritesArray.findIndex (
        (item, index) => item.id === movieData.id
      );
      if (checkFavorite (indexFavorite)) {
        favoritesArray.splice (indexFavorite, 1);
        await AsyncStorage.setItem (
          'favorite',
          JSON.stringify (favoritesArray)
        );
        setFavorite (false);
      } else {
        try {
          let favorite = {
            id: movieData.id,
            poster_path: movieData.poster_path,
            title: movieData.title,
            overview: movieData.overview,
            vote_average: movieData.vote_average,
          };
          favoritesArray.push (favorite);
          await AsyncStorage.setItem (
            'favorite',
            JSON.stringify (favoritesArray)
          );
          setFavorite (true);
        } catch (err) {
          console.log (err);
        }
      }
    } else {
      try {
        let favorite = {
          id: movieData.id,
          poster_path: movieData.poster_path,
          title: movieData.title,
          overview: movieData.overview,
          vote_average: movieData.vote_average,
        };
        await AsyncStorage.setItem ('favorite', JSON.stringify ([favorite]));
        setFavorite (true);
      } catch (err) {
        console.log (err);
      }
    }
  };
  useFocusEffect (
    React.useCallback (
      () => {
        const fetchUser = async () => {
          setIsLoading (true);
          try {
            let response = await fetch (
              `https://api.themoviedb.org/3/movie/${movieID}?api_key=b0d56c5554893fb919ee71c349c8e0f3&language=en-US&append_to_response=credits,videos`
            );
            let responseData = await response.json ();
            {
              if (responseData) {
                let favorites = await AsyncStorage.getItem ('favorite');
                if (favorites) {
                  let favoritesArray = await JSON.parse (favorites);
                  let indexFavorite = await favoritesArray.findIndex (
                    (item, index) => item.id === responseData.id
                  );
                  setFavorite (checkFavorite (indexFavorite));
                }
                var casts = responseData.credits.cast;
                var producer = responseData.production_companies;
                var videos = responseData.videos.results;
                if (producer) setProduceData (producer);
                if (casts) setCastData (casts);
                if (videos) setTrailerData (videos);
                setMovieData (responseData);

                setIsLoading (false);
              }
            }
          } catch (error) {
            console.log (error);
          }
        };
        fetchUser ();
      },
      [movieID]
    )
  );

  return (
    <View style={{flex: 1}}>
      {isLoading
        ? <View style={{flex:1,justifyContent: 'center', alignItems: 'center'}}>
            <ActivityIndicator size="large" color="orange" />
          </View>
        : <ScrollView>
            {movieData.backdrop_path == null
              ? <Image
                  source={{
                    uri: 'https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif',
                  }}
                  style={{width: '100%', height: 300}}
                />
              : <ImageBackground
                  source={{
                    uri: `https://image.tmdb.org/t/p/w500${movieData.backdrop_path}`,
                  }}
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%',
                    height: 300,
                  }}
                >
                  <TouchableOpacity onPress={storeData}>
                    {isFavorite
                      ? <Icon color="orange" name="heart" size={50} />
                      : <Icon color="orange" name="heart-outline" size={50} />}
                  </TouchableOpacity>
                </ImageBackground>}

            <Text
              style={{
                margin: 10,
                fontSize: 20,
                fontWeight: 'bold',
              }}
            >
              {movieData.title}
            </Text>
            <Text style={{margin: 10}}>{movieData.overview}</Text>
            <FlatList
              horizontal
              data={castData}
              keyExtractor={item => item.id.toString ()}
              renderItem={itemData => {
                return (
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate ('List', {
                        type: 'with_cast',
                        id: itemData.item.id,
                      })}
                    style={styles.screen1}
                  >
                    <View style={styles.imageContainer}>
                      {itemData.item.profile_path == null
                        ? <Image
                            source={{
                              uri: 'https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif',
                            }}
                            style={styles.image}
                          />
                        : <Image
                            source={{
                              uri: `https://image.tmdb.org/t/p/w500${itemData.item.profile_path}`,
                            }}
                            style={styles.image}
                          />}
                    </View>
                    <View style={styles.titleContainer}>
                      <Text numberOfLines={1} style={styles.titleText}>
                        {itemData.item.name}
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              }}
            />
            <FlatList
              horizontal
              data={produceData}
              keyExtractor={item => item.id.toString ()}
              renderItem={itemData => {
                return (
                  <View style={styles.screen2}>
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate ('List', {
                          type: 'with_companies',
                          id: itemData.item.id,
                        })}
                      style={styles.imageContainer}
                    >
                      {itemData.item.logo_path == null
                        ? <Image
                            source={{
                              uri: 'https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif',
                            }}
                            style={styles.image3}
                          />
                        : <Image
                            source={{
                              uri: `https://image.tmdb.org/t/p/w500${itemData.item.logo_path}`,
                            }}
                            style={styles.image3}
                          />}
                    </TouchableOpacity>
                    <View style={styles.titleContainer}>
                      <Text numberOfLines={1} style={styles.titleText}>
                        {itemData.item.name}
                      </Text>
                    </View>
                  </View>
                );
              }}
            />
            <FlatList
              horizontal
              data={trailerData}
              keyExtractor={item => item.id.toString ()}
              renderItem={itemData => {
                return (
                  <TouchableOpacity
                    style={styles.screen3}
                    onPress={() =>
                      navigation.navigate ('Youtube', {
                        keyYoutube: itemData.item.key,
                      })}
                  >
                    <View style={styles.imageContainer}>
                      <Image
                        source={{
                          uri: `https://img.youtube.com/vi/${itemData.item.key}/hqdefault.jpg`,
                        }}
                        style={styles.image2}
                      />
                    </View>
                    <View style={styles.titleContainer}>
                      <Text numberOfLines={1} style={styles.titleText}>
                        {itemData.item.name}
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              }}
            />
          </ScrollView>}
    </View>
  );
};
export default DetailScreen;
const styles = StyleSheet.create ({
  screen1: {
    width: 140,
    flex: 1,
    shadowColor: 'rgb(0, 0, 0)',
    shadowOffset: {
      width: 3,
      height: 3,
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 2,
    backgroundColor: 'white',
    padding: 10,
    margin: 10,
    borderRadius: 10,
    overflow: 'hidden',
  },
  screen2: {
    width: 220,
    flex: 1,
    shadowColor: 'rgb(0, 0, 0)',
    shadowOffset: {
      width: 3,
      height: 3,
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 2,
    backgroundColor: 'white',
    padding: 10,
    margin: 10,
    borderRadius: 10,
    overflow: 'hidden',
  },
  screen3: {
    width: 170,
    flex: 1,
    shadowColor: 'rgb(0, 0, 0)',
    shadowOffset: {
      width: 3,
      height: 3,
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 2,
    backgroundColor: 'white',
    padding: 10,
    margin: 10,
    borderRadius: 10,
    overflow: 'hidden',
  },
  imageContainer: {
    flex: 1,
  },
  image: {
    width: 120,
    height: 150,
  },
  image2: {
    width: 150,
    height: 100,
  },
  image3: {
    width: 200,
    height: 100,
  },
  titleContainer: {
    flex: 1,
  },
  titleText: {
    margin: 5,
    fontSize: 16,
    fontWeight: 'bold',
  },
});
