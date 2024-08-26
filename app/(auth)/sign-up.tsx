import { View, Text, ScrollView, Image, Alert } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { globalStyles } from "../globalStyles";

import { images } from "@/constants";
import FormField from "@/components/FormField";
import CustomButton from "@/components/CustomButton";
import { Link, router } from "expo-router";
import { createUser } from "@/lib/appwrite";
import { useGlobalContext } from "@/context/globalProvider";

const SignUp = () => {
  const { setUser, setIsLogged } = useGlobalContext();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onSubmit = async () => {
    if (!form.username || !form.email || !form.password) {
      Alert.alert("Error", "Please fill in all the fields");
      return;
    }

    setIsLoading(true);

    try {
      const result = await createUser(form.email, form.password, form.username);

      // set it to global state
      setUser(result);
      setIsLogged(true);

      router.replace("/home");
    } catch (error) {
      let errorMessage = "An unexpected error occurred";

      if (error instanceof Error) {
        errorMessage = error.message;
      }

      Alert.alert("Error", errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={[globalStyles.bgPrimary, { flex: 1 }]}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View
          style={{
            paddingHorizontal: 16,
            width: "100%",
            marginVertical: 10,
            flex: 1,
            justifyContent: "center",
          }}
        >
          <Image
            source={images.logo}
            resizeMode="contain"
            style={{ width: 100, height: 35 }}
          />
          <Text
            style={[
              globalStyles.psemibold,
              {
                fontSize: 20,
                color: "#fff",
                marginTop: 16,
                fontWeight: "semibold",
              },
            ]}
          >
            Sign up to Aora
          </Text>

          <FormField
            title="Username"
            value={form.username}
            handleChangeText={(e) => setForm({ ...form, username: e })}
            otherStyles={{ marginTop: 20 }}
          />

          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles={{ marginTop: 20 }}
            keyboardType="email-address"
          />

          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles={{ marginTop: 20 }}
          />

          <CustomButton
            title="Sign up"
            handlePress={onSubmit}
            isLoading={isLoading}
            containerStyles={{ marginTop: 24 }}
            textStyles={{ fontSize: 16 }}
          />

          <View
            style={{
              justifyContent: "center",
              paddingTop: 12,
              flexDirection: "row",
              gap: 2,
            }}
          >
            <Text
              style={[
                globalStyles.pregular,
                { color: "lightgray", fontSize: 14 },
              ]}
            >
              Already have an account?{" "}
            </Text>
            <Link
              href="/sign-in"
              style={[
                globalStyles.secondary,
                globalStyles.psemibold,
                { fontSize: 14 },
              ]}
            >
              Sign in
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
