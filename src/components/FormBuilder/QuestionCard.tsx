'use client';

import React from 'react';
import { Card, TextInput, Switch, ActionIcon, Group, Stack, Button } from '@mantine/core';
import { useFormBuilderStore } from '../../store/formBuilderStore';
import { FormQuestion } from '../../types/form';
import { IconGripVertical, IconTrash } from '@tabler/icons-react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface QuestionCardProps {
  question: FormQuestion;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({ question }) => {
  const { updateQuestion, removeQuestion, addOption, updateOption, removeOption } = useFormBuilderStore();
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: question.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <Card ref={setNodeRef} style={style} shadow="sm" p="md" radius="md" withBorder>
      <Group justify="space-between" mb="md">
        <ActionIcon variant="subtle" {...attributes} {...listeners}>
          <IconGripVertical size={18} />
        </ActionIcon>
        <ActionIcon color="red" variant="subtle" onClick={() => removeQuestion(question.id)}>
          <IconTrash size={18} />
        </ActionIcon>
      </Group>

      <Stack gap="md">
        <TextInput
          placeholder="Question text"
          value={question.text}
          onChange={(e) => updateQuestion(question.id, { text: e.target.value })}
        />

        {question.type === 'multiple_choice' && question.options && (
          <Stack gap="xs">
            {question.options.map((option, index) => (
              <Group key={index}>
                <TextInput
                  placeholder={`Option ${index + 1}`}
                  value={option}
                  onChange={(e) => updateOption(question.id, index, e.target.value)}
                  style={{ flex: 1 }}
                />
                <ActionIcon color="red" variant="subtle" onClick={() => removeOption(question.id, index)}>
                  <IconTrash size={18} />
                </ActionIcon>
              </Group>
            ))}
            <Button variant="light" onClick={() => addOption(question.id)}>
              Add Option
            </Button>
          </Stack>
        )}

        <Switch
          label="Required"
          checked={question.required}
          onChange={(e) => updateQuestion(question.id, { required: e.currentTarget.checked })}
        />
      </Stack>
    </Card>
  );
};