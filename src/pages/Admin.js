import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Admin() {
  const [students, setStudents] = useState([]);
  const [passkey, setPasskey] = useState('');
  const [isAuthorized, setIsAuthorized] = useState(false);

  const fetchStudents = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/admin/students');
      setStudents(response.data);
    } catch (err) { console.error("Error fetching students"); }
  };

  const handleLogin = () => {
    if (passkey === 'pushpa') {
      setIsAuthorized(true);
      fetchStudents();
    } else { alert("Invalid Secret Key"); }
  };

  const handleApprove = async (mobile) => {
    try {
      await axios.post('http://localhost:5000/api/admin/approve', { mobile });
      alert("Student Approved!");
      fetchStudents();
    } catch (err) { alert("Failed to approve"); }
  };

  if (!isAuthorized) return (
    <div style={{ padding: '100px', textAlign: 'center', background: '#1a1a2e', minHeight: '100vh', color: 'white' }}>
      <h1>Admin Secure Login</h1>
      <input 
        type="password" 
        placeholder="Enter Admin Key" 
        style={{ padding: '10px', width: '250px', borderRadius: '5px', border: 'none' }}
        onChange={(e) => setPasskey(e.target.value)} 
      />
      <br /><br />
      <button onClick={handleLogin} style={{ padding: '10px 20px', background: '#c5a059', border: 'none', borderRadius: '5px', fontWeight: 'bold' }}>Enter Dashboard</button>
    </div>
  );

  return (
    <div style={{ padding: '40px', fontFamily: 'sans-serif' }}>
      <h1 style={{ color: '#1a1a2e' }}>SAI RAM TUTORIALS: Admin Panel</h1>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
        <thead>
          <tr style={{ backgroundColor: '#1a1a2e', color: 'white' }}>
            <th style={tdStyle}>Name</th>
            <th style={tdStyle}>Mobile</th>
            <th style={tdStyle}>Status</th>
            <th style={tdStyle}>Action</th>
          </tr>
        </thead>
        <tbody>
          {students.map((s) => (
            <tr key={s.mobile} style={{ borderBottom: '1px solid #ddd' }}>
              <td style={tdStyle}>{s.name}</td>
              <td style={tdStyle}>{s.mobile}</td>
              <td style={tdStyle}>{s.isApproved ? "✅ Approved" : "⏳ Pending"}</td>
              <td style={tdStyle}>
                {!s.isApproved && <button onClick={() => handleApprove(s.mobile)} style={btnStyle}>Grant Access</button>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const tdStyle = { padding: '15px', textAlign: 'left' };
const btnStyle = { backgroundColor: '#28a745', color: 'white', border: 'none', padding: '8px 15px', borderRadius: '5px', cursor: 'pointer' };