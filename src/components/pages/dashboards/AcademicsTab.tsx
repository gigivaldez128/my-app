import React, { useState } from 'react';

interface GradeItem {
  subject: string;
  code: string;
  grade: number;
  remarks: string;
}

interface AcademicsTabProps {
  initialGrades: GradeItem[];
}

const AcademicsTab: React.FC<AcademicsTabProps> = ({ initialGrades }) => {
  // Simulator State: initialized with actual grades
  const [simulatedGrades, setSimulatedGrades] = useState<GradeItem[]>(
    initialGrades.map(g => ({ ...g }))
  );
  const [hoveredBar, setHoveredBar] = useState<number | null>(null);

  // Calculate actual GPA
  const actualSum = initialGrades.reduce((sum, g) => sum + g.grade, 0);
  const actualGpa = (actualSum / initialGrades.length).toFixed(1);

  // Calculate simulated GPA
  const simulatedSum = simulatedGrades.reduce((sum, g) => sum + g.grade, 0);
  const simulatedGpa = (simulatedSum / simulatedGrades.length).toFixed(1);

  const getRemarks = (grade: number): string => {
    if (grade >= 95) return 'Outstanding';
    if (grade >= 90) return 'Very Good';
    if (grade >= 85) return 'Good';
    if (grade >= 75) return 'Passing';
    return 'Needs Improvement';
  };

  const getRemarksClass = (grade: number): string => {
    if (grade >= 90) return 'remarks-outstanding';
    if (grade >= 80) return 'remarks-good';
    return 'remarks-poor';
  };

  const handleGradeChange = (code: string, newGrade: number) => {
    setSimulatedGrades(prev =>
      prev.map(g => {
        if (g.code === code) {
          return {
            ...g,
            grade: newGrade,
            remarks: getRemarks(newGrade),
          };
        }
        return g;
      })
    );
  };

  const handleReset = () => {
    setSimulatedGrades(initialGrades.map(g => ({ ...g })));
  };

  // SVG Chart Configuration
  const chartHeight = 200;
  const chartWidth = 500;
  const barPadding = 40;
  const barWidth = 45;
  const chartTopPadding = 30;
  const chartBottomPadding = 40;

  return (
    <div className="db-academics-tab animated fadeIn">
      <div className="db-grid db-grid--split">
        {/* Left Side: Report Card & Grade Trend Chart */}
        <div className="db-split-left">
          {/* Report Card */}
          <div className="db-card db-card--grades-full">
            <div className="db-card-header">
              <h2>Official Report Card</h2>
              <span className="term-badge">SY 2026-2027 • Midterm</span>
            </div>
            <div className="db-table-container">
              <table className="db-table">
                <thead>
                  <tr>
                    <th>Subject</th>
                    <th>Code</th>
                    <th>Actual Grade</th>
                    <th>Remarks</th>
                  </tr>
                </thead>
                <tbody>
                  {initialGrades.map((g) => (
                    <tr key={g.code}>
                      <td>
                        <strong>{g.subject}</strong>
                      </td>
                      <td>
                        <code>{g.code}</code>
                      </td>
                      <td>
                        <span className="db-grade-badge">{g.grade}</span>
                      </td>
                      <td>
                        <span className={`db-remarks-text ${getRemarksClass(g.grade)}`}>
                          {g.remarks}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* SVG Grade Performance Chart */}
          <div className="db-card db-card--chart">
            <div className="db-card-header">
              <h2>Academic Performance Trend</h2>
              <span className="chart-legend">Midterm Grades</span>
            </div>
            <div className="db-chart-wrapper">
              <svg
                viewBox={`0 0 ${chartWidth} ${chartHeight}`}
                className="db-svg-chart"
                width="100%"
                height="100%"
              >
                {/* Y-axis gridlines */}
                {[0, 25, 50, 75, 100].map(val => {
                  const y = chartTopPadding + ((100 - val) / 100) * (chartHeight - chartTopPadding - chartBottomPadding);
                  return (
                    <g key={val} className="chart-gridline">
                      <line x1="45" y1={y} x2={chartWidth - 15} y2={y} stroke="var(--color-border)" strokeDasharray="4 4" />
                      <text x="35" y={y + 4} textAnchor="end" className="chart-axis-label">{val}</text>
                    </g>
                  );
                })}

                {/* Bars */}
                {initialGrades.map((g, idx) => {
                  const usableWidth = chartWidth - 60;
                  const x = 55 + (usableWidth / initialGrades.length) * idx + barPadding / 2;
                  const usableHeight = chartHeight - chartTopPadding - chartBottomPadding;
                  const barValHeight = (g.grade / 100) * usableHeight;
                  const y = chartHeight - chartBottomPadding - barValHeight;

                  const isHovered = hoveredBar === idx;

                  return (
                    <g
                      key={g.code}
                      onMouseEnter={() => setHoveredBar(idx)}
                      onMouseLeave={() => setHoveredBar(null)}
                      style={{ cursor: 'pointer' }}
                    >
                      {/* Interactive hover background bar */}
                      <rect
                        x={x - 10}
                        y={chartTopPadding}
                        width={barWidth + 20}
                        height={usableHeight + 10}
                        fill="transparent"
                      />

                      {/* Bar Gradient Definition */}
                      <defs>
                        <linearGradient id={`grad-${g.code}`} x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stopColor="var(--color-primary)" />
                          <stop offset="100%" stopColor="var(--color-secondary)" />
                        </linearGradient>
                      </defs>

                      {/* Solid Bar */}
                      <rect
                        x={x}
                        y={y}
                        width={barWidth}
                        height={barValHeight}
                        rx="6"
                        fill={`url(#grad-${g.code})`}
                        opacity={hoveredBar === null || isHovered ? 1 : 0.65}
                        className="chart-bar"
                      />

                      {/* Bar value label shown on hover or statically */}
                      <text
                        x={x + barWidth / 2}
                        y={y - 8}
                        textAnchor="middle"
                        className={`chart-bar-value ${isHovered ? 'visible' : ''}`}
                        fill="var(--color-text-title)"
                        fontWeight="600"
                        fontSize="12px"
                      >
                        {g.grade}
                      </text>

                      {/* X-axis labels */}
                      <text
                        x={x + barWidth / 2}
                        y={chartHeight - 15}
                        textAnchor="middle"
                        className="chart-axis-label subject-code"
                        fill={isHovered ? 'var(--color-primary)' : 'var(--color-text-muted)'}
                        fontWeight={isHovered ? '600' : 'normal'}
                      >
                        {g.code}
                      </text>
                    </g>
                  );
                })}
              </svg>

              {/* Tooltip Overlay */}
              {hoveredBar !== null && (
                <div className="chart-tooltip">
                  <strong>{initialGrades[hoveredBar].subject}</strong>
                  <span>Grade: {initialGrades[hoveredBar].grade}% ({initialGrades[hoveredBar].remarks})</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Side: GPA Simulator */}
        <div className="db-split-right">
          <div className="db-card db-card--simulator">
            <div className="db-card-header">
              <h2>GPA Simulator 🧮</h2>
              <button className="db-reset-btn" onClick={handleReset}>
                Reset
              </button>
            </div>
            <p className="simulator-desc">
              Adjust the sliders below to predict your hypothetical term GPA and plan your studies.
            </p>

            {/* Side by Side GPA View */}
            <div className="gpa-comparison">
              <div className="gpa-box actual">
                <span className="gpa-label">Current GPA</span>
                <span className="gpa-number">{actualGpa}%</span>
              </div>
              <div className="gpa-box simulated">
                <span className="gpa-label">Simulated GPA</span>
                <span className="gpa-number highlight">{simulatedGpa}%</span>
              </div>
            </div>

            {/* Sliders List */}
            <div className="simulator-sliders">
              {simulatedGrades.map(g => (
                <div key={g.code} className="sim-slider-row">
                  <div className="sim-slider-header">
                    <span className="subject-title">
                      {g.subject} <code>({g.code})</code>
                    </span>
                    <span className="sim-grade-val">
                      {g.grade}%
                    </span>
                  </div>
                  <div className="sim-slider-input-wrapper">
                    <input
                      type="range"
                      min="60"
                      max="100"
                      value={g.grade}
                      onChange={e => handleGradeChange(g.code, parseInt(e.target.value))}
                      className="sim-slider-range"
                    />
                    <span className={`sim-slider-remarks ${getRemarksClass(g.grade)}`}>
                      {g.remarks}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AcademicsTab;
