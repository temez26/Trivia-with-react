import React, { useState } from 'react';

function App() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);
  const [congratulations, setCongratulations] = useState('');

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
    } else {
      setShowCorrectAnswer(true);
      setCongratulations('');
    }
  };

  return (
    <div className="App">
      <h1>Random Trivia Question</h1>
      <div className="question">
        {/* Use dangerouslySetInnerHTML to parse HTML entities */}
        <p dangerouslySetInnerHTML={{ __html: question }}></p>
      </div>
      <div className="answer">
        <input
          type="text"
          placeholder="Type your answer"
          value={answer}
          onChange={handleAnswerChange}
        />
        <button onClick={checkAnswer}>Check Answer</button>
      </div>
      {showCorrectAnswer && (
        <div className="correct-answer">
          <p>Correct Answer: {correctAnswer}</p>
        </div>
      )}
      <div className="congratulations">
        <p>{congratulations}</p>
      </div>
      <button onClick={fetchRandomQuestion}>Get Random Question</button>
    </div>
  );
}

export default App;
