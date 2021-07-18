import React from 'react';
import Svg, { Path, G } from 'react-native-svg';

const FavoriteButton = (props) => {
  return (
    <Svg
      id='Iconly_Bold_Notification'
      data-name='Iconly/Bold/Notification'
      xmlns='http://www.w3.org/2000/svg'
      width={props.size}
      height={props.size}
      viewBox='0 0 24 24'>
      <G id='Notification' transform='translate(3.5 2)'>
        <Path
          id='Notification-2'
          data-name='Notification'
          d='M7.983,19.967a3.619,3.619,0,0,1-1.714-.733,1.551,1.551,0,0,1-.7-1.173c0-.5.462-.734.889-.833a25.955,25.955,0,0,1,4.046,0c.427.1.889.329.889.833a1.553,1.553,0,0,1-.695,1.174,3.635,3.635,0,0,1-1.713.732A4,4,0,0,1,8.48,20,3.667,3.667,0,0,1,7.983,19.967ZM3.764,15.747a4.535,4.535,0,0,1-2.9-1.413A3.615,3.615,0,0,1,0,11.956a3.368,3.368,0,0,1,.731-2.31A3.8,3.8,0,0,0,1.794,6.8V6.37A5.625,5.625,0,0,1,3.077,2.512,7.073,7.073,0,0,1,8.456,0h.09a7.041,7.041,0,0,1,5.467,2.624,5.546,5.546,0,0,1,1.2,3.746V6.8a3.889,3.889,0,0,0,1.062,2.849A3.364,3.364,0,0,1,17,11.956a3.614,3.614,0,0,1-.863,2.379,4.539,4.539,0,0,1-2.9,1.413c-1.571.133-3.144.247-4.737.247A41.689,41.689,0,0,1,3.764,15.747Z'
          fill={props.color}
        />
      </G>
    </Svg>
  );
};

export default FavoriteButton;
