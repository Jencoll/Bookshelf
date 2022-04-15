import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BooksProvider } from "./components/BooksContext";
import { CloudinaryProvider } from "./components/CloudinaryUploadWidget";
import { UsersProvider } from "./components/UsersContext";

ReactDOM.render(
  <React.StrictMode>
    <UsersProvider>
      <BooksProvider>
        <CloudinaryProvider>
          <App />
        </CloudinaryProvider>
      </BooksProvider>
    </UsersProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
