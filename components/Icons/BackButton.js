import React from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import Svg, { Path, G } from 'react-native-svg';

const BackButton = (props) => {
  return (
    <TouchableWithoutFeedback {...props}>
      <Svg
        id='Iconly_Bold_Arrow_-_Left_Square'
        data-name='Iconly/Bold/Arrow - Left Square'
        xmlns='http://www.w3.org/2000/svg'
        width={props.size}
        height={props.size}
        viewBox='0 0 40 40'>
        <G
          id='Arrow_-_Left_Square'
          data-name='Arrow - Left Square'
          transform='translate(3.333 3.333)'>
          <Path
            id='Arrow_-_Left_Square-2'
            data-name='Arrow - Left Square'
            d='M23.484,33.333H9.867c-5.9,0-9.867-3.8-9.867-9.45V9.433C0,3.791,3.965,0,9.867,0H23.484c5.891,0,9.849,3.791,9.849,9.433v14.45C33.333,29.535,29.375,33.333,23.484,33.333ZM16.133,9.171a1.237,1.237,0,0,0-.883.363L8.967,15.783a1.29,1.29,0,0,0,0,1.767L15.251,23.8a1.257,1.257,0,0,0,1.766,0,1.276,1.276,0,0,0,0-1.784l-4.133-4.1H23.466a1.252,1.252,0,0,0,1.251-1.249,1.237,1.237,0,0,0-1.251-1.249H12.883L17.016,11.3a1.271,1.271,0,0,0,.367-.884,1.312,1.312,0,0,0-.367-.882A1.237,1.237,0,0,0,16.133,9.171Z'
            fill={props.color}
          />
        </G>
      </Svg>
    </TouchableWithoutFeedback>
  );
};

export default BackButton;
