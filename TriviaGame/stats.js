import React, { useState, useEffect } from "react";
import { Button, Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "test";

export default function StatsScreen() {
  const [test, setTest] = useState(0);

  // on mount, load saved value
  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        setTest(raw !== null ? parseInt(raw, 10) : 0);
      } catch (e) {
        console.error("Load error:", e);
      }
    })();
  }, []);

  // helper to save & update
  const updateTest = async (delta) => {
    const next = test + delta;
    setTest(next);
    try {
      await AsyncStorage.setItem(STORAGE_KEY, String(next));
    } catch (e) {
      console.error("Save error:", e);
    }
  };

  return (
    <View style={{ paddingTop: 50 }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Value: {test}</Text>
      <Button title="+1" onPress={() => updateTest(1)} />
      <View style={{ height: 10 }} />
      <Button title="-1" onPress={() => updateTest(-1)} />
    </View>
  );
}
