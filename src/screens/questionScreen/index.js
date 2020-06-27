import React from 'react';
import Questions from './question.js'
import data from '../../utils/questions.json'

const QuestionScreen = () => {

    return (
        <Questions props={data} />
    )
}

export default QuestionScreen