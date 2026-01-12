import React, { useState } from 'react'

export default function TakeQuizMode({ data, onExit }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [userAnswers, setUserAnswers] = useState({})
  const [showResults, setShowResults] = useState(false)
  const [selectedOption, setSelectedOption] = useState(null)

  if (!data || !data.quiz || data.quiz.length === 0) {
    return null
  }

  const quiz = data.quiz
  const currentQuestion = quiz[currentIndex]
  const totalQuestions = quiz.length

  const handleSelectOption = (option) => {
    if (showResults) return
    setSelectedOption(option)
  }

  const handleNext = () => {
    if (selectedOption) {
      setUserAnswers({
        ...userAnswers,
        [currentIndex]: selectedOption
      })
      setSelectedOption(null)
      
      if (currentIndex < totalQuestions - 1) {
        setCurrentIndex(currentIndex + 1)
      } else {
        // Last question - show results
        calculateResults()
      }
    }
  }

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
      setSelectedOption(userAnswers[currentIndex - 1] || null)
    }
  }

  const calculateResults = () => {
    setShowResults(true)
  }

  const getScore = () => {
    let correct = 0
    quiz.forEach((q, idx) => {
      if (userAnswers[idx] === q.answer) {
        correct++
      }
    })
    return correct
  }

  const getScorePercentage = () => {
    return Math.round((getScore() / totalQuestions) * 100)
  }

  const getOptionClass = (option, question, qIndex) => {
    const baseClass = 'quiz-option'
    
    if (!showResults) {
      // During quiz
      return `${baseClass} ${selectedOption === option ? 'selected' : ''}`
    } else {
      // After submission
      const userAnswer = userAnswers[qIndex]
      const correctAnswer = question.answer
      
      if (option === correctAnswer) {
        return `${baseClass} correct`
      } else if (option === userAnswer && userAnswer !== correctAnswer) {
        return `${baseClass} incorrect`
      }
      return `${baseClass} disabled`
    }
  }

  if (showResults) {
    const score = getScore()
    const percentage = getScorePercentage()
    
    return (
      <div className="card fade-in">
        <div className="score-display mb-6">
          <div className="text-5xl font-bold mb-2">
            {score}/{totalQuestions}
          </div>
          <div className="text-xl text-white/80 mb-1">
            {percentage}% Correct
          </div>
          <div className="text-sm text-white/60">
            {percentage >= 80 ? '🎉 Excellent work!' : 
             percentage >= 60 ? '👍 Good job!' : 
             percentage >= 40 ? '📚 Keep learning!' : 
             '💪 Try again!'}
          </div>
        </div>

        <div className="flex gap-3 mb-6">
          <button onClick={onExit} className="btn btn-ghost flex-1">
            Exit Quiz
          </button>
          <button 
            onClick={() => {
              setCurrentIndex(0)
              setUserAnswers({})
              setShowResults(false)
              setSelectedOption(null)
            }} 
            className="btn btn-primary flex-1"
          >
            Retake Quiz
          </button>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold mb-3">Review Answers</h3>
          {quiz.map((q, idx) => (
            <div key={idx} className="rounded-xl border border-white/10 bg-white/[.04] p-4">
              <div className="flex items-start justify-between gap-3 mb-3">
                <h4 className="font-semibold">Q{idx + 1}. {q.question}</h4>
                <span className={`tag difficulty-${q.difficulty}`}>{q.difficulty}</span>
              </div>
              
              <ul className="grid md:grid-cols-2 gap-2 mb-3">
                {q.options.map((opt, i) => (
                  <li key={i} className={getOptionClass(opt, q, idx)}>
                    {opt}
                  </li>
                ))}
              </ul>

              <div className="space-y-2 text-sm">
                <div className={userAnswers[idx] === q.answer ? 'text-green-300' : 'text-red-300'}>
                  <span className="font-semibold">Your answer:</span> {userAnswers[idx] || 'Not answered'}
                  {userAnswers[idx] === q.answer ? ' ✓' : ' ✗'}
                </div>
                <div className="text-teal-200/90">
                  <span className="font-semibold">Correct answer:</span> {q.answer}
                </div>
                <div className="text-white/70">
                  <span className="font-semibold">Explanation:</span> {q.explanation}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="card fade-in">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-semibold">{data.title}</h2>
          <p className="text-white/60 text-sm mt-1">
            Question {currentIndex + 1} of {totalQuestions}
          </p>
        </div>
        <button onClick={onExit} className="btn btn-ghost">
          Exit Quiz
        </button>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-sky-400 to-teal-400 transition-all duration-300"
            style={{ width: `${((currentIndex + 1) / totalQuestions) * 100}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="mb-6">
        <div className="flex items-start justify-between gap-3 mb-4">
          <h3 className="text-xl font-semibold">
            {currentQuestion.question}
          </h3>
          <span className={`tag difficulty-${currentQuestion.difficulty}`}>
            {currentQuestion.difficulty}
          </span>
        </div>

        {/* Options */}
        <ul className="grid md:grid-cols-2 gap-3">
          {currentQuestion.options.map((opt, i) => (
            <li 
              key={i} 
              className={`quiz-option ${selectedOption === opt ? 'selected' : ''}`}
              onClick={() => handleSelectOption(opt)}
            >
              <div className="flex items-center gap-2">
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  selectedOption === opt ? 'border-sky-400 bg-sky-400/20' : 'border-white/30'
                }`}>
                  {selectedOption === opt && (
                    <div className="w-2.5 h-2.5 rounded-full bg-sky-400" />
                  )}
                </div>
                <span>{opt}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Navigation */}
      <div className="flex gap-3">
        <button 
          onClick={handlePrevious}
          disabled={currentIndex === 0}
          className="btn btn-ghost"
        >
          ← Previous
        </button>
        <button 
          onClick={handleNext}
          disabled={!selectedOption}
          className="btn btn-primary flex-1"
        >
          {currentIndex === totalQuestions - 1 ? 'Submit Quiz' : 'Next →'}
        </button>
      </div>

      {/* Answer Tracker */}
      <div className="mt-6 pt-6 border-t border-white/10">
        <div className="text-xs text-white/60 mb-2">Progress</div>
        <div className="flex flex-wrap gap-2">
          {quiz.map((_, idx) => (
            <div
              key={idx}
              className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-medium border ${
                idx === currentIndex
                  ? 'bg-sky-500/30 border-sky-400/50 text-sky-300'
                  : userAnswers[idx]
                  ? 'bg-green-500/20 border-green-400/30 text-green-300'
                  : 'bg-white/5 border-white/10 text-white/40'
              }`}
            >
              {idx + 1}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
