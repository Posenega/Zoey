import React from 'react';
import Svg, { Path, G } from 'react-native-svg';

const FavoriteButton = (props) => {
  return (
    <Svg
      id='Iconly_Bold_Lock'
      data-name='Iconly/Bold/Lock'
      xmlns='http://www.w3.org/2000/svg'
      width={props.size}
      height={props.size}
      viewBox='0 0 24 24'>
      <G id='Lock' transform='translate(3.5 2)'>
        <Path
          id='Lock-2'
          data-name='Lock'
          d='M12.732,20H4.269A4.227,4.227,0,0,1,0,15.826V10.888A4.165,4.165,0,0,1,2.977,6.929V5.4A5.472,5.472,0,0,1,8.485,0,5.576,5.576,0,0,1,12.4,1.58,5.3,5.3,0,0,1,14.023,5.4V6.929A4.165,4.165,0,0,1,17,10.888v4.937A4.227,4.227,0,0,1,12.732,20ZM8.5,11.384a.875.875,0,0,0-.884.865v2.206a.889.889,0,0,0,1.778,0V12.249A.881.881,0,0,0,8.5,11.384Zm.01-9.645A3.711,3.711,0,0,0,4.756,5.376V6.714h7.489V5.4A3.7,3.7,0,0,0,8.505,1.739Z'
          fill={props.color}
        />
      </G>
    </Svg>
  );
};

export default FavoriteButton;
