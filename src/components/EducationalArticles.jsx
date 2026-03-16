import { motion } from 'framer-motion';
import { BookOpen, ExternalLink } from 'lucide-react';

const ARTICLES = [
  { title: "Understanding Anxiety", desc: "Learn the common triggers and how your body responds to anxiety.", category: "Mental Health 101", color: "var(--primary)" },
  { title: "The Power of Mindfulness", desc: "Discover how staying present can significantly reduce daily stress.", category: "Techniques", color: "var(--accent)" },
  { title: "Sleep Hygiene Tips", desc: "Why getting 8 hours of sleep is crucial for emotional regulation.", category: "Wellness", color: "var(--mood-good)" },
  { title: "How to Ask for Help", desc: "Breaking the stigma and taking the first step towards getting support.", category: "Support", color: "var(--secondary)" }
];

function EducationalArticles() {
  return (
    <motion.div 
      style={{ maxWidth: '1000px', margin: '0 auto', paddingBottom: '40px' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="glass-panel" style={{ padding: '40px', textAlign: 'center', marginBottom: '30px', borderRadius: '20px' }}>
        <BookOpen size={48} color="var(--accent)" style={{ marginBottom: '20px' }} />
        <h2 style={{ color: 'var(--primary)', marginBottom: '15px' }}>Educational Hub</h2>
        <p style={{ color: 'var(--text-muted)' }}>Expand your knowledge on mental wellness and self-care techniques.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
        {ARTICLES.map((article, idx) => (
          <motion.div 
            key={idx}
            className="glass-panel"
            whileHover={{ y: -5 }}
            style={{ padding: '25px', borderRadius: '16px', position: 'relative', overflow: 'hidden' }}
          >
            <div style={{ position: 'absolute', top: 0, left: 0, width: '4px', height: '100%', backgroundColor: article.color }} />
            <span style={{ fontSize: '0.8rem', fontWeight: 600, color: article.color, textTransform: 'uppercase', letterSpacing: '1px' }}>
              {article.category}
            </span>
            <h3 style={{ margin: '10px 0', fontSize: '1.2rem' }}>{article.title}</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.5, marginBottom: '20px' }}>
              {article.desc}
            </p>
            <button className="btn" style={{ background: 'rgba(0,0,0,0.05)', color: 'var(--text-main)', padding: '8px 15px', fontSize: '0.9rem' }}>
              Read More <ExternalLink size={16} />
            </button>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export default EducationalArticles;
