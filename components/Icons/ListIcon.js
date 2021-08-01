import React from "react";
import Svg, { Path } from "react-native-svg";

const ListIcon = (props) => {
  return (
    <Svg
      id="Document"
      xmlns="http://www.w3.org/2000/svg"
      width={props.size}
      height={props.size}
      viewBox="0 0 20 20"
    >
      <Path
        id="Document-2"
        data-name="Document"
        d="M13.191,20H4.81C1.753,20,0,18.236,0,15.16V4.83A4.91,4.91,0,0,1,1.265,1.271,4.863,4.863,0,0,1,4.81,0h8.382C16.247,0,18,1.761,18,4.83V15.16a4.891,4.891,0,0,1-1.246,3.583A4.819,4.819,0,0,1,13.191,20ZM5,13.736a.78.78,0,0,0-.668.374.786.786,0,0,0,.653,1.206.7.7,0,0,0,.1-.006H12.92a.79.79,0,0,0,0-1.57H5.08A.8.8,0,0,0,5,13.736ZM5.08,9.179a.78.78,0,0,0,0,1.561H12.92a.78.78,0,0,0,0-1.561Zm0-4.529v.01h0a.779.779,0,0,0,0,1.559h2.99a.785.785,0,0,0,0-1.57Z"
        fill={props.color}
      />
    </Svg>
  );
};

export default ListIcon;
