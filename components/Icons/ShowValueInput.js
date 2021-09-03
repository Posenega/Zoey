import React from 'react';
import Svg, { Path, G } from 'react-native-svg';

const ShowValueInput = (props) => {
  return (
    <Svg
      id='Iconly_Bold_Show'
      data-name='Iconly/Bold/Show'
      xmlns='http://www.w3.org/2000/svg'
      width={props.size}
      height={props.size}
      viewBox='0 0 14 14'>
      <G id='Show' transform='translate(1.167 2.333)'>
        <Path
          id='Show-2'
          data-name='Show'
          d='M5.828,9.333c-2.409,0-4.574-1.683-5.793-4.5a.423.423,0,0,1,0-.333C1.252,1.681,3.417,0,5.828,0h.006A5.429,5.429,0,0,1,9.18,1.193a8.3,8.3,0,0,1,2.453,3.3.423.423,0,0,1,0,.333c-1.219,2.82-3.387,4.5-5.8,4.5ZM3.557,4.667A2.274,2.274,0,1,0,5.833,2.4,2.269,2.269,0,0,0,3.557,4.667Zm.854,0a1.451,1.451,0,0,1,.029-.277h.028a1.165,1.165,0,0,0,1.167-1.12,1.16,1.16,0,0,1,.2-.017A1.411,1.411,0,1,1,4.411,4.666Z'
          transform='translate(0)'
          fill={props.color}
        />
      </G>
    </Svg>
  );
};

export default ShowValueInput;
