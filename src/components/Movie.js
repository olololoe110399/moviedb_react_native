import React from 'react'
import {StyleSheet, Text, View, Image} from 'react-native';
import {Rating} from 'react-native-ratings';
const Movie = ({itemData}) => {
  return (
    <View
      style={styles.item}
    >
      <View style={styles.imageContainer}>
        {itemData.item.poster_path == null
          ? <Image
              source={{
                uri: 'https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif',
              }}
              style={styles.image}
            />
          : <Image
              source={{
                uri: `https://image.tmdb.org/t/p/w500${itemData.item.poster_path}`,
              }}
              style={styles.image}
            />}
      </View>
      <View style={styles.titleContainer}>
        <Text numberOfLines={2} style={styles.titleText}>
          {itemData.item.title}
        </Text>
        <Text numberOfLines={3} style={{marginStart: 5}}>
          {itemData.item.overview}
        </Text>
        <Rating
          readonly
          imageSize={25}
          ratingBackgroundColor="orange"
          ratingCount={5}
          startingValue={itemData.item.vote_average / 2}
          ratingColor="orange"
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create ({
  container: {
    flex: 1,
  },
  item: {
    flexDirection: 'row',
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
  },
  imageContainer: {
    flex: 3,
  },
  image: {
    borderRadius: 10,
    width: '90%',
    height: 130,
  },
  titleContainer: {
    flex: 7,
  },
  titleText: {
    margin: 5,
    fontSize: 16,
    fontWeight: 'bold',
  },
});
export default Movie;
