import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BooksProvider } from './components/BooksContext';
import { UsersProvider } from "./components/UsersContext";

ReactDOM.render(
  <React.StrictMode>
    <BooksProvider>
      <UsersProvider>
        <App />
      </UsersProvider>
    </BooksProvider>
  </React.StrictMode>,
  document.getElementById('root')
);