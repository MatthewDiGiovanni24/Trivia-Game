import { View, Button } from "react-native";

export default function game({ route, navigation }) {
    const { numberOfQuestions, categoryChoice, difficultyChoice } = route.params;

    function getQuestions() {
        let link = `https://opentdb.com/api.php?amount=${numberOfQuestions}${categoryChoice || ""}${difficultyChoice || ""}&type=multiple`;
        console.log(link)
        fetch(link)
            .then((response) => response.json())
            .then((json) => {
                console.log(json);
                console.log(json.results)
                // console.log(json.results[0].question)
                // console.log(json.results[0].correct_answer)
                // console.log(json.results[0].incorrect_answers)
                // console.log(json.results[1].question)
                // console.log(json.results[1].correct_answer)
                // console.log(json.results[1].incorrect_answers)

            })
            .catch((error) => {
                console.error(error);
            });
    };

    return (
        <View style={{ paddingTop: 50 }}>
            <Button title="Get Another Joke" onPress={() => getQuestions()} />
        </View>
    );
}