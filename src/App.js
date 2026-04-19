import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import axios from 'axios';
import founderPortrait from './founder.jpeg'; 
import TUTORIALPortrait from './TUTORIAL.jpeg';
import POSTERPortrait from './POSTER.jpeg';
import SKILLSPortrait from './SKILLS.png';

// --- PROFESSIONAL COLOR PALETTE ---
const COLORS = { 
    navy: '#0f172a', 
    gold: '#fbbf24', 
    white: '#ffffff', 
    bg: '#f8fafc', 
    red: '#ef4444', 
    green: '#10b981', 
    text: '#1e293b', 
    glass: 'rgba(255, 255, 255, 0.8)'
};

// API BASE URL
const API_URL = "https://sairam-server.onrender.com";

export default function App() {
  const [student, setStudent] = useState(JSON.parse(localStorage.getItem('studentUser')));

  return (
    <Router>
      <div style={{ minHeight: '100vh', background: COLORS.bg, color: COLORS.text, fontFamily: "'Inter', sans-serif" }}>
        <Navbar student={student} setStudent={setStudent} />
        <main style={{ minHeight: 'calc(100vh - 180px)' }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/student" element={student ? <Navigate to="/dashboard" /> : <AuthPage setStudent={setStudent} />} />
            <Route path="/dashboard" element={student ? <Dashboard student={student} /> : <Navigate to="/student" />} />
            <Route path="/admin-portal" element={<AdminPanel />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

// --- NAVBAR ---
const Navbar = ({ student, setStudent }) => (
  <nav style={{ background: COLORS.navy, padding: '0 40px', height: '80px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, zIndex: 1000, boxShadow: '0 4px 20px rgba(0,0,0,0.15)' }}>
    <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none' }}>
      <div style={{ background: `linear-gradient(135deg, ${COLORS.gold}, #f59e0b)`, color: COLORS.navy, width: '45px', height: '45px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '12px', fontWeight: '900', fontSize: '1.4rem' }}>ॐ</div>
      <h2 style={{ margin: 0, color: 'white', letterSpacing: '1px', fontSize: '1.4rem' }}>SAIRAM <span style={{color: COLORS.gold}}>TUTORIALS</span></h2>
    </Link>
    <div style={{ display: 'flex', gap: '30px', alignItems: 'center' }}>
      <Link to="/" style={navLinkStyle}>Home</Link>
      <Link to="/student" style={{ ...navLinkStyle, color: COLORS.gold }}>Student Portal</Link>
      <Link to="/admin-portal" style={staffBtnStyle}>STAFF ACCESS</Link>
      {student && <button onClick={() => { localStorage.clear(); window.location.href="/"; }} style={logoutBtnStyle}>Logout</button>}
    </div>
  </nav>
);

// --- HOME PAGE ---
const HomePage = () => {
  return (
    <div style={{ width: '100%' }}>
      <section style={heroSectionStyle}>
        <div style={heroContentStyle}>
          <h1 style={{ fontSize: '3.8rem', fontWeight: '800', margin: '0', lineHeight: '1.1' }}>
            EMPOWERING <span style={{ color: COLORS.gold }}>MINDS</span>,<br /> 
            ENHANCING <span style={{ color: COLORS.gold }}>FUTURES</span>.
          </h1>
          <p style={{ fontSize: '1.2rem', color: '#cbd5e1', margin: '25px 0', maxWidth: '600px' }}>
            High-quality coaching tailored for academic excellence. Access premium resources at Sai Ram Tutorials.
          </p>
          <Link to="/student" style={{ textDecoration: 'none' }}>
            <button style={{ ...btnStyle, width: '220px', padding: '18px', fontSize: '1.1rem' }}>GET STARTED NOW</button>
          </Link>
        </div>
      </section>

      <section style={{ padding: '60px 8%', background: COLORS.white }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
          <div style={infoCardStyle}>
            <h3 style={{ color: COLORS.navy, borderBottom: `2px solid ${COLORS.gold}`, paddingBottom: '10px' }}>🕒 Regular Batches</h3>
            <p><strong>Batch 01:</strong> 04:00 PM — 06:00 PM</p>
            <p><strong>Batch 02:</strong> 06:00 PM — 08:00 PM</p>
          </div>
          <div style={infoCardStyle}>
            <h3 style={{ color: COLORS.navy, borderBottom: `2px solid ${COLORS.gold}`, paddingBottom: '10px' }}>📞 Contact</h3>
            <p>📱 9380056143 / 9380395713</p>
            <p>📍 Bengaluru, Karnataka</p>
          </div>
        </div>
      </section>

      <section style={sectionWrapper}>
        <div style={founderGrid}>
          <div style={founderImageWrapper}>
            <img src={founderPortrait} alt="Founder" style={founderImage} />
            <div style={experienceBadge}>Founder & Director</div>
          </div>
          <div style={founderText}>
            <h4 style={{ color: COLORS.gold, letterSpacing: '2px' }}>A VISION FOR SUCCESS</h4>
            <h2 style={{ fontSize: '2.5rem', color: COLORS.navy }}>Guiding the Next Generation</h2>
            <p style={{ lineHeight: '1.8', color: '#475569' }}>"We prepare students for life by building strong conceptual foundations."</p>
            <h3>Mrs. K PUSHPALATHA</h3>
            <p style={{ color: COLORS.gold, fontWeight: 'bold' }}>30+ Years Experience</p>
          </div>
        </div>
      </section>
    </div>
  );
};

// --- DASHBOARD ---
const Dashboard = ({ student }) => {
  const [activeTab, setActiveTab] = useState('Home');
  const [files, setFiles] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const menuItems = [
    { name: 'Home', icon: '🏠' },
    { name: 'Mathematics (Standard)', icon: '📐' },
    { name: 'Mathematics (Basic)', icon: '📝' },
    { name: 'Science', icon: '🧬' },
    { name: 'Social Science', icon: '🌍' },
    { name: 'English', icon: '📖' },
  ];

  useEffect(() => {
    if (activeTab !== 'Home') {
      axios.get(`${API_URL}/api/files/${activeTab}`)
        .then(res => setFiles(res.data))
        .catch(() => setFiles([]));
      setSelectedCategory(null);
    }
  }, [activeTab]);

  const handleDownload = async (fileName) => {
    try {
      const link = document.createElement('a');
      link.href = `${API_URL}/uploads/${activeTab}/${fileName}`;
      link.setAttribute('target', '_blank');
      link.click();
    } catch (error) {
      alert("Download failed.");
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: 'calc(100vh - 80px)' }}>
      <div style={{ width: '300px', background: COLORS.navy, color: 'white', padding: '30px 0' }}>
        <div style={{ padding: '0 25px 20px 25px', borderBottom: '1px solid rgba(255,255,255,0.1)', marginBottom: '20px' }}>
          <h3 style={{ margin: '5px 0' }}>{student.name}</h3>
        </div>
        {menuItems.map((item) => (
          <div key={item.name} onClick={() => setActiveTab(item.name)} style={{ 
            padding: '16px 25px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '15px',
            background: activeTab === item.name ? 'rgba(251, 191, 36, 0.15)' : 'transparent',
            color: activeTab === item.name ? COLORS.gold : '#cbd5e1'
          }}>
            <span>{item.icon}</span> <span>{item.name}</span>
          </div>
        ))}
      </div>

      <div style={{ flex: 1, padding: '40px' }}>
        <h1 style={{ color: COLORS.navy }}>{activeTab}</h1>
        {activeTab === 'Home' ? (
          <div style={profileCardStyle}>
            <h4 style={{color: COLORS.gold}}>STUDENT PROFILE</h4>
            <div style={profileLine}><strong>Mobile:</strong> {student.mobile}</div>
            <div style={profileLine}><strong>Email:</strong> {student.email}</div>
          </div>
        ) : !selectedCategory ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
            <div style={subjectCard}>📄 Sample Papers <button onClick={() => setSelectedCategory('SamplePaper')} style={actionBtn}>Open</button></div>
            <div style={subjectCard}>🔍 Case Study <button onClick={() => setSelectedCategory('CaseStudy')} style={actionBtn}>Open</button></div>
          </div>
        ) : (
          <div>
            <button onClick={() => setSelectedCategory(null)} style={{marginBottom: '20px', cursor: 'pointer'}}>← Back</button>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {files.filter(f => f.category === selectedCategory).map((file, idx) => (
                <div key={idx} style={adminRowStyle}>
                  <span>{file.name}</span>
                  <button onClick={() => handleDownload(file.name)} style={downloadBtnStyle}>DOWNLOAD</button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// --- AUTH PAGE ---
const AuthPage = ({ setStudent }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ name: '', mobile: '', email: '', password: '', otp: '' });
  const [otpSent, setOtpSent] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleAction = async () => {
    setIsProcessing(true);
    try {
      if (isLogin) {
        const res = await axios.post(`${API_URL}/api/login`, { mobile: form.mobile, password: form.password });
        setStudent(res.data.student);
        localStorage.setItem('studentUser', JSON.stringify(res.data.student));
      } else if (!otpSent) {
        await axios.post(`${API_URL}/api/register`, form);
        setOtpSent(true);
        alert("OTP Sent to Email");
      } else {
        await axios.post(`${API_URL}/api/verify-registration`, form);
        alert("Registered! Wait for Admin Approval.");
        setIsLogin(true);
      }
    } catch (err) { alert(err.response?.data?.error || "Error"); }
    finally { setIsProcessing(false); }
  };

  return (
    <div style={cardStyle}>
      <h2 style={{color: COLORS.navy}}>{isLogin ? 'Login' : 'Register'}</h2>
      {!isLogin && <input style={inputStyle} placeholder="Full Name" onChange={e => setForm({...form, name: e.target.value})} />}
      <input style={inputStyle} placeholder="Mobile" onChange={e => setForm({...form, mobile: e.target.value})} />
      {!isLogin && <input style={inputStyle} placeholder="Email" onChange={e => setForm({...form, email: e.target.value})} />}
      <input type="password" style={inputStyle} placeholder="Password" onChange={e => setForm({...form, password: e.target.value})} />
      {otpSent && <input style={inputStyle} placeholder="OTP" onChange={e => setForm({...form, otp: e.target.value})} />}
      <button disabled={isProcessing} style={btnStyle} onClick={handleAction}>{isProcessing ? 'Processing...' : (isLogin ? 'LOG IN' : (otpSent ? 'VERIFY' : 'SEND OTP'))}</button>
      <p onClick={() => setIsLogin(!isLogin)} style={{ cursor: 'pointer', color: COLORS.gold, marginTop: '20px' }}>{isLogin ? "New? Register" : "Have account? Login"}</p>
    </div>
  );
};

// --- ADMIN PANEL ---
const AdminPanel = () => {
  const [key, setKey] = useState('');
  const [authed, setAuthed] = useState(false);
  const [students, setStudents] = useState([]);
  const [file, setFile] = useState(null);
  const [subject, setSubject] = useState('Science');
  const [category, setCategory] = useState('SamplePaper');

  const fetchData = async () => {
    const res = await axios.get(`${API_URL}/api/admin/pending`);
    setStudents(res.data);
  };

  const handleUpload = async () => {
    if(!file) return alert("Select PDF");
    const formData = new FormData();
    formData.append('subject', subject);
    formData.append('category', category);
    formData.append('file', file); 
    try {
      await axios.post(`${API_URL}/api/admin/upload`, formData);
      alert("Uploaded!");
      setFile(null);
    } catch (err) { alert("Upload Failed"); }
  };

  if (!authed) return (
    <div style={cardStyle}>
      <input type="password" style={inputStyle} placeholder="Admin Key" onChange={e => setKey(e.target.value)} />
      <button style={btnStyle} onClick={() => key === '1977' ? (setAuthed(true), fetchData()) : alert("Wrong Key")}>Unlock</button>
    </div>
  );

  return (
    <div style={{ padding: '40px' }}>
      <h2>Admin Panel</h2>
      {students.map(s => (
        <div key={s.mobile} style={adminRowStyle}>
          <span>{s.name} ({s.mobile})</span>
          {!s.isApproved && <button onClick={async () => { await axios.post(`${API_URL}/api/admin/approve`, {mobile: s.mobile}); fetchData(); }} style={approveBtnStyle}>Approve</button>}
        </div>
      ))}
      <div style={{ marginTop: '40px', background: 'white', padding: '20px', borderRadius: '15px' }}>
        <h3>Upload Material</h3>
        <select style={inputStyle} onChange={e => setSubject(e.target.value)}>
          <option>Science</option>
          <option>Mathematics (Standard)</option>
          <option>English</option>
        </select>
        <input type="file" style={inputStyle} onChange={e => setFile(e.target.files[0])} />
        <button onClick={handleUpload} style={btnStyle}>UPLOAD</button>
      </div>
    </div>
  );
};

// --- STYLES (Kept from original) ---
const heroSectionStyle = { background: `linear-gradient(rgba(15,23,42,0.9), rgba(15,23,42,0.6)), url('https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=1200')`, backgroundSize: 'cover', padding: '100px 8%', color: 'white', minHeight: '60vh', display: 'flex', alignItems: 'center' };
const heroContentStyle = { maxWidth: '800px' };
const sectionWrapper = { padding: '80px 8%' };
const founderGrid = { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px', alignItems: 'center' };
const founderImageWrapper = { position: 'relative' };
const founderImage = { width: '100%', borderRadius: '20px' };
const experienceBadge = { position: 'absolute', bottom: '10px', right: '10px', background: COLORS.navy, color: COLORS.gold, padding: '10px', borderRadius: '5px' };
const founderText = { padding: '20px' };
const navLinkStyle = { color: 'white', textDecoration: 'none' };
const staffBtnStyle = { border: `1px solid ${COLORS.gold}`, color: COLORS.gold, padding: '8px 15px', borderRadius: '5px', textDecoration: 'none' };
const logoutBtnStyle = { background: COLORS.red, color: 'white', border: 'none', padding: '8px 15px', borderRadius: '5px', cursor: 'pointer' };
const cardStyle = { maxWidth: '400px', margin: '80px auto', background: 'white', padding: '40px', borderRadius: '20px', textAlign: 'center', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' };
const inputStyle = { width: '100%', padding: '12px', margin: '10px 0', borderRadius: '8px', border: '1px solid #ddd' };
const btnStyle = { width: '100%', padding: '14px', background: COLORS.navy, color: COLORS.gold, border: 'none', borderRadius: '8px', cursor: 'pointer' };
const adminRowStyle = { background: 'white', padding: '15px', display: 'flex', justifyContent: 'space-between', marginBottom: '10px', borderRadius: '10px' };
const approveBtnStyle = { background: COLORS.green, color: 'white', border: 'none', padding: '5px 10px', borderRadius: '5px' };
const profileCardStyle = { background: 'white', padding: '30px', borderRadius: '15px', textAlign: 'left' };
const profileLine = { padding: '10px 0', borderBottom: '1px solid #eee' };
const subjectCard = { background: 'white', padding: '20px', borderRadius: '10px', textAlign: 'center' };
const actionBtn = { background: COLORS.navy, color: COLORS.gold, border: 'none', padding: '8px 15px', borderRadius: '5px', marginTop: '10px' };
const downloadBtnStyle = { background: COLORS.green, color: 'white', border: 'none', padding: '8px 15px', borderRadius: '5px' };
const Footer = () => ( <footer style={{ textAlign: 'center', padding: '30px', background: COLORS.navy, color: 'white' }}>© 2026 Sai Ram Tutorials</footer> );
