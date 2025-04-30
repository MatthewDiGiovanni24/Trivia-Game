import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";

const categoryOptions = [
  { label: "General Knowledge", value: "&category=9" },
  { label: "Entertainment: Books", value: "&category=10" },
  { label: "Entertainment: Film", value: "&category=11" },
  { label: "Entertainment: Music", value: "&category=12" },
  { label: "Entertainment: Musicals & Theatres", value: "&category=13" },
  { label: "Entertainment: Television", value: "&category=14" },
  { label: "Entertainment: Video Games", value: "&category=15" },
  { label: "Entertainment: Board Games", value: "&category=16" },
  { label: "Science & Nature", value: "&category=17" },
  { label: "Science: Computers", value: "&category=18" },
  { label: "Science: Mathematics", value: "&category=19" },
  { label: "Mythology", value: "&category=20" },
  { label: "Sports", value: "&category=21" },
  { label: "Geography", value: "&category=22" },
  { label: "History", value: "&category=23" },
  { label: "Politics", value: "&category=24" },
  { label: "Art", value: "&category=25" },
  { label: "Celebrities", value: "&category=26" },
  { label: "Animals", value: "&category=27" },
  { label: "Vehicles", value: "&category=28" },
  { label: "Entertainment: Comics", value: "&category=29" },
  { label: "Science: Gadgets", value: "&category=30" },
  { label: "Entertainment: Japanese Anime & Manga", value: "&category=31" },
  { label: "Entertainment: Cartoons & Animations", value: "&category=32" },
];

const difficultyOptions = [
  { label: "Easy", value: "&difficulty=easy" },
  { label: "Medium", value: "&difficulty=medium" },
  { label: "Hard", value: "&difficulty=hard" },
];

const DropdownCategory = ({ type, value, setValue }) => {
  const [isFocus, setIsFocus] = useState(false);
  const data = type === "category" ? categoryOptions : difficultyOptions;

  return (
    <Dropdown
      style={[styles.dropdown, isFocus && { borderColor: "blue" }]}
      placeholderStyle={styles.placeholderStyle}
      selectedTextStyle={styles.selectedTextStyle}
      inputSearchStyle={styles.inputSearchStyle}
      data={data}
      search
      maxHeight={300}
      labelField="label"
      valueField="value"
      placeholder={!isFocus ? `Select ${type}` : "..."}
      searchPlaceholder="Search..."
      value={value}
      onFocus={() => setIsFocus(true)}
      onBlur={() => setIsFocus(false)}
      onChange={(item) => {
        setValue(item.value);
        setIsFocus(false);
      }}
    />
  );
};

export default function Setup({ navigation }) {
  const [questionAmount, setQuestionAmount] = useState("");
  const [category, setCategory] = useState("");
  const [difficulty, setDifficulty] = useState("");

  const getQuestions = () => {
    const link = `https://opentdb.com/api.php?amount=${Number(questionAmount)}${category}${difficulty}&type=multiple`;

    fetch(link)
      .then((response) => response.json())
      .then((json) => {
        navigation.navigate("Game", {
          questions: json.results,
        });
      })
      .catch((error) => {
        console.error(error);
        alert("Failed to load questions. Please try again.");
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Game Setup</Text>

      <Text style={styles.label}>Number of Questions</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="Enter a number 1-50"
        onChangeText={(text) => setQuestionAmount(text)}
        value={String(questionAmount)}
      />

      <Text style={styles.label}>Category</Text>
      <DropdownCategory
        type="category"
        value={category}
        setValue={setCategory}
      />

      <Text style={styles.label}>Difficulty</Text>
      <DropdownCategory
        type="difficulty"
        value={difficulty}
        setValue={setDifficulty}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          const num = Number(questionAmount);
          const isInt = Number.isInteger(num);
        
          if (!isInt || isNaN(num)) {
            alert("Please enter an integer between 1 and 50");
          } else if (num < 1 || num > 50) {
            alert("Please enter a number between 1 and 50");
          } else {
            getQuestions();
          }
        }}
        
      >
        <Text style={styles.buttonText}>Start</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 80,
    paddingHorizontal: 20,
    backgroundColor: "#f0f4f8",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 30,
    alignSelf: "center",
    color: "#333",
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 20,
    marginBottom: 5,
    color: "#555",
  },
  input: {
    height: 45,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
  },
  dropdown: {
    height: 50,
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
  },
  placeholderStyle: {
    fontSize: 16,
    color: "#999",
  },
  selectedTextStyle: {
    fontSize: 16,
    color: "#333",
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#00b894",
    paddingVertical: 15,
    borderRadius: 30,
    marginTop: 40,
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
