import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function Summary({ route, navigation }) {
  const { totalQuestions, correctAnswers, timeSpent } = route.params;
  const accuracy = ((correctAnswers / totalQuestions) * 100).toFixed(1);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Quiz Summary</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Total Questions:</Text>
        <Text style={styles.value}>{totalQuestions}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Correct Answers:</Text>
        <Text style={styles.value}>{correctAnswers}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Accuracy:</Text>
        <Text style={styles.value}>{accuracy}%</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Time Spent:</Text>
        <Text style={styles.value}>{timeSpent} seconds</Text>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Setup")}
      >
        <Text style={styles.buttonText}>Play Again</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: "#4e54c8" }]}
        onPress={() => navigation.navigate("Home")}
      >
        <Text style={styles.buttonText}>Go Home</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#f0f4f8",
      paddingTop: 60,
      paddingHorizontal: 20,
    },
    title: {
      fontSize: 28,
      fontWeight: "bold",
      color: "#333",
      textAlign: "center",
      marginBottom: 30,
    },
    card: {
      backgroundColor: "#fff",
      borderRadius: 12,
      padding: 15,
      marginVertical: 8,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    label: {
      fontSize: 16,
      color: "#555",
    },
    value: {
      fontSize: 18,
      fontWeight: "bold",
      color: "#222",
      marginTop: 4,
    },
    button: {
      backgroundColor: "#00b894",
      paddingVertical: 15,
      borderRadius: 30,
      marginTop: 20,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 5,
    },
    buttonText: {
      color: "#fff",
      fontSize: 18,
      fontWeight: "bold",
    },
  });
  