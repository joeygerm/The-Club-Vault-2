import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import Header from './components/Header'
import Navigation from './components/Navigation'
import Dashboard from './pages/Dashboard'
import AddMembership from './pages/AddMembership'
import EditMembership from './pages/EditMembership'
import ViewMembership from './pages/ViewMembership'
import { MembershipProvider } from './context/MembershipContext'

function App() {
  const { t, i18n } = useTranslation()
  
  return (
    <MembershipProvider>
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <Header />
        <main className="flex-grow container mx-auto px-4 py-6 md:px-6">
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/add" element={<AddMembership />} />
              <Route path="/edit/:id" element={<EditMembership />} />
              <Route path="/view/:id" element={<ViewMembership />} />
            </Routes>
          </AnimatePresence>
        </main>
        <footer className="bg-white border-t border-gray-200 py-4">
          <div className="container mx-auto px-4 text-center text-gray-500 text-sm">
            {t('app.footer', { year: new Date().getFullYear() })}
          </div>
        </footer>
      </div>
    </MembershipProvider>
  )
}

export default App
