'use client';

import React from 'react';
import { useFormBuilderStore } from '../../store/formBuilderStore';
import { FormQuestion } from '../../types/form';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface QuestionCardProps {
  question: FormQuestion;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({ question }) => {
  const { updateQuestion, removeQuestion, addOption, updateOption, removeOption } = useFormBuilderStore();
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: question.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div 
      ref={setNodeRef} 
      style={style} 
      className="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
    >
      <div className="flex justify-between items-center mb-4">
        <button 
          className="text-gray-500 hover:text-gray-700 cursor-move" 
          {...attributes} 
          {...listeners}
        >
          ⋮⋮
        </button>
        <button 
          className="text-red-500 hover:text-red-700"
          onClick={() => removeQuestion(question.id)}
        >
          ✕
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <input
            type="text"
            placeholder="Question text"
            value={question.text}
            onChange={(e) => updateQuestion(question.id, { text: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {question.type === 'multiple_choice' && question.options && (
          <div className="space-y-2">
            {question.options.map((option, index) => (
              <div key={index} className="flex gap-2">
                <input
                  type="text"
                  placeholder={`Option ${index + 1}`}
                  value={option}
                  onChange={(e) => updateOption(question.id, index, e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={() => removeOption(question.id, index)}
                  className="px-2 text-red-500 hover:text-red-700"
                >
                  ✕
                </button>
              </div>
            ))}
            <button
              onClick={() => addOption(question.id)}
              className="w-full px-4 py-2 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Add Option
            </button>
          </div>
        )}

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id={`required-${question.id}`}
            checked={question.required}
            onChange={(e) => updateQuestion(question.id, { required: e.target.checked })}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label 
            htmlFor={`required-${question.id}`}
            className="text-sm text-gray-700"
          >
            Required
          </label>
        </div>
      </div>
    </div>
  );
};
