export type QuestionType = 'multiple_choice' | 'text' | 'rating' | 'multiselect' | 'signature';

export interface Signature {
  id: string;
  role: string;
  name: string;
  email: string;
  signed: boolean;
  signedAt?: string;
  signatureData?: string;
}

export interface FormQuestion {
  id: string;
  type: QuestionType;
  text: string;
  options?: string[];
  required: boolean;
}

export interface Form {
  id: string;
  title: string;
  description: string;
  questions: FormQuestion[];
  signatures: Signature[];
  status: 'draft' | 'pending' | 'approved' | 'rejected';
  productId?: string;
  createdAt: string;
  updatedAt: string;
}