import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // ✅ सही इंपोर्ट
import SignInForm from './auth/forms/SignInForm';
import SignUpForm from './auth/forms/SignUpForm';
import Home from './pages/Home';
import About from './pages/About';
import Dashboard from './pages/Dashboard';
import NewsArticles from './pages/NewsArticles';
import Header from './components/shared/Header';
import { Toaster } from './components/ui/toaster';
import Footer from './components/shared/Footer';

function App() {
  return (
    <BrowserRouter>
      <Header></Header>
      <Routes>
        <Route path="/sign-in" element={<SignInForm />} />
        <Route path="/sign-up" element={<SignUpForm />} />
        <Route path="/" element={<Home />} /> {/* ✅ होम पेज ठीक से लोड होगा */}
        <Route path="/about" element={<About />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/news" element={<NewsArticles />} />
      </Routes>
      <Footer></Footer>
      <Toaster />
    </BrowserRouter>
  );
}

export default App;
