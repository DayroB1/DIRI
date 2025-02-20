import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { AuthProvider } from './AuthProvider.tsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './components/Login.tsx'
import Register from './components/Register.tsx'
import Dashboard from './components/Dashboard.tsx'
import Admin from './components/Admin.tsx'
import AdminRoute from './routes/AdminRoute.tsx'
import ProtectedRoute from './routes/ProtectedRoute.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
    <AuthProvider>
    <div className="main-content">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard/></ProtectedRoute>}/>
            <Route path="/admin" element={<AdminRoute><Admin/></AdminRoute>}/>
            <Route path="*" element={<App />} />
          </Routes>
          </div>
    {/* <App /> */}
    </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
