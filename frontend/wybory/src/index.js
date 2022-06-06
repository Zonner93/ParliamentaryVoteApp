// const express = require("express")
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// const app = express();
// const cors = require("cors")
// const bodyParser = require("body-parser")

// app.use(cors());

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


