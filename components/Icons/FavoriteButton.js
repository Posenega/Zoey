import React from 'react';
import Svg, { Path, G } from 'react-native-svg';

const FavoriteButton = (props) => {
  return (
    <Svg
      id='Iconly_Bold_Heart'
      data-name='Iconly/Bold/Heart'
      xmlns='http://www.w3.org/2000/svg'
      width={props.size}
      height={props.size}
      viewBox='0 0 20 20'>
      <G id='Heart' transform='translate(0.003 0)'>
        <Path
          id='Heart-2'
          data-name='Heart'
          d='M10.033,20h0l-.259-.168A38.5,38.5,0,0,1,3.4,14.609,13.8,13.8,0,0,1,.393,9.558,8.555,8.555,0,0,1,.536,4.006,6.222,6.222,0,0,1,4.324.283a4.317,4.317,0,0,1,.889-.22h.12A5.424,5.424,0,0,1,6.174,0h.11A5.986,5.986,0,0,1,8.114.348h.059a.33.33,0,0,1,.09.063,3.284,3.284,0,0,1,.63.275l.38.178a2.62,2.62,0,0,1,.285.2c.057.044.106.082.145.106l.041.025A2.422,2.422,0,0,1,10,1.368,6.026,6.026,0,0,1,13.809,0h.044a5.561,5.561,0,0,1,1.86.306,6.157,6.157,0,0,1,3.755,3.7,8.744,8.744,0,0,1,.154,5.55,13.575,13.575,0,0,1-3.009,5.063,38.956,38.956,0,0,1-6.332,5.221l-.25.158ZM14.94,3.282a.813.813,0,0,0-.757.571.875.875,0,0,0,.5,1.083,1.765,1.765,0,0,1,1.07,1.653v.032a.938.938,0,0,0,.19.653.827.827,0,0,0,.57.305.843.843,0,0,0,.79-.8V6.654a3.48,3.48,0,0,0-2.11-3.327A.745.745,0,0,0,14.94,3.282Z'
          transform='translate(-0.003 0)'
          fill={props.color}
        />
      </G>
    </Svg>
  );
};

export default FavoriteButton;