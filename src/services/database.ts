import { collection, doc, getDoc, getDocs, setDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Form } from '../types/form';

export const FORMS_COLLECTION = 'forms';

export const database = {
  createForm: async (form: Form) => {
    try {
      const formRef = doc(db, FORMS_COLLECTION, form.id);
      console.log('setting form...')
      await setDoc(formRef, { ...form });
      console.log('form set')
      return form;
    } catch (error) {
      console.error('Error creating form:', error);
      throw error;
    }
  },

  getForm: async (id: string) => {
    try {
      const formRef = doc(db, FORMS_COLLECTION, id);
      const formSnap = await getDoc(formRef);
      return formSnap.exists() ? formSnap.data() as Form : undefined;
    } catch (error) {
      console.error('Error getting form:', error);
      throw error;
    }
  },

  getForms: async () => {
    try {
      const formsRef = collection(db, FORMS_COLLECTION);
      const querySnapshot = await getDocs(formsRef);
      return querySnapshot.docs.map(doc => doc.data() as Form);
    } catch (error) {
      console.error('Error getting forms:', error);
      throw error;
    }
  },

  updateForm: async (id: string, updates: Partial<Form>) => {
    try {
      const formRef = doc(db, FORMS_COLLECTION, id);
      const formSnap = await getDoc(formRef);
      
      if (!formSnap.exists()) return null;
      
      const updatedData = {
        ...updates,
        updatedAt: new Date().toISOString()
      };
      
      await updateDoc(formRef, updatedData);
      return {
        ...formSnap.data(),
        ...updatedData
      } as Form;
    } catch (error) {
      console.error('Error updating form:', error);
      throw error;
    }
  },

  deleteForm: async (id: string) => {
    try {
      const formRef = doc(db, FORMS_COLLECTION, id);
      await deleteDoc(formRef);
      return true;
    } catch (error) {
      console.error('Error deleting form:', error);
      throw error;
    }
  }
};
