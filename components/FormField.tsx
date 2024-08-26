import { View, Text, TextInput, Image } from "react-native";
import React, { FC, useState } from "react";
import { globalStyles } from "@/app/globalStyles";
import {
  GestureHandlerRootView,
  TouchableOpacity,
} from "react-native-gesture-handler";
import { icons } from "@/constants";

interface FormFieldProps {
  title: string;
  value: string;
  handleChangeText: (e: any) => void;
  otherStyles?: { [key: string]: any };
  keyboardType?: string;
  placeholder?: string;
}

const FormField: FC<FormFieldProps> = ({
  title,
  value,
  handleChangeText,
  otherStyles = {},
  keyboardType = "",
  placeholder = "",
}) => {
  const [focused, setFocused] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <View style={[otherStyles]}>
      <Text
        style={
          (globalStyles.pmedium, { color: "lightgray", paddingBottom: 10 })
        }
      >
        {title}
      </Text>

      <View
        style={{
          width: "100%",
          height: 60,
          paddingHorizontal: 10,
          borderWidth: 1,
          borderRadius: 10,
          alignItems: "center",
          backgroundColor: "#1E1E2D",
          borderColor: focused ? "#FF8E01" : "#232533",
          flexDirection: "row",
        }}
      >
        <TextInput
          style={[
            globalStyles.psemibold,
            {
              flex: 1,
              color: "#fff",
              width: "100%",
              height: "100%",
              alignItems: "center",
              justifyContent: "center",
              paddingHorizontal: 10,
            },
          ]}
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#7b7b8b"
          onChangeText={handleChangeText}
          secureTextEntry={title === "Password" && !showPassword}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
        {title === "Password" && (
          <GestureHandlerRootView>
            <TouchableOpacity
              onPress={() => setShowPassword(!showPassword)}
              style={{ alignSelf: "flex-end" }}
            >
              <Image
                source={icons.eyeHide}
                style={{ width: 24, height: 24 }}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </GestureHandlerRootView>
        )}
      </View>
    </View>
  );
};

export default FormField;
