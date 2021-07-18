import React from 'react';
import Svg, { Path, G } from 'react-native-svg';

const ProfileButton = (props) => {
  return (
    <Svg
      id='Iconly_Bold_Profile'
      data-name='Iconly/Bold/Profile'
      xmlns='http://www.w3.org/2000/svg'
      width={props.size}
      height={props.size}
      viewBox='0 0 16 20'>
      <G id='Profile'>
        <Path
          id='Profile-2'
          data-name='Profile'
          d='M0,16.575c0-2.722,3.686-3.4,8-3.4,4.339,0,8,.7,8,3.424S12.315,20,8,20C3.662,20,0,19.3,0,16.575ZM2.706,5.291A5.294,5.294,0,1,1,8,10.583,5.274,5.274,0,0,1,2.706,5.291Z'
          fill={props.color}
        />
      </G>
    </Svg>
  );
};

export default ProfileButton;
