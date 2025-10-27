'use client';

import React, { useState } from 'react';
import { Problem } from '@/types';

const practiceProblems: Problem[] = [
  {
    id: "fruit-math",
    title: "Fruit Math",
    question: "How many pieces of fruit are there in total?",
    visual: "🍊 + 🍐 + 🍐 = ?",
    options: [3, 4, 5],
    correct: 3,
    explanation: "There is 1 orange + 2 pears = 3 pieces of fruit total",
    difficulty: "easy",
    category: "basic-math"
  },
  {
    id: "multiplication",
    title: "Multiplication Practice",
    question: "What is 17 × 4?",
    visual: "17 × 4 = ?",
    type: "input",
    correct: 68,
    explanation: "17 × 4 = (10 × 4) + (7 × 4) = 40 + 28 = 68",
    difficulty: "medium",
    category: "multiplication"
  },
  {
    id: "addition",
    title: "Addition Challenge",
    question: "What is 25 + 37?",
    visual: "25 + 37 = ?",
    type: "input",
    correct: 62,
    explanation: "25 + 37 = (20 + 30) + (5 + 7) = 50 + 12 = 62",
    difficulty: "easy",
    category: "addition"
  },
  {
    id: "subtraction",
    title: "Subtraction Practice",
    question: "What is 84 - 29?",
    visual: "84 - 29 = ?",
    type: "input",
    correct: 55,
    explanation: "84 - 29 = (80 - 20) + (4 - 9) = 60 - 5 = 55",
    difficulty: "medium",
    category: "subtraction"
  },
  {
    id: "division",
    title: "Division Problem",
    question: "What is 72 ÷ 8?",
    visual: "72 ÷ 8 = ?",
    options: [7, 8, 9, 10],
    correct: 9,
    explanation: "72 ÷ 8 = 9 because 8 × 9 = 72",
    difficulty: "easy",
    category: "division"
  },
  {
    id: "word-problem",
    title: "Word Problem",
    question: "Sarah has 15 apples. She gives 6 to her friend and buys 4 more. How many apples does she have now?",
    visual: "15 - 6 + 4 = ?",
    type: "input",
    correct: 13,
    explanation: "15 - 6 + 4 = 9 + 4 = 13 apples",
    difficulty: "medium",
    category: "word-problems"
  },
  {
    id: "fractions",
    title: "Fraction Addition",
    question: "What is 1/4 + 1/4?",
    visual: "¼ + ¼ = ?",
    options: ["1/8", "1/4", "1/2", "2/4"],
    correct: "1/2",
    explanation: "1/4 + 1/4 = 2/4 = 1/2",
    difficulty: "medium",
    category: "fractions"
  },
  {
    id: "geometry",
    title: "Perimeter Problem",
    question: "A rectangle has length 8 and width 5. What is its perimeter?",
    visual: "Rectangle: 8 × 5",
    type: "input",
    correct: 26,
    explanation: "Perimeter = 2 × (length + width) = 2 × (8 + 5) = 2 × 13 = 26",
    difficulty: "medium",
    category: "geometry"
  },
  {
    id: "patterns",
    title: "Number Pattern",
    question: "What comes next in the pattern: 2, 4, 8, 16, ?",
    visual: "2 → 4 → 8 → 16 → ?",
    options: [24, 32, 30, 28],
    correct: 32,
    explanation: "Each number is multiplied by 2: 2×2=4, 4×2=8, 8×2=16, 16×2=32",
    difficulty: "hard",
    category: "patterns"
  },
  {
    id: "money-math",
    title: "Money Math",
    question: "If you have 3 quarters, 2 dimes, and 4 pennies, how much money do you have?",
    visual: "3 quarters + 2 dimes + 4 pennies = ?",
    type: "input",
    correct: 99,
    explanation: "3 quarters = 75¢, 2 dimes = 20¢, 4 pennies = 4¢. Total = 75 + 20 + 4 = 99¢",
    difficulty: "medium",
    category: "money"
  }
];

export function PracticeProblems() {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number | string>>({});
  const [showFeedback, setShowFeedback] = useState<Record<string, boolean>>({});
  const [inputAnswers, setInputAnswers] = useState<Record<string, string>>({});

  // Randomly select 2 problems
  const [randomProblems] = useState(() => {
    const shuffled = [...practiceProblems].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 2);
  });

  const handleAnswerSelect = (problemId: string, answer: number | string) => {
    setSelectedAnswers(prev => ({ ...prev, [problemId]: answer }));
  };

  const handleInputChange = (problemId: string, value: string) => {
    setInputAnswers(prev => ({ ...prev, [problemId]: value }));
  };

  const checkAnswer = (problemId: string) => {
    setShowFeedback(prev => ({ ...prev, [problemId]: true }));
  };

  const isCorrect = (problem: Problem) => {
    if (problem.type === 'input') {
      const userAnswer = inputAnswers[problem.id] || '';
      // Handle both number and string answers
      if (typeof problem.correct === 'number') {
        return parseInt(userAnswer) === problem.correct;
      } else {
        return userAnswer.toLowerCase() === problem.correct.toLowerCase();
      }
    } else {
      const userAnswer = selectedAnswers[problem.id];
      return userAnswer === problem.correct;
    }
  };

  return (
    <section className="mb-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Practice Problems</h2>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {randomProblems.map((problem) => (
          <div
            key={problem.id}
            className="bg-white/80 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <h3 className="text-xl font-semibold mb-4 text-gray-800">{problem.title}</h3>
            <p className="text-lg mb-3 text-gray-700">{problem.question}</p>
            <div className="text-3xl mb-4 text-center">{problem.visual}</div>

            {problem.type === 'input' ? (
              <div className="mb-4">
                <input
                  type="number"
                  value={inputAnswers[problem.id] || ''}
                  onChange={(e) => handleInputChange(problem.id, e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg text-center bg-white/90 text-gray-900 placeholder-gray-600"
                  placeholder="Enter your answer"
                />
              </div>
            ) : (
              <div className="grid grid-cols-3 gap-3 mb-4">
                {problem.options?.map((option) => (
                  <button
                    key={option}
                    onClick={() => handleAnswerSelect(problem.id, option)}
                    className={`p-4 rounded-lg border-2 transition-all duration-200 text-lg font-semibold ${selectedAnswers[problem.id] === option
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-300 hover:border-blue-300 hover:bg-blue-50'
                      }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}

            <div className="flex gap-3">
              <button
                onClick={() => checkAnswer(problem.id)}
                className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200"
              >
                Check Answer
              </button>
            </div>

            {showFeedback[problem.id] && (
              <div className={`mt-4 p-4 rounded-lg ${isCorrect(problem)
                ? 'bg-green-100 border border-green-300 text-green-800'
                : 'bg-red-100 border border-red-300 text-red-800'
                }`}>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">
                    {isCorrect(problem) ? '✅' : '❌'}
                  </span>
                  <span className="font-semibold">
                    {isCorrect(problem) ? 'Correct!' : 'Try again!'}
                  </span>
                </div>
                <p className="text-sm">{problem.explanation}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
} 