'use client';

import React from 'react';
import { Stack, TextInput, Textarea, Button, Group, Paper, Container } from '@mantine/core';
import { useFormBuilderStore } from '../../store/formBuilderStore';
import { QuestionCard } from './QuestionCard';
import { SignatureSection } from '../SignatureSection';
import { DndContext, closestCenter, DragEndEvent } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { IconPlus, IconReload } from '@tabler/icons-react';

export const FormBuilder: React.FC = () => {
  const { currentForm, setTitle, setDescription, addQuestion, reorderQuestions, resetToDefault } = useFormBuilderStore();

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = currentForm.questions.findIndex(q => q.id === active.id);
      const newIndex = currentForm.questions.findIndex(q => q.id === over.id);
      reorderQuestions(oldIndex, newIndex);
    }
  };

  return (
    <Container size="md">
      <Stack gap="lg">
        <Paper shadow="xs" p="md" withBorder>
          <Stack gap="md">
            <Group position="apart">
              <TextInput
                label="Form Title"
                value={currentForm.title}
                onChange={(e) => setTitle(e.target.value)}
                size="lg"
                style={{ flex: 1 }}
              />
              <Button
                leftSection={<IconReload size={18} />}
                onClick={resetToDefault}
                variant="light"
                color="gray"
                mt={24}
              >
                Reset Form
              </Button>
            </Group>
            <Textarea
              label="Description"
              value={currentForm.description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Stack>
        </Paper>

        <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={currentForm.questions.map(q => q.id)} strategy={verticalListSortingStrategy}>
            <Stack gap="md">
              {currentForm.questions.map((question) => (
                <QuestionCard key={question.id} question={question} />
              ))}
            </Stack>
          </SortableContext>
        </DndContext>

        <Group justify="center" gap="sm">
          <Button
            leftSection={<IconPlus size={18} />}
            onClick={() => addQuestion('multiple_choice')}
            variant="light"
          >
            Multiple Choice
          </Button>
          <Button
            leftSection={<IconPlus size={18} />}
            onClick={() => addQuestion('multiselect')}
            variant="light"
          >
            Checkbox (Multi-select)
          </Button>
          <Button
            leftSection={<IconPlus size={18} />}
            onClick={() => addQuestion('text')}
            variant="light"
          >
            Text
          </Button>
          <Button
            leftSection={<IconPlus size={18} />}
            onClick={() => addQuestion('rating')}
            variant="light"
          >
            Rating
          </Button>
        </Group>

        <SignatureSection />
      </Stack>
    </Container>
  );
};