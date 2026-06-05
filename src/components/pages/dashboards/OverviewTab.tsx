import React from 'react';

interface StudentInfo {
  name: string;
  id: string;
  level: string;
  advisor: string;
  gpa: string;
  status: string;
}

interface Announcement {
  id: number;
  date: string;
  title: string;
  desc: string;
}

interface Task {
  id: string;
  text: string;
  subject: string;
  dueDate: string;
  completed: boolean;
  category: string;
}

interface OverviewTabProps {
  studentInfo: StudentInfo;
  balance: number;
  tasks: Task[];
  announcements: Announcement[];
  setActiveTab: (tab: string) => void;
}

const OverviewTab: React.FC<OverviewTabProps> = ({
  studentInfo,
  balance,
  tasks,
  announcements,
  setActiveTab,
}) => {
  const pendingTasksCount = tasks.filter(t => !t.completed).length;

  return (
    <div className="db-overview-tab animated fadeIn">
      {/* Welcome Banner */}
      <div className="db-welcome-banner">
        <div className="db-welcome-content">
          <span className="db-welcome-tagline">Welcome back, Student Portal</span>
          <h1>Mabuhay, {studentInfo.name}! 👋</h1>
          <p>You are officially enrolled for {studentInfo.level}. Keep up the great work this term!</p>
          <div className="db-welcome-meta">
            <span><strong>ID:</strong> {studentInfo.id}</span>
            <span className="divider">•</span>
            <span><strong>Adviser:</strong> {studentInfo.advisor}</span>
          </div>
        </div>
        <div className="db-welcome-illustration">
          <span className="emoji-large">🚀</span>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="db-kpi-grid">
        <div className="db-kpi-card" onClick={() => setActiveTab('academics')}>
          <div className="db-kpi-header">
            <span className="db-kpi-icon gpa-icon">🎓</span>
            <span className="db-kpi-badge badge-success">Top 5%</span>
          </div>
          <div className="db-kpi-body">
            <h3>{studentInfo.gpa}</h3>
            <p>Cumulative GPA</p>
          </div>
          <div className="db-kpi-footer">
            <span>View detailed report card &rarr;</span>
          </div>
        </div>

        <div className="db-kpi-card" onClick={() => setActiveTab('schedule')}>
          <div className="db-kpi-header">
            <span className="db-kpi-icon schedule-icon">📅</span>
            <span className="db-kpi-badge badge-info">Today</span>
          </div>
          <div className="db-kpi-body">
            <h3>Physics 1</h3>
            <p>Next: 1:00 PM — Room 302</p>
          </div>
          <div className="db-kpi-footer">
            <span>Check weekly calendar &rarr;</span>
          </div>
        </div>

        <div className="db-kpi-card" onClick={() => setActiveTab('finances')}>
          <div className="db-kpi-header">
            <span className="db-kpi-icon balance-icon">💳</span>
            <span className={`db-kpi-badge ${balance === 0 ? 'badge-success' : 'badge-warning'}`}>
              {balance === 0 ? 'Settled' : 'Pending'}
            </span>
          </div>
          <div className="db-kpi-body">
            <h3>{balance === 0 ? '₱0.00' : `₱${balance.toLocaleString()}`}</h3>
            <p>Outstanding Fees</p>
          </div>
          <div className="db-kpi-footer">
            <span>{balance === 0 ? 'View transaction history' : 'Pay tuition fee now'} &rarr;</span>
          </div>
        </div>

        <div className="db-kpi-card" onClick={() => setActiveTab('tasks')}>
          <div className="db-kpi-header">
            <span className="db-kpi-icon tasks-icon">✏️</span>
            <span className={`db-kpi-badge ${pendingTasksCount === 0 ? 'badge-success' : 'badge-alert'}`}>
              {pendingTasksCount} Pending
            </span>
          </div>
          <div className="db-kpi-body">
            <h3>{tasks.length - pendingTasksCount} / {tasks.length}</h3>
            <p>Completed Tasks</p>
          </div>
          <div className="db-kpi-footer">
            <span>Manage study checklist &rarr;</span>
          </div>
        </div>
      </div>

      {/* Main Grid split */}
      <div className="db-grid db-grid--split">
        {/* Left Side: Bulletin and Quick Actions */}
        <div className="db-split-left">
          <div className="db-card db-card--bulletin">
            <div className="db-card-header">
              <h2>Bulletin Board</h2>
              <button className="db-link-btn" onClick={() => setActiveTab('overview')}>Refresh</button>
            </div>
            <div className="db-announcements-list">
              {announcements.map((ann) => (
                <div key={ann.id} className="db-ann-item">
                  <div className="db-ann-meta">
                    <span className="db-ann-date">{ann.date}</span>
                    <span className="db-ann-tag">Announcement</span>
                  </div>
                  <h3>{ann.title}</h3>
                  <p>{ann.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side: Quick Links / Todo snapshot */}
        <div className="db-split-right">
          <div className="db-card db-card--actions">
            <h2>Quick Shortcuts</h2>
            <div className="db-actions-grid">
              <button className="db-action-btn" onClick={() => setActiveTab('finances')}>
                <span className="db-action-icon">💳</span>
                <span>Pay Tuition</span>
              </button>
              <button className="db-action-btn" onClick={() => setActiveTab('tasks')}>
                <span className="db-action-icon">📂</span>
                <span>My Tasks</span>
              </button>
              <button className="db-action-btn" onClick={() => setActiveTab('schedule')}>
                <span className="db-action-icon">🗓️</span>
                <span>Class Schedule</span>
              </button>
              <button className="db-action-btn" onClick={() => setActiveTab('academics')}>
                <span className="db-action-icon">💬</span>
                <span>Report Card</span>
              </button>
            </div>
          </div>

          <div className="db-card db-card--todo-preview">
            <div className="db-card-header">
              <h2>Recent Tasks</h2>
              <button className="db-link-btn" onClick={() => setActiveTab('tasks')}>Manage All</button>
            </div>
            <div className="db-todo-preview-list">
              {tasks.length === 0 ? (
                <p className="no-tasks-text">No tasks created yet. Stay productive!</p>
              ) : (
                tasks.slice(0, 3).map(task => (
                  <div key={task.id} className={`db-todo-preview-item ${task.completed ? 'completed' : ''}`}>
                    <span className="bullet"></span>
                    <div className="todo-item-info">
                      <h4>{task.text}</h4>
                      <div className="todo-item-sub">
                        <span className="tag-category">{task.category}</span>
                        <span className="tag-due">Due: {task.dueDate}</span>
                      </div>
                    </div>
                    <span className={`status-icon ${task.completed ? 'check' : 'pending'}`}>
                      {task.completed ? '✓' : '⏰'}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverviewTab;
