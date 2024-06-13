import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {AuthProvider} from "./components/router/AuthProvider";

const root = createRoot(document.getElementById('root'));

root.render(
    <AuthProvider>
    <React.StrictMode>
        <App />
        <ToastContainer autoClose={3000} />
    </React.StrictMode>
    </AuthProvider>
);

