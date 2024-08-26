import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { globalStyles } from "../globalStyles";
import FormField from "@/components/FormField";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Video, ResizeMode } from "expo-av";
import * as ImagePicker from "expo-image-picker";

import { icons } from "@/constants";
import CustomButton from "@/components/CustomButton";
import { router } from "expo-router";
import { createVideo } from "@/lib/appwrite";
import { useGlobalContext } from "@/context/globalProvider";

interface FormState {
  title: string;
  video: { uri: string } | null;
  thumbnail: { uri: string } | null;
  prompt: string;
}

const Create = () => {
  const { user } = useGlobalContext();
  const [uploading, setUploading] = useState<boolean>(false);

  const [form, setForm] = useState<FormState>({
    title: "",
    video: null,
    thumbnail: null,
    prompt: "",
  });

  const openPicker = async (selectType: string) => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes:
        selectType === "image"
          ? ImagePicker.MediaTypeOptions.Images
          : ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      if (selectType === "image") {
        setForm({ ...form, thumbnail: result.assets[0] });
      }

      if (selectType === "video") {
        setForm({ ...form, video: result.assets[0] });
      }
    }
  };

  const submit = async () => {
    if (!form.prompt || !form.title || !form.video || !form.thumbnail) {
      return Alert.alert("Please fill in all the fields");
    }
    setUploading(true);
    try {
      await createVideo({
        ...form,
        userId: user.$id,
      });

      Alert.alert("Success", "Post uploaded successfully");
      router.push("/home");
    } catch (error: any) {
      Alert.alert("Error", error.message);
    } finally {
      setUploading(false);
      setForm({
        title: "",
        video: null,
        thumbnail: null,
        prompt: "",
      });
    }
  };

  return (
    <GestureHandlerRootView style={{ width: "100%", height: "100%" }}>
      <SafeAreaView style={[globalStyles.bgPrimary, { height: "100%" }]}>
        <ScrollView style={{ paddingHorizontal: 10, marginVertical: 12 }}>
          <Text
            style={[globalStyles.psemibold, { color: "#fff", fontSize: 24 }]}
          >
            Upload Video
          </Text>

          <FormField
            title="Video Title"
            value={form.title}
            placeholder="Give your video a catchy title"
            handleChangeText={(e) => setForm({ ...form, title: e })}
            otherStyles={{ marginTop: 20 }}
          />

          <View style={{ marginTop: 14, rowGap: 10 }}>
            <Text style={[globalStyles.pmedium, { color: "lightgrey" }]}>
              Upload Video
            </Text>

            <TouchableOpacity onPress={() => openPicker("video")}>
              {form.video ? (
                <Video
                  source={{ uri: form.video.uri }}
                  resizeMode={ResizeMode.COVER}
                  style={{ width: "100%", height: 280, borderRadius: 16 }}
                />
              ) : (
                <View
                  style={{
                    width: "100%",
                    height: 200,
                    paddingHorizontal: 8,
                    backgroundColor: "#1E1E2D",
                    borderRadius: 16,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <View
                    style={{
                      width: 80,
                      height: 80,
                      borderStyle: "dashed",
                      borderColor: "#FF9001",
                      borderWidth: 1,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Image
                      source={icons.upload}
                      resizeMode="contain"
                      style={{ width: 48, height: 48 }}
                    />
                  </View>
                </View>
              )}
            </TouchableOpacity>

            <View style={{ marginTop: 14, gap: 8 }}>
              <Text style={[globalStyles.pmedium, { color: "lightgrey" }]}>
                Thumbnail Image
              </Text>

              <TouchableOpacity onPress={() => openPicker("image")}>
                {form.thumbnail ? (
                  <Image
                    source={{ uri: form.thumbnail.uri }}
                    resizeMode="cover"
                    style={{ width: "100%", borderRadius: 16, height: 280 }}
                  />
                ) : (
                  <View
                    style={{
                      width: "100%",
                      height: 100,
                      paddingHorizontal: 8,
                      backgroundColor: "#1E1E2D",
                      borderRadius: 16,
                      borderColor: "#232533",
                      borderWidth: 2,
                      flexDirection: "row",
                      columnGap: 10,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Image
                      source={icons.upload}
                      resizeMode="contain"
                      style={{ width: 24, height: 24 }}
                    />

                    <Text
                      style={[
                        globalStyles.pmedium,
                        { color: "lightgrey", fontSize: 14 },
                      ]}
                    >
                      Choose a file
                    </Text>
                  </View>
                )}
              </TouchableOpacity>
            </View>

            <FormField
              title="AI Prompt"
              value={form.prompt}
              placeholder="The prompt you used to create this video"
              handleChangeText={(e) => setForm({ ...form, prompt: e })}
              otherStyles={{ marginTop: 16 }}
            />

            <CustomButton
              title="Submit & Publish"
              handlePress={submit}
              containerStyles={{ marginTop: 14 }}
              isLoading={uploading}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default Create;
