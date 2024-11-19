import React from 'react';
import { MantineProvider, createTheme } from '@mantine/core';
import { FormBuilder } from './components/FormBuilder/FormBuilder';
import { Survey } from './components/Survey';
import '@mantine/core/styles.css';

const theme = createTheme({
  primaryColor: 'blue',
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif'
});

function App() {
  return (
    <MantineProvider theme={theme} defaultColorScheme="light">
      <div style={{ 
        minHeight: '100vh', 
        backgroundColor: '#f8f9fa', 
        padding: '2rem'
      }}>
        <FormBuilder />
        <Survey />
      </div>
    </MantineProvider>
  );
}

export default App;