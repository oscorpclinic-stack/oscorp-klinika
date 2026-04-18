import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import Services from './pages/Services';
import LaserHub from './pages/LaserHub';
import Innovation from './pages/Innovation';
import Contact from './pages/Contact';

import ServiceImplants from './pages/ServiceImplants';
import ServiceAesthetics from './pages/ServiceAesthetics';
import ServiceOrthodontics from './pages/ServiceOrthodontics';
import ServiceDiagnostics from './pages/ServiceDiagnostics';

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="services">
            <Route index element={<Services />} />
            <Route path="implants" element={<ServiceImplants />} />
            <Route path="aesthetics" element={<ServiceAesthetics />} />
            <Route path="orthodontics" element={<ServiceOrthodontics />} />
            <Route path="diagnostics" element={<ServiceDiagnostics />} />
          </Route>
          <Route path="laser-hub" element={<LaserHub />} />
          <Route path="innovation" element={<Innovation />} />
          <Route path="contact" element={<Contact />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
