import React from 'react';
import Svg, { Path, G } from 'react-native-svg';

const AppleButton = (props) => {
  return (
    <Svg
      xmlns='http://www.w3.org/2000/svg'
      width={props.size}
      height={props.size}
      viewBox='0 0 9.393 11.451'>
      <G id='apple' transform='translate(-46.022)'>
        <Path
          id='Path_1'
          data-name='Path 1'
          d='M49.136,126.771c-1.7-.01-3.114-3.489-3.114-5.261a3.177,3.177,0,0,1,3.008-3.528,3.461,3.461,0,0,1,1.135.279,2.537,2.537,0,0,0,.648.186,2.016,2.016,0,0,0,.465-.151,3.726,3.726,0,0,1,1.4-.339h0a2.872,2.872,0,0,1,2.4,1.214l.175.263-.252.19a2.123,2.123,0,0,0-1.018,1.751,1.976,1.976,0,0,0,1.1,1.826c.158.1.321.193.321.407,0,.14-1.117,3.144-2.738,3.144a2.2,2.2,0,0,1-.925-.224,1.875,1.875,0,0,0-.823-.2,2.117,2.117,0,0,0-.652.176,3.192,3.192,0,0,1-1.13.264Z'
          transform='translate(0 -115.32)'
          fill='#fff'
        />
        <Path
          id='Path_2'
          data-name='Path 2'
          d='M257.306,0a2.256,2.256,0,0,1-2.134,2.513A2.426,2.426,0,0,1,257.306,0Z'
          transform='translate(-204.455)'
          fill='#fff'
        />
      </G>
    </Svg>
  );
};

export default AppleButton;
