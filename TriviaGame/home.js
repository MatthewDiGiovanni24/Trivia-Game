import { Button } from "react-native";
import { View } from "react-native";

export default function home({ route, navigation }) {
    return (
        <View style={{ paddingTop: 50 }}>
            <Button title="Play"
                onPress={() => navigation.navigate("game")} />
            <Button title="Stats"
                onPress={() => navigation.navigate("stats")} />
        </View>
    );
}