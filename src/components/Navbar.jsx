import { Link, useNavigate } from 'react-router-dom';
import { Heart, Activity, BookOpen, MessageCircle, Users, Phone, LogOut, User as UserIcon } from 'lucide-react';
import './Navbar.css';

function Navbar() {
  const navigate = useNavigate();
  // Basic mock auth check
  const isAuthenticated = localStorage.getItem('user');

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <nav className="navbar glass-panel">
      <div className="navbar-brand">
        <Heart className="brand-icon" size={28} />
        <Link to="/dashboard">MindCare</Link>
      </div>
      
      {isAuthenticated && (
        <div className="navbar-links">
          <Link to="/mood" className="nav-item"><Activity size={20}/> Mood</Link>
          <Link to="/stress" className="nav-item"><Heart size={20}/> Relief</Link>
          <Link to="/education" className="nav-item"><BookOpen size={20}/> Learn</Link>
          <Link to="/chatbot" className="nav-item"><MessageCircle size={20}/> Chat</Link>
          <Link to="/community" className="nav-item"><Users size={20}/> Community</Link>
          <Link to="/emergency" className="nav-item emergency"><Phone size={20}/> Help</Link>
          
          <button onClick={handleLogout} className="btn-logout">
            <LogOut size={20}/>
          </button>
        </div>
      )}
      {!isAuthenticated && (
        <div className="navbar-links">
          <Link to="/login" className="nav-item"><UserIcon size={20}/> Login</Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
