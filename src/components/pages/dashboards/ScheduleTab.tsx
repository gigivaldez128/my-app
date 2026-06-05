import React, { useState } from 'react';

interface ClassScheduleItem {
  subject: string;
  code: string;
  time: string;
  room: string;
  teacher: string;
  email: string;
  color: string;
}

const scheduleData: Record<string, ClassScheduleItem[]> = {
  Monday: [
    { subject: 'Advanced Algebra', code: 'MATH-11', time: '08:30 AM - 10:00 AM', room: 'Room 301', teacher: 'Mr. Jonathan Cruz', email: 'j.cruz@taraeskwela.edu.ph', color: 'indigo' },
    { subject: 'General Chemistry 1', code: 'CHEM-11', time: '10:30 AM - 12:00 PM', room: 'Science Lab 2', teacher: 'Ms. Elena Santos', email: 'e.santos@taraeskwela.edu.ph', color: 'pink' },
    { subject: 'General Physics 1', code: 'PHYS-11', time: '01:00 PM - 02:30 PM', room: 'Room 302', teacher: 'Dr. Manuel Reyes', email: 'm.reyes@taraeskwela.edu.ph', color: 'blue' },
  ],
  Tuesday: [
    { subject: 'Oral Communication', code: 'ENGL-11', time: '09:00 AM - 10:30 AM', room: 'Room 104', teacher: 'Mrs. Sarah Perez', email: 's.perez@taraeskwela.edu.ph', color: 'green' },
    { subject: 'Intro to Programming', code: 'COMP-11', time: '10:30 AM - 12:00 PM', room: 'Computer Lab 1', teacher: 'Mr. Allen Tan', email: 'a.tan@taraeskwela.edu.ph', color: 'purple' },
  ],
  Wednesday: [
    { subject: 'Advanced Algebra', code: 'MATH-11', time: '08:30 AM - 10:00 AM', room: 'Room 301', teacher: 'Mr. Jonathan Cruz', email: 'j.cruz@taraeskwela.edu.ph', color: 'indigo' },
    { subject: 'General Chemistry 1', code: 'CHEM-11', time: '10:30 AM - 12:00 PM', room: 'Science Lab 2', teacher: 'Ms. Elena Santos', email: 'e.santos@taraeskwela.edu.ph', color: 'pink' },
    { subject: 'General Physics 1', code: 'PHYS-11', time: '01:00 PM - 02:30 PM', room: 'Room 302', teacher: 'Dr. Manuel Reyes', email: 'm.reyes@taraeskwela.edu.ph', color: 'blue' },
  ],
  Thursday: [
    { subject: 'Oral Communication', code: 'ENGL-11', time: '09:00 AM - 10:30 AM', room: 'Room 104', teacher: 'Mrs. Sarah Perez', email: 's.perez@taraeskwela.edu.ph', color: 'green' },
    { subject: 'Intro to Programming', code: 'COMP-11', time: '10:30 AM - 12:00 PM', room: 'Computer Lab 1', teacher: 'Mr. Allen Tan', email: 'a.tan@taraeskwela.edu.ph', color: 'purple' },
  ],
  Friday: [
    { subject: 'STEM Research Seminar', code: 'STEM-SEM', time: '09:00 AM - 11:00 AM', room: 'Innovation Hub', teacher: 'Mr. Jonathan Cruz', email: 'j.cruz@taraeskwela.edu.ph', color: 'orange' },
    { subject: 'Homeroom Advisory Meeting', code: 'HROOM-11', time: '04:00 PM - 05:00 PM', room: 'Room 301', teacher: 'Mr. Jonathan Cruz', email: 'j.cruz@taraeskwela.edu.ph', color: 'indigo' },
  ],
};

const ScheduleTab: React.FC = () => {
  const [selectedDay, setSelectedDay] = useState<string>('Monday');
  const [consultTeacher, setConsultTeacher] = useState<ClassScheduleItem | null>(null);
  const [consultMessage, setConsultMessage] = useState<string>('');
  const [sentSuccess, setSentSuccess] = useState<boolean>(false);
  const [sending, setSending] = useState<boolean>(false);

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  const handleSendConsult = (e: React.FormEvent) => {
    e.preventDefault();
    if (!consultMessage.trim()) return;

    setSending(true);
    setTimeout(() => {
      setSending(false);
      setSentSuccess(true);
      setConsultMessage('');
      setTimeout(() => {
        setSentSuccess(false);
        setConsultTeacher(null);
      }, 2500);
    }, 1200);
  };

  return (
    <div className="db-schedule-tab animated fadeIn">
      <div className="schedule-header">
        <div className="schedule-intro">
          <h2>Weekly Schedule</h2>
          <p>View your classes and connect directly with your course instructors.</p>
        </div>

        {/* Day Selector Navigation */}
        <div className="day-selector">
          {days.map(day => (
            <button
              key={day}
              className={`day-tab-btn ${selectedDay === day ? 'active' : ''}`}
              onClick={() => setSelectedDay(day)}
            >
              <span className="day-name-short">{day.substring(0, 3)}</span>
              <span className="day-name-full">{day}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="schedule-timeline">
        {scheduleData[selectedDay] && scheduleData[selectedDay].length > 0 ? (
          scheduleData[selectedDay].map((c, index) => (
            <div key={index} className={`schedule-item-row ${c.color}-theme`}>
              <div className="schedule-time-col">
                <span className="time-badge">{c.time.split(' - ')[0]}</span>
                <span className="time-duration">{c.time.split(' - ')[1]}</span>
              </div>
              <div className="schedule-card-col">
                <div className="schedule-class-card">
                  <div className="class-card-main">
                    <span className="class-code">{c.code}</span>
                    <h3>{c.subject}</h3>
                    <div className="class-meta">
                      <span className="meta-room">📍 {c.room}</span>
                      <span className="meta-teacher">👤 {c.teacher}</span>
                    </div>
                  </div>
                  <div className="class-card-actions">
                    <button
                      className="btn-schedule btn-schedule--consult"
                      onClick={() => setConsultTeacher(c)}
                    >
                      ✉️ Consult Teacher
                    </button>
                    <a
                      href={`https://zoom.us/mock-link-${c.code}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-schedule btn-schedule--join"
                      onClick={(e) => {
                        e.preventDefault();
                        alert(`Launching virtual classroom for ${c.subject} (${c.code}). Please wait...`);
                      }}
                    >
                      🎥 Virtual Room
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="no-classes-card">
            <span className="emoji-large">🎉</span>
            <h3>No Scheduled Classes</h3>
            <p>Enjoy your free day! Use this time to study or complete assignments.</p>
          </div>
        )}
      </div>

      {/* Consultation Request Modal */}
      {consultTeacher && (
        <div className="consult-modal-overlay animated fadeIn">
          <div className="consult-modal-card">
            <div className="modal-header">
              <h3>Consultation with {consultTeacher.teacher}</h3>
              <button className="close-btn" onClick={() => setConsultTeacher(null)}>
                &times;
              </button>
            </div>
            {sentSuccess ? (
              <div className="consult-success-view">
                <div className="success-icon">✓</div>
                <h4>Message Sent!</h4>
                <p>
                  Your message was delivered to <strong>{consultTeacher.email}</strong>.
                  {consultTeacher.teacher} will respond to you shortly via portal chat or email.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSendConsult} className="consult-form">
                <div className="consult-subject-field">
                  <span className="label">Instructor:</span>
                  <strong>{consultTeacher.teacher} ({consultTeacher.code})</strong>
                </div>
                <div className="form-group">
                  <label htmlFor="consultMsg">Write your question or request:</label>
                  <textarea
                    id="consultMsg"
                    rows={4}
                    value={consultMessage}
                    onChange={e => setConsultMessage(e.target.value)}
                    placeholder="E.g., Good day, Sir. I would like to clarify a topic from General Physics lesson 3..."
                    required
                    disabled={sending}
                  ></textarea>
                </div>
                <div className="modal-actions">
                  <button
                    type="button"
                    className="btn btn--ghost"
                    onClick={() => setConsultTeacher(null)}
                    disabled={sending}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn btn--primary"
                    disabled={sending || !consultMessage.trim()}
                  >
                    {sending ? 'Sending...' : 'Send Request'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ScheduleTab;
