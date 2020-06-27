import { StyleSheet } from 'react-native'

export default styles = StyleSheet.create({
    container: {
        flex: 1,
        // marginTop: 70,
        // alignItems: 'center'
    },
    statusBarContainer: {
        height: 20,
        backgroundColor: "white",
        width: '100%'
    },
    statusBar: {
        height: 20,
        backgroundColor: '#d2d2d2',
    },
    Title: {
        color: 'black',
        fontSize: 26,
        fontWeight: '600'
    },
    category: {
        color: 'gray',
        fontSize: 12,
        lineHeight: 22
    },
    styQuestion: {
        color: 'black',
        fontSize: 18,
        lineHeight: 22,
        fontWeight: '500'
    },
    nextQuestionContainer: {
        justifyContent: "center",
        alignItems: "center",
        marginTop: 20
    },
    nextQuestion: {
        // margin: 4,
        width: "45%",
        borderWidth: 1,
        borderColor: "black",
        backgroundColor: "#e5e6e5",
        padding: 5,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 5
    },
    bottomBarContainer: {
        marginHorizontal: 50,
        marginTop: 'auto',
        bottom: 50
    },
    bottomBarTextContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        bottom: 5
    },
    bottomBarOuterContainer: {
        height: 30,
        backgroundColor: "white",
        width: '100%',
        borderRadius: 4,
        borderColor: "black",
        borderWidth: 2,
        overflow: "hidden",
    },
    barHeight: {
        height: 30
    },
    barPosition: {
        position: "absolute"
    },
    optionsContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },

})