'use client';

import React, { useState } from 'react';
import { Stack, Text, Button, TextInput, Group, Paper } from '@mantine/core';
import SignatureCanvas from 'react-signature-canvas';
import { useFormBuilderStore } from '../store/formBuilderStore';
import { IconPlus, IconTrash } from '@tabler/icons-react';

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
    <Paper shadow="sm" p="md" mt="xl" withBorder>
      <Stack spacing="md">
        <Text size="xl" weight={500}>Required Signatures</Text>
        
        {currentForm.signatures.map((sig) => (
          <Paper key={sig.id} p="md" withBorder>
            <Stack spacing="sm">
              <Group position="apart">
                <TextInput
                  label="Role/Position"
                  value={sig.role}
                  onChange={(e) => updateSignature(sig.id, { role: e.target.value })}
                  style={{ flex: 1 }}
                />
                <Button
                  color="red"
                  variant="subtle"
                  onClick={() => removeSignature(sig.id)}
                  style={{ marginTop: 24 }}
                >
                  <IconTrash size={18} />
                </Button>
              </Group>
              <TextInput
                label="Email"
                type="email"
                placeholder="email@company.com"
                value={sig.email || ''}
                onChange={(e) => updateSignature(sig.id, { email: e.target.value })}
              />
            </Stack>
          </Paper>
        ))}

        <Group>
          <TextInput
            placeholder="Enter role/position"
            value={newRole}
            onChange={(e) => setNewRole(e.target.value)}
            style={{ flex: 1 }}
          />
          <Button
            leftSection={<IconPlus size={18} />}
            onClick={handleAddSignature}
            disabled={!newRole.trim()}
          >
            Add Signature
          </Button>
        </Group>
      </Stack>
    </Paper>
  );
};