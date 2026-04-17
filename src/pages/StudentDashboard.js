import React from 'react';
import { useNavigate } from 'react-router-dom'; // <--- THIS FIXES YOUR ERROR

const COLORS = {
  navy: '#1a1a2e',
  gold: '#c5a059',
  white: '#ffffff',
  bg: '#f8f9fa'
};

const StudentDashboard = ({ student, setStudent }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('studentUser');
    setStudent(null);
    navigate('/student');
  };

  const tutorials = [
    { id: 1, title: "Mathematics - Algebra Basics", duration: "45 mins" },
    { id: 2, title: "Physics - Newton's Laws", duration: "30 mins" },
    { id: 3, title: "English - Grammar Essentials", duration: "20 mins" },
  ];

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: COLORS.bg }}>
      {/* SIDEBAR */}
      <div style={{ width: '250px', background: COLORS.navy, color: 'white', padding: '30px 20px' }}>
        <h3 style={{ color: COLORS.gold, marginBottom: '40px' }}>Dashboard</h3>
        <div style={{ marginBottom: '20px', cursor: 'pointer', fontWeight: 'bold' }}>📚 My Courses</div>
        <div style={{ marginBottom: '20px', cursor: 'pointer', opacity: 0.7 }}>📝 Assignments</div>
        <div style={{ marginBottom: '20px', cursor: 'pointer', opacity: 0.7 }}>📊 Progress</div>
        
        <button 
          onClick={handleLogout}
          style={{ 
            marginTop: '50px', background: 'transparent', border: `1px solid ${COLORS.gold}`, 
            color: COLORS.gold, padding: '10px', width: '100%', cursor: 'pointer', borderRadius: '5px' 
          }}
        > Logout </button>
      </div>

      {/* MAIN CONTENT */}
      <div style={{ flex: 1, padding: '40px' }}>
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
          <h2 style={{ color: COLORS.navy }}>Welcome back, {student?.name || 'Scholar'}!</h2>
          <div style={{ background: COLORS.gold, color: 'white', padding: '5px 15px', borderRadius: '20px', fontSize: '0.8rem' }}>
            STATUS: APPROVED ✅
          </div>
        </header>

        <h4 style={{ color: '#666', marginBottom: '20px' }}>Available Tutorials</h4>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
          {tutorials.map(video => (
            <div key={video.id} style={{ background: 'white', borderRadius: '10px', boxShadow: '0 4px 10px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
              <div style={{ height: '140px', background: '#ddd', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontSize: '2rem' }}>📺</span>
              </div>
              <div style={{ padding: '15px' }}>
                <h5 style={{ margin: '0 0 5px 0', color: COLORS.navy }}>{video.title}</h5>
                <small style={{ color: '#888' }}>Duration: {video.duration}</small>
                <button style={{ 
                  marginTop: '15px', width: '100%', background: COLORS.navy, color: COLORS.gold, 
                  border: 'none', padding: '8px', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' 
                }}>Watch Now</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;