const About = () => {
  // You can add paths to your actual tutorial photos here
  const galleryImages = [
    { url: '/classroom1.jpg', caption: 'Spacious Classrooms' },
    { url: '/study-material.jpg', caption: 'Authorized Materials' },
    { url: '/students.jpg', caption: 'Interactive Sessions' },
    { url: '/awards.jpg', caption: 'Excellence in Results' }
  ];

  return (
    <div style={containerStyle}>
      {/* Hero Section */}
      <h1 style={{ color: COLORS.primary, fontSize: '3.5rem', marginBottom: '10px' }}>Sai Ram Tutorials</h1>
      <h3 style={{ color: COLORS.secondary, fontStyle: 'italic', marginBottom: '30px' }}>"Knowledge is Power, Service is Worship"</h3>
      
      <div style={{ maxWidth: '850px', margin: 'auto', backgroundColor: 'rgba(255,255,255,0.9)', padding: '40px', borderRadius: '15px', borderLeft: `8px solid ${COLORS.secondary}`, textAlign: 'left', marginBottom: '50px' }}>
        <h2 style={{ color: COLORS.primary }}>Our Vision</h2>
        <p style={{ fontSize: '1.2rem', lineHeight: '1.8', color: '#333' }}>
          Welcome to <b>Sai Ram Tutorials</b>. We pride ourselves on creating a disciplined and 
          enlightened learning environment. Specializing in Science, Mathematics, and Languages, 
          we empower students to unlock their full potential through personalized attention and 
          expert guidance.
        </p>
      </div>

      {/* Gallery Section */}
      <div style={{ maxWidth: '1000px', margin: 'auto' }}>
        <h2 style={{ color: COLORS.primary, marginBottom: '30px' }}>Our Learning Environment</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', padding: '10px' }}>
          {galleryImages.map((img, index) => (
            <div key={index} style={galleryItemStyle}>
              <div style={{ height: '180px', backgroundColor: '#ddd', borderRadius: '10px 10px 0 0', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                <img src={img.url} alt={img.caption} style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                     onError={(e) => { e.target.src = "https://via.placeholder.com/300x200?text=Tutorial+Photo"; }} />
              </div>
              <p style={{ padding: '10px', fontWeight: '500', color: COLORS.primary, background: '#fff', margin: 0, borderRadius: '0 0 10px 10px' }}>{img.caption}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const galleryItemStyle = {
  borderRadius: '10px',
  boxShadow: '0 6px 15px rgba(0,0,0,0.1)',
  transition: 'transform 0.3s ease',
  cursor: 'pointer',
  border: `1px solid ${COLORS.secondary}`
};