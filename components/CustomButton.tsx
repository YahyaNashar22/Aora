import { TouchableOpacity, Text } from "react-native";
import React, { FC } from "react";
import { globalStyles } from "@/app/globalStyles";

interface CustomButtonProps {
  title: string;
  handlePress: () => void;
  containerStyles?: { [key: string]: any };
  textStyles?: { [key: string]: any };
  isLoading?: boolean;
}

const CustomButton: FC<CustomButtonProps> = ({
  title,
  handlePress,
  containerStyles = {},
  textStyles = {},
  isLoading= false,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      disabled={isLoading}
      onPress={handlePress}
      style={[
        globalStyles.bgSecondary,
        {
          minHeight: 60,
          borderRadius: 10,
          alignItems: "center",
          justifyContent: "center",
          opacity: isLoading ? 50 : 100,
        },
        containerStyles,
      ]}
    >
      <Text
        style={[
          globalStyles.primary,
          globalStyles.psemibold,
          { fontSize: 16 },
          textStyles,
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
