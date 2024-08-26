import { View, Text, FlatList } from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { globalStyles } from "../globalStyles";
import SearchInput from "@/components/SearchInput";
import EmptyState from "@/components/EmptyState";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { searchPosts } from "@/lib/appwrite";
import useAppwrite from "../../lib/useAppwrite";
import VideoCard from "@/components/VideoCard";
import { useLocalSearchParams } from "expo-router";

const Search = () => {
  const { query } = useLocalSearchParams();
  // we get the object from the return and rename it to posts
  const { data: posts, refetch } = useAppwrite(() => searchPosts(query));

  useEffect(() => {
    refetch();
  }, [query]);

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
                <Text
                  style={[
                    globalStyles.pmedium,
                    { color: "lightgray", fontSize: 12 },
                  ]}
                >
                  Search Results
                </Text>
                <Text
                  style={[
                    globalStyles.psemibold,
                    { color: "#fff", fontSize: 16 },
                  ]}
                >
                  {query}
                </Text>
              </View>
              <View style={{ marginTop: 12, marginBottom: 16 }}>
                <SearchInput initialQuery={query} />
              </View>
            </View>
          )}
          ListEmptyComponent={() => (
            <EmptyState
              title="No Videos Found"
              subtitle="No videos found for this search query"
            />
          )}
        />
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default Search;
