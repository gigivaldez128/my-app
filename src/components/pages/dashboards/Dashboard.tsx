import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import OverviewTab from './OverviewTab';
import AcademicsTab from './AcademicsTab';
import ScheduleTab from './ScheduleTab';
import FinancesTab from './FinancesTab';
import TasksTab from './TasksTab';
import PaymentModal from './PaymentModal';

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

interface PaymentHistoryItem {
  id: string;
  date: string;
  description: string;
  amount: number;
  method: string;
  status: string;
  receipt: string;
}

const studentInfo: StudentInfo = {
  name: 'Juan Miguel dela Cruz',
  id: '2024-10492',
  level: 'Grade 11 — STEM',
  advisor: 'Mr. Jonathan Cruz',
  gpa: '93.8%',
  status: 'Enrolled',
};

const announcements: Announcement[] = [
  { id: 1, date: 'June 05, 2026', title: 'SY 2026–2027 Enrollment Schedule', desc: 'Pre-enrollment for existing students starts next week. Please settle accounts before June 12.' },
  { id: 2, date: 'June 02, 2026', title: 'Tara Eskwela Sports Festival 2026', desc: 'Opening ceremony is scheduled this Friday. Varsity matches will commence across campuses.' },
  { id: 3, date: 'May 28, 2026', title: 'STEM Innovation Fair Winners', desc: 'Congratulations to our Grade 11 robotics project for bagging the gold at the Regional Expo!' },
];

const grades = [
  { subject: 'Advanced Algebra', code: 'MATH-11', grade: 95, remarks: 'Outstanding' },
  { subject: 'General Physics 1', code: 'PHYS-11', grade: 92, remarks: 'Very Good' },
  { subject: 'Oral Communication', code: 'ENGL-11', grade: 90, remarks: 'Very Good' },
  { subject: 'General Chemistry 1', code: 'CHEM-11', grade: 94, remarks: 'Outstanding' },
  { subject: 'Intro to Programming', code: 'COMP-11', grade: 98, remarks: 'Outstanding' },
];

const DEFAULT_TASKS: Task[] = [
  { id: '1', text: 'Study for Advanced Algebra midterm', category: 'Mathematics', subject: 'Mathematics', dueDate: 'Jun 10, 2026', completed: false },
  { id: '2', text: 'Grade 11 Physics Lab Report submission', category: 'Physics', subject: 'Physics', dueDate: 'Jun 12, 2026', completed: false },
  { id: '3', text: 'Chemistry group project research paper', category: 'Chemistry', subject: 'Chemistry', dueDate: 'Jun 15, 2026', completed: false },
  { id: '4', text: 'Submit consultation request on robotics project', category: 'Computer Science', subject: 'Computer Science', dueDate: 'Jun 08, 2026', completed: true },
];

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [balance, setBalance] = useState<number>(12500);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState<boolean>(false);

  // Load / Save Tasks from localStorage
  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem('tara_eskwela_tasks');
    return saved ? JSON.parse(saved) : DEFAULT_TASKS;
  });

  useEffect(() => {
    localStorage.setItem('tara_eskwela_tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Payment History State
  const [paymentHistory, setPaymentHistory] = useState<PaymentHistoryItem[]>([
    {
      id: 'tx-1',
      date: 'May 15, 2026',
      description: 'Downpayment for SY 2026-2027 Enrollment',
      amount: 10000,
      method: 'OTC Bank Transfer',
      status: 'Cleared',
      receipt: 'TE-2026-10492',
    },
  ]);

  const handlePaymentSuccess = () => {
    const newTx: PaymentHistoryItem = {
      id: `tx-${Date.now()}`,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      description: 'Tuition Balance Settlement',
      amount: balance,
      method: 'Online E-Wallet',
      status: 'Cleared',
      receipt: `TE-26-${Math.floor(100000 + Math.random() * 900000)}`,
    };

    setPaymentHistory(prev => [newTx, ...prev]);
    setBalance(0);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  const tabs = [
    { id: 'overview', name: 'Dashboard Overview', icon: '⚡' },
    { id: 'academics', name: 'Grades & Academics', icon: '🎓' },
    { id: 'schedule', name: 'Class Schedule', icon: '🗓️' },
    { id: 'finances', name: 'Ledger & Finances', icon: '💳' },
    { id: 'tasks', name: 'My Study Tasks', icon: '✏️' },
  ];

  return (
    <div className="page page--dashboard">
      <div className="container">
        {/* Self-contained Top Header Bar */}
        <div className="db-top-bar animated fadeIn">
          <div className="db-brand">
            <span className="brand-logo">🏫</span>
            <span className="brand-name">
              Tara<em>Eskwela</em> <span className="badge-portal">Portal</span>
            </span>
          </div>
          <div className="db-user-actions">
            <div className="db-user-mini">
              <span className="avatar-mini">👨‍🎓</span>
              <div className="info-mini">
                <span className="name-mini">{studentInfo.name}</span>
                <span className="level-mini">{studentInfo.level}</span>
              </div>
            </div>
            <button onClick={handleLogout} className="btn-portal-logout">
              Sign Out 🚪
            </button>
          </div>
        </div>

        {/* Portal Breadcrumbs/Header Info */}
        <div className="db-portal-header">
          <div className="db-title-section">
            <span className="db-portal-subtitle">Student Portal &bull; TaraEskwela Hub</span>
            <h1>My Student Hub</h1>
          </div>
          <div className="db-portal-nav">
            <div className="portal-tabs-nav">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  className={`portal-tab-nav-btn ${activeTab === tab.id ? 'active' : ''}`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  <span className="tab-nav-icon">{tab.icon}</span>
                  <span className="tab-nav-text">{tab.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Tab Content Injection */}
        <div className="db-tab-content-area">
          {activeTab === 'overview' && (
            <OverviewTab
              studentInfo={studentInfo}
              balance={balance}
              tasks={tasks}
              announcements={announcements}
              setActiveTab={setActiveTab}
            />
          )}

          {activeTab === 'academics' && (
            <AcademicsTab initialGrades={grades} />
          )}

          {activeTab === 'schedule' && (
            <ScheduleTab />
          )}

          {activeTab === 'finances' && (
            <FinancesTab
              balance={balance}
              paymentHistory={paymentHistory}
              onOpenPaymentModal={() => setIsPaymentModalOpen(true)}
            />
          )}

          {activeTab === 'tasks' && (
            <TasksTab tasks={tasks} setTasks={setTasks} />
          )}
        </div>
      </div>

      {/* Tuition Payment Portal Modal */}
      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        onSubmitPayment={handlePaymentSuccess}
        balance={balance}
      />
    </div>
  );
};

export default Dashboard;
