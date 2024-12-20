import { create } from 'zustand';
import { FormQuestion } from '../types/form';
import { database } from '../services/database';

interface SurveyState {
  isVisible: boolean;
  currentSurveyId: string | null;
  questions: FormQuestion[];
  responses: Record<string, string>;
  setVisible: (visible: boolean) => void;
  setResponse: (questionId: string, response: string) => void;
  loadSurvey: (formId: string) => Promise<void>;
  submitSurvey: () => Promise<void>;
}

export const useSurveyStore = create<SurveyState>((set, get) => ({
  isVisible: false,
  currentSurveyId: null,
  questions: [],
  responses: {},

  setVisible: (visible) => set({ isVisible: visible }),

  setResponse: (questionId, response) => 
    set((state) => ({
      responses: { ...state.responses, [questionId]: response }
    })),

  loadSurvey: async (formId) => {
    try {
      const form = await database.getForm(formId);
      if (form) {
        set({
          isVisible: true,
          currentSurveyId: form.id,
          questions: form.questions,
          responses: {}
        });
      }
    } catch (error) {
      console.error('Failed to load survey:', error);
    }
  },

  submitSurvey: async () => {
    const state = get();
    try {
      const response = await fetch('/api/submit-survey', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          surveyId: state.currentSurveyId,
          responses: state.responses
        })
      });
      
      if (response.ok) {
        set({ isVisible: false, responses: {}, currentSurveyId: null });
      }
    } catch (error) {
      console.error('Failed to submit survey:', error);
    }
  }
}));
