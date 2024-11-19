'use client';

import React from 'react';
import { useFormBuilderStore } from '../../store/formBuilderStore';
import { QuestionCard } from './QuestionCard';
import { SignatureSection } from '../SignatureSection';
import { DndContext, closestCenter, DragEndEvent } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';

export const FormBuilder: React.FC = () => {
  const { currentForm, setTitle, setDescription, addQuestion, reorderQuestions, resetToDefault } = useFormBuilderStore();

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = currentForm.questions.findIndex(q => q.id === active.id);
      const newIndex = currentForm.questions.findIndex(q => q.id === over.id);
      reorderQuestions(oldIndex, newIndex);
    }
  };

  return (
    <div className="container mx-auto max-w-2xl p-4">
      <div className="space-y-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="space-y-4">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Form Title
                </label>
                <input
                  type="text"
                  value={currentForm.title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button
                onClick={resetToDefault}
                className="ml-4 mt-6 px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                Reset Form
              </button>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                value={currentForm.description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={3}
              />
            </div>
          </div>
        </div>

        <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={currentForm.questions.map(q => q.id)} strategy={verticalListSortingStrategy}>
            <div className="space-y-4">
              {currentForm.questions.map((question) => (
                <QuestionCard key={question.id} question={question} />
              ))}
            </div>
          </SortableContext>
        </DndContext>

        <div className="flex justify-center gap-2 flex-wrap">
          <button
            onClick={() => addQuestion('multiple_choice')}
            className="px-4 py-2 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            + Multiple Choice
          </button>
          <button
            onClick={() => addQuestion('multiselect')}
            className="px-4 py-2 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            + Checkbox (Multi-select)
          </button>
          <button
            onClick={() => addQuestion('text')}
            className="px-4 py-2 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            + Text
          </button>
          <button
            onClick={() => addQuestion('rating')}
            className="px-4 py-2 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            + Rating
          </button>
        </div>

        <SignatureSection />
      </div>
    </div>
  );
};
