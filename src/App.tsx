import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'

// Pages
import Home from './pages/Home.tsx'
import DNAUpload from './pages/DNAUpload.tsx'
import MealPlan from './pages/MealPlan.tsx'
import GroceryList from './pages/GroceryList.tsx'
import Profile from './pages/Profile.tsx'

// Components
import Navbar from './components/Navbar.tsx'
import Footer from './components/Footer.tsx'

export default function App() {
  return (
    <Router basename="/dna-meal-planner">
      <div style={{ backgroundColor: '#e2e8f0' }} className="min-h-screen flex flex-col text-gray-800">
        <Navbar />
        <main style={{ backgroundColor: '#f0f4f8' }} className="flex-grow container mx-auto px-4 py-8 my-6 rounded-lg shadow-md">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dna-upload" element={<DNAUpload />} />
            <Route path="/meal-plan" element={<MealPlan />} />
            <Route path="/grocery-list" element={<GroceryList />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}
