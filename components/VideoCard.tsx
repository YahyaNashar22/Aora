import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { globalStyles } from "@/app/globalStyles";
import { icons } from "@/constants";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
  AVPlaybackStatusError,
  AVPlaybackStatusSuccess,
  ResizeMode,
  Video,
} from "expo-av";

const VideoCard = ({
  // object destructuring to get all values outside of the object video
  video: {
    title,
    thumbnail,
    video,
    creator: { username, avatar },
  },
}: {
  [key: string]: any;
}) => {
  const [play, setPlay] = useState<boolean>(false);

  return (
    <View
      style={{ alignItems: "center", paddingHorizontal: 10, marginBottom: 48 }}
    >
      <View style={{ flexDirection: "row", gap: 3, alignItems: "flex-start" }}>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              width: 50,
              height: 50,
              borderRadius: 16,
              borderColor: "#FF9C01",
              borderWidth: 1,
              justifyContent: "center",
              alignItems: "center",
              padding: 1,
            }}
          >
            <Image
              source={{ uri: avatar }}
              style={{ width: "100%", height: "100%", borderRadius: 16 }}
              resizeMode="cover"
            />
          </View>

          <View
            style={{
              justifyContent: "center",
              alignItems: "flex-start",
              flex: 1,
              columnGap: 5,
              marginLeft: 16,
            }}
          >
            <Text
              style={[globalStyles.psemibold, { fontSize: 14, color: "#fff" }]}
              numberOfLines={1}
            >
              {title}
            </Text>

            <Text
              style={[
                globalStyles.pregular,
                { fontSize: 12, color: "lightgray" },
              ]}
              numberOfLines={1}
            >
              {username}
            </Text>
          </View>
        </View>

        <View style={{ paddingTop: 10 }}>
          <Image
            source={icons.menu}
            style={{ width: 18, height: 18 }}
            resizeMode="contain"
          />
        </View>
      </View>

      {play ? (
        <Video
          source={{
            uri: video,
          }}
          resizeMode={ResizeMode.CONTAIN}
          useNativeControls
          shouldPlay
          onPlaybackStatusUpdate={(status) => {
            if ((status as AVPlaybackStatusSuccess).didJustFinish) {
              setPlay(false);
            }
            if ((status as AVPlaybackStatusError).error) {
              console.log((status as AVPlaybackStatusError).error);
            }
          }}
          style={{
            width: 360,
            height: 180,
            borderRadius: 16,
            marginVertical: 10,
            backgroundColor: "#0a0a0a",
          }}
        />
      ) : (
        <GestureHandlerRootView>
          <TouchableOpacity
            style={{
              width: 360,
              height: 180,
              borderRadius: 16,
              marginTop: 12,
              position: "relative",
              justifyContent: "center",
              alignItems: "center",
            }}
            activeOpacity={0.7}
            onPress={() => setPlay(!play)}
          >
            <Image
              source={{ uri: thumbnail }}
              style={{
                width: "100%",
                height: "100%",
                marginTop: 3,
                borderRadius: 16,
              }}
              resizeMode="cover"
            />

            <Image
              source={icons.play}
              style={{ width: 36, height: 36, position: "absolute" }}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </GestureHandlerRootView>
      )}
    </View>
  );
};

export default VideoCard;
