import { create } from 'zustand';

interface SurveyState {
  isVisible: boolean;
  currentSurveyId: string | null;
  responses: Record<string, string>;
  setVisible: (visible: boolean) => void;
  setResponse: (questionId: string, response: string) => void;
  submitSurvey: () => Promise<void>;
}

export const useSurveyStore = create<SurveyState>((set, get) => ({
  isVisible: false,
  currentSurveyId: null,
  responses: {},

  setVisible: (visible) => set({ isVisible: visible }),

  setResponse: (questionId, response) => 
    set((state) => ({
      responses: { ...state.responses, [questionId]: response }
    })),

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