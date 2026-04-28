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

export default function App() {
  const [student, setStudent] = useState(JSON.parse(localStorage.getItem('studentUser')));
  // State to track mobile menu
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <Router>
      <div style={{ minHeight: '100vh', background: COLORS.bg, color: COLORS.text, fontFamily: "'Inter', sans-serif" }}>
        <Navbar student={student} setStudent={setStudent} isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
        <main style={{ minHeight: 'calc(100vh - 180px)', width: '100%', overflowX: 'hidden' }}>
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

// --- NAVBAR (Updated for Responsiveness) ---
const Navbar = ({ student, setStudent, isMenuOpen, setIsMenuOpen }) => (
  <nav style={navStyle}>
    <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
      <div style={logoIconStyle}>ॐ</div>
      <h2 style={logoTextStyle}>SAIRAM <span style={{color: COLORS.gold}}>TUTORIALS</span></h2>
    </Link>
    
    {/* Hamburger for Mobile */}
    <div style={hamburgerStyle} onClick={() => setIsMenuOpen(!isMenuOpen)}>☰</div>

    <div style={{ ...navLinksWrapper, display: window.innerWidth < 768 && !isMenuOpen ? 'none' : 'flex' }}>
      <Link to="/" style={navLinkStyle} onClick={() => setIsMenuOpen(false)}>Home</Link>
      <Link to="/student" style={{ ...navLinkStyle, color: COLORS.gold }} onClick={() => setIsMenuOpen(false)}>Student Portal</Link>
      <Link to="/admin-portal" style={staffBtnStyle} onClick={() => setIsMenuOpen(false)}>STAFF ACCESS</Link>
      {student && <button onClick={() => { localStorage.clear(); window.location.href="/"; }} style={logoutBtnStyle}>Logout</button>}
    </div>
  </nav>
);

// --- HOME PAGE (Updated for Responsiveness) ---
const HomePage = () => {
  return (
    <div style={{ width: '100%' }}>
      <section style={heroSectionStyle}>
        <div style={heroContentStyle}>
          <h1 style={heroTitleStyle}>
            EMPOWERING <span style={{ color: COLORS.gold }}>MINDS</span>,<br /> 
            ENHANCING <span style={{ color: COLORS.gold }}>FUTURES</span>.
          </h1>
          <p style={heroSubTitleStyle}>
            High-quality coaching tailored for academic excellence.
          </p>
          <Link to="/student" style={{ textDecoration: 'none' }}>
            <button style={{ ...btnStyle, maxWidth: '280px' }}>GET STARTED NOW</button>
          </Link>
        </div>
      </section>

      <section style={{ padding: '40px 5%', background: COLORS.white }}>
        <div style={infoGridStyle}>
          <div style={infoCardStyle}>
            <h3 style={cardTitleStyle}>🕒 Regular Batches</h3>
            <p><strong>B1:</strong> 04:00 PM — 06:00 PM</p>
            <p><strong>B2:</strong> 06:00 PM — 08:00 PM</p>
          </div>
          <div style={infoCardStyle}>
            <h3 style={cardTitleStyle}>📖 CBSE/ICSE</h3>
            <p><strong>Morning:</strong> 06:00 AM — 08:00 AM</p>
            <p><strong>Sunday:</strong> 10:00 AM — 12:00 PM</p>
          </div>
          <div style={infoCardStyle}>
            <h3 style={cardTitleStyle}>📞 Contact</h3>
            <p>📱 9380056143 / 9380395713</p>
            <a href="#" style={{ color: COLORS.gold, textDecoration: 'none', fontWeight: 'bold' }}>📍 LOCATION →</a>
          </div>
        </div>
      </section>

      {/* FOUNDER SECTION */}
      <section style={sectionWrapper}>
        <div style={founderGrid}>
          <div style={founderImageWrapper}>
            <img src={founderPortrait} alt="Founder" style={founderImage} />
            <div style={experienceBadge}>Founder & Director</div>
          </div>
          <div style={founderText}>
            <h2 style={{ fontSize: '2rem', color: COLORS.navy }}>Guiding the Next Generation</h2>
            <p style={{ lineHeight: '1.6', color: '#475569' }}>
              "We prepare students for life by building strong conceptual foundations."
            </p>
            <h3 style={{ margin: 0 }}>Mrs. K PUSHPALATHA</h3>
            <p style={{ color: COLORS.gold, fontWeight: 'bold' }}>30+ Years Experience</p>
          </div>
        </div>
      </section>
    </div>
  );
};

// --- DASHBOARD (Updated for Responsiveness) ---
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
      axios.get(`https://sairam-server.onrender.com/api/files/${activeTab}`)
        .then(res => setFiles(res.data))
        .catch(() => setFiles([]));
      setSelectedCategory(null);
    }
  }, [activeTab]);

  return (
    <div style={dashboardWrapper}>
      <div style={sidebarStyle}>
        {menuItems.map((item) => (
          <div key={item.name} onClick={() => setActiveTab(item.name)} style={{ 
            padding: '12px 20px', cursor: 'pointer',
            background: activeTab === item.name ? 'rgba(251, 191, 36, 0.2)' : 'transparent',
            color: activeTab === item.name ? COLORS.gold : '#cbd5e1',
            borderRadius: '8px', marginBottom: '5px'
          }}>
            {item.icon} {item.name}
          </div>
        ))}
      </div>

      <div style={{ flex: 1, padding: '20px' }}>
        <h2 style={{color: COLORS.navy}}>{activeTab}</h2>
        {activeTab === 'Home' ? (
          <div style={profileCardStyle}>
            <h3>{student.name}</h3>
            <p>Mobile: {student.mobile}</p>
            <p>Email: {student.email}</p>
          </div>
        ) : (
          <div style={fileGridStyle}>
             {/* Subject logic here */}
             <p>Select category to view files.</p>
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
  const [pending, setPending] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleAction = async () => {
    setIsProcessing(true);
    try {
      if (isLogin) {
        const res = await axios.post('https://sairam-server.onrender.com/api/login', { mobile: form.mobile, password: form.password });
        setStudent(res.data.student);
        localStorage.setItem('studentUser', JSON.stringify(res.data.student));
      } else if (!otpSent) {
        await axios.post('https://sairam-server.onrender.com/api/register', form);
        setOtpSent(true);
      } else {
        await axios.post('https://sairam-server.onrender.com/api/verify-registration', form);
        setPending(true);
      }
    } catch (err) { alert(err.response?.data?.error || "Error"); }
    finally { setIsProcessing(false); }
  };

  if (pending) return <div style={cardStyle}><h2>Success</h2><p>Waiting for admin approval.</p></div>;

  return (
    <div style={cardStyle}>
      <h2 style={{color: COLORS.navy}}>{isLogin ? 'Login' : 'Register'}</h2>
      {!isLogin && <input style={inputStyle} placeholder="Name" onChange={e => setForm({...form, name: e.target.value})} />}
      <input style={inputStyle} placeholder="Mobile" onChange={e => setForm({...form, mobile: e.target.value})} />
      <input type="password" style={inputStyle} placeholder="Password" onChange={e => setForm({...form, password: e.target.value})} />
      <button disabled={isProcessing} style={btnStyle} onClick={handleAction}>
        {isProcessing ? 'Wait...' : (isLogin ? 'LOG IN' : 'REGISTER')}
      </button>
      <p onClick={() => setIsLogin(!isLogin)} style={{ cursor: 'pointer', color: COLORS.gold, marginTop: '15px' }}>
        {isLogin ? "Create Account" : "Back to Login"}
      </p>
    </div>
  );
};

// --- ADMIN PANEL (Fixed Remove Button) ---
const AdminPanel = () => {
  const [key, setKey] = useState('');
  const [authed, setAuthed] = useState(false);
  const [students, setStudents] = useState([]);

  const fetchData = async () => {
    const res = await axios.get('https://sairam-server.onrender.com/api/admin/pending');
    setStudents(res.data);
  };

  const handleRemove = async (mobile) => {
    if(window.confirm("Remove this student permanently?")) {
        try {
            await axios.delete(`https://sairam-server.onrender.com/api/admin/delete-student/${mobile}`);
            alert("Student Removed");
            fetchData();
        } catch { alert("Failed to remove"); }
    }
  };

  if (!authed) return (
    <div style={cardStyle}>
      <input type="password" style={inputStyle} placeholder="Key" onChange={e => setKey(e.target.value)} />
      <button style={btnStyle} onClick={() => key === '1977' ? (setAuthed(true), fetchData()) : alert("Wrong")}>Login</button>
    </div>
  );

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h2>Manage Students</h2>
      {students.map(s => (
        <div key={s.mobile} style={adminRowStyle}>
          <span>{s.name} ({s.mobile})</span>
          <div style={{display:'flex', gap:'5px'}}>
            {!s.isApproved && <button onClick={async () => { await axios.post('https://sairam-server.onrender.com/api/admin/approve', {mobile: s.mobile}); fetchData(); }} style={approveBtnStyle}>Approve</button>}
            <button onClick={() => handleRemove(s.mobile)} style={rejectBtnStyle}>Remove</button>
          </div>
        </div>
      ))}
    </div>
  );
};

// --- FOOTER ---
const Footer = () => ( <footer style={{ textAlign: 'center', padding: '20px', background: COLORS.navy, color: 'white' }}>© 2026 Sai Ram Tutorials</footer> );

// --- RESPONSIVE STYLES (NEW) ---
const navStyle = {
    background: COLORS.navy, 
    padding: '0 5%', 
    height: '80px', 
    display: 'flex', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    position: 'sticky', 
    top: 0, 
    zIndex: 1000
};

const logoTextStyle = { color: 'white', margin: 0, fontSize: window.innerWidth < 600 ? '1rem' : '1.4rem' };
const logoIconStyle = { background: COLORS.gold, color: COLORS.navy, width: '35px', height: '35px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '8px', fontWeight: '900' };
const hamburgerStyle = { color: COLORS.gold, fontSize: '1.8rem', display: window.innerWidth < 768 ? 'block' : 'none', cursor: 'pointer' };

const navLinksWrapper = {
    gap: '20px',
    alignItems: 'center',
    flexDirection: window.innerWidth < 768 ? 'column' : 'row',
    position: window.innerWidth < 768 ? 'absolute' : 'static',
    top: '80px',
    left: 0,
    width: window.innerWidth < 768 ? '100%' : 'auto',
    background: COLORS.navy,
    padding: window.innerWidth < 768 ? '20px' : '0'
};

const heroSectionStyle = {
    background: `linear-gradient(rgba(15,23,42,0.8), rgba(15,23,42,0.8)), url('https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=800')`,
    backgroundSize: 'cover', padding: '80px 5%', textAlign: 'center', color: 'white', minHeight: '50vh', display: 'flex', alignItems: 'center', justifyContent: 'center'
};

const heroTitleStyle = { fontSize: window.innerWidth < 600 ? '2rem' : '3.5rem', fontWeight: '800' };
const heroSubTitleStyle = { fontSize: '1.1rem', margin: '20px 0', color: '#cbd5e1' };

const infoGridStyle = { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' };
const infoCardStyle = { background: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 4px 10px rgba(0,0,0,0.1)', borderTop: `4px solid ${COLORS.gold}` };

const dashboardWrapper = { display: 'flex', flexDirection: window.innerWidth < 768 ? 'column' : 'row', minHeight: '80vh' };
const sidebarStyle = { width: window.innerWidth < 768 ? '100%' : '260px', background: COLORS.navy, padding: '20px', color: 'white' };

// Re-using your existing base styles
const navLinkStyle = { color: 'white', textDecoration: 'none', fontWeight: '500' };
const staffBtnStyle = { background: 'rgba(251,191,36,0.1)', color: COLORS.gold, border: `1px solid ${COLORS.gold}`, padding: '8px 15px', borderRadius: '8px', textDecoration: 'none' };
const logoutBtnStyle = { background: COLORS.red, color: 'white', border: 'none', padding: '8px 15px', borderRadius: '8px', cursor: 'pointer' };
const cardStyle = { maxWidth: '350px', margin: '50px auto', background: 'white', padding: '30px', borderRadius: '15px', boxShadow: '0 10px 20px rgba(0,0,0,0.1)', textAlign: 'center' };
const inputStyle = { width: '100%', padding: '12px', margin: '8px 0', borderRadius: '8px', border: '1px solid #ddd', boxSizing: 'border-box' };
const btnStyle = { width: '100%', padding: '12px', background: COLORS.navy, color: COLORS.gold, border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' };
const adminRowStyle = { background: 'white', padding: '12px', display: 'flex', justifyContent: 'space-between', marginBottom: '8px', borderRadius: '8px', border: '1px solid #eee', alignItems: 'center' };
const approveBtnStyle = { background: COLORS.green, color: 'white', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer' };
const rejectBtnStyle = { background: COLORS.red, color: 'white', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer' };
const profileCardStyle = { background: 'white', padding: '20px', borderRadius: '12px', border: '1px solid #eee' };
const fileGridStyle = { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' };
const cardTitleStyle = { margin: '0 0 10px 0', color: COLORS.navy };
const sectionWrapper = { padding: '40px 5%' };
const founderGrid = { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px', alignItems: 'center' };
const founderImageWrapper = { position: 'relative' };
const founderImage = { width: '100%', borderRadius: '15px', boxShadow: '10px 10px 0 #fbbf24' };
const experienceBadge = { position: 'absolute', bottom: '-10px', right: '10px', background: COLORS.navy, color: COLORS.gold, padding: '8px 15px', borderRadius: '5px', fontSize: '0.8rem' };
const founderText = { padding: '10px' };