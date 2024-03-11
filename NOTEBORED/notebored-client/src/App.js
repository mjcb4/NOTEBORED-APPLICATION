import { Routes, Route, useNavigate } from 'react-router-dom'


// CONTEXT
import { NotesContextProvider } from './context/NotesContext'
import { AuthProvider } from './context/AuthProvider'

// PAGES
import Layout from './pages/Layout'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import NoteMapPage from './pages/NoteMapPage'
import SettingsPage from './pages/SettingsPage'
import MissingPage from './pages/MissingPage'

function App() {
    return (
        <AuthProvider>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<HomePage />} />
                    <Route path="signup" element={<SignupPage />} />
                    <Route path="login" element={<LoginPage />} />
                    <Route path="notemap" element={
                        <NotesContextProvider>
                            <NoteMapPage />
                        </NotesContextProvider>
                        }
                    />
                    <Route path="settings" element={<SettingsPage />} />
                    <Route path="*" element={<MissingPage />} />
                </Route>
            </Routes>
        </AuthProvider>
    )
}

export default App;
