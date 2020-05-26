import React from 'react';
import {SliderBox} from 'react-native-image-slider-box';
const Slide = ({images}) => {
  return (
    <SliderBox
      images={images}
      sliderBoxHeight={200}
      dotColor="#FFEE58"
      inactiveDotColor="#90A4AE"
      paginationBoxVerticalPadding={20}
      resizeMethod={'resize'}
      resizeMode={'cover'}
      paginationBoxStyle={{
        position: 'absolute',
        bottom: 0,
        padding: 0,
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
      }}
      dotStyle={{
        width: 10,
        height: 10,
        borderRadius: 5,
        marginHorizontal: 0,
        padding: 0,
        margin: 0,
        backgroundColor: 'rgba(128, 128, 128, 0.92)',
      }}
      ImageComponentStyle={{
        borderRadius: 15,
        width: '97%',
        marginTop: 5,
      }}
      imageLoadingColor="orange"
    />
  );
};
export default Slide;
