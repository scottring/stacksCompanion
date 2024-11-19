import { FormBuilder } from '@/components/FormBuilder/FormBuilder';
import { Container } from '@mantine/core';

export default function Home() {
  return (
    <Container size="md" py="xl">
      <FormBuilder />
    </Container>
  );
}