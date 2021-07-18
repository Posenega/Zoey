import React from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import Svg, { Path, G, Circle } from 'react-native-svg';

const ArrowButton = (props) => {
  return (
    <TouchableWithoutFeedback  {...props}>
      <Svg 
        id='Menu'
        xmlns='http://www.w3.org/2000/svg'
        width='16'
        height='4'
        viewBox='0 0 16 4'>
        <Circle
          id='Ellipse_2'
          data-name='Ellipse 2'
          cx='2'
          cy='2'
          r='2'
          transform='translate(6)'
          fill='#2b2b2b'
        />
        <Circle
          id='Ellipse_3'
          data-name='Ellipse 3'
          cx='2'
          cy='2'
          r='2'
          fill='#2b2b2b'
        />
        <Circle
          id='Ellipse_4'
          data-name='Ellipse 4'
          cx='2'
          cy='2'
          r='2'
          transform='translate(12)'
          fill='#2b2b2b'
        />
      </Svg>
    </TouchableWithoutFeedback>
  );
};

export default ArrowButton;
