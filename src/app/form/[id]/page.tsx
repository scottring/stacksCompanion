'use client';

import { useEffect, useState } from 'react';
import { Form } from '../../../types/form';
import { database } from '../../../services/database';
import { Survey } from '../../../components/Survey';
import { useSurveyStore } from '../../../store/surveyStore';

export default function FormPage({ params }: { params: { id: string } }) {
  const [form, setForm] = useState<Form | null>(null);
  const [error, setError] = useState<string | null>(null);
  const loadSurvey = useSurveyStore(state => state.loadSurvey);

  useEffect(() => {
    const loadForm = () => {
      const formData = database.getForm(params.id);
      if (!formData) {
        setError('Form not found');
        return;
      }
      setForm(formData);
      loadSurvey(formData.id);
    };

    loadForm();
  }, [params.id, loadSurvey]);

  if (error) {
    return (
      <div className="container mx-auto max-w-2xl p-4">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      </div>
    );
  }

  if (!form) {
    return (
      <div className="container mx-auto max-w-2xl p-4">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-6"></div>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-24 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-2xl p-4">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <h1 className="text-2xl font-semibold mb-2">{form.title}</h1>
        <p className="text-gray-600">{form.description}</p>
      </div>
      
      <Survey />
    </div>
  );
}
