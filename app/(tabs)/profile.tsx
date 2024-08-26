import { View, FlatList, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { globalStyles } from "../globalStyles";
import EmptyState from "@/components/EmptyState";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { getUserPosts, signOut } from "@/lib/appwrite";
import useAppwrite from "../../lib/useAppwrite";
import VideoCard from "@/components/VideoCard";
import { useGlobalContext } from "@/context/globalProvider";
import { icons } from "@/constants";
import InfoBox from "@/components/InfoBox";
import { router } from "expo-router";

const Profile = () => {
  const { user, setUser, setIsLogged } = useGlobalContext();
  // we get the object from the return and rename it to posts
  const { data: posts, refetch } = useAppwrite(() => getUserPosts(user.$id));

  const logout = async () => {
    await signOut();
    setUser(null);
    setIsLogged(false);

    router.replace("/sign-in");
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
            <View
              style={{
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
                marginTop: 10,
                marginBottom: 16,
                paddingHorizontal: 8,
              }}
            >
              <TouchableOpacity
                style={{
                  width: "100%",
                  alignItems: "flex-end",
                  marginBottom: 20,
                }}
                onPress={logout}
              >
                <Image
                  source={icons.logout}
                  resizeMode="contain"
                  style={{ width: 24, height: 24 }}
                />
              </TouchableOpacity>

              <View
                style={{
                  width: 100,
                  height: 100,
                  borderColor: "#FF9C01",
                  borderRadius: 16,
                  borderWidth: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image
                  source={{ uri: user?.avatar }}
                  style={{ width: "90%", height: "90%", borderRadius: 16 }}
                  resizeMode="cover"
                />
              </View>

              <InfoBox
                title={user?.username}
                containerStyles={{ marginTop: 10 }}
                titleStyles={{ fontSize: 16 }}
              />
              <View
                style={{
                  flexDirection: "row",
                  marginTop: 10,
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 30,
                  columnGap: 20,
                  width: "100%",
                }}
              >
                <InfoBox
                  title={posts.length || 0}
                  subtitle="Posts"
                  containerStyles={{ marginRight: 20 }}
                  titleStyles={{ fontSize: 14 }}
                />

                <InfoBox
                  title="1.2k"
                  subtitle="Followers"
                  titleStyles={{ fontSize: 14 }}
                />
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

export default Profile;
