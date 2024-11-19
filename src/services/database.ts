import { Form } from '../types/form';

// In-memory storage for forms
const forms = new Map<string, Form>();

export const database = {
  createForm: (form: Form) => {
    forms.set(form.id, form);
    return form;
  },

  getForm: (id: string) => {
    return forms.get(id);
  },

  updateForm: (id: string, updates: Partial<Form>) => {
    const form = forms.get(id);
    if (!form) return null;
    
    const updatedForm = { ...form, ...updates, updatedAt: new Date().toISOString() };
    forms.set(id, updatedForm);
    return updatedForm;
  },

  deleteForm: (id: string) => {
    return forms.delete(id);
  }
};
