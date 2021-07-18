import React from 'react';
import Svg, { Path, G } from 'react-native-svg';

const CategoryButton = (props) => {
    return (
        <Svg
            width={props.size}
            height={props.size}
            viewBox='0 0 20 20'
            data-name='Iconly/Bold/Category'
            xmlns='http://www.w3.org/2000/svg'>
            <G>
              <Path
                d='M14.081 20a2.549 2.549 0 01-2.541-2.56v-3.409a2.543 2.543 0 012.541-2.561h3.38A2.549 2.549 0 0120 14.031v3.408A2.554 2.554 0 0117.46 20zM2.54 20A2.555 2.555 0 010 17.439v-3.408a2.549 2.549 0 012.54-2.561h3.38a2.543 2.543 0 012.54 2.561v3.408A2.548 2.548 0 015.92 20zM14.081 8.53a2.542 2.542 0 01-2.541-2.56V2.561A2.549 2.549 0 0114.081 0h3.38A2.554 2.554 0 0120 2.561V5.97a2.548 2.548 0 01-2.54 2.56zm-11.541 0A2.548 2.548 0 010 5.97V2.561A2.555 2.555 0 012.54 0h3.38a2.549 2.549 0 012.54 2.561V5.97a2.542 2.542 0 01-2.54 2.56z'
                fill={props.color}
              />
            </G>
          </Svg>
    )
}

export default CategoryButton
