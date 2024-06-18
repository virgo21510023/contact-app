import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Splashscreen from './pages/Splashscreen';
import GettingStarted from './pages/GettingStarted';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import Home from './pages/Home';
import AddContact from './pages/AddContact';
import ContactDetail from './pages/ContactDetail';
import EditContact from './pages/EditContact';

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Splashscreen />} />
      <Route path="/getting-started" element={<GettingStarted />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/home" element={<Home />} />
      <Route path="/add-contact" element={<AddContact />} />
      <Route path="/contact/:id" element={<ContactDetail />} />
      <Route path="/edit-contact/:id" element={<EditContact />} />
    </Routes>
  </Router>
);

export default App;
