import React, { useState } from 'react';
import './Quiz.css';
import quizData from '../../assets/data';

const Quiz = () => {
    const [index, setIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState('');
    const [isCorrect, setIsCorrect] = useState(null);
    const [correctCount, setCorrectCount] = useState(0);
    const [quizCompleted, setQuizCompleted] = useState(false);

    const question = quizData[index];

    const handleOptionClick = (option) => {
        if (quizCompleted) return; // Prevent interaction if quiz is completed
        
        setSelectedAnswer(option);
        const isAnswerCorrect = option === question.answer;
        setIsCorrect(isAnswerCorrect);

        if (isAnswerCorrect) {
            setCorrectCount(correctCount + 1);
        }
    };

    const handleNextQuestion = () => {
        if (index < quizData.length - 1) {
            setIndex(index + 1);
            setSelectedAnswer('');
            setIsCorrect(null);
        } else {
            setQuizCompleted(true); // Mark quiz as completed
        }
    };

    const handlePreviousQuestion = () => {
        if (index > 0) {
            setIndex(index - 1);
            setSelectedAnswer('');
            setIsCorrect(null);
        }
    };

    // Determine performance message based on score
    const getPerformanceMessage = () => {
        const percentage = (correctCount / quizData.length) * 100;
        if (percentage === 100) {
            return "Excellent job! You got all the answers right!";
        } else if (percentage >= 80) {
            return "Great work! You scored high!";
        } else if (percentage >= 50) {
            return "Good effort! You scored above average.";
        } else {
            return "Keep trying! You can do better.";
        }
    };

    return (
        <div className='container'>
            <h1>Quiz</h1>
            <hr />
            {!quizCompleted ? (
                <>
                    <h2>{index + 1}. {question.question}</h2>
                    <ul>
                        {question.options.map((option, i) => (
                            <li 
                                key={i} 
                                onClick={() => handleOptionClick(option)}
                                className={selectedAnswer === option ? (isCorrect ? 'correct' : 'incorrect') : ''}
                                role="button"
                                aria-pressed={selectedAnswer === option ? "true" : "false"}
                            >
                                {option}
                            </li>
                        ))}
                    </ul>
                    {selectedAnswer && (
                        <div className={`feedback ${isCorrect ? 'correct' : 'incorrect'}`} aria-live="polite">
                            {isCorrect ? "Correct!" : `Incorrect! The correct answer is ${question.answer}.`}
                        </div>
                    )}

                    <div className="button-group">
                        <button onClick={handlePreviousQuestion} disabled={index === 0} aria-label="Previous question">Previous</button>
                        <button onClick={handleNextQuestion} disabled={!selectedAnswer} aria-label="Next question">Next</button>
                    </div>
                    <div className="index">{index + 1} of {quizData.length} questions</div>
                </>
            ) : (
                <div className="results" aria-live="polite">
                    <h2>Quiz Completed!</h2>
                    <p>You got {correctCount} out of {quizData.length} correct.</p>
                    <p>{getPerformanceMessage()}</p>
                </div>
            )}
        </div>
    );
};

export default Quiz;
