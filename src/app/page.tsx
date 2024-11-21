import { FormBuilder } from '../components/FormBuilder/FormBuilder';

export default async function Home() {
  console.log('Home page')
  const url = `${process.env.NEXT_PUBLIC_DOMAIN}/api/get-forms`
  console.log('url', url)
  const getFormsResponse = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'cache-control': 'no-cache',
    }
  })
  const getFormsJson = await getFormsResponse.json()
  console.log('getFormsJson', getFormsJson)
  return (
    <main className="container mx-auto py-8 px-4">
      <FormBuilder />
    </main>
  );
}
