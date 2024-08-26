import { View, Text, FlatList, Image } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { globalStyles } from "../globalStyles";
import { images } from "@/constants";
import SearchInput from "@/components/SearchInput";
import Trending from "@/components/Trending";
import EmptyState from "@/components/EmptyState";
import {
  GestureHandlerRootView,
  RefreshControl,
} from "react-native-gesture-handler";

import { getAllPosts, getLatestVideos } from "@/lib/appwrite";
import useAppwrite from "../../lib/useAppwrite";
import VideoCard from "@/components/VideoCard";
import { useGlobalContext } from "@/context/globalProvider";

const Home = () => {
  const { user, setUser, setIsLogged } = useGlobalContext();
  // we get the object from the return and rename it to posts
  const { data: posts, refetch } = useAppwrite(getAllPosts);
  const { data: latestVideos } = useAppwrite(getLatestVideos);

  const [refreshing, setRefreshing] = useState(false);

  // recall videos -> if any new videos appeared
  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  return (
    <GestureHandlerRootView>
      <SafeAreaView style={[globalStyles.bgPrimary, { height: "100%" }]}>
        <FlatList
          data={posts}
          keyExtractor={(item) => item.$id}
          renderItem={({ item }: { item: { [key: string]: any } }) => (
            <VideoCard video={item} />
          )}
          ListHeaderComponent={() => (
            <View style={{ marginVertical: 16, paddingHorizontal: 12 }}>
              <View
                style={{
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  flex: 1,
                  flexDirection: "row",
                  marginBottom: 12,
                }}
              >
                <View>
                  <Text
                    style={[
                      globalStyles.pmedium,
                      { color: "lightgray", fontSize: 14 },
                    ]}
                  >
                    Welcome Back,
                  </Text>
                  <Text
                    style={[
                      globalStyles.psemibold,
                      { color: "#fff", fontSize: 22 },
                    ]}
                  >
                    {user?.username}
                  </Text>
                </View>
                <View style={{ marginTop: 2 }}>
                  <Image
                    source={images.logoSmall}
                    resizeMode="contain"
                    style={{ width: 32, height: 32 }}
                  />
                </View>
              </View>
              <SearchInput initialQuery="" />
              <View
                style={{
                  width: "100%",
                  flex: 1,
                  paddingTop: 10,
                  paddingBottom: 16,
                }}
              >
                <Text
                  style={[
                    globalStyles.pregular,
                    { color: "lightgray", fontSize: 16, marginBottom: 8 },
                  ]}
                >
                  Latest Videos
                </Text>
                <Trending posts={latestVideos ?? []} />
              </View>
            </View>
          )}
          ListEmptyComponent={() => (
            <EmptyState
              title="No Videos Found"
              subtitle="Be the first one to upload a video"
            />
          )}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default Home;
