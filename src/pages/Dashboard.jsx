import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Activity, Heart, BookOpen, MessageCircle, Users, Phone } from 'lucide-react';
import './Dashboard.css';

function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      navigate('/login');
    } else {
      setUser(JSON.parse(userData));
    }
  }, [navigate]);

  if (!user) return null;

  const features = [
    { title: 'Mood Tracker', icon: <Activity className="feature-icon" />, link: '/mood', desc: 'Track your daily emotions and view trends over time.', color: 'var(--primary)' },
    { title: 'Stress Relief', icon: <Heart className="feature-icon" />, link: '/stress', desc: 'Guided breathing and meditation exercises.', color: 'var(--secondary)' },
    { title: 'Educational Hub', icon: <BookOpen className="feature-icon" />, link: '/education', desc: 'Articles and tips for better mental health.', color: 'var(--accent)' },
    { title: 'Community', icon: <Users className="feature-icon" />, link: '/community', desc: 'Connect and share support anonymously.', color: 'var(--primary-light)' },
    { title: 'AI Assistant', icon: <MessageCircle className="feature-icon" />, link: '/chatbot', desc: 'Chat with our virtual assistant for guidance.', color: 'var(--mood-good)' },
    { title: 'Emergency', icon: <Phone className="feature-icon" />, link: '/emergency', desc: 'Immediate helplines and crisis contacts.', color: 'var(--mood-terrible)' },
  ];

  return (
    <motion.div 
      className="dashboard-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="dashboard-header glass-panel">
        <h1>Welcome, {user.username}!</h1>
        <p>How are you feeling today? Take a moment for yourself.</p>
        <Link to="/mood" className="btn btn-primary mt-4">Log Today's Mood</Link>
      </div>

      <div className="features-grid">
        {features.map((feature, index) => (
          <motion.div 
            key={index}
            className="feature-card glass-panel"
            whileHover={{ y: -5, scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 300 }}
            onClick={() => navigate(feature.link)}
            style={{ borderTop: `4px solid ${feature.color}` }}
          >
            <div className="feature-icon-wrapper" style={{ color: feature.color }}>
              {feature.icon}
            </div>
            <h3>{feature.title}</h3>
            <p>{feature.desc}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export default Dashboard;
