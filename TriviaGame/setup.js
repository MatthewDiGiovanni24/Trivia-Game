import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, Button } from "react-native";
import { Dropdown } from 'react-native-element-dropdown';

const category = [
    { label: 'General Knowledge', value: '&category=9' },

    { label: 'Entertainment: Books', value: '&category=10' },

    { label: 'Entertainment: Film', value: '&category=11' },

    { label: 'Entertainment: Music', value: '&category=12' },

    { label: 'Entertainment: Musicals &Theatres', value: '&category=13' },

    { label: 'Entertainment: Television', value: '&category=14' },

    { label: 'Entertainment: Video Games', value: '&category=15' },

    { label: 'Entertainment: Board Games', value: '&category=16' },

    { label: 'Science & Nature', value: '&category=17' },

    { label: 'Science: Computers', value: '&category=18' },

    { label: 'Science: Mathematics', value: '&category=19' },

    { label: 'Mythology', value: '&category=20' },

    { label: 'Sports', value: '&category=21' },

    { label: 'Geography', value: '&category=22' },

    { label: 'History', value: '&category=23' },

    { label: 'Politics', value: '&category=24' },

    { label: 'Art', value: '&category=25' },

    { label: 'Celebrities', value: '&category=26' },

    { label: 'Animals', value: '&category=27' },

    { label: 'Vehicles', value: '&category=28' },

    { label: 'Entertainment: Comics', value: '&category=29' },

    { label: 'Science: Gadgets ', value: '&category=30' },

    { label: 'Entertainment: Japanese Anime & Manga', value: '&category=31' },

    { label: 'Entertainment: Cartoons & Animations', value: '&category=32' }
];

const difficulty = [
    { label: 'Easy', value: '&difficulty=easy' },
    { label: 'Medium', value: '&difficulty=medium' },
    { label: 'Hard', value: '&difficulty=hard' },
];

const DropdownCategory = ({ param, value, setValue }) => {
    const [isFocus, setIsFocus] = useState(false);

    const renderLabel = () => {
        if (value || isFocus) {
            return (
                <Text style={[styles.label, isFocus && { color: 'blue' }]}>
                    Dropdown label
                </Text>
            );
        }
        return null;
    };

    const data = param === 0 ? category : difficulty;

    return (
        <View style={styles.container}>
            {renderLabel()}
            <Dropdown
                style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={data}
                search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={!isFocus ? 'Select item' : '...'}
                searchPlaceholder="Search..."
                value={value}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={item => {
                    setValue(item.value);
                    setIsFocus(false);
                }}
            />
        </View>
    );
};


export default function setup({ route, navigation }) {
    const [questionAmount, setQuestionAmount] = useState(10);
    const [category, setCategory] = useState("");
    const [difficulty, setDifficulty] = useState("");

    return (
        <View style={{ paddingTop: 50 }}>
            <Text>Number of Questions</Text>
            <TextInput
                style={{ height: 40 }}
                keyboardType="numeric"
                placeholder="Enter Question Amount"
                onChangeText={text => setQuestionAmount(text)}
            />

            <Text>Category</Text>
            <DropdownCategory param={0} value={category} setValue={setCategory} />

            <Text>Difficulty</Text>
            <DropdownCategory param={1} value={difficulty} setValue={setDifficulty} />

            <Button
                title="Start"
                onPress={() => navigation.navigate("Game", {
                    numberOfQuestions: questionAmount,
                    categoryChoice: category,
                    difficultyChoice: difficulty
                })}
            />
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        padding: 16,
    },
    dropdown: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
    },
    icon: {
        marginRight: 5,
    },
    label: {
        position: 'absolute',
        backgroundColor: 'white',
        left: 22,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 14,
    },
    placeholderStyle: {
        fontSize: 16,
    },
    selectedTextStyle: {
        fontSize: 16,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
    stepperContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 10,
    },
    stepperValue: {
        marginHorizontal: 20,
        fontSize: 20,
    },
});