// components/Sidebar.js
export const Sidebar = ({ activeSubject, setActiveSubject }) => {
  const subjects = [
    { name: 'Science', sections: ['Biology', 'Physics', 'Chemistry'] },
    { name: 'Social Science', sections: ['History', 'Civics', 'Geography', 'Economics', 'Value Based'] },
    { name: 'Mathematics', sections: ['Basic', 'Standard'] },
    { name: 'Kannada', sections: ['Prose', 'Poetry'] },
    { name: 'English', sections: ['Main Course', 'Grammar'] }
  ];

  return (
    <div className="sidebar" style={{ width: '250px', background: '#2c3e50', color: 'white', height: '100vh', padding: '20px' }}>
      <h2>📚 Subjects</h2>
      {subjects.map(sub => (
        <div key={sub.name}>
          <h4 style={{ color: '#ecf0f1', marginTop: '15px' }}>{sub.name}</h4>
          <ul style={{ listStyle: 'none', paddingLeft: '10px' }}>
            {sub.sections.map(sec => (
              <li 
                key={sec} 
                onClick={() => setActiveSubject(`${sub.name} - ${sec}`)}
                style={{ cursor: 'pointer', padding: '5px 0', fontSize: '14px', color: activeSubject.includes(sec) ? '#3498db' : '#bdc3c7' }}
              >
                • {sec}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};