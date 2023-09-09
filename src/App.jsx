import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";
import { faDiceSix } from "@fortawesome/free-solid-svg-icons";
import { faDiamond } from "@fortawesome/free-solid-svg-icons";

import Background from './background.jsx'

import React, { useState } from 'react';


function App() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);
  const [congratulations, setCongratulations] = useState('');
  const [correctCount, setCorrectCount] = useState(0); // Track correct answers
  const [incorrectCount, setIncorrectCount] = useState(0); // Track incorrect answers



  

  const fetchRandomQuestion = async () => {
    try {
      const response = await fetch('https://opentdb.com/api.php?amount=1');
      const data = await response.json();
      const randomQuestion = data.results[0].question;
      const correctAnswer = data.results[0].correct_answer;
      setQuestion(randomQuestion);
      setAnswer('');
      setCorrectAnswer(correctAnswer);
      setShowCorrectAnswer(false);
      setCongratulations('');
    } catch (error) {
      console.error('Error fetching question:', error);
    }
  };

  const handleAnswerChange = (event) => {
    setAnswer(event.target.value);
  };

  const checkAnswer = () => {
    if (answer.toLowerCase() === correctAnswer.toLowerCase()) {
      setCongratulations('Congratulations, correct answer!');
      setShowCorrectAnswer(false);
      setCorrectCount(correctCount + 1); // Increment correct count
    } else {
      setShowCorrectAnswer(true);
      setCongratulations('');
      setIncorrectCount(incorrectCount + 1); // Increment incorrect count
    }
  };

  // Calculate the percentage of correct answers
  const totalQuestions = correctCount + incorrectCount;
  const percentage = totalQuestions > 0 ? (correctCount / totalQuestions) * 100 : 0;

  

  return (

  
    
    <div className="App" >
    
    <div className="container1">
    
    <div className="container2">
    
    
    
          
      <h1>Random Trivia Question</h1>
      <div className="question">
        {/* Use dangerouslySetInnerHTML to parse HTML entities */}
        <p dangerouslySetInnerHTML={{ __html: question }}></p>
      </div>
      <div className="container3">
      <div className="answer">
        <input
          type="text"
          placeholder="Type your answer"
          value={answer}
          onChange={handleAnswerChange}
        />
        <button onClick={checkAnswer}> <FontAwesomeIcon icon={faDiamond}  className="dice" />Check Answer <FontAwesomeIcon icon={faDiamond}  className="dice" /></button>
      </div>
      {showCorrectAnswer && (
        <div className="correct-answer">
          <p>Correct Answer: {correctAnswer}</p>
        </div>
      )}
      <div className="congratulations">
        <p>{congratulations}</p>
      </div>
      <p>Correct: {correctCount}</p>
      <p>Incorrect: {incorrectCount}</p>
      <p>Percentage: {percentage.toFixed(2)}%</p>
      
      
      <button onClick={fetchRandomQuestion}> <FontAwesomeIcon icon={faDiceSix}  className="dice" beat/>Get Random Question</button>
      
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
