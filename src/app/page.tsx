import { FormBuilder } from '../components/FormBuilder/FormBuilder';

export default async function Home() {
  console.log('Home page')
  const getFormsResponse = await fetch('http://localhost:3001/api/get-forms')
  const getFormsJson = await getFormsResponse.json()
  console.log('getFormsJson', getFormsJson)
  return (
    <main className="container mx-auto py-8 px-4">
      <FormBuilder />
    </main>
  );
}
