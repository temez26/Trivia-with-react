import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";
import { faDiceSix } from "@fortawesome/free-solid-svg-icons";
import { faDiamond, faWandMagicSparkles, faXmark, faCheck, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import React, { useState, useEffect } from 'react';
import he from 'he'; // Import the 'he' library for HTML entity decoding

function App() {
    const [question, setQuestion] = useState('');
    const [correctAnswer, setCorrectAnswer] = useState('');
    const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);
    const [congratulations, setCongratulations] = useState('');
    const [correctCount, setCorrectCount] = useState(0); // Track correct answers
    const [incorrectCount, setIncorrectCount] = useState(0); // Track incorrect answers
    const [options, setOptions] = useState([]);
    const [answered, setAnswered] = useState(false);

    const decodeHtmlEntities = (html) => {
        return he.decode(html);
    };

    const fetchRandomQuestion = async () => {
        try {
            setAnswered(false); // Reset answered state
            const response = await fetch('https://opentdb.com/api.php?amount=1&type=multiple');
            const data = await response.json();
            const randomQuestion = decodeHtmlEntities(data.results[0].question);
            const correctAnswer = decodeHtmlEntities(data.results[0].correct_answer);
            const incorrectAnswers = data.results[0].incorrect_answers.map(decodeHtmlEntities);
            const options = [correctAnswer, ...incorrectAnswers];
            options.sort(() => Math.random() - 0.5); // Shuffle the options
            setQuestion(randomQuestion);
            setCorrectAnswer(correctAnswer);
            setOptions(options);
            setShowCorrectAnswer(false);
            setCongratulations('');
        } catch (error) {
            console.error('Error fetching question:', error);
        }
    };

    const checkAnswer = (selectedOption) => {
        if (!answered) {
            if (selectedOption.toLowerCase() === correctAnswer.toLowerCase()) {
                setCongratulations('Congratulations, correct answer !!!');
                setShowCorrectAnswer(false);
                setCorrectCount(correctCount + 1);
            } else {
                setShowCorrectAnswer(true);
                setCongratulations('');
                setIncorrectCount(incorrectCount + 1);
            }
            setAnswered(true); // Set answered to true after the user answers
        }
    };

    const resetGame = () => {
        setCorrectCount(0);
        setIncorrectCount(0);
        fetchRandomQuestion(); // Start a new game by fetching the first question
    };

    const nextQuestion = () => {
        fetchRandomQuestion(); // Load the next question
    };

    useEffect(() => {
        fetchRandomQuestion();
    }, []); // Fetch a random question on initial load

    return (
        <div className="App">
            <div className="container1">
                <div className="container2">
                    <h1> <FontAwesomeIcon icon={faWandMagicSparkles} /> Random Trivia Question</h1>
                    <div className="question">
                        {/* Use dangerouslySetInnerHTML to parse HTML entities */}
                        <p dangerouslySetInnerHTML={{ __html: question }}></p>
                    </div>
                    <div className="container3">
                        <div className="options">
                            {options.map((option, index) => (
                                <button
                                    key={index}
                                    onClick={() => checkAnswer(option)}
                                    disabled={answered}
                                >
                                    {option}
                                </button>
                            ))}
                        </div>
                        <div className="answer"></div>
                        {showCorrectAnswer && (
                            <div className="correct-answer">
                                <p>Wrong <FontAwesomeIcon icon={faXmark} style={{ color: "#cc0000", }} /> = Correct Answer: {correctAnswer} </p>
                            </div>
                        )}
                        <div className="congratulations">
                            <p>{congratulations} </p>
                        </div>
                        <p>Correct: {correctCount}  <FontAwesomeIcon icon={faCheck} style={{ color: "#00a803", }} /></p>
                        <p>  Incorrect: {incorrectCount}         <FontAwesomeIcon icon={faXmark} style={{ color: "#cc0000", }} /></p>
                        <div className="next">
                        <button onClick={nextQuestion}>Next Question <FontAwesomeIcon icon={faChevronRight} bounce /></button>
                        </div>
                        <button onClick={resetGame}> <FontAwesomeIcon  icon={faDiceSix} className="dice" beat />Reset Game</button>
                        <div className="icon">
                            <FontAwesomeIcon icon={faCoffee} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
