import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';
import './MoodTracker.css';

const MOODS = [
  { level: 5, label: 'Great', color: '#10b981', emoji: '😄' },
  { level: 4, label: 'Good', color: '#3b82f6', emoji: '🙂' },
  { level: 3, label: 'Okay', color: '#f59e0b', emoji: '😐' },
  { level: 2, label: 'Bad', color: '#f97316', emoji: '😞' },
  { level: 1, label: 'Terrible', color: '#ef4444', emoji: '😫' }
];

const mockHistory = [
  { name: 'Mon', mood: 3 },
  { name: 'Tue', mood: 4 },
  { name: 'Wed', mood: 2 },
  { name: 'Thu', mood: 5 },
  { name: 'Fri', mood: 4 },
  { name: 'Sat', mood: 4 },
  { name: 'Sun', mood: null } 
];

function MoodTracker() {
  const [selectedMood, setSelectedMood] = useState(null);
  const [history, setHistory] = useState(mockHistory);

  useEffect(() => {
    // Check if we logged a mood today
    const saved = localStorage.getItem('todayMood');
    if (saved) {
      setSelectedMood(parseInt(saved));
      updateChart(parseInt(saved));
    }
  }, []);

  const handleMoodSelect = (level) => {
    setSelectedMood(level);
    localStorage.setItem('todayMood', level);
    updateChart(level);
  };

  const updateChart = (level) => {
    const updated = [...mockHistory];
    updated[6].mood = level; // update Sunday (today)
    setHistory(updated);
  };

  return (
    <motion.div 
      className="mood-container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="glass-panel text-center mb-4 p-5 rounded-xl">
        <h2 style={{color: 'var(--primary)', marginBottom: '10px'}}>How are you feeling right now?</h2>
        <p style={{color: 'var(--text-muted)', marginBottom: '30px'}}>Select your current state of mind to log it for today.</p>
        
        <div className="mood-selector">
          {MOODS.map((mood) => (
            <motion.button
              key={mood.level}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className={`mood-btn ${selectedMood === mood.level ? 'active' : ''}`}
              style={{
                borderColor: mood.color,
                backgroundColor: selectedMood === mood.level ? mood.color : 'transparent',
                color: selectedMood === mood.level ? 'white' : mood.color
              }}
              onClick={() => handleMoodSelect(mood.level)}
            >
              <span className="mood-emoji">{mood.emoji}</span>
              <span className="mood-label">{mood.label}</span>
            </motion.button>
          ))}
        </div>
      </div>

      <div className="glass-panel p-5 rounded-xl mt-5">
        <h3 style={{marginBottom: '20px'}}>Your Mood This Week</h3>
        <div className="chart-container" style={{height: '300px'}}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={history}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.1)" />
              <XAxis dataKey="name" stroke="var(--text-muted)" />
              <YAxis domain={[1, 5]} ticks={[1, 2, 3, 4, 5]} stroke="var(--text-muted)" />
              <Tooltip 
                contentStyle={{ borderRadius: '10px', backgroundColor: 'rgba(255,255,255,0.9)', border: 'none', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}
              />
              <Line 
                type="monotone" 
                dataKey="mood" 
                stroke="var(--primary)" 
                strokeWidth={3}
                dot={{ stroke: 'var(--primary)', strokeWidth: 2, r: 6, fill: 'white' }}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </motion.div>
  );
}

export default MoodTracker;
