
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCoffee,
    faDiceSix,
    faWandMagicSparkles,
    faXmark,
    faCheck,
    faChevronRight,
    faSquareCheck
} from "@fortawesome/free-solid-svg-icons";
import he from 'he';

// Define the main App component
function App() {
    // Define necessary states for the component
    const [question, setQuestion] = useState('');
    const [correctAnswer, setCorrectAnswer] = useState('');
    const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);
    const [congratulations, setCongratulations] = useState('');
    const [correctCount, setCorrectCount] = useState(0);
    const [incorrectCount, setIncorrectCount] = useState(0);
    const [options, setOptions] = useState([]);
    const [answered, setAnswered] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);

    // Function to decode HTML entities
    const decodeHtmlEntities = (html) => {
        return he.decode(html);
    };

    // Fetch a random question from the API
    const fetchRandomQuestion = async () => {
        try {
            setAnswered(false);
            setSelectedOption(null);
            const response = await fetch('https://opentdb.com/api.php?amount=1&type=multiple');
            const data = await response.json();
            const randomQuestion = decodeHtmlEntities(data.results[0].question);
            const correctAnswer = decodeHtmlEntities(data.results[0].correct_answer);
            const incorrectAnswers = data.results[0].incorrect_answers.map(decodeHtmlEntities);
            const options = [correctAnswer, ...incorrectAnswers];
            options.sort(() => Math.random() - 0.5);
            setQuestion(randomQuestion);
            setCorrectAnswer(correctAnswer);
            setOptions(options);
            setShowCorrectAnswer(false);
            setCongratulations('');
        } catch (error) {
            console.error('Error fetching question:', error);
        }
    };

    // Check the selected answer and update states accordingly
    const checkAnswer = (selectedOption) => {
        if (!answered) {
            setSelectedOption(selectedOption);
            if (selectedOption.toLowerCase() === correctAnswer.toLowerCase()) {
                setCongratulations('Congratulations, correct answer !!!');
                setShowCorrectAnswer(false);
                setCorrectCount(correctCount + 1);
            } else {
                setShowCorrectAnswer(true);
                setCongratulations('');
                setIncorrectCount(incorrectCount + 1);
            }
            setAnswered(true);
        }
    };

    // Function to get the button color based on the correctness of the answer
    const getButtonColor = (option) => {
        if (answered && option.toLowerCase() === correctAnswer.toLowerCase()) {
            return 'correct';
        } else if (answered && option === selectedOption) {
            return 'wrong';
        }
        return '';
    };

    // Reset the game to initial state
    const resetGame = () => {
        setCorrectCount(0);
        setIncorrectCount(0);
        fetchRandomQuestion();
    };

    // Fetch the next random question
    const nextQuestion = () => {
        fetchRandomQuestion();
    };

    // Fetch a random question when the component mounts
    useEffect(() => {
        fetchRandomQuestion();
    }, []);

   
    return (
        <div className="App">
            {/* Main container for the app */}
            <div className="container1">
                <div className="container2">
                    {/* Title section with magic wand icon */}
                    <h1>
                        <FontAwesomeIcon icon={faWandMagicSparkles} /> Random Trivia Question
                    </h1>
                    {/* Display the current question */}
                    <div className="question">
                        <p dangerouslySetInnerHTML={{ __html: question }}></p>
                    </div>
                    {/* Display answer options */}
                    <div className="container3">
                        <div className="options">
                            {options.map((option, index) => (
                                <button
                                    key={index}
                                    onClick={() => checkAnswer(option)}
                                    disabled={answered}
                                    className={`option-button ${getButtonColor(option)}`}
                                >
                                    {option}
                                </button>
                            ))}
                        </div>
                        {/* Display the correct answer */}
                        <div className="correct-answer"></div>
                        {/* Display congratulatory message */}
                        <div className="congratulations">
                            <p>{congratulations}</p>
                        </div>
                        {/* Display correct and incorrect answer counts */}
                        <div className="points">
                            <p>
                                Correct: {correctCount}{' '}
                                <FontAwesomeIcon icon={faCheck} style={{ color: "#00a803" }} />
                            </p>
                            <p>
                                Incorrect: {incorrectCount}{' '}
                                <FontAwesomeIcon icon={faXmark} style={{ color: "#cc0000" }} />
                            </p>
                        </div>
                        {/* Button to fetch the next question */}
                        <div className="next">
                            <button onClick={nextQuestion}>
                                Next Question{' '}
                                <FontAwesomeIcon icon={faChevronRight} bounce />
                            </button>
                        </div>
                        {/* Button to reset the game */}
                        <button className="reset" onClick={resetGame}>
                            <FontAwesomeIcon icon={faDiceSix} className="dice" beat />Reset Game
                        </button>
                        {/* Display a coffee icon */}
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
