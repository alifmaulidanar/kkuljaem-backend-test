import './index.css'
import App from './App.tsx'
import { StrictMode } from 'react'
import store from './store/store';
import { Provider } from 'react-redux';
import { createRoot } from 'react-dom/client'
import queryClient from './store/queryClient';
import { QueryClientProvider } from '@tanstack/react-query';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </Provider>
  </StrictMode>,
)
