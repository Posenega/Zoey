import React, { useEffect, useRef } from "react";
import { View, StyleSheet, Text, Dimensions } from "react-native";
import { connect, useDispatch, useSelector } from "react-redux";
import { Modalize } from "react-native-modalize";
import { getThemeColor } from "../constants/Colors";
import { useForm } from "react-hook-form";
import { addBookFinish } from "../store/actions/books";
import {
  addRef,
  modalOpen,
  modalClose,
  modalSetState,
} from "../store/actions/addBookModal";
import AddBook from "./Modal/AddBook";
import CustomButton from "./CustomButton";
import AddPackage from "./Modal/AddPackage";

function AddModal(props) {
  const addBookStatus = useSelector(
    (state) => state.books.addBookStatus
  );
  const modalState = useSelector(
    (state) => state.addBookModal.modalState
  );
  const modalRef = useSelector((state) => state.addBookModal.ref);
  const styles = getStyles(props.theme);

  const { reset } = useForm();
  const modalizeRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!modalRef) {
      dispatch(addRef(modalizeRef));
    }
  }, [modalizeRef, modalRef]);

  useEffect(() => {
    if (modalState === "book" && addBookStatus === "SUCCESS") {
      reset();
      modalizeRef.current?.close();
      dispatch(addBookFinish());
    }
  }, [addBookStatus, modalState]);

  return (
    <Modalize
      adjustToContentHeight
      alwaysOpen={addBookStatus === "LOADING"}
      onOpened={() => dispatch(modalOpen())}
      onClosed={() => {
        // reset();
        dispatch(modalSetState(null));
        dispatch(modalClose());
      }}
      handlePosition="inside"
      handleStyle={{
        backgroundColor: getThemeColor("text", props.theme),
      }}
      modalStyle={{
        backgroundColor: getThemeColor("main", props.theme),
      }}
      ref={modalizeRef}>
      {modalState === "book" ? (
        <AddBook />
      ) : modalState === "package" ? (
        <AddPackage closeModal={modalizeRef.current?.close} />
      ) : (
        <View style={styles.selector}>
          <Text style={styles.headerText}>
            What would you like to create?
          </Text>
          <View style={styles.buttonContainer}>
            <CustomButton
              containerStyle={{ marginRight: 15 }}
              onPress={() => dispatch(modalSetState("book"))}>
              Book
            </CustomButton>
            <CustomButton
              onPress={() => dispatch(modalSetState("package"))}>
              Package
            </CustomButton>
          </View>
        </View>
      )}
    </Modalize>
  );
}

export default connect(
  (state) => ({
    theme: state.themes.theme,
  }),
  {}
)(AddModal);

const getStyles = (theme) =>
  StyleSheet.create({
    selector: {
      height: 600,
      justifyContent: "center",
      alignItems: "center",
      flex: 1,
    },
    headerText: {
      color: getThemeColor("text", theme),
    },
    buttonContainer: { flexDirection: "row" },
  });
