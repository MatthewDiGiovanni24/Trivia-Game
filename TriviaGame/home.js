import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function Home({ navigation }) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Trivia Blast</Text>

            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate("Setup")}
            >
                <Text style={styles.buttonText}>Play</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={[styles.button, { backgroundColor: "#4e54c8" }]}
                onPress={() => navigation.navigate("Stats")}
            >
                <Text style={styles.buttonText}>Stats</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 100,
        alignItems: "center",
        backgroundColor: "#f0f4f8",
    },
    title: {
        fontSize: 32,
        fontWeight: "bold",
        marginBottom: 40,
        color: "#333",
    },
    button: {
        backgroundColor: "#00b894",
        paddingVertical: 15,
        paddingHorizontal: 50,
        borderRadius: 30,
        marginVertical: 10,
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
