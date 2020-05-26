import React from 'react';
import {View, FlatList, TouchableOpacity} from 'react-native';
import Movie from '../components/Movie';
const Movies = ({movieData, selectHandle}) => {
  return (
    <View style={{flex: 1}}>
      <FlatList
        data={movieData}
        keyExtractor={item => item.id.toString ()}
        renderItem={itemData => {
          return (
            <TouchableOpacity onPress={() => selectHandle (itemData.item.id)}>
              <Movie itemData={itemData} />
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};
export default Movies;
