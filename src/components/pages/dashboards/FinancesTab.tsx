import React from 'react';

interface PaymentHistoryItem {
  id: string;
  date: string;
  description: string;
  amount: number;
  method: string;
  status: string;
  receipt: string;
}

interface FinancesTabProps {
  balance: number;
  paymentHistory: PaymentHistoryItem[];
  onOpenPaymentModal: () => void;
}

const FinancesTab: React.FC<FinancesTabProps> = ({
  balance,
  paymentHistory,
  onOpenPaymentModal,
}) => {
  const totalCharges = 47500; // Tuition (45000) + Misc (2500)
  const scholarship = 35000;  // High Honors Grant
  const totalPaid = paymentHistory.reduce((sum, item) => sum + item.amount, 0);

  const ledgerItems = [
    { item: 'Tuition Fee (Grade 11 - STEM)', category: 'Tuition', amount: 45000, type: 'charge' },
    { item: 'Science & Robotics Lab Fee', category: 'Laboratory', amount: 1200, type: 'charge' },
    { item: 'Computer Science Lab Fee', category: 'Laboratory', amount: 800, type: 'charge' },
    { item: 'Library & E-Resources Access', category: 'Miscellaneous', amount: 500, type: 'charge' },
    { item: 'High Honors Merit Scholarship (80%)', category: 'Scholarship', amount: 35000, type: 'discount' },
  ];

  return (
    <div className="db-finances-tab animated fadeIn">
      {/* Financial Status Summary cards */}
      <div className="finance-summary-grid">
        <div className="finance-card sum-charges">
          <span className="card-label">Total Assessment</span>
          <h3>₱{totalCharges.toLocaleString()}.00</h3>
          <span className="card-sub">Tuition & School Fees</span>
        </div>

        <div className="finance-card sum-scholarship">
          <span className="card-label">Grants & Discounts</span>
          <h3 className="discount-text">-₱{scholarship.toLocaleString()}.00</h3>
          <span className="card-sub">STEM Honors Scholarship</span>
        </div>

        <div className="finance-card sum-paid">
          <span className="card-label">Total Payments</span>
          <h3 className="paid-text">₱{totalPaid.toLocaleString()}.00</h3>
          <span className="card-sub">{paymentHistory.length} Transactions</span>
        </div>

        <div className={`finance-card sum-balance ${balance > 0 ? 'alert' : 'settled'}`}>
          <span className="card-label">Remaining Balance</span>
          <h3>₱{balance.toLocaleString()}.00</h3>
          <span className="card-sub">{balance > 0 ? 'Due by June 12, 2026' : 'Account Settled!'}</span>
        </div>
      </div>

      {/* Main Grid split */}
      <div className="db-grid db-grid--split">
        {/* Left column: Ledger details */}
        <div className="db-split-left">
          <div className="db-card db-card--ledger">
            <div className="db-card-header">
              <h2>Account Statement / Ledger</h2>
              <span className="ledger-term">SY 2026-2027 • 1st Semester</span>
            </div>
            <div className="db-table-container">
              <table className="db-table">
                <thead>
                  <tr>
                    <th>Fee Component</th>
                    <th>Category</th>
                    <th className="amount-col">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {ledgerItems.map((item, index) => (
                    <tr key={index} className={item.type === 'discount' ? 'ledger-discount-row' : ''}>
                      <td>
                        <strong>{item.item}</strong>
                      </td>
                      <td>
                        <span className={`ledger-tag tag-${item.category.toLowerCase()}`}>
                          {item.category}
                        </span>
                      </td>
                      <td className="amount-col">
                        <strong className={item.type === 'discount' ? 'discount-amt' : ''}>
                          {item.type === 'discount' ? '-' : ''}₱{item.amount.toLocaleString()}.00
                        </strong>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="ledger-total-row">
                    <td colSpan={2}>
                      <strong>Net Assessed Amount:</strong>
                    </td>
                    <td className="amount-col">
                      <strong>₱{(totalCharges - scholarship).toLocaleString()}.00</strong>
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>

        {/* Right column: Action panel and Transaction history */}
        <div className="db-split-right">
          {/* Outstanding Action Card */}
          <div className="db-card db-card--payment-action">
            {balance > 0 ? (
              <div className="payment-due-alert">
                <div className="alert-header">
                  <span className="alert-icon">⚠️</span>
                  <h3>Payment Required</h3>
                </div>
                <p>
                  You have an outstanding balance of <strong>₱{balance.toLocaleString()}.00</strong>.
                  Please settle this balance to avoid pre-enrollment delays for the next term.
                </p>
                <button className="btn btn--primary btn--full" onClick={onOpenPaymentModal}>
                  🔴 Pay Balance Now
                </button>
              </div>
            ) : (
              <div className="payment-settled-success">
                <div className="success-header">
                  <span className="success-icon">✨</span>
                  <h3>Account Settled</h3>
                </div>
                <p>
                  Excellent! You have fully settled all assessments for this term. No payments are currently due.
                </p>
                <button className="btn btn--ghost btn--full" disabled>
                  ✓ Clearance Active
                </button>
              </div>
            )}
          </div>

          {/* Payment History Tracker */}
          <div className="db-card db-card--transactions">
            <h2>Payment History</h2>
            <div className="transaction-history-list">
              {paymentHistory.length === 0 ? (
                <p className="no-payments-text">No payment records found.</p>
              ) : (
                paymentHistory.map((item) => (
                  <div key={item.id} className="transaction-item">
                    <div className="trans-meta">
                      <span className="trans-date">{item.date}</span>
                      <span className="trans-receipt">Receipt: {item.receipt}</span>
                    </div>
                    <div className="trans-main">
                      <div className="trans-details">
                        <h4>{item.description}</h4>
                        <span className="trans-method">via {item.method}</span>
                      </div>
                      <div className="trans-amount-status">
                        <span className="trans-amount">₱{item.amount.toLocaleString()}.00</span>
                        <span className="trans-status status-cleared">{item.status}</span>
                      </div>
                    </div>
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

export default FinancesTab;
