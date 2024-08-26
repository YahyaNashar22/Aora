import { View, TextInput, Image, Alert } from "react-native";
import React, { useState } from "react";
import { globalStyles } from "@/app/globalStyles";
import {
  GestureHandlerRootView,
  TouchableOpacity,
} from "react-native-gesture-handler";
import { icons } from "@/constants";
import { router, usePathname } from "expo-router";

const SearchInput = ({ initialQuery }: { initialQuery: any }) => {
  const [focused, setFocused] = useState<boolean>(false);
  const pathname = usePathname();

  const [query, setQuery] = useState<string>(initialQuery);

  return (
    <View
      style={{
        width: "100%",
        height: 60,
        paddingHorizontal: 6,
        borderWidth: 1,
        borderRadius: 10,
        alignItems: "center",
        backgroundColor: "#1E1E2D",
        borderColor: focused ? "#FF8E01" : "#232533",
        flexDirection: "row",
        justifyContent: "space-around",
      }}
    >
      <TextInput
        style={[
          globalStyles.pregular,
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
        placeholderTextColor="#cdcde0"
        placeholder="Search for a video topic"
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        value={query}
        onChangeText={(e) => setQuery(e)}
      />
      <GestureHandlerRootView>
        <TouchableOpacity
          onPress={() => {
            if (!query) {
              return Alert.alert(
                "Missing query",
                "Please input something to search results across database"
              );
            }

            if (pathname.startsWith("/search")) router.setParams({ query });
            else router.push(`/search/${query}`);
          }}
          style={{ alignSelf: "flex-end", paddingRight: 6 }}
        >
          <Image
            source={icons.search}
            style={{ width: 20, height: 20 }}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </GestureHandlerRootView>
    </View>
  );
};

export default SearchInput;
