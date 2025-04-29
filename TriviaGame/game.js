import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import he from "he";

export default function Game({ route, navigation }) {
    const { questions: initialQuestions } = route.params;

    const [questions, setQuestions] = useState(initialQuestions);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [answers, setAnswers] = useState([]);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [isCorrectAnswer, setIsCorrectAnswer] = useState(null);
    const [isDisabled, setIsDisabled] = useState(false);

    useEffect(() => {
        if (initialQuestions.length > 0) {
            setAnswers(shuffleAnswers(initialQuestions[0]));
        }
    }, []);

    function shuffleAnswers(question) {
        const allAnswers = [...question.incorrect_answers, question.correct_answer];
        return allAnswers.sort(() => Math.random() - 0.5);
    }

    return (
        <View style={{ paddingTop: 50, paddingHorizontal: 20 }}>
            {questions.length > 0 && (
                <View style={{ marginTop: 30 }}>
                    <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 20 }}>
                        {he.decode(questions[currentIndex].question)}
                    </Text>

                    {answers.map((answer, index) => (
                        <TouchableOpacity
                            key={index}
                            disabled={isDisabled}
                            style={{
                                backgroundColor:
                                    selectedAnswer
                                        ? answer === questions[currentIndex].correct_answer
                                            ? "green"
                                            : answer === selectedAnswer
                                                ? "red"
                                                : "#eee"
                                        : "#eee",
                                padding: 12,
                                marginVertical: 6,
                                borderRadius: 8,
                                opacity: isDisabled && selectedAnswer !== answer ? 0.6 : 1,
                            }}
                            onPress={() => {
                                if (isDisabled) return;
                                const correct = questions[currentIndex].correct_answer;
                                const isCorrect = answer === correct;

                                setSelectedAnswer(answer);
                                setIsCorrectAnswer(isCorrect);
                                setIsDisabled(true);

                                setTimeout(() => {
                                    setSelectedAnswer(null);
                                    setIsCorrectAnswer(null);
                                    setIsDisabled(false);

                                    const nextIndex = currentIndex + 1;
                                    if (nextIndex < questions.length) {
                                        setCurrentIndex(nextIndex);
                                        setAnswers(shuffleAnswers(questions[nextIndex]));
                                    } else {
                                        alert("Quiz Finished!");
                                        navigation.navigate("Home");
                                    }
                                }, 1000);
                            }}
                        >
                            <Text>{he.decode(answer)}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            )}
        </View>
    );
}
