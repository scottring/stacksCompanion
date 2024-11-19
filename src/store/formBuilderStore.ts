import { create } from 'zustand';
import { nanoid } from 'nanoid';
import { Form, FormQuestion, QuestionType, Signature } from '../types/form';
import { defaultProductReleaseForm } from '../data/defaultForm';

interface FormBuilderState {
  currentForm: Form;
  setTitle: (title: string) => void;
  setDescription: (description: string) => void;
  addQuestion: (type: QuestionType) => void;
  updateQuestion: (questionId: string, updates: Partial<FormQuestion>) => void;
  removeQuestion: (questionId: string) => void;
  reorderQuestions: (oldIndex: number, newIndex: number) => void;
  addOption: (questionId: string) => void;
  updateOption: (questionId: string, optionIndex: number, value: string) => void;
  removeOption: (questionId: string, optionIndex: number) => void;
  addSignature: (role: string) => void;
  updateSignature: (signatureId: string, updates: Partial<Signature>) => void;
  removeSignature: (signatureId: string) => void;
  resetToDefault: () => void;
}

export const useFormBuilderStore = create<FormBuilderState>((set) => ({
  currentForm: defaultProductReleaseForm,

  setTitle: (title) => set((state) => ({
    currentForm: { ...state.currentForm, title }
  })),

  setDescription: (description) => set((state) => ({
    currentForm: { ...state.currentForm, description }
  })),

  addQuestion: (type) => set((state) => {
    const newQuestion: FormQuestion = {
      id: nanoid(),
      type,
      text: '',
      required: false,
      options: (type === 'multiple_choice' || type === 'multiselect') ? ['Option 1'] : undefined
    };

    return {
      currentForm: {
        ...state.currentForm,
        questions: [...state.currentForm.questions, newQuestion]
      }
    };
  }),

  updateQuestion: (questionId, updates) => set((state) => ({
    currentForm: {
      ...state.currentForm,
      questions: state.currentForm.questions.map(q =>
        q.id === questionId ? { ...q, ...updates } : q
      )
    }
  })),

  removeQuestion: (questionId) => set((state) => ({
    currentForm: {
      ...state.currentForm,
      questions: state.currentForm.questions.filter(q => q.id !== questionId)
    }
  })),

  reorderQuestions: (oldIndex, newIndex) => set((state) => {
    const questions = [...state.currentForm.questions];
    const [removed] = questions.splice(oldIndex, 1);
    questions.splice(newIndex, 0, removed);
    return {
      currentForm: {
        ...state.currentForm,
        questions
      }
    };
  }),

  addOption: (questionId) => set((state) => ({
    currentForm: {
      ...state.currentForm,
      questions: state.currentForm.questions.map(q =>
        q.id === questionId
          ? { ...q, options: [...(q.options || []), `Option ${(q.options?.length || 0) + 1}`] }
          : q
      )
    }
  })),

  updateOption: (questionId, optionIndex, value) => set((state) => ({
    currentForm: {
      ...state.currentForm,
      questions: state.currentForm.questions.map(q =>
        q.id === questionId && q.options
          ? { ...q, options: q.options.map((opt, i) => i === optionIndex ? value : opt) }
          : q
      )
    }
  })),

  removeOption: (questionId, optionIndex) => set((state) => ({
    currentForm: {
      ...state.currentForm,
      questions: state.currentForm.questions.map(q =>
        q.id === questionId && q.options
          ? { ...q, options: q.options.filter((_, i) => i !== optionIndex) }
          : q
      )
    }
  })),

  addSignature: (role) => set((state) => ({
    currentForm: {
      ...state.currentForm,
      signatures: [
        ...state.currentForm.signatures,
        {
          id: nanoid(),
          role,
          name: '',
          email: '',
          signed: false
        }
      ]
    }
  })),

  updateSignature: (signatureId, updates) => set((state) => ({
    currentForm: {
      ...state.currentForm,
      signatures: state.currentForm.signatures.map(sig =>
        sig.id === signatureId ? { ...sig, ...updates } : sig
      )
    }
  })),

  removeSignature: (signatureId) => set((state) => ({
    currentForm: {
      ...state.currentForm,
      signatures: state.currentForm.signatures.filter(sig => sig.id !== signatureId)
    }
  })),

  resetToDefault: () => set({ currentForm: defaultProductReleaseForm })
}));