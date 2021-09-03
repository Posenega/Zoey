import React from "react";
import { TouchableWithoutFeedback } from "react-native";
import Svg, { Path, G } from "react-native-svg";

const CategoryButton = (props) => {
  return (
    <TouchableWithoutFeedback {...props}>
      <Svg
        id="Iconly_Bold_Logout"
        data-name="Iconly/Bold/Logout"
        xmlns="http://www.w3.org/2000/svg"
        width="20.78"
        height="20"
        viewBox="0 0 20.78 20"
      >
        <G id="Logout">
          <Path
            id="Logout-2"
            data-name="Logout"
            d="M4.517,20A4.482,4.482,0,0,1,0,15.56V4.45A4.493,4.493,0,0,1,4.528,0H9.492A4.48,4.48,0,0,1,14,4.44V9.23H7.9a.77.77,0,1,0,0,1.54H14v4.78A4.493,4.493,0,0,1,9.472,20ZM16.54,13.451a.773.773,0,0,1,0-1.09l1.6-1.59H14V9.23h4.14l-1.6-1.59a.773.773,0,0,1,0-1.09.764.764,0,0,1,1.09-.01l2.92,2.91a.766.766,0,0,1,.229.55.741.741,0,0,1-.229.54l-2.92,2.911a.762.762,0,0,1-1.09,0Z"
            transform="translate(0)"
            fill={props.color}
          />
        </G>
      </Svg>
    </TouchableWithoutFeedback>
  );
};

export default CategoryButton;
