import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';
import './styles/main.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';


const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path='/*' element={
            // <React.Suspense fallback = {<LazyLoading />}>
              <App />
            // </React.Suspense>
          } />
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
