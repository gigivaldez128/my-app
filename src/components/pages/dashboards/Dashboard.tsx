import React from 'react';

const announcements = [
  { id: 1, date: 'June 05, 2026', title: 'SY 2026–2027 Enrollment Schedule', desc: 'Pre-enrollment for existing students starts next week. Please settle accounts before June 12.' },
  { id: 2, date: 'June 02, 2026', title: 'Tara Eskwela Sports Festival 2026', desc: 'Opening ceremony is scheduled this Friday. Varsity matches will commence across campuses.' },
  { id: 3, date: 'May 28, 2026', title: 'STEM Innovation Fair Winners', desc: 'Congratulations to our Grade 11 robotics project for bagging the gold at the Regional Expo!' },
];

const grades = [
  { subject: 'Advanced Algebra', code: 'MATH-11', grade: '95', remarks: 'Outstanding' },
  { subject: 'General Physics 1', code: 'PHYS-11', grade: '92', remarks: 'Very Good' },
  { subject: 'Oral Communication', code: 'ENGL-11', grade: '90', remarks: 'Very Good' },
  { subject: 'General Chemistry 1', code: 'CHEM-11', grade: '94', remarks: 'Outstanding' },
  { subject: 'Intro to Programming', code: 'COMP-11', grade: '98', remarks: 'Outstanding' },
];

const Dashboard: React.FC = () => {
  const studentInfo = {
    name: 'Juan Miguel dela Cruz',
    id: '2024-10492',
    level: 'Grade 11 — STEM',
    advisor: 'Mr. Jonathan Cruz',
    gpa: '93.8%',
    status: 'Enrolled',
  };

  return (
    <div className="page page--dashboard">
      <div className="container">
        {/* Overview Row */}
        <div className="db-grid">
          {/* Profile Card */}
          <div className="db-card db-card--profile">
            <h2>Student Profile</h2>
            <div className="db-profile-info">
              <div className="db-profile-avatar">👨‍🎓</div>
              <div>
                <h3>{studentInfo.name}</h3>
                <p className="db-profile-id">ID: {studentInfo.id}</p>
                <span className="db-status-badge">{studentInfo.status}</span>
              </div>
            </div>
            <div className="db-profile-details">
              <div className="db-detail-row">
                <span>Grade Level:</span>
                <strong>{studentInfo.level}</strong>
              </div>
              <div className="db-detail-row">
                <span>Adviser:</span>
                <strong>{studentInfo.advisor}</strong>
              </div>
              <div className="db-detail-row">
                <span>Weighted GPA:</span>
                <strong className="db-text-highlight">{studentInfo.gpa}</strong>
              </div>
            </div>
          </div>

          {/* Quick Actions Card */}
          <div className="db-card db-card--actions">
            <h2>Quick Actions</h2>
            <div className="db-actions-grid">
              <button className="db-action-btn">
                <span className="db-action-icon">💳</span>
                <span>Pay Tuition</span>
              </button>
              <button className="db-action-btn">
                <span className="db-action-icon">📂</span>
                <span>Request Records</span>
              </button>
              <button className="db-action-btn">
                <span className="db-action-icon">🗓️</span>
                <span>Class Schedule</span>
              </button>
              <button className="db-action-btn">
                <span className="db-action-icon">💬</span>
                <span>Teacher Consult</span>
              </button>
            </div>
          </div>
        </div>

        {/* Grades and Announcements Grid */}
        <div className="db-grid db-grid--split">
          {/* Report Card */}
          <div className="db-card db-card--grades">
            <h2>Report Card (Midterm)</h2>
            <div className="db-table-container">
              <table className="db-table">
                <thead>
                  <tr>
                    <th>Subject</th>
                    <th>Code</th>
                    <th>Grade</th>
                    <th>Remarks</th>
                  </tr>
                </thead>
                <tbody>
                  {grades.map((g) => (
                    <tr key={g.code}>
                      <td><strong>{g.subject}</strong></td>
                      <td><code>{g.code}</code></td>
                      <td><span className="db-grade-badge">{g.grade}</span></td>
                      <td className="db-remarks-text">{g.remarks}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Announcements */}
          <div className="db-card db-card--announcements">
            <h2>Bulletin Board</h2>
            <div className="db-announcements-list">
              {announcements.map((ann) => (
                <div key={ann.id} className="db-ann-item">
                  <div className="db-ann-meta">
                    <span className="db-ann-date">{ann.date}</span>
                  </div>
                  <h3>{ann.title}</h3>
                  <p>{ann.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
