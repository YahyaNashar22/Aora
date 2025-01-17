import { useState, useEffect } from "react";
import { Alert } from "react-native";

const useAppwrite = (fn) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const fetchData = async () => {
    if (typeof fn !== "function") {
      Alert.alert("Error", "Provided argument is not a function");
      return;
    }
    setLoading(true);
    try {
      const response = await fn();
      setData(response);
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refetch = () => fetchData();

  return { data, loading, refetch };
};

export default useAppwrite;
