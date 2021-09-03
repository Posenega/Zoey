import React from "react";
import { TouchableWithoutFeedback, View, Animated } from "react-native";
import Svg, { Path, G } from "react-native-svg";

const ArrowButton = (props) => {
  return (
    <TouchableWithoutFeedback {...props}>
      <Animated.View
        style={
          props.back ? { transform: [{ rotateY: "180deg" }] } : props.SvgStyle
        }
      >
        <Svg
          id="Iconly_Light-Outline_Arrow_-_Right_2"
          data-name="Iconly/Light-Outline/Arrow - Right 2"
          xmlns="http://www.w3.org/2000/svg"
          width={props.size}
          height={props.size}
          viewBox="0 0 18 18"
        >
          <G
            id="Arrow_-_Right_2"
            data-name="Arrow - Right 2"
            transform="translate(5.813 14.813) rotate(-90)"
          >
            <Path
              id="Stroke_1"
              data-name="Stroke 1"
              d="M.165.165A.563.563,0,0,1,.9.11L.96.165,5.813,5.017,10.665.165A.563.563,0,0,1,11.4.11l.063.054A.563.563,0,0,1,11.515.9L11.46.96,6.21,6.21a.563.563,0,0,1-.732.054L5.415,6.21.165.96A.562.562,0,0,1,.165.165Z"
              fill={props.color}
              stroke={props.color}
              stroke-width="1"
            />
          </G>
        </Svg>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

export default ArrowButton;
