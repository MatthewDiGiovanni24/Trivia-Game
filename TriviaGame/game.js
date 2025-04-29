import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import he from "he";

export default function Game({ route, navigation }) {
  const { questions: initialQuestions } = route.params;

  const [questions, setQuestions] = useState(initialQuestions);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isDisabled, setIsDisabled] = useState(false);
  const [score, setScore] = useState(0);
  const [startTime] = useState(Date.now());

  useEffect(() => {
    if (questions.length > 0) {
      setAnswers(shuffleAnswers(questions[0]));
    }
  }, []);

  function shuffleAnswers(question) {
    const allAnswers = [...question.incorrect_answers, question.correct_answer];
    return allAnswers.sort(() => Math.random() - 0.5);
  }

  const handleAnswerPress = async (answer) => {
    if (isDisabled) return;

    const correct = questions[currentIndex].correct_answer;
    const isCorrect = answer === correct;

    if (isCorrect) setScore((prev) => prev + 1);

    if (isCorrect) {
      const corr = await AsyncStorage.getItem(
        `${questions[currentIndex].category}${questions[currentIndex].difficulty}Correct`
      );
      const prevCorr = parseInt(corr || "0", 10);
      await AsyncStorage.setItem(
        `${questions[currentIndex].category}${questions[currentIndex].difficulty}Correct`,
        String(prevCorr + 1)
      );
    } else {
      const wrong = await AsyncStorage.getItem(
        `${questions[currentIndex].category}${questions[currentIndex].difficulty}Wrong`
      );
      const prevWrong = parseInt(wrong || "0", 10);
      await AsyncStorage.setItem(
        `${questions[currentIndex].category}${questions[currentIndex].difficulty}Wrong`,
        String(prevWrong + 1)
      );
    }

    setSelectedAnswer(answer);
    setIsDisabled(true);

    setTimeout(() => {
      setSelectedAnswer(null);
      setIsDisabled(false);

      const nextIndex = currentIndex + 1;
      if (nextIndex < questions.length) {
        setCurrentIndex(nextIndex);
        setAnswers(shuffleAnswers(questions[nextIndex]));
      } else {
        const timeSpent = Math.floor((Date.now() - startTime) / 1000);
        navigation.navigate("Summary", {
          totalQuestions: questions.length,
          correctAnswers: isCorrect ? score + 1 : score,
          timeSpent: timeSpent,
        });
      }
    }, 1000);
  };

  return (
    <View style={styles.container}>
      {questions.length > 0 && (
        <>
          <Text style={styles.progress}>
            Question {currentIndex + 1} of {questions.length}
          </Text>

          <Text style={styles.question}>
            {he.decode(questions[currentIndex].question)}
          </Text>

          {answers.map((answer, index) => {
            const isCorrect = answer === questions[currentIndex].correct_answer;
            const isSelected = answer === selectedAnswer;

            let backgroundColor = "#eee";
            if (selectedAnswer) {
              if (isCorrect) backgroundColor = "green";
              else if (isSelected) backgroundColor = "red";
            }

            return (
              <TouchableOpacity
                key={index}
                disabled={isDisabled}
                style={[
                  styles.answerButton,
                  { backgroundColor: backgroundColor },
                  isDisabled && !isSelected && !isCorrect
                    ? { opacity: 0.6 }
                    : {},
                ]}
                onPress={() => handleAnswerPress(answer)}
              >
                <Text style={styles.answerText}>{he.decode(answer)}</Text>
              </TouchableOpacity>
            );
          })}
        </>
      )}
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
  progress: {
    fontSize: 16,
    color: "#555",
    marginBottom: 10,
  },
  question: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 30,
  },
  answerButton: {
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
  answerText: {
    fontSize: 16,
    color: "#333",
    fontWeight: "500",
  },
});
