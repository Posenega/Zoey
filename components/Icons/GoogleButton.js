import React from 'react';
import Svg, { Path, G } from 'react-native-svg';

const GoogleButton = (props) => {
  return (
    <Svg
      id='Google'
      xmlns='http://www.w3.org/2000/svg'
      width={props.size}
      height={props.size}
      viewBox='0 0 11.726 11.726'>
      <Path
        id='Path_3'
        data-name='Path 3'
        d='M2.6,142.187l-.408,1.524L.7,143.743a5.873,5.873,0,0,1-.043-5.475h0l1.328.243.582,1.32a3.5,3.5,0,0,0,.033,2.356Z'
        transform='translate(0 -135.101)'
        fill='#fbbb00'
      />
      <Path
        id='Path_4'
        data-name='Path 4'
        d='M267.259,208.176a5.861,5.861,0,0,1-2.09,5.667h0l-1.673-.085-.237-1.478a3.494,3.494,0,0,0,1.5-1.784h-3.135v-2.319h5.631Z'
        transform='translate(-255.636 -203.408)'
        fill='#518ef8'
      />
      <Path
        id='Path_5'
        data-name='Path 5'
        d='M39.343,312.758h0a5.865,5.865,0,0,1-8.834-1.794l1.9-1.555a3.487,3.487,0,0,0,5.025,1.785Z'
        transform='translate(-29.81 -302.323)'
        fill='#28b446'
      />
      <Path
        id='Path_6'
        data-name='Path 6'
        d='M37.573,1.35,35.674,2.9a3.486,3.486,0,0,0-5.14,1.826l-1.91-1.564h0A5.864,5.864,0,0,1,37.573,1.35Z'
        transform='translate(-27.968)'
        fill='#f14336'
      />
    </Svg>
  );
};

export default GoogleButton;
