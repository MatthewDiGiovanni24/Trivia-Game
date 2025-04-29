import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function StatsScreen() {
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

  const difficulties = ["easy", "medium", "hard"];
  const [statsByDiff, setStatsByDiff] = useState({});

  useEffect(() => {
    (async () => {
      try {
        const newStats = {};

        for (const diff of difficulties) {
          const arr = [];
          for (const cat of categories) {
            const corrRaw = await AsyncStorage.getItem(`${cat}${diff}Correct`);
            const wrongRaw = await AsyncStorage.getItem(`${cat}${diff}Wrong`);
            const corr = parseInt(corrRaw || "0", 10);
            const wrong = parseInt(wrongRaw || "0", 10);
            const total = corr + wrong;
            arr.push({ category: cat, percent: total > 0 ? corr / total : 0 });
          }
          arr.sort((a, b) => b.percent - a.percent);
          newStats[diff] = arr.slice(0, 5);
        }

        setStatsByDiff(newStats);
      } catch (e) {
        console.error("Error loading stats:", e);
      }
    })();
  }, []);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {difficulties.map((diff) => (
        <View key={diff} style={styles.section}>
          <Text style={styles.sectionTitle}>
            {diff.charAt(0).toUpperCase() + diff.slice(1)} Top 5
          </Text>
          {statsByDiff[diff]?.map(({ category, percent }) => (
            <View key={category} style={styles.card}>
              <Text style={styles.cardText}>{category}</Text>
              <Text style={styles.cardText}>{(percent * 100).toFixed(1)}%</Text>
            </View>
          ))}
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f4f8",
  },
  content: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 12,
  },
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginVertical: 8,
    backgroundColor: "#eee",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 3,
  },
  cardText: {
    fontSize: 16,
    color: "#333",
    fontWeight: "500",
  },
});
