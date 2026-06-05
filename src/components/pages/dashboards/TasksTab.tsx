import React, { useState } from 'react';

interface Task {
  id: string;
  text: string;
  subject: string;
  dueDate: string;
  completed: boolean;
  category: string;
}

interface TasksTabProps {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

const TasksTab: React.FC<TasksTabProps> = ({ tasks, setTasks }) => {
  const [filter, setFilter] = useState<'all' | 'pending' | 'completed'>('all');
  const [newTaskText, setNewTaskText] = useState<string>('');
  const [newTaskCategory, setNewTaskCategory] = useState<string>('Mathematics');
  const [newTaskDueDate, setNewTaskDueDate] = useState<string>(() => {
    const date = new Date();
    date.setDate(date.getDate() + 3);
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  });

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskText.trim()) return;

    const newTask: Task = {
      id: `task-${Date.now()}`,
      text: newTaskText,
      category: newTaskCategory,
      subject: newTaskCategory,
      dueDate: newTaskDueDate ? new Date(newTaskDueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'No Due Date',
      completed: false,
    };

    setTasks(prev => [newTask, ...prev]);
    setNewTaskText('');
  };

  const handleToggleTask = (id: string) => {
    setTasks(prev =>
      prev.map(t => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const handleDeleteTask = (id: string) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      setTasks(prev => prev.filter(t => t.id !== id));
    }
  };

  const handleClearCompleted = () => {
    if (window.confirm('Delete all completed tasks?')) {
      setTasks(prev => prev.filter(t => !t.completed));
    }
  };

  // Filter logic
  const filteredTasks = tasks.filter(t => {
    if (filter === 'pending') return !t.completed;
    if (filter === 'completed') return t.completed;
    return true;
  });

  const completedCount = tasks.filter(t => t.completed).length;
  const progressPercent = tasks.length > 0 ? Math.round((completedCount / tasks.length) * 100) : 0;

  const categories = ['Mathematics', 'Physics', 'Chemistry', 'English', 'Computer Science', 'General Study', 'Administrative'];

  return (
    <div className="db-tasks-tab animated fadeIn">
      <div className="db-grid db-grid--split">
        {/* Left Side: Tasks checklist list */}
        <div className="db-split-left">
          <div className="db-card db-card--tasks-list">
            <div className="db-card-header">
              <h2>My Study Plan & Tasks</h2>
              <span className="task-count-indicator">
                {completedCount} of {tasks.length} Completed
              </span>
            </div>

            {/* Task Progress Bar */}
            <div className="task-progress-container">
              <div className="task-progress-bar-bg">
                <div
                  className="task-progress-bar-fill"
                  style={{ width: `${progressPercent}%` }}
                ></div>
              </div>
              <span className="progress-label">{progressPercent}% Done</span>
            </div>

            {/* Task Filters */}
            <div className="task-filters-row">
              <div className="filters-tabs">
                <button
                  className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
                  onClick={() => setFilter('all')}
                >
                  All ({tasks.length})
                </button>
                <button
                  className={`filter-btn ${filter === 'pending' ? 'active' : ''}`}
                  onClick={() => setFilter('pending')}
                >
                  Pending ({tasks.length - completedCount})
                </button>
                <button
                  className={`filter-btn ${filter === 'completed' ? 'active' : ''}`}
                  onClick={() => setFilter('completed')}
                >
                  Completed ({completedCount})
                </button>
              </div>

              {completedCount > 0 && (
                <button className="clear-completed-btn" onClick={handleClearCompleted}>
                  Clear Completed
                </button>
              )}
            </div>

            {/* Checklist items */}
            <div className="task-checklist">
              {filteredTasks.length === 0 ? (
                <div className="empty-tasks-placeholder">
                  <span className="placeholder-icon">📝</span>
                  <h3>No Tasks Found</h3>
                  <p>
                    {filter === 'all'
                      ? "You haven't added any tasks yet. Create one on the right to start tracking!"
                      : filter === 'pending'
                      ? 'Hooray! No pending tasks left to complete.'
                      : "You haven't completed any tasks yet. Keep studying!"}
                  </p>
                </div>
              ) : (
                filteredTasks.map(task => (
                  <div key={task.id} className={`task-checkbox-item ${task.completed ? 'completed' : ''}`}>
                    <label className="checkbox-container">
                      <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={() => handleToggleTask(task.id)}
                      />
                      <span className="checkmark"></span>
                    </label>

                    <div className="task-details">
                      <span className="task-text">{task.text}</span>
                      <div className="task-meta-tags">
                        <span className={`task-tag-cat tag-${task.category.toLowerCase().replace(' ', '-')}`}>
                          {task.category}
                        </span>
                        <span className="task-tag-due">📅 Due: {task.dueDate}</span>
                      </div>
                    </div>

                    <button
                      className="delete-task-btn"
                      onClick={() => handleDeleteTask(task.id)}
                      title="Delete task"
                    >
                      &times;
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Right Side: Create Task Form */}
        <div className="db-split-right">
          <div className="db-card db-card--add-task">
            <h2>Add New Task</h2>
            <form onSubmit={handleAddTask} className="add-task-form">
              <div className="form-group">
                <label htmlFor="taskText">Task / Assignment Name</label>
                <input
                  id="taskText"
                  type="text"
                  required
                  placeholder="E.g., Complete Chapter 4 Physics Exercises"
                  value={newTaskText}
                  onChange={e => setNewTaskText(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="taskCategory">Subject Category</label>
                <select
                  id="taskCategory"
                  value={newTaskCategory}
                  onChange={e => setNewTaskCategory(e.target.value)}
                >
                  {categories.map(c => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="taskDueDate">Target Due Date</label>
                <input
                  id="taskDueDate"
                  type="date"
                  required
                  value={newTaskDueDate}
                  onChange={e => setNewTaskDueDate(e.target.value)}
                />
              </div>

              <button type="submit" className="btn btn--primary btn--full" style={{ marginTop: '10px' }}>
                ＋ Create Task
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TasksTab;
