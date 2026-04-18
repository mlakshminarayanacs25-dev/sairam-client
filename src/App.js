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
      {/* 1. HERO SECTION */}
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

      {/* 2. BATCH & CONTACT INFO SECTION */}
      <section style={{ padding: '60px 8%', background: COLORS.white }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
          <div style={infoCardStyle}>
            <h3 style={{ color: COLORS.navy, borderBottom: `2px solid ${COLORS.gold}`, paddingBottom: '10px' }}>🕒 Regular Batches</h3>
            <p style={{margin: '10px 0'}}><strong>Batch 01:</strong> 04:00 PM — 06:00 PM</p>
            <p style={{margin: '10px 0'}}><strong>Batch 02:</strong> 06:00 PM — 08:00 PM [SSLC-STATE]</p>
            <p style={{margin: '10px 0'}}><strong>SUNDAY:</strong> 10:00 AM — 12:00 PM [SSLC-STATE]</p>
          </div>
          <div style={infoCardStyle}>
            <h3 style={{ color: COLORS.navy, borderBottom: `2px solid ${COLORS.gold}`, paddingBottom: '10px' }}>📖 CBSE/ICSE </h3>
            <p style={{margin: '10px 0'}}><strong>Morning:</strong> 06:00 AM — 08:00 AM</p>
            <p style={{margin: '10px 0'}}><strong>Evening:</strong> 06:00 PM — 08:00 PM</p>
            <p style={{margin: '10px 0'}}><strong>SUNDAY:</strong> 10:00 AM — 12:00 PM</p>
          </div>
          <div style={infoCardStyle}>
            <h3 style={{ color: COLORS.navy, borderBottom: `2px solid ${COLORS.gold}`, paddingBottom: '10px' }}>📞 Contact & Venue</h3>
            <p style={{margin: '10px 0'}}>📱 9380056143 / 9380395713</p>
            <a href="https://maps.app.goo.gl/PqKnAXYgkGCsSDtp9" target="_blank" rel="noreferrer" style={{ color: COLORS.gold, fontWeight: 'bold', textDecoration: 'none', display: 'block', marginTop: '10px' }}>
              📍 CLICK FOR LOCATION →
            </a>
          </div>
        </div>
      </section>

      {/* 3. FOUNDER SECTION */}
      <section style={sectionWrapper}>
        <div style={founderGrid}>
          <div style={founderImageWrapper}>
            <img src={founderPortrait} alt="Founder" style={founderImage} />
            <div style={experienceBadge}>Founder & Director</div>
          </div>
          <div style={founderText}>
            <h4 style={{ color: COLORS.gold, letterSpacing: '2px', margin: '0' }}>A VISION FOR SUCCESS</h4>
            <h2 style={{ fontSize: '2.5rem', color: COLORS.navy, marginTop: '10px' }}>Guiding the Next Generation</h2>
            <p style={{ lineHeight: '1.8', color: '#475569', fontSize: '1.1rem' }}>
              "Our mission at Sai Ram Tutorials is to simplify complex concepts and ignite a passion for learning. 
              We don't just teach for exams; we prepare students for life by building strong conceptual foundations."
            </p>
            <div style={{ marginTop: '20px' }}>
              <h3 style={{ margin: 0, color: COLORS.navy }}>Mrs. K PUSHPALATHA</h3>
              <p style={{ color: COLORS.gold, fontWeight: 'bold' }}> 30+ Years Experience</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. GALLERY SECTION */}
      <section style={{ ...sectionWrapper, background: 'white' }}>
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <h2 style={{ fontSize: '2.5rem', color: COLORS.navy }}>Learning Highlights</h2>
          <div style={{ width: '80px', height: '4px', background: COLORS.gold, margin: '15px auto' }}></div>
        </div>
        <div style={galleryGrid}>
          <div style={galleryCard}>
            <img src={TUTORIALPortrait} alt="Tutorial Feature" style={galleryImg} />
          </div>
          <div style={galleryCard}>
            <img src={POSTERPortrait} alt="POSTER Feature" style={galleryImg} />
            </div>
          <div style={galleryCard}>
           <img src={SKILLSPortrait} alt="SKILLS Feature" style={galleryImg} />
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
    { name: 'English Grammar', icon: '✍️' },
  ];

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
      const cleanName = fileName.split('-').slice(2).join('-') || fileName;
      link.setAttribute('download', cleanName); 
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      alert("Download failed.");
    }
  };

  const categoryFiles = files.filter(f => f.category === selectedCategory);

  const renderCategoryCards = () => {
    const isEnglish = activeTab === 'English' || activeTab === 'English Grammar';
    const isMath = activeTab.includes('Mathematics');
    const isSocial = activeTab === 'Social Science';

    return (
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
        <div style={subjectCard}><div>📄 Sample Papers</div><button onClick={() => setSelectedCategory('SamplePaper')} style={actionBtn}>Open List</button></div>
        {!isEnglish && (
          <>
            <div style={subjectCard}><div>🔍 Case Study</div><button onClick={() => setSelectedCategory('CaseStudy')} style={actionBtn}>Open List</button></div>
            <div style={subjectCard}><div>⚖️ Assertion & Reasoning</div><button onClick={() => setSelectedCategory('Logic')} style={actionBtn}>Open List</button></div>
          </>
        )}
        {isMath && (
          <div style={subjectCard}><div>📐 Formula Sheet</div><button onClick={() => setSelectedCategory('FormulaSheet')} style={actionBtn}>Open List</button></div>
        )}
        {isSocial && (
          <div style={subjectCard}><div>🗺️ Map Based Questions</div><button onClick={() => setSelectedCategory('MapQuestions')} style={actionBtn}>Open List</button></div>
        )}
      </div>
    );
  };

  return (
    <div style={{ display: 'flex', minHeight: 'calc(100vh - 80px)' }}>
      <div style={{ width: '300px', background: COLORS.navy, color: 'white', padding: '30px 0' }}>
        <div style={{ padding: '0 25px 20px 25px', borderBottom: '1px solid rgba(255,255,255,0.1)', marginBottom: '20px' }}>
          <small style={{ color: COLORS.gold, fontWeight: 'bold' }}>ACADEMIC SESSION 2026</small>
          <h3 style={{ margin: '5px 0 0 0' }}>{student.name}</h3>
        </div>
        {menuItems.map((item) => (
          <div key={item.name} onClick={() => setActiveTab(item.name)} style={{ 
            padding: '16px 25px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '15px',
            background: activeTab === item.name ? 'rgba(251, 191, 36, 0.15)' : 'transparent',
            color: activeTab === item.name ? COLORS.gold : '#cbd5e1',
            borderLeft: activeTab === item.name ? `4px solid ${COLORS.gold}` : '4px solid transparent'
          }}>
            <span>{item.icon}</span>
            <span>{item.name}</span>
          </div>
        ))}
      </div>

      <div style={{ flex: 1, padding: '40px' }}>
        <h1 style={{ color: COLORS.navy }}>{activeTab}</h1>
        {activeTab === 'Home' ? (
           <div style={{ textAlign: 'center' }}> 
             <div style={profileCardStyle}>
                 <h4 style={{color: COLORS.gold}}>STUDENT PROFILE</h4>
                 <div style={profileLine}><strong>Mobile:</strong> {student.mobile}</div>
                 <div style={profileLine}><strong>Email:</strong> {student.email}</div>
             </div>
           </div> 
        ) : !selectedCategory ? (
          renderCategoryCards()
        ) : (
          <div>
            <button onClick={() => setSelectedCategory(null)} style={{marginBottom: '20px', cursor: 'pointer', background: 'none', border: `1px solid ${COLORS.navy}`, padding: '5px 10px', borderRadius: '5px', color: COLORS.navy}}>← Back</button>
            <h3 style={{color: COLORS.navy}}>Available Files:</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '20px' }}>
              {categoryFiles.length > 0 ? categoryFiles.map((file, idx) => (
                <div key={idx} style={{ padding: '15px', background: 'white', borderRadius: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 2px 5px rgba(0,0,0,0.05)', border: '1px solid #eee' }}>
                  <span style={{fontWeight: '500'}}>{file.name.split('-').slice(2).join('-')}</span>
                  <button onClick={() => handleDownload(file.name)} style={downloadBtnStyle}>
                    DOWNLOAD PDF
                  </button>
                </div>
              )) : <p>No files found.</p>}
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

  if (pending) return <div style={cardStyle}><h2 style={{color: COLORS.navy}}>Verification Successful</h2><p>Waiting for admin approval.</p></div>;

  return (
    <div style={cardStyle}>
      <h2 style={{color: COLORS.navy}}>{isLogin ? 'Welcome Back' : 'Create Account'}</h2>
      {!isLogin && <input style={inputStyle} placeholder="Full Name" onChange={e => setForm({...form, name: e.target.value})} />}
      <input style={inputStyle} placeholder="Mobile" onChange={e => setForm({...form, mobile: e.target.value})} />
      {!isLogin && <input style={inputStyle} placeholder="Email" onChange={e => setForm({...form, email: e.target.value})} />}
      <input type="password" style={inputStyle} placeholder="Password" onChange={e => setForm({...form, password: e.target.value})} />
      {!isLogin && otpSent && <input style={inputStyle} placeholder="Enter OTP" onChange={e => setForm({...form, otp: e.target.value})} />}
      <button disabled={isProcessing} style={btnStyle} onClick={handleAction}>{isProcessing ? 'Wait...' : (isLogin ? 'LOG IN' : (otpSent ? 'COMPLETE' : 'SEND OTP'))}</button>
      <p onClick={() => setIsLogin(!isLogin)} style={{ cursor: 'pointer', color: COLORS.gold, marginTop: '20px', fontWeight: 'bold' }}>{isLogin ? "NEW USER? REGISTER" : "SIGN IN"}</p>
    </div>
  );
};

// --- ADMIN PANEL ---
const AdminPanel = () => {
  const [key, setKey] = useState('');
  const [authed, setAuthed] = useState(false);
  const [students, setStudents] = useState([]);
  const [fileList, setFileList] = useState([]);
  const [file, setFile] = useState(null);
  const [subject, setSubject] = useState('Science');
  const [category, setCategory] = useState('SamplePaper');

  const fetchData = async () => {
    try {
        const res = await axios.get('https://sairam-server.onrender.com/api/admin/pending');
        setStudents(res.data);
        fetchFiles();
    } catch (err) { console.error("Fetch error", err); }
  };

  const fetchFiles = async () => {
    try {
        const res = await axios.get(`https://sairam-server.onrender.com/api/files/${subject}`);
        setFileList(res.data);
    } catch (e) { setFileList([]); }
  };

useEffect(() => {
  if (authed) {
    fetchFiles();
  }
  // This line below tells Vercel to ignore the "missing dependency" error
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [subject, authed]);

  const handleUpload = async () => {
    if(!file) return alert("Select a PDF first");
    const formData = new FormData();
    formData.append('subject', subject);
    formData.append('category', category);
    formData.append('file', file); 
    try {
      await axios.post('https://sairam-server.onrender.com/api/admin/upload', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
      });
      alert("✅ Uploaded Successfully!");
      setFile(null);
      document.getElementById('fileInput').value = "";
      fetchFiles(); 
    } catch (err) { alert("❌ Upload failed."); }
  };

  const deleteFile = async (fileName) => {
      if(!window.confirm(`Delete ${fileName}?`)) return;
      try {
          await axios.post('https://sairam-server.onrender.com/api/admin/delete-file', { subject, fileName });
          alert("Deleted!");
          fetchFiles();
      } catch { alert("Delete failed"); }
  };

  if (!authed) return (
    <div style={cardStyle}>
      <h2 style={{color: COLORS.navy}}>Staff Access</h2>
      <input type="password" style={inputStyle} placeholder="Enter Key" onChange={e => setKey(e.target.value)} />
      <button style={btnStyle} onClick={() => key === '1977' ? (setAuthed(true), fetchData()) : alert("Wrong Key")}>Unlock</button>
    </div>
  );

  return (
    <div style={{ padding: '40px', maxWidth: '1000px', margin: '0 auto' }}>
      <h2 style={{color: COLORS.navy}}>Student Management</h2>
      {students.map(s => (
        <div key={s.mobile} style={adminRowStyle}>
          <div><strong>{s.name}</strong> ({s.mobile}) - {s.isApproved ? 'Approved' : 'Pending'}</div>
          <div>
            {!s.isApproved && <button onClick={async () => { await axios.post('https://sairam-server.onrender.com/api/admin/approve', {mobile: s.mobile}); fetchData(); }} style={approveBtnStyle}>Approve</button>}
            <button style={rejectBtnStyle}>Remove</button>
          </div>
        </div>
      ))}
      <div style={{ marginTop: '50px', padding: '30px', background: 'white', borderRadius: '20px', border: '1px solid #ddd' }}>
        <h3 style={{color: COLORS.navy}}>Upload Material</h3>
        <select style={inputStyle} value={subject} onChange={e => setSubject(e.target.value)}>
          {['Science', 'Mathematics (Standard)', 'Mathematics (Basic)', 'Social Science', 'English', 'English Grammar'].map(sub => <option key={sub}>{sub}</option>)}
        </select>
        <select style={inputStyle} value={category} onChange={e => setCategory(e.target.value)}>
          <option value="SamplePaper">Sample Paper</option>
          <option value="CaseStudy">Case Study</option>
          <option value="Logic">Assertion & Reasoning</option>
          <option value="FormulaSheet">Formula Sheet (Math)</option>
          <option value="MapQuestions">Map Questions (Social)</option>
        </select>
        <input id="fileInput" type="file" accept=".pdf" style={inputStyle} onChange={e => setFile(e.target.files[0])} />
        <button onClick={handleUpload} style={btnStyle}>UPLOAD PDF</button>
        <h4 style={{marginTop: '30px', color: COLORS.navy}}>Existing Files in {subject}:</h4>
        {fileList.map(f => (
            <div key={f.name} style={adminRowStyle}>
                <span>{f.name}</span>
                <button onClick={() => deleteFile(f.name)} style={rejectBtnStyle}>Delete</button>
            </div>
        ))}
      </div>
    </div>
  );
};

// --- FOOTER & STYLES ---
const Footer = () => ( <footer style={{ textAlign: 'center', padding: '40px', color: '#94a3b8', background: COLORS.navy }}>© 2026 Sai Ram Tutorials | Excellence in Education</footer> );

const heroSectionStyle = {
  background: `linear-gradient(to right, rgba(15, 23, 42, 0.95), rgba(15, 23, 42, 0.6)), url('https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&q=80&w=1200')`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  padding: '120px 8%',
  color: 'white',
  minHeight: '70vh',
  display: 'flex',
  alignItems: 'center'
};
const heroContentStyle = { maxWidth: '800px' };
const sectionWrapper = { padding: '100px 8%' };
const founderGrid = { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '60px', alignItems: 'center' };
const founderImageWrapper = { position: 'relative' };
const founderImage = { width: '100%', borderRadius: '20px', boxShadow: '20px 20px 0px #fbbf24', objectFit: 'cover' };
const experienceBadge = { position: 'absolute', bottom: '-15px', right: '15px', background: COLORS.navy, color: COLORS.gold, padding: '12px 20px', borderRadius: '8px', fontWeight: 'bold' };
const founderText = { padding: '20px' };
const galleryGrid = { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '25px' };
const galleryCard = { position: 'relative', borderRadius: '15px', overflow: 'hidden', height: '280px' };
const galleryImg = { width: '100%', height: '100%', objectFit: 'cover' };
const navLinkStyle = { color: 'white', textDecoration: 'none', fontWeight: '500' };
const staffBtnStyle = { background: 'rgba(251,191,36,0.1)', color: COLORS.gold, border: `1px solid ${COLORS.gold}`, padding: '10px 20px', borderRadius: '10px', textDecoration: 'none', fontWeight: 'bold' };
const logoutBtnStyle = { background: COLORS.red, color: 'white', border: 'none', padding: '10px 20px', borderRadius: '10px', cursor: 'pointer' };
const cardStyle = { maxWidth: '400px', margin: '80px auto', background: 'white', padding: '40px', borderRadius: '20px', textAlign: 'center', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' };
const inputStyle = { width: '100%', padding: '12px', margin: '10px 0', borderRadius: '10px', border: `1px solid #ddd`, boxSizing: 'border-box', outline: 'none' };
const btnStyle = { width: '100%', padding: '14px', background: COLORS.navy, color: COLORS.gold, border: 'none', borderRadius: '10px', fontWeight: 'bold', cursor: 'pointer', transition: '0.3s', outline: 'none' };
const adminRowStyle = { background: 'white', padding: '15px', display: 'flex', justifyContent: 'space-between', marginBottom: '10px', borderRadius: '10px', border: '1px solid #eee', alignItems: 'center' };
const approveBtnStyle = { background: COLORS.green, color: 'white', border: 'none', padding: '8px 15px', borderRadius: '5px', marginRight: '5px', cursor: 'pointer', fontWeight: 'bold' };
const rejectBtnStyle = { background: COLORS.red, color: 'white', border: 'none', padding: '8px 15px', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' };
const profileCardStyle = { background: 'white', padding: '30px', borderRadius: '20px', display: 'inline-block', textAlign: 'left', minWidth: '320px', boxShadow: '0 10px 20px rgba(0,0,0,0.05)' };
const profileLine = { padding: '12px 0', borderBottom: '1px solid #eee' };
const subjectCard = { background: 'white', padding: '30px', borderRadius: '15px', border: '1px solid #eee', textAlign: 'center', boxShadow: '0 4px 10px rgba(0,0,0,0.02)' };
const actionBtn = { background: COLORS.navy, color: COLORS.gold, border: 'none', padding: '10px 20px', borderRadius: '8px', marginTop: '15px', cursor: 'pointer', fontWeight: 'bold' };
const downloadBtnStyle = { background: COLORS.green, color: 'white', border: 'none', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' };

const infoCardStyle = {
  background: 'white',
  padding: '30px',
  borderRadius: '15px',
  boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
  borderTop: `4px solid ${COLORS.navy}`,
  textAlign: 'left'
};