import { getForms } from '@/lib/getForms';
import { FormBuilder } from '../components/FormBuilder/FormBuilder';

export default async function Home() {
  console.log('Home page')
  const forms = await getForms()
  console.log('forms', forms)
  return (
    <main className="container mx-auto py-8 px-4">
      <FormBuilder />
    </main>
  );
}
