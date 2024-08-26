import { Image, Text, View } from "react-native";
import { globalStyles } from "./globalStyles";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import {
  GestureHandlerRootView,
  ScrollView,
} from "react-native-gesture-handler";
import { router, Redirect } from "expo-router";
import "react-native-url-polyfill/auto";

import { images } from "@/constants";
import CustomButton from "@/components/CustomButton";
import { useGlobalContext } from "../context/globalProvider.js";

export default function Index() {
  const { isLoading, isLogged } = useGlobalContext();

  if (!isLoading && isLogged) return <Redirect href="/home" />;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={[globalStyles.bgPrimary, { height: "100%" }]}>
        <ScrollView
          contentContainerStyle={{
            height: "100%",
          }}
        >
          <View
            style={{
              width: "100%",
              height: "80%",
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              paddingHorizontal: 10,
            }}
          >
            <Image
              source={images.logo}
              resizeMode="contain"
              style={{ width: 130, height: 84 }}
            />
            <Image
              source={images.cards}
              style={{ maxWidth: 380, width: "100%", height: 300 }}
              resizeMode="contain"
            />
            <View style={{ position: "relative", marginTop: 5 }}>
              <Text
                style={{
                  fontSize: 30,
                  color: "#fff",
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                Discover Endless Possibilities with{" "}
                <Text style={globalStyles.secondary}>Aora</Text>
              </Text>
              <Image
                source={images.path}
                style={{
                  width: 100,
                  height: 100,
                  position: "absolute",
                  bottom: -52,
                  right: -8,
                }}
                resizeMode="contain"
              />
            </View>
            <Text
              style={[
                globalStyles.pregular,
                {
                  fontSize: 15,
                  color: "lightgrey",
                  marginTop: 20,
                  textAlign: "center",
                },
              ]}
            >
              Where creativity meets innovation: embark on a journey of
              limitless exploration with Aora
            </Text>
            <CustomButton
              title="Continue with Email"
              handlePress={() => router.push("/sign-in")}
              containerStyles={{ width: "100%", marginTop: 30 }}
              isLoading={false}
            />
          </View>
        </ScrollView>
        <StatusBar backgroundColor="#161622" style="light" />
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}
