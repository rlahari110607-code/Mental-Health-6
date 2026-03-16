import { motion } from 'framer-motion';
import { Phone, AlertCircle, MapPin, ExternalLink } from 'lucide-react';

const EMP_CONTACTS = [
  { name: "National Suicide Prevention Lifeline", number: "988", desc: "Available 24/7. Languages: English, Spanish." },
  { name: "Crisis Text Line", number: "Text HOME to 741741", desc: "Connect with a volunteer Crisis Counselor 24/7." },
  { name: "Trevor Project (LGBTQ Youth)", number: "1-866-488-7386", desc: "Confidential suicide prevention and crisis intervention." },
  { name: "Veterans Crisis Line", number: "988 (Press 1)", desc: "Confidential crisis support for Veterans and their loved ones." }
];

function EmergencyHelpline() {
  return (
    <motion.div 
      style={{ maxWidth: '800px', margin: '0 auto', paddingBottom: '40px' }}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="glass-panel" style={{ padding: '40px', textAlign: 'center', marginBottom: '30px', borderRadius: '20px', borderTop: '5px solid var(--mood-terrible)' }}>
        <AlertCircle size={56} color="var(--mood-terrible)" style={{ marginBottom: '20px' }} />
        <h2 style={{ color: 'var(--mood-terrible)', marginBottom: '15px' }}>Immediate Help & Crisis Lines</h2>
        <p style={{ color: 'var(--text-main)', fontSize: '1.1rem', fontWeight: 500 }}>
          If you or someone you know is in immediate danger, please call 911 or visit the nearest emergency room.
        </p>
      </div>

      <h3 style={{ marginBottom: '20px', color: 'var(--text-main)', paddingLeft: '10px' }}>24/7 Support Hotlines</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px', marginBottom: '40px' }}>
        {EMP_CONTACTS.map((contact, idx) => (
          <motion.div 
            key={idx}
            className="glass-panel"
            whileHover={{ scale: 1.02 }}
            style={{ padding: '25px', borderRadius: '16px', display: 'flex', flexDirection: 'column', height: '100%' }}
          >
            <h3 style={{ margin: '0 0 10px 0', fontSize: '1.1rem', color: 'var(--text-main)' }}>{contact.name}</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '20px', flex: 1 }}>{contact.desc}</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'rgba(239, 68, 68, 0.1)', padding: '12px 15px', borderRadius: '10px', color: 'var(--mood-terrible)', fontWeight: 'bold' }}>
              <Phone size={20} />
              <span style={{ fontSize: '1.2rem' }}>{contact.number}</span>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="glass-panel" style={{ padding: '30px', borderRadius: '20px', display: 'flex', alignItems: 'center', gap: '20px' }}>
        <div style={{ background: 'var(--primary)', color: 'white', padding: '15px', borderRadius: '50%' }}>
          <MapPin size={24} />
        </div>
        <div>
          <h3 style={{ margin: '0 0 5px 0' }}>Find Local Resources</h3>
          <p style={{ margin: 0, color: 'var(--text-muted)' }}>Search for mental health professionals and clinics in your area.</p>
        </div>
        <button className="btn btn-primary" style={{ marginLeft: 'auto' }}>
          Search Directory <ExternalLink size={16} />
        </button>
      </div>
    </motion.div>
  );
}

export default EmergencyHelpline;
