import React from 'react';
import Svg, { Path, G } from 'react-native-svg';

const FacebookButton = (props) => {
  return (
    <Svg
      xmlns='http://www.w3.org/2000/svg'
      width={props.size}
      height={props.size}
      viewBox='0 0 5.946 11.451'>
      <G id='facebook-app-symbol' transform='translate(-37.29)'>
        <Path
          id='f_1_'
          d='M41.15,11.451V6.228H42.9l.263-2.036H41.15v-1.3c0-.589.163-.991,1.009-.991h1.077V.08A14.608,14.608,0,0,0,41.666,0a2.453,2.453,0,0,0-2.618,2.691v1.5H37.29V6.228h1.758v5.223Z'
          fill='#fff'
        />
      </G>
    </Svg>
  );
};

export default FacebookButton;
