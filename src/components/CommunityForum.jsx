import { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Heart, MessageSquare, Share2 } from 'lucide-react';

const INITIAL_POSTS = [
  { id: 1, author: "Anonymous", time: "2 hours ago", content: "Just wanted to say that it gets better. Three months ago I couldn't get out of bed, and today I went for a 2-mile walk. Small steps matter. 🌻", likes: 24, replies: 5 },
  { id: 2, author: "User_8492", time: "5 hours ago", content: "Does anyone else feel guilty when taking a 'mental health day' of work? How do you cope with that feeling?", likes: 12, replies: 8 },
  { id: 3, author: "MindfulSoul", time: "1 day ago", content: "The guided breathing bubble on this app has genuinely stopped 3 panic attacks for me this week. So grateful.", likes: 56, replies: 2 }
];

function CommunityForum() {
  const [posts, setPosts] = useState(INITIAL_POSTS);
  const [newPost, setNewPost] = useState("");

  const handlePost = (e) => {
    e.preventDefault();
    if (!newPost.trim()) return;
    
    setPosts([{
      id: Date.now(),
      author: "You (Anonymous)",
      time: "Just now",
      content: newPost,
      likes: 0,
      replies: 0
    }, ...posts]);
    setNewPost("");
  };

  const handleLike = (id) => {
    setPosts(posts.map(post => 
      post.id === id ? { ...post, likes: post.likes + 1 } : post
    ));
  };

  return (
    <motion.div 
      style={{ maxWidth: '800px', margin: '0 auto', paddingBottom: '40px' }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="glass-panel" style={{ padding: '30px', borderRadius: '20px', marginBottom: '30px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px' }}>
          <Users size={32} color="var(--primary)" />
          <h2 style={{ margin: 0, color: 'var(--primary)' }}>Community Support</h2>
        </div>
        <p style={{ color: 'var(--text-muted)', marginBottom: '20px' }}>Share your thoughts, ask questions, or just vent. This is a safe, anonymous space.</p>
        
        <form onSubmit={handlePost}>
          <div className="input-group">
            <textarea 
              rows={3} 
              placeholder="What's on your mind? Share anonymously..."
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              style={{ resize: 'vertical' }}
            />
          </div>
          <button type="submit" className="btn btn-primary" style={{ marginTop: '10px' }}>
            Post Message
          </button>
        </form>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {posts.map((post) => (
          <motion.div 
            key={post.id}
            className="glass-panel"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{ padding: '25px', borderRadius: '16px' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
              <span style={{ fontWeight: 600 }}>{post.author}</span>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{post.time}</span>
            </div>
            <p style={{ lineHeight: 1.6, marginBottom: '20px' }}>{post.content}</p>
            
            <div style={{ display: 'flex', gap: '20px', borderTop: '1px solid var(--glass-border)', paddingTop: '15px' }}>
              <button 
                onClick={() => handleLike(post.id)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px', color: 'var(--text-muted)' }}
              >
                <Heart size={18} /> {post.likes}
              </button>
              <button style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px', color: 'var(--text-muted)' }}>
                <MessageSquare size={18} /> {post.replies}
              </button>
              <button style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px', color: 'var(--text-muted)', marginLeft: 'auto' }}>
                <Share2 size={18} /> Share
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export default CommunityForum;
