import React from "react";
import { useSelector } from "react-redux";
import { TouchableWithoutFeedback } from "react-native";

import Svg, { Path, G } from "react-native-svg";
import Colors from "../../constants/Colors";

const AddButton = (props) => {
  const addBookModalRef = useSelector((state) => state.addBookModal.ref);
  const addBookModalOpen = useSelector((state) => state.addBookModal.modalOpen);

  return (
    <TouchableWithoutFeedback onPress={() => addBookModalRef?.current?.open()}>
      <Svg
        width={props.size}
        height={props.size}
        id="Iconly_Bold_Plus"
        data-name="Iconly/Bold/Plus"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
      >
        <G id="Plus">
          <Path
            id="Plus-2"
            data-name="Plus"
            d="M14.67,20H5.33a5.349,5.349,0,0,1-3.944-1.394A5.356,5.356,0,0,1,0,14.67V5.33A5.358,5.358,0,0,1,1.386,1.386,5.358,5.358,0,0,1,5.33,0h9.33a5.372,5.372,0,0,1,3.945,1.386A5.345,5.345,0,0,1,20,5.33v9.34C20,18.057,18.057,20,14.67,20ZM6.33,9.16a.819.819,0,0,0-.83.83.839.839,0,0,0,.83.84H9.16V13.66a.83.83,0,1,0,1.66,0V10.83h2.84a.835.835,0,0,0,0-1.669H10.82V6.34a.83.83,0,1,0-1.66,0V9.16Z"
            fill={addBookModalOpen ? Colors.primaryColor : "#C9C9C9"}
          />
        </G>
      </Svg>
    </TouchableWithoutFeedback>
  );
};

export default AddButton;
