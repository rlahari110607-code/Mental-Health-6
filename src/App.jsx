import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import MoodTracker from './components/MoodTracker';
import StressRelief from './components/StressRelief';
import EducationalArticles from './components/EducationalArticles';
import CommunityForum from './components/CommunityForum';
import Chatbot from './components/Chatbot';
import EmergencyHelpline from './components/EmergencyHelpline';

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/mood" element={<MoodTracker />} />
          <Route path="/stress" element={<StressRelief />} />
          <Route path="/education" element={<EducationalArticles />} />
          <Route path="/community" element={<CommunityForum />} />
          <Route path="/chatbot" element={<Chatbot />} />
          <Route path="/emergency" element={<EmergencyHelpline />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
