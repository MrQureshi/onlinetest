import React, { useState } from 'react';
import { View, SafeAreaView, Text, TouchableOpacity, FlatList } from 'react-native';
import styles from './style'
import Stars from 'react-native-stars'

let correct = 0
let sorry = 0

const Questions = ({ props }) => {
    const [selectedIndex, setIndex] = useState(1)

    //////
    const getOptions = props[selectedIndex].incorrect_answers
    getOptions.push(props[selectedIndex].correct_answer)
    const options = new Set(getOptions);
    const optionsArray = [...options];

    const shuffle = (a) => {
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
    }

    console.log({ optionsArray })
    console.log(shuffle(optionsArray))
    const showOptions = shuffle(optionsArray)



    //////

    const remainQuestion = props.length - selectedIndex

    const ifTotalCorrect = remainQuestion + correct

    const score = Math.floor(correct / selectedIndex * 100)
    const highScore = Math.floor((ifTotalCorrect) / props.length * 100)
    const lowScore = Math.floor(correct / props.length * 100)
    const totalAttempts = Math.floor(selectedIndex / props.length * 100)

    console.log("props.length", props.length, { selectedIndex }, { props })
    console.log({ remainQuestion, ifTotalCorrect, score, highScore, lowScore })
    console.log({ totalAttempts })

    return (
        <SafeAreaView style={styles.container} >
            <View>
                <View style={styles.statusBarContainer} >
                    <View style={[styles.statusBar, { width: `${totalAttempts}%` }]}></View>
                </View>
            </View>
            {
                props.map((list, index) => {
                    const btnDisable = props.length - 1 === index
                    const difficulty = list.difficulty === "easy" ? 1 : list.difficulty === "medium" ? 2 : list.difficulty === "hard" ? 3 : 0
                    console.log({ index }, props.length, btnDisable, { selectedIndex })
                    return (
                        <View key={index} style={{ paddingHorizontal: 50 }} >
                            {
                                index === selectedIndex ?? 0 ?
                                    <Child style={{ backgroundColor: 'blue' }} >
                                        <Text style={styles.Title} >Question {index} of {props.length} </Text>
                                        <Text style={styles.category} >{decodeURI(list.category)} </Text>
                                        <View style={{ alignSelf: "flex-start" }} >
                                            <Stars
                                                disabled={true}
                                                count={5}
                                                starSize={18}
                                                half={false}
                                                default={difficulty}
                                            />
                                        </View>

                                        <View style={{ paddingVertical: 20 }} >
                                            <Text style={styles.styQuestion} >{decodeURI(list.question)} </Text>
                                        </View>


                                        <Options
                                            listItem={list}
                                            options={showOptions}
                                        />

                                        {
                                            !btnDisable &&
                                            <View style={styles.nextQuestionContainer} >
                                                <TouchableOpacity disabled={btnDisable} onPress={() => setIndex(index + 1)}
                                                    style={styles.nextQuestion}
                                                >
                                                    <Text style={{ fontSize: 12 }} >
                                                        Next Question
                                                </Text>
                                                </TouchableOpacity>
                                            </View>

                                        }
                                    </Child>
                                    : null
                            }
                        </View>
                    )
                })
            }

            <View style={styles.bottomBarContainer}>
                <View style={styles.bottomBarTextContainer} >
                    <View>
                        <Text>Score: {score} %</Text>
                    </View>
                    <View>
                        <Text>Max Score: {highScore} %</Text>
                    </View>

                </View>
                <View style={styles.bottomBarOuterContainer} >
                    <View style={[styles.barHeight, { backgroundColor: '#d2d2d2', width: `${highScore}%` }]}></View>
                    <View style={[styles.barHeight, styles.barPosition, { backgroundColor: '#707070', width: `${score}%`, }]}></View>
                    <View style={[styles.barHeight, styles.barPosition, { backgroundColor: 'black', width: `${lowScore}%` }]}></View>
                </View>

            </View>
        </SafeAreaView >
    )
}
const Child = (props) => {
    console.log("child", { props })
    return (
        <View >
            {props.children}
        </View>
    )
}

const Options = (props) => {
    console.log("props option function", props)
    const { options, listItem } = props
    const [value, setValue] = useState('')
    const [isCorrect, setCorrect] = useState(false)
    const getValue = (item) => {
        setValue(item)
        const isCorrect = item === decodeURI(listItem.correct_answer) ? true : false
        setCorrect(isCorrect)
        if (isCorrect) {
            correct = ++correct
        } else {
            sorry = ++sorry
        }
    }

    console.log({ isCorrect })
    console.log({ value })
    const btnDisable = value != "" ? true : false
    console.log({ btnDisable })

    return (
        <View style={styles.optionsContainer} >
            <FlatList
                // contentContainerStyle={{ justifyContent: "center", alignContent: "center", }}
                data={options}
                numColumns={2}
                renderItem={({ item }) =>
                    <TouchableOpacity disabled={btnDisable} onPress={() => getValue(decodeURI(item))}
                        style={{
                            margin: 6,
                            width: "45%",
                            borderWidth: 1,
                            borderColor: "black",
                            backgroundColor: decodeURI(item) === value ? "black" : "#e5e6e5",
                            padding: 7,
                            justifyContent: "center",
                            alignItems: "center",
                            borderRadius: 5
                        }} >
                        <Text style={{ fontSize: 12, color: decodeURI(item) === value ? "white" : "black", textAlign: "center" }} >
                            {decodeURI(item)}
                        </Text>
                    </TouchableOpacity>
                }
                keyExtractor={item => item}
            />
            {
                btnDisable &&
                <View style={{
                    marginVertical: 15
                }} >
                    <Text style={{ fontSize: 20, fontWeight: "700" }} >
                        {
                            isCorrect ? 'Correct!' : 'Sorry'
                        }
                    </Text>
                </View>
            }
        </View >

    )
}

export default Questions