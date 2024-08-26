import { View, Text, Image } from "react-native";
import React, { FC } from "react";
import { images } from "@/constants";
import { globalStyles } from "@/app/globalStyles";
import CustomButton from "./CustomButton";
import { router } from "expo-router";

interface EmptyStateProps {
  title: string;
  subtitle: string;
}

const EmptyState: FC<EmptyStateProps> = ({ title, subtitle }) => {
  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 10,
      }}
    >
      <Image
        source={images.empty}
        style={{ width: 240, height: 240 }}
        resizeMode="contain"
      />
      <Text
        style={[
          globalStyles.psemibold,
          { color: "#fff", fontSize: 16, marginTop: 2 },
        ]}
      >
        {title}
      </Text>

      <Text
        style={[globalStyles.pmedium, { color: "lightgray", fontSize: 12 }]}
      >
        {subtitle}
      </Text>

      <CustomButton
        title="Create Video"
        handlePress={() => router.push("/create")}
        containerStyles={{ width: "100%", marginVertical: 10 }}
      />
    </View>
  );
};

export default EmptyState;
