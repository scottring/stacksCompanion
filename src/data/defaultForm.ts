import { Form } from '../types/form';
import { nanoid } from 'nanoid';

export const defaultProductReleaseForm: Form = {
  id: nanoid(),
  title: "New Product Release Form - Werk Alfeld",
  description: "Product and Agent Release Documentation Form",
  status: 'draft',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  signatures: [],
  questions: [
    {
      id: nanoid(),
      type: 'multiple_choice',
      text: 'Requesting Department',
      options: ['Production', 'Quality Control', 'Research & Development', 'Supply Chain', 'Other'],
      required: true
    },
    {
      id: nanoid(),
      type: 'text',
      text: 'Product/Trade Name',
      required: true
    },
    {
      id: nanoid(),
      type: 'text',
      text: 'Chemical Characterization',
      required: true
    },
    {
      id: nanoid(),
      type: 'text',
      text: 'Material Number (ECR Introduction)',
      required: true
    },
    {
      id: nanoid(),
      type: 'multiple_choice',
      text: 'Product Group',
      options: ['Raw Materials', 'Processing Aids', 'Finished Products', 'Packaging Materials'],
      required: true
    },
    {
      id: nanoid(),
      type: 'multiple_choice',
      text: 'Rating Class',
      options: ['Class A', 'Class B', 'Class C', 'Class D'],
      required: true
    },
    {
      id: nanoid(),
      type: 'multiselect',
      text: 'Substance Assignment',
      options: [
        'SM formulation-independent',
        'PM formulation-independent',
        'UT excipients',
        'ZF pre-sorting'
      ],
      required: true
    },
    {
      id: nanoid(),
      type: 'text',
      text: 'Goal of Introduction / Reason for Change',
      required: true
    },
    {
      id: nanoid(),
      type: 'text',
      text: 'Manufacturer/Supplier',
      required: true
    },
    {
      id: nanoid(),
      type: 'multiselect',
      text: 'Product Information',
      options: [
        'Solids content %',
        'Active ingredient content %',
        'Density kg/m³'
      ],
      required: true
    },
    {
      id: nanoid(),
      type: 'multiselect',
      text: 'Packaging Type',
      options: [
        'Pallet',
        'Disposable',
        'Foil',
        'Metal',
        'Glass',
        'Small container',
        'Big bag/TBC',
        'Barrel'
      ],
      required: true
    },
    {
      id: nanoid(),
      type: 'multiple_choice',
      text: 'Safety Data Sheet Available',
      options: ['Yes', 'No'],
      required: true
    },
    {
      id: nanoid(),
      type: 'multiple_choice',
      text: 'Product Questionnaire Required',
      options: ['Yes', 'No'],
      required: true
    },
    {
      id: nanoid(),
      type: 'multiple_choice',
      text: 'Hazardous Substances Questionnaire Required',
      options: ['Yes', 'No'],
      required: true
    },
    {
      id: nanoid(),
      type: 'multiple_choice',
      text: 'WGK (Water Hazard Class)',
      options: ['WGK 1', 'WGK 2', 'WGK 3', 'Not classified'],
      required: true
    }
  ]
};