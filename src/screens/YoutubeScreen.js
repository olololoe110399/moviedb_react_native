import React from 'react';
import {WebView} from 'react-native-webview';
const YoutubeScreen = ({route}) => {
  const {keyYoutube} = route.params;
  return (
    <WebView source={{uri: `http://www.youtube.com/watch?v=${keyYoutube}`}} />
  );
};
export default YoutubeScreen;
