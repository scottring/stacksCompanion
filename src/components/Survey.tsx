import React from 'react';
import { Card, Text, Radio, Button, Stack, Group, Checkbox } from '@mantine/core';
import { useSurveyStore } from '../store/surveyStore';

export const Survey: React.FC = () => {
  const { isVisible, questions, responses, setResponse, submitSurvey } = useSurveyStore();

  if (!isVisible) return null;

  const handleMultiselectChange = (questionId: string, option: string, checked: boolean) => {
    const currentResponses = responses[questionId] ? JSON.parse(responses[questionId]) : [];
    const newResponses = checked
      ? [...currentResponses, option]
      : currentResponses.filter((r: string) => r !== option);
    setResponse(questionId, JSON.stringify(newResponses));
  };

  return (
    <Card shadow="sm" p="lg" radius="md" withBorder>
      <Stack>
        <Text size="xl" weight={500}>Quick Survey</Text>
        {questions.map((question, index) => (
          <div key={index}>
            <Text weight={500} mb="xs">{question.text}</Text>
            {question.type === 'multiple_choice' && (
              <Radio.Group
                value={responses[question.id] || ''}
                onChange={(value) => setResponse(question.id, value)}
              >
                <Group>
                  {question.options?.map((option, optIndex) => (
                    <Radio 
                      key={optIndex} 
                      value={option} 
                      label={option}
                    />
                  ))}
                </Group>
              </Radio.Group>
            )}
            {question.type === 'multiselect' && question.options && (
              <Stack>
                {question.options.map((option, optIndex) => {
                  const currentResponses = responses[question.id] 
                    ? JSON.parse(responses[question.id]) 
                    : [];
                  return (
                    <Checkbox
                      key={optIndex}
                      label={option}
                      checked={currentResponses.includes(option)}
                      onChange={(event) => 
                        handleMultiselectChange(question.id, option, event.currentTarget.checked)
                      }
                    />
                  );
                })}
              </Stack>
            )}
          </div>
        ))}
        <Button onClick={submitSurvey} fullWidth mt="md">
          Submit Survey
        </Button>
      </Stack>
    </Card>
  );
}