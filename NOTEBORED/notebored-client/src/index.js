import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ReactDOM from 'react-dom/client'
import React from 'react'
import App from './App'

// STYLING
import './stylesheets/App.css'
import './stylesheets/Pages.css'
import './stylesheets/Components.css'


const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
    <React.StrictMode>
        <Router>
            <Routes>
                <Route path="/*" element={<App /> }/>
            </Routes>
        </Router>
    </React.StrictMode>
)