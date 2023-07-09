import React, { useEffect, useState } from 'react'
import CommonLogo from '../assets/undraw_adventure_4hum 1.svg'

import './Quiz.css'
import Results from '../results/Results';
const Quiz = ({ questions }) => {


    var questionSentences = {
        flags: "Which country's flag is?",
        capital: `What is the capital city of`,
        currencies: `What is the official currency of`,
        languages: `Commonly spoken Language in`,
        continents: `is located in the continent?`,
    };

    const [currentQuestion, setCurrentQuestion] = useState(1);
    const [questionare, setQuestionare] = useState([]);
    const [results, setResults] = useState(0);
    const [isDisabled, setIsDisabled] = useState(true);

    const fetchQuestionToDisplay = async () => {


        const options = [];

        questions?.forEach((question) => {
            const keys = Object.keys(question);
            const keysWithoutName = keys.filter(key => key !== "name")
            const randomGenre = keysWithoutName[Math.floor(Math.random() * keysWithoutName.length)];
            let correctValue = question[randomGenre];

            let falseValues = questions
                .filter((q) => q[randomGenre] !== question[randomGenre])
                .map((q) => q[randomGenre])

            if (randomGenre === "flags") {
                falseValues = questions
                    .filter((q) => q.name.common !== question.name.common)
                    .map((q) => q.name)
                correctValue = question.name;

            }

            function filterUniqueValues(arr) {
                const uniqueValues = [];
                const uniqueSet = new Set();

                const stringifiedCorrectValue = JSON.stringify(correctValue);


                for (const value of arr) {
                    const stringifiedValue = JSON.stringify(value);

                    if (!uniqueSet.has(stringifiedValue)) {
                        uniqueSet.add(stringifiedValue);
                        uniqueValues.push(value);
                    }

                    if (uniqueSet.has(stringifiedCorrectValue)) {
                        uniqueValues.indexOf(value);
                    }
                }

                return uniqueValues;
            }

            const uniqueFalseValues = filterUniqueValues(falseValues);

            // if (uniqueFalseValues.has(correctValue)) {
            //     uniqueFalseValues.delete(correctValue)
            // }

            // console.log(uniqueFalseValues, "uniqueFalseValues")
            const falseValue = Array.from(uniqueFalseValues).sort(() => Math.random() - 0.5).slice(0, 3);

            const multipleChoice = [...falseValue, correctValue].sort(() => Math.random() - 0.5)

            options.push({
                countryName: question["name"],
                genre: randomGenre,
                question: question[randomGenre],
                correctAnswer: correctValue,
                multipleChoice: multipleChoice,
                selectedChoice: [null, null],
                correctChoice: null,
            });
        });

        setQuestionare(options);
    };


    const handleCheck = (selection, index) => {
        //TODO: continent,  Europe ['Europe']
        //TODO: capital Port of Spain ['Lilongwe']

        //TODO: currencies Pound sterling {NZD: {…}}
        //TODO: language undefined {lav: 'Latvian'}
        //TODO: flags Israel {common: 'Israel', official: 'State of Israel', nativeName: {…}}
        let correctAnswer = questionare[currentQuestion - 1].correctAnswer

        if (Array.isArray(selection)) {
            const correctValueIndex = questionare[currentQuestion - 1]?.multipleChoice.indexOf(correctAnswer)

            if (JSON.stringify(selection) === JSON.stringify(correctAnswer)) {
                const updatedQuestionare = [...questionare];
                updatedQuestionare[currentQuestion - 1].selectedChoice = [index, true];

                // updatedQuestionare[currentQuestion - 1].correctChoice = correctValueIndex;
                setQuestionare(updatedQuestionare);
                setIsDisabled(false)
                setResults(prev => prev + 1)

            } else {
                const updatedQuestionare = [...questionare];
                updatedQuestionare[currentQuestion - 1].selectedChoice = [index, false];
                updatedQuestionare[currentQuestion - 1].correctChoice = correctValueIndex;
                setQuestionare(updatedQuestionare);
                setIsDisabled(false)
            }
        } else {

            const correctValueIndex = questionare[currentQuestion - 1]?.multipleChoice.indexOf(correctAnswer)

            if (JSON.stringify(selection) === JSON.stringify(correctAnswer)) {
                const updatedQuestionare = [...questionare];
                updatedQuestionare[currentQuestion - 1].selectedChoice = [index, true];
                setResults(prev => prev + 1)
                // updatedQuestionare[currentQuestion - 1].correctChoice = correctValueIndex;
                setQuestionare(updatedQuestionare);
                setIsDisabled(false)
            } else {
                const updatedQuestionare = [...questionare];
                updatedQuestionare[currentQuestion - 1].selectedChoice = [index, false];
                updatedQuestionare[currentQuestion - 1].correctChoice = correctValueIndex;
                setQuestionare(updatedQuestionare);
                setIsDisabled(false)
            }
        }


    }

    const handleUpdateQuestion = () => {
        setCurrentQuestion(prev => prev + 1)
        setIsDisabled(true)
        // multipleChoice = []
    }


    useEffect(() => {
        fetchQuestionToDisplay();

        return () => {
            setQuestionare([])
        }

    }, [questions])

    useEffect(() => {
        console.log(questionare, "questionare")
    }, [questionare])

    return (
        currentQuestion < (questionare?.length + 1)
            ?
            (<div className='quiz'>

                <header>
                    <div> Country Quiz</div>
                    <div className="adventure_logo">
                        <img src={CommonLogo} alt="default traveller pic" />
                    </div>
                </header>

                {questionare[currentQuestion - 1]?.genre === "flags" &&

                    <div className="flag">
                        <img src={questionare[currentQuestion - 1].question.png} alt={questionare[currentQuestion - 1].question.alt} />
                    </div>
                }



                <div className='question'>
                    {currentQuestion + ". "}
                    {[questionare[currentQuestion - 1]][0]?.genre === "flags"
                        ? questionSentences[questionare[currentQuestion - 1]?.genre]
                        : [questionare[currentQuestion - 1]][0]?.genre === "continents"
                            ? ([questionare[currentQuestion - 1]?.countryName.common] + " " + questionSentences[questionare[currentQuestion - 1]?.genre])
                            : (questionSentences[questionare[currentQuestion - 1]?.genre] + " " + [questionare[currentQuestion - 1]?.countryName.common])
                    }

                </div>

                <ul >
                    {questionare[currentQuestion - 1]?.multipleChoice?.map((choice, index) => {

                        if (Array.isArray(choice)) {
                            return <li
                                className={
                                    ((questionare[currentQuestion - 1]?.selectedChoice[0] === index && questionare[currentQuestion - 1]?.selectedChoice[1] === true)
                                        ? "correct"
                                        : (questionare[currentQuestion - 1]?.selectedChoice[0] === index && questionare[currentQuestion - 1]?.selectedChoice[1] === false)
                                            ? "wrong" : "") + " " + (questionare[currentQuestion - 1]?.correctChoice === index ? "correct" : "")}
                                onClick={() => handleCheck(choice, index)}
                                style={{ pointerEvents: questionare[currentQuestion - 1]?.selectedChoice[0] != null ? "none" : "" }}
                                key={`${choice}-${index}`}>
                                {choice[0]}
                            </li>

                        } else if (questionare[currentQuestion - 1].genre === "languages") {
                            const keys = Object.keys(choice);
                            return  <li
                                className={
                                    ((questionare[currentQuestion - 1]?.selectedChoice[0] === index && questionare[currentQuestion - 1]?.selectedChoice[1] === true)
                                        ? "correct"
                                        : (questionare[currentQuestion - 1]?.selectedChoice[0] === index && questionare[currentQuestion - 1]?.selectedChoice[1] === false)
                                            ? "wrong" : "") + " " + (questionare[currentQuestion - 1]?.correctChoice === index ? "correct" : "")}
                                onClick={() => handleCheck(choice, index)}
                                style={{ pointerEvents: questionare[currentQuestion - 1]?.selectedChoice[0] != null ? "none" : "" }}
                                key={`${choice}-${index}`}>{choice[keys[0]] || choice[keys[0]]?.name}</li>

                        } else if (questionare[currentQuestion - 1].genre === "currencies") {
                            const keys = Object.keys(choice);
                            return <li

                                className={
                                    ((questionare[currentQuestion - 1]?.selectedChoice[0] === index && questionare[currentQuestion - 1]?.selectedChoice[1] === true)
                                        ? "correct"
                                        : (questionare[currentQuestion - 1]?.selectedChoice[0] === index && questionare[currentQuestion - 1]?.selectedChoice[1] === false)
                                            ? "wrong" : "") + " " + (questionare[currentQuestion - 1]?.correctChoice === index ? "correct" : "")}
                                onClick={() => handleCheck(choice, index)}
                                style={{ pointerEvents: questionare[currentQuestion - 1]?.selectedChoice[0] != null ? "none" : "" }}
                                key={`${choice}-${index}`}>{choice[keys[0]]?.name}</li>

                        } else {
                            return <li
                                className={
                                    ((questionare[currentQuestion - 1]?.selectedChoice[0] === index && questionare[currentQuestion - 1]?.selectedChoice[1] === true)
                                        ? "correct"
                                        : (questionare[currentQuestion - 1]?.selectedChoice[0] === index && questionare[currentQuestion - 1]?.selectedChoice[1] === false)
                                            ? "wrong" : "") + " " + (questionare[currentQuestion - 1]?.correctChoice === index ? "correct" : "")}
                                onClick={() => handleCheck(choice, index)}
                                style={{ pointerEvents: questionare[currentQuestion - 1]?.selectedChoice[0] != null ? "none" : "" }}
                                key={`${choice}-${index}`}> {choice.common || choice.name}</li >

                        }


                    }

                    )}
                </ul>
                <div className='next'>
                    <button className={isDisabled ? "disabled" : "enabled"} disabled={isDisabled} onClick={handleUpdateQuestion}>Next</button>
                </div>
            </div >)
            : (
                <Results results={results} />
            )

    )
}

export default Quiz
