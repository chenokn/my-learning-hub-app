"use client";
import React, { useState } from "react";

const operators = [
  { symbol: "+", fn: (a: number, b: number) => a + b },
  { symbol: "-", fn: (a: number, b: number) => a - b },
  { symbol: "×", fn: (a: number, b: number) => a * b },
];

function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateQuestion() {
  const op = operators[getRandomInt(0, operators.length - 1)];
  const a = getRandomInt(1, 12);
  const b = getRandomInt(1, 12);
  return {
    a,
    b,
    operator: op.symbol,
    answer: op.fn(a, b),
  };
}

export const MathGame: React.FC = () => {
  const [question, setQuestion] = useState(generateQuestion());
  const [userAnswer, setUserAnswer] = useState("");
  const [feedback, setFeedback] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (parseInt(userAnswer) === question.answer) {
      setFeedback("✅ Correct! Great job!");
      setScore(score + 1);
      setTimeout(() => {
        setQuestion(generateQuestion());
        setUserAnswer("");
        setFeedback(null);
      }, 1000);
    } else {
      setFeedback("❌ Try again!");
      setAttempts(attempts + 1);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white/80 border border-gray-200 rounded-2xl shadow p-8 flex flex-col items-center">
      <div className="text-3xl mb-2 font-bold text-gray-800 flex items-center gap-2">
        <span role="img" aria-label="game">🎮</span> Quick Math Challenge
      </div>
      <div className="mb-6 text-gray-600 text-center">
        Solve as many as you can! Your score: <span className="font-bold text-gray-800">{score}</span>
      </div>
      <form onSubmit={handleSubmit} className="w-full flex flex-col items-center gap-4">
        <div className="text-4xl font-mono mb-2 text-gray-900">
          {question.a} <span className="text-orange-500">{question.operator}</span> {question.b} = ?
        </div>
        <input
          type="number"
          className="w-32 px-4 py-2 border border-gray-300 rounded-lg text-center text-xl focus:ring-2 focus:ring-orange-400 focus:border-transparent bg-white/90 text-gray-900"
          value={userAnswer}
          onChange={e => setUserAnswer(e.target.value)}
          autoFocus
        />
        <button
          type="submit"
          className="px-6 py-2 bg-gray-800 text-white rounded-lg font-semibold hover:bg-gray-700 transition-colors mt-2"
        >
          Submit
        </button>
      </form>
      {feedback && (
        <div className={`mt-4 text-lg font-semibold ${feedback.startsWith("✅") ? "text-green-600" : "text-red-500"}`}>{feedback}</div>
      )}
      <div className="mt-6 text-sm text-gray-500">Attempts: {attempts}</div>
    </div>
  );
}; 