import React, { useEffect, useRef, useState } from "react";
import { View, StyleSheet } from "react-native";
import { connect, useDispatch, useSelector } from "react-redux";
import { Modalize } from "react-native-modalize";
import { getThemeColor } from "../constants/Colors";
import { useForm } from "react-hook-form";
import { addBookFinish } from "../store/actions/books";
import { addRef, modalOpen, modalClose } from "../store/actions/addBookModal";
import AddBook from "./Modal/AddBook";
import CustomButton from "./CustomButton";
import AddPackage from "./Modal/AddPackage";

function AddModal(props) {
  const addBookStatus = useSelector((state) => state.books.addBookStatus);
  const [modalState, setModalState] = useState("");
  const { reset } = useForm();
  const modalizeRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(addRef(modalizeRef));
  }, [modalizeRef]);

  useEffect(() => {
    if (addBookStatus === "SUCCESS") {
      reset();
      modalizeRef.current?.close();
      dispatch(addBookFinish());
    }
  }, [addBookStatus]);
  let currentState;
  if (modalState === "book") {
    currentState = <AddBook />;
  } else if (modalState === "package") {
    currentState = <AddPackage />;
  }
  return (
    <Modalize
      modalHeight={600}
      alwaysOpen={addBookStatus === "LOADING"}
      onOpened={() => dispatch(modalOpen())}
      onClosed={() => {
        reset();
        setModalState("");
        dispatch(modalClose());
      }}
      handlePosition="inside"
      handleStyle={{
        backgroundColor: getThemeColor("text", props.theme),
      }}
      modalStyle={{
        backgroundColor: getThemeColor("main", props.theme),
      }}
      ref={modalizeRef}
    >
      <View style={modalState === "" ? styles.mainContainer : null}>
        <View style={styles.selector}>
          {modalState !== "" ? (
            currentState
          ) : (
            <>
              <CustomButton
                containerStyle={{ marginRight: 15 }}
                onPress={() => setModalState("book")}
              >
                Book
              </CustomButton>
              <CustomButton onPress={() => setModalState("package")}>
                Package
              </CustomButton>
            </>
          )}
        </View>
      </View>
    </Modalize>
  );
}

export default connect(
  (state) => ({
    theme: state.themes.theme,
  }),
  {}
)(AddModal);

const styles = StyleSheet.create({
  mainContainer: {
    height: 600,
  },
  selector: {
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "100%",
    flexDirection: "row",
  },
});
