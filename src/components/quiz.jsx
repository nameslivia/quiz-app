import { useState } from "react";
import Results from "./results";

export default function Quiz() {
    const questionBank = [
        {
            question: "Which planet is known as the Red Planet?",
            options: ["Mars", "Jupiter", "Saturn", "Venus"],
            answer: "Mars"
        },
        {
            question: "How many hearts does an octopus have?",
            options: ["1", "2", "3", "4"],
            answer: "3"
        },
        {
            question: "In which year was the video game company Nintendo founded?",
            options: ["1985", "1970", "1889", "2001"],
            answer: "1889"
        },
    ];

    const initialAnswers = [null, null, null];

    const [userAnswers, setUserAnswers] = useState(initialAnswers);
    const [currentQuestion, setCurrentQuestion] = useState(0);

    const [isQuizFinished, setIsQuizFinished] = useState(false);

    const selectedAnswer = userAnswers[currentQuestion];

    function handleSelectOption(option) {
        const newUserAnswers = [...userAnswers];
        newUserAnswers[currentQuestion] = option;

        setUserAnswers(newUserAnswers);
    }    

    function goToNext() {
        if(currentQuestion === questionBank.length - 1){
            setIsQuizFinished(true);
        } else {
        setCurrentQuestion(currentQuestion + 1);
        }
    }

    function goToPrev() {
        if (currentQuestion > 0) {
            setCurrentQuestion(currentQuestion - 1);
        }
    }

    function restartQuiz() {
        setUserAnswers(initialAnswers);
        setCurrentQuestion(0);
        setIsQuizFinished(false);
    }

    if(isQuizFinished) {
        return (
            <Results 
                userAnswers={userAnswers} 
                questionBank={questionBank} 
                restartQuiz={restartQuiz} 
            />
        );
    }

    return <div>
                <h2>Question {currentQuestion + 1}</h2>
                <p className="question">{questionBank[currentQuestion].question}</p>
                {questionBank[currentQuestion].options.map((option) => (
                    <button
                        className={"option" + (selectedAnswer === option ? " selected" : "")} 
                        onClick={()=> handleSelectOption(option)}
                        >
                        {option}
                    </button>
                ))}

                <div className="nav-buttons">
                    <button onClick={goToPrev} disabled={currentQuestion === 0}>Prev</button>
                    <button onClick={goToNext} disabled={!selectedAnswer}>
                        {currentQuestion === questionBank.length - 1 ? "Finish Quiz" : "Next"}  
                    </button>
                </div>
            </div>
}