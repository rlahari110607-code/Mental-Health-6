import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Square, Volume2 } from 'lucide-react';
import './StressRelief.css';

function StressRelief() {
  const [isActive, setIsActive] = useState(false);
  const [phase, setPhase] = useState('Idle'); // Idle, Inhale, Hold, Exhale

  useEffect(() => {
    let interval = null;
    let timeout1 = null;
    let timeout2 = null;
    let timeout3 = null;

    if (isActive) {
      const cycle = () => {
        setPhase('Breathe In...');
        timeout1 = setTimeout(() => {
          setPhase('Hold...');
          timeout2 = setTimeout(() => {
            setPhase('Breathe Out...');
            timeout3 = setTimeout(() => {
              // Wait before next cycle
            }, 4000);
          }, 3000);
        }, 4000);
      };

      cycle();
      interval = setInterval(cycle, 11000);
    } else {
      setPhase('Idle');
    }

    return () => {
      clearInterval(interval);
      clearTimeout(timeout1);
      clearTimeout(timeout2);
      clearTimeout(timeout3);
    };
  }, [isActive]);

  const getScale = () => {
    if (!isActive) return 1;
    if (phase === 'Breathe In...') return 1.8;
    if (phase === 'Hold...') return 1.8;
    if (phase === 'Breathe Out...') return 1;
    return 1;
  };

  const getTransitionDuration = () => {
    if (phase === 'Breathe In...') return 4;
    if (phase === 'Hold...') return 3;
    if (phase === 'Breathe Out...') return 4;
    return 1;
  };

  return (
    <motion.div 
      className="stress-container"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="glass-panel text-center p-5 rounded-xl">
        <h2 style={{color: 'var(--secondary)', marginBottom: '15px'}}>Guided Breathing</h2>
        <p style={{color: 'var(--text-muted)', marginBottom: '40px'}}>Follow the circle to regulate your breathing and lower your heart rate.</p>
        
        <div className="breathing-area">
          <motion.div 
            className="breathing-circle"
            animate={{ 
              scale: getScale(),
              opacity: isActive ? 0.8 : 0.4
            }}
            transition={{ 
              duration: getTransitionDuration(),
              ease: "easeInOut"
            }}
          />
          <div className="breathing-text">
            <h3>{phase}</h3>
          </div>
        </div>

        <div className="breathing-controls mt-5">
          <button 
            className={`btn ${isActive ? 'btn-stop' : 'btn-primary'}`}
            onClick={() => setIsActive(!isActive)}
          >
            {isActive ? <><Square size={20} /> Stop</> : <><Play size={20} /> Start Exercise</>}
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default StressRelief;
