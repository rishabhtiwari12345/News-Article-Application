import { Route } from 'lucide-react';
import React from 'react';
import { BrowserRouter, Routes } from 'react-router-dom';
import SignInForm from './auth/forms/SignInForm';
import SignUpForm from './auth/forms/SignUpForm';
import Home from './pages/Home';
import About from './pages/About';
import Dashboard from './pages/Dashboard';
import NewsArticles from './pages/NewsArticles';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/sign-in" element={<SignInForm></SignInForm>}></Route>
          <Route path="/sign-up" element={<SignUpForm></SignUpForm>}></Route>
          <Route path="/" element={<Home></Home>}></Route>

          <Route path="/about" element={<About></About>}></Route>
          <Route path="/dashboard" element={<Dashboard></Dashboard>}></Route>
          <Route path="/news" element={<NewsArticles></NewsArticles>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
