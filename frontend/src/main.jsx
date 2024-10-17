import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import HomePage from './pages/HomePage.jsx'
import "bootstrap/dist/css/bootstrap.min.css"
import './index.css'
import HeaderPage from './components/HeaderComponent.jsx'
import Footer from './components/FooterComponent.jsx'
import { Routes, Route, Router } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HeaderPage />
    <HomePage />
    <Footer />
  </StrictMode>,
)
