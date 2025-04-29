import { Button } from "react-native";
import { View } from "react-native";

export default function Home({ route, navigation }) {
    return (
        <View style={{ paddingTop: 50 }}>
            <Button title="Play"
                onPress={() => navigation.navigate("Setup")} />
            <Button title="Stats"
                onPress={() => navigation.navigate("Stats")} />
        </View>
    );
}