import React from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import Svg, { Path, G } from 'react-native-svg';

const SendButton = (props) => {
  return (
    <TouchableWithoutFeedback {...props}>
      <Svg
        id='Iconly_Bold_Send'
        data-name='Iconly/Bold/Send'
        xmlns='http://www.w3.org/2000/svg'
        width='24'
        height='24'
        viewBox='0 0 24 24'>
        <G id='Send' transform='translate(2 2)'>
          <Path
            id='Send-2'
            data-name='Send'
            d='M19.435.582A1.933,1.933,0,0,0,17.5.079L1.408,4.76A1.919,1.919,0,0,0,.024,6.281a2.253,2.253,0,0,0,1,2.1L6.06,11.477a1.3,1.3,0,0,0,1.61-.193l5.763-5.8a.734.734,0,0,1,1.06,0,.763.763,0,0,1,0,1.067l-5.773,5.8a1.324,1.324,0,0,0-.193,1.619L11.6,19.054A1.91,1.91,0,0,0,13.263,20a2.078,2.078,0,0,0,.25-.01A1.95,1.95,0,0,0,15.144,18.6L19.916,2.525a1.964,1.964,0,0,0-.48-1.943'
            fill='#fff'
          />
        </G>
      </Svg>
    </TouchableWithoutFeedback>
  );
};

export default SendButton;
