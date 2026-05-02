import React, { useState, useEffect, useCallback } from 'react';
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

axios.defaults.headers.post['Content-Type'] = 'application/json';

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
const HomePage = () => (
    <div style={{ width: '100%' }}>
      <section style={heroSectionStyle}>
        <div style={heroContentStyle}>
          <h1 style={{ fontSize: '3.8rem', fontWeight: '800', margin: '0', lineHeight: '1.1' }}>
            EMPOWERING <span style={{ color: COLORS.gold }}>MINDS</span>,<br /> 
            ENHANCING <span style={{ color: COLORS.gold }}>FUTURES</span>.
          </h1>
          <p style={{ fontSize: '1.2rem', color: '#cbd5e1', margin: '25px 0', maxWidth: '600px' }}>
            High-quality coaching tailored for academic excellence. Access premium resources for Mathematics, Science, and Humanities at Sai Ram Tutorials.
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
            <p><strong>SUNDAY:</strong> 10:00 AM — 12:00 PM</p>
          </div>
          <div style={infoCardStyle}>
            <h3 style={{ color: COLORS.navy, borderBottom: `2px solid ${COLORS.gold}`, paddingBottom: '10px' }}>📖 CBSE/ICSE </h3>
            <p><strong>Morning:</strong> 06:00 AM — 08:00 AM</p>
            <p><strong>Evening:</strong> 06:00 PM — 08:00 PM</p>
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
            <h4 style={{ color: COLORS.gold, letterSpacing: '2px', margin: '0' }}>A VISION FOR SUCCESS</h4>
            <h2 style={{ fontSize: '2.5rem', color: COLORS.navy, marginTop: '10px' }}>Guiding the Next Generation</h2>
            <p style={{ lineHeight: '1.8', color: '#475569' }}>
              "Our mission at Sai Ram Tutorials is to simplify complex concepts and ignite a passion for learning."
            </p>
            <h3 style={{ margin: 0, color: COLORS.navy }}>Mrs. K PUSHPALATHA</h3>
            <p style={{ color: COLORS.gold, fontWeight: 'bold' }}> 30+ Years Experience</p>
          </div>
        </div>
      </section>
    </div>
);

// --- DASHBOARD ---
const Dashboard = ({ student }) => {
  const [activeTab, setActiveTab] = useState('Home');
  const [files, setFiles] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    if (activeTab !== 'Home') {
      axios.get(`https://sairam-server.onrender.com/api/files/${activeTab}`)
        .then(res => setFiles(res.data))
        .catch(() => setFiles([]));
      setSelectedCategory(null);
    }
  }, [activeTab]);

  const handleDownload = async (fileName) => {
    try {
      const fileUrl = `https://sairam-server.onrender.com/uploads/${activeTab}/${fileName}`;
      const response = await fetch(fileUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', fileName.split('-').slice(2).join('-') || fileName); 
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) { alert("Download failed."); }
  };

  const menuItems = [
    { name: 'Home', icon: '🏠' },
    { name: 'Mathematics (Standard)', icon: '📐' },
    { name: 'Mathematics (Basic)', icon: '📝' },
    { name: 'Science', icon: '🧬' },
    { name: 'Social Science', icon: '🌍' },
    { name: 'English', icon: '📖' },
    { name: 'English Grammar', icon: '✍️' },
  ];

  return (
    <div style={{ display: 'flex', minHeight: 'calc(100vh - 80px)' }}>
      <div style={{ width: '300px', background: COLORS.navy, color: 'white', padding: '30px 0' }}>
        <div style={{ padding: '0 25px 20px', borderBottom: '1px solid rgba(255,255,255,0.1)', marginBottom: '20px' }}>
          <small style={{ color: COLORS.gold }}>ACADEMIC SESSION 2026</small>
          <h3>{student.name}</h3>
        </div>
        {menuItems.map((item) => (
          <div key={item.name} onClick={() => setActiveTab(item.name)} style={{ 
            padding: '16px 25px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '15px',
            background: activeTab === item.name ? 'rgba(251, 191, 36, 0.15)' : 'transparent',
            color: activeTab === item.name ? COLORS.gold : '#cbd5e1'
          }}>
            <span>{item.icon}</span><span>{item.name}</span>
          </div>
        ))}
      </div>

      <div style={{ flex: 1, padding: '40px' }}>
        <h1>{activeTab}</h1>
        {activeTab === 'Home' ? (
           <div style={profileCardStyle}>
             <h4 style={{color: COLORS.gold}}>STUDENT PROFILE</h4>
             <div style={profileLine}><strong>Mobile:</strong> {student.mobile}</div>
             <div style={profileLine}><strong>Email:</strong> {student.email}</div>
           </div> 
        ) : !selectedCategory ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
            {['SamplePaper', 'CaseStudy', 'Logic', 'FormulaSheet'].map(cat => (
               <div key={cat} style={subjectCard}>
                 <div>{cat}</div>
                 <button onClick={() => setSelectedCategory(cat)} style={actionBtn}>Open</button>
               </div>
            ))}
          </div>
        ) : (
          <div>
            <button onClick={() => setSelectedCategory(null)} style={{marginBottom: '20px'}}>← Back</button>
            {files.filter(f => f.category === selectedCategory).map((file, idx) => (
                <div key={idx} style={adminRowStyle}>
                  <span>{file.name}</span>
                  <button onClick={() => handleDownload(file.name)} style={downloadBtnStyle}>Download</button>
                </div>
            ))}
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
    const config = { headers: { 'Content-Type': 'application/json' } };
    try {
      if (isLogin) {
        const res = await axios.post('https://sairam-server.onrender.com/api/login', { mobile: form.mobile, password: form.password }, config);
        setStudent(res.data.student);
        localStorage.setItem('studentUser', JSON.stringify(res.data.student));
      } else if (!otpSent) {
        await axios.post('https://sairam-server.onrender.com/api/register', { username: form.name, email: form.email, password: form.password, mobile: form.mobile }, config);
        setOtpSent(true);
      } else {
        await axios.post('https://sairam-server.onrender.com/api/verify', { email: form.email, otp: form.otp }, config);
        alert("Verification Successful! Wait for Admin Approval.");
        window.location.reload();
      }
    } catch (err) { alert(err.response?.data?.message || "Error occurred"); }
    finally { setIsProcessing(false); }
  };

  return (
    <div style={cardStyle}>
      <h2>{isLogin ? 'Welcome Back' : 'Create Account'}</h2>
      {!isLogin && <input style={inputStyle} placeholder="Full Name" onChange={e => setForm({...form, name: e.target.value})} />}
      <input style={inputStyle} placeholder="Mobile" onChange={e => setForm({...form, mobile: e.target.value})} />
      {!isLogin && <input style={inputStyle} placeholder="Email" onChange={e => setForm({...form, email: e.target.value})} />}
      <input type="password" style={inputStyle} placeholder="Password" onChange={e => setForm({...form, password: e.target.value})} />
      {!isLogin && otpSent && <input style={inputStyle} placeholder="Enter OTP" onChange={e => setForm({...form, otp: e.target.value})} />}
      <button disabled={isProcessing} style={btnStyle} onClick={handleAction}>{isProcessing ? 'Wait...' : (isLogin ? 'LOG IN' : (otpSent ? 'COMPLETE' : 'SEND OTP'))}</button>
      <p onClick={() => setIsLogin(!isLogin)} style={{ cursor: 'pointer', color: COLORS.gold, marginTop: '20px' }}>{isLogin ? "NEW USER? REGISTER" : "SIGN IN"}</p>
    </div>
  );
};

// --- ADMIN PANEL (FIXED FOR VERCEL BUILD) ---
const AdminPanel = () => {
  const [key, setKey] = useState('');
  const [authed, setAuthed] = useState(false);
  const [students, setStudents] = useState([]);
  const [fileList, setFileList] = useState([]);
  const [file, setFile] = useState(null);
  const [subject, setSubject] = useState('Science');
  const [category, setCategory] = useState('SamplePaper');

  // Wrapped in useCallback to prevent ESLint Dependency warnings
  const fetchFiles = useCallback(async () => {
    try {
        const res = await axios.get(`https://sairam-server.onrender.com/api/files/${subject}`);
        setFileList(res.data);
    } catch (e) { setFileList([]); }
  }, [subject]);

  const fetchData = useCallback(async () => {
    try {
        const res = await axios.get('https://sairam-server.onrender.com/api/admin/pending');
        setStudents(res.data);
        fetchFiles();
    } catch (err) { console.error(err); }
  }, [fetchFiles]);

  useEffect(() => {
    if (authed) {
        fetchFiles();
    }
  }, [authed, fetchFiles]);

  const handleUpload = async () => {
    if(!file) return alert("Select a PDF");
    const formData = new FormData();
    formData.append('subject', subject);
    formData.append('category', category);
    formData.append('file', file); 
    try {
      await axios.post('https://sairam-server.onrender.com/api/admin/upload', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
      alert("✅ Uploaded!");
      fetchFiles(); 
    } catch (err) { alert("❌ Failed."); }
  };

  if (!authed) return (
    <div style={cardStyle}>
      <h2>Staff Access</h2>
      <input type="password" style={inputStyle} placeholder="Enter Key" onChange={e => setKey(e.target.value)} />
      <button style={btnStyle} onClick={() => key === '1977' ? (setAuthed(true), fetchData()) : alert("Wrong Key")}>Unlock</button>
    </div>
  );

  return (
    <div style={{ padding: '40px', maxWidth: '1000px', margin: '0 auto' }}>
      <h2>Management</h2>
      {students.map(s => (
        <div key={s.mobile} style={adminRowStyle}>
          <span>{s.name} ({s.mobile})</span>
          <button onClick={async () => { await axios.post('https://sairam-server.onrender.com/api/admin/approve', {mobile: s.mobile}); fetchData(); }} style={approveBtnStyle}>Approve</button>
        </div>
      ))}
      <div style={{ marginTop: '50px', background: 'white', padding: '20px', borderRadius: '15px' }}>
        <h3>Upload Material</h3>
        <select style={inputStyle} value={subject} onChange={e => setSubject(e.target.value)}>
           {['Science', 'Mathematics (Standard)', 'Mathematics (Basic)', 'Social Science', 'English', 'English Grammar'].map(s => <option key={s}>{s}</option>)}
        </select>
        <input type="file" style={inputStyle} onChange={e => setFile(e.target.files[0])} />
        <button onClick={handleUpload} style={btnStyle}>UPLOAD</button>
        <div style={{marginTop: '20px'}}>
           {fileList.map(f => <div key={f.name}>{f.name}</div>)}
        </div>
      </div>
    </div>
  );
};

// --- STYLES ---
const Footer = () => ( <footer style={{ textAlign: 'center', padding: '40px', background: COLORS.navy, color: 'white' }}>© 2026 Sai Ram Tutorials</footer> );
const heroSectionStyle = { background: COLORS.navy, padding: '100px 8%', color: 'white', minHeight: '60vh', display: 'flex', alignItems: 'center' };
const heroContentStyle = { maxWidth: '800px' };
const sectionWrapper = { padding: '80px 8%' };
const founderGrid = { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '50px', alignItems: 'center' };
const founderImageWrapper = { position: 'relative' };
const founderImage = { width: '100%', borderRadius: '20px', boxShadow: `15px 15px 0 ${COLORS.gold}` };
const experienceBadge = { position: 'absolute', bottom: '20px', right: '20px', background: COLORS.navy, color: COLORS.gold, padding: '10px', borderRadius: '5px' };
const founderText = { padding: '20px' };
const navLinkStyle = { color: 'white', textDecoration: 'none' };
const staffBtnStyle = { border: `1px solid ${COLORS.gold}`, color: COLORS.gold, padding: '8px 15px', borderRadius: '5px', textDecoration: 'none' };
const logoutBtnStyle = { background: COLORS.red, color: 'white', border: 'none', padding: '8px 15px', borderRadius: '5px' };
const cardStyle = { maxWidth: '400px', margin: '100px auto', background: 'white', padding: '40px', borderRadius: '20px', textAlign: 'center', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' };
const inputStyle = { width: '100%', padding: '12px', margin: '10px 0', borderRadius: '8px', border: '1px solid #ddd' };
const btnStyle = { width: '100%', padding: '12px', background: COLORS.navy, color: COLORS.gold, border: 'none', borderRadius: '8px', cursor: 'pointer' };
const adminRowStyle = { background: 'white', padding: '15px', display: 'flex', justifyContent: 'space-between', marginBottom: '10px', borderRadius: '10px' };
const approveBtnStyle = { background: COLORS.green, color: 'white', border: 'none', padding: '5px 10px', borderRadius: '5px' };
const profileCardStyle = { background: 'white', padding: '20px', borderRadius: '15px', display: 'inline-block' };
const profileLine = { padding: '10px 0', borderBottom: '1px solid #eee' };
const subjectCard = { background: 'white', padding: '20px', borderRadius: '15px', textAlign: 'center' };
const actionBtn = { background: COLORS.navy, color: COLORS.gold, border: 'none', padding: '8px 15px', borderRadius: '5px', marginTop: '10px' };
const downloadBtnStyle = { background: COLORS.green, color: 'white', border: 'none', padding: '8px 15px', borderRadius: '5px' };
const infoCardStyle = { background: 'white', padding: '25px', borderRadius: '15px', boxShadow: '0 5px 15px rgba(0,0,0,0.05)' };