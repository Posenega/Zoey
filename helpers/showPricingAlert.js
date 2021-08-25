import * as SecureStore from "expo-secure-store";
import { Alert } from "react-native";
const storeDataAndNavigate = async (navigation, closeModal) => {
  try {
    navigation.navigate("settings", {
      screen: "pricing",
    });

    await SecureStore.setItemAsync("seenPricing", "true");
    closeModal();
  } catch (error) {
    console.log(error);
  }
};

export default showPricingAlert = async (navigation, closeModal) => {
  const seenPricing = await SecureStore.getItemAsync("seenPricing");

  if (!seenPricing) {
    Alert.alert(
      "Pricing",
      "Check out The pricing list that we have prepared to lead you while adding your books for sell.",
      [
        {
          text: "Later",
          style: "cancel",
        },
        {
          text: "Check Now",
          onPress: () => storeDataAndNavigate(navigation, closeModal),
          style: "default",
        },
      ],
      {
        cancelable: true,
      }
    );
  }
};
