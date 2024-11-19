import React from 'react';
import { useSurveyStore } from '../store/surveyStore';
import { FormQuestion } from '../types/form';

export const Survey: React.FC = () => {
  const { isVisible, questions, responses, setResponse, submitSurvey } = useSurveyStore();

  if (!isVisible) return null;

  const handleMultiselectChange = (questionId: string, option: string, checked: boolean) => {
    const currentResponses = responses[questionId] ? JSON.parse(responses[questionId]) : [];
    const newResponses = checked
      ? [...currentResponses, option]
      : currentResponses.filter((r: string) => r !== option);
    setResponse(questionId, JSON.stringify(newResponses));
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <div className="space-y-6">
        <h2 className="text-xl font-medium">Quick Survey</h2>
        {questions.map((question: FormQuestion, index: number) => (
          <div key={index} className="space-y-2">
            <p className="font-medium">{question.text}</p>
            {question.type === 'multiple_choice' && (
              <div className="flex flex-col gap-2">
                {question.options?.map((option: string, optIndex: number) => (
                  <label key={optIndex} className="flex items-center gap-2">
                    <input
                      type="radio"
                      name={`question-${question.id}`}
                      value={option}
                      checked={responses[question.id] === option}
                      onChange={(e) => setResponse(question.id, e.target.value)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                    />
                    <span className="text-gray-700">{option}</span>
                  </label>
                ))}
              </div>
            )}
            {question.type === 'multiselect' && question.options && (
              <div className="flex flex-col gap-2">
                {question.options.map((option: string, optIndex: number) => {
                  const currentResponses = responses[question.id] 
                    ? JSON.parse(responses[question.id]) 
                    : [];
                  return (
                    <label key={optIndex} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={currentResponses.includes(option)}
                        onChange={(e) => 
                          handleMultiselectChange(question.id, option, e.target.checked)
                        }
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <span className="text-gray-700">{option}</span>
                    </label>
                  );
                })}
              </div>
            )}
          </div>
        ))}
        <button
          onClick={submitSurvey}
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Submit Survey
        </button>
      </div>
    </div>
  );
};
