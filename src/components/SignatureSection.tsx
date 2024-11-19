'use client';

import React, { useState } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import { useFormBuilderStore } from '../store/formBuilderStore';

export const SignatureSection: React.FC = () => {
  const { currentForm, addSignature, removeSignature, updateSignature } = useFormBuilderStore();
  const [newRole, setNewRole] = useState('');

  const handleAddSignature = () => {
    if (newRole.trim()) {
      addSignature(newRole.trim());
      setNewRole('');
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mt-8">
      <div className="space-y-4">
        <h2 className="text-xl font-medium">Required Signatures</h2>
        
        {currentForm.signatures.map((sig) => (
          <div key={sig.id} className="p-4 border border-gray-200 rounded-lg">
            <div className="space-y-4">
              <div className="flex justify-between gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Role/Position
                  </label>
                  <input
                    type="text"
                    value={sig.role}
                    onChange={(e) => updateSignature(sig.id, { role: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <button
                  onClick={() => removeSignature(sig.id)}
                  className="mt-6 text-red-500 hover:text-red-700"
                >
                  ✕
                </button>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="email@company.com"
                  value={sig.email || ''}
                  onChange={(e) => updateSignature(sig.id, { email: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        ))}

        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Enter role/position"
            value={newRole}
            onChange={(e) => setNewRole(e.target.value)}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleAddSignature}
            disabled={!newRole.trim()}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            + Add Signature
          </button>
        </div>
      </div>
    </div>
  );
};
