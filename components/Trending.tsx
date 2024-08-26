import { icons } from "@/constants";
import {
  Video,
  ResizeMode,
  AVPlaybackStatusSuccess,
  AVPlaybackStatusError,
} from "expo-av";
import { useState } from "react";
import {
  FlatList,
  ViewStyle,
  TextStyle,
  ImageStyle,
  TouchableOpacity,
  ImageBackground,
  Image,
} from "react-native";
import * as Animatable from "react-native-animatable";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const zoomIn: Animatable.CustomAnimation<TextStyle & ViewStyle & ImageStyle> = {
  0: {
    scaleX: 0.9,
    scaleY: 0.9,
  },
  1: {
    scaleX: 1.1,
    scaleY: 1.1,
  },
};

const zoomOut: Animatable.CustomAnimation<TextStyle & ViewStyle & ImageStyle> =
  {
    0: {
      scaleX: 1,
      scaleY: 1,
    },
    1: {
      scaleX: 0.9,
      scaleY: 0.9,
    },
  };

const TrendingItem = ({ activeItem, item }: { activeItem: any; item: any }) => {
  const [play, setPlay] = useState<boolean>(false);

  return (
    <Animatable.View
      style={{ marginHorizontal: 12 }}
      animation={activeItem === item.$id ? zoomIn : zoomOut}
      duration={500}
    >
      {play ? (
        <Video
          source={{
            uri: item.video,
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
            width: 180,
            height: 280,
            borderRadius: 26,
            marginVertical: 10,
            backgroundColor: "#0a0a0a",
          }}
        />
      ) : (
        <GestureHandlerRootView>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => setPlay(!play)}
            style={{
              position: "relative",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ImageBackground
              source={{ uri: item.thumbnail }}
              style={{
                width: 180,
                height: 280,
                borderRadius: 26,
                marginVertical: 10,
                overflow: "hidden",
                shadowColor: "#000",
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
    </Animatable.View>
  );
};

const Trending = ({ posts }: { [key: string]: any }) => {
  const [activeItem, setActiveItem] = useState(posts[1]);

  const viewableItemsChanged = ({ viewableItems }: { viewableItems: any }) => {
    setActiveItem(viewableItems[0].key);
  };

  return (
    <FlatList
      style={{ paddingLeft: 0, height: 360 }}
      contentContainerStyle={{ justifyContent: "center", alignItems: "center" }}
      data={posts}
      keyExtractor={(item) => item.$id}
      renderItem={({ item }) => (
        <TrendingItem activeItem={activeItem} item={item} />
      )}
      onViewableItemsChanged={viewableItemsChanged}
      viewabilityConfig={{
        itemVisiblePercentThreshold: 70,
      }}
      contentOffset={{ x: 60, y: 0 }}
      horizontal
    />
  );
};

export default Trending;
