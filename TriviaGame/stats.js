import React, { useState, useEffect } from "react";
import { Button, Text, TextInput, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function StatsScreen() {
  const [stat, setStat] = useState([
    { category: "General Knowledge", percent: 0 },
    { category: "Entertainment: Books", percent: 0 },
    { category: "Entertainment: Film", percent: 0 },
    { category: "Entertainment: Music", percent: 0 },
    { category: "Entertainment: Musicals & Theatres", percent: 0 },
  ]);
  const [storageKey, setStorageKey] = useState("Test");
  const [text, onChangeText] = React.useState("Test");

  const categories = [
    "General Knowledge",
    "Entertainment: Books",
    "Entertainment: Film",
    "Entertainment: Music",
    "Entertainment: Musicals & Theatres",
    "Entertainment: Television",
    "Entertainment: Video Games",
    "Entertainment: Board Games",
    "Science & Nature",
    "Science: Computers",
    "Science: Mathematics",
    "Mythology",
    "Sports",
    "Geography",
    "History",
    "Politics",
    "Art",
    "Celebrities",
    "Animals",
    "Vehicles",
    "Entertainment: Comics",
    "Science: Gadgets",
    "Entertainment: Japanese Anime & Manga",
    "Entertainment: Cartoon & Animations",
  ];

  const [best, setBest] = useState([
    { percent: 0, category: categories[0] },
    { percent: 1, category: categories[1] },
    { percent: 2, category: categories[2] },
    { percent: 3, category: categories[3] },
    { percent: 4, category: categories[4] },
  ]);

  // on mount, load stats
  useEffect(() => {
    (async () => {
      try {
        // build an array of {category, percent} objects
        const statsArr = [];
        for (const cat of categories) {
          const corrRaw = await AsyncStorage.getItem(`${cat}Correct`);
          const wrongRaw = await AsyncStorage.getItem(`${cat}Wrong`);
          const corr = parseInt(corrRaw || "0", 10);
          const wrong = parseInt(wrongRaw || "0", 10);
          const total = corr + wrong;
          statsArr.push({
            category: cat,
            percent: total > 0 ? corr / total : 0,
          });
        }

        // sort descending and take top 5
        statsArr.sort((a, b) => b.percent - a.percent);
        const top5 = statsArr.slice(0, 5);

        // loadBest
        setBest(top5);
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
      await AsyncStorage.setItem(storageKey, String(next));
    } catch (e) {
      console.error("Save error:", e);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 20, marginBottom: 10 }}>
        Your Top 5 Categories
      </Text>
      {best.map(({ category, percent }) => (
        <View key={category} style={{ marginBottom: 8 }}>
          <Text style={{ fontSize: 16 }}>{category}</Text>
          <Text>{(percent * 100).toFixed(1)}%</Text>
        </View>
      ))}
    </View>
  );
}
