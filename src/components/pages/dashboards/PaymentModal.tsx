import React, { useState } from 'react';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitPayment: () => void;
  balance: number;
}

type PaymentMethod = 'gcash' | 'maya' | 'card';

const PaymentModal: React.FC<PaymentModalProps> = ({
  isOpen,
  onClose,
  onSubmitPayment,
  balance,
}) => {
  const [step, setStep] = useState<number>(1); // 1: Select/Fill, 2: Processing, 3: Success
  const [method, setMethod] = useState<PaymentMethod>('gcash');
  const [phone, setPhone] = useState<string>('');
  const [cardName, setCardName] = useState<string>('');
  const [cardNumber, setCardNumber] = useState<string>('');
  const [cardExpiry, setCardExpiry] = useState<string>('');
  const [cardCvv, setCardCvv] = useState<string>('');
  const [receiptNumber, setReceiptNumber] = useState<string>('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2); // Go to processing

    // Simulate payment API request
    setTimeout(() => {
      const randomReceipt = `TE-2026-${Math.floor(100000 + Math.random() * 900000)}`;
      setReceiptNumber(randomReceipt);
      setStep(3); // Go to success
    }, 2000);
  };

  const handleFinish = () => {
    onSubmitPayment(); // Call parent to clear balance
    setStep(1); // Reset step
    onClose(); // Close modal
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length > 0) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const formatExpiry = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return `${v.slice(0, 2)}/${v.slice(2, 4)}`;
    }
    return v;
  };

  return (
    <div className="payment-modal-overlay animated fadeIn">
      <div className="payment-modal-card">
        <div className="modal-header">
          <h3>Settle Outstanding Fees</h3>
          {step !== 2 && (
            <button className="close-btn" onClick={onClose}>
              &times;
            </button>
          )}
        </div>

        {/* Step 1: Select Payment Method & Enter Details */}
        {step === 1 && (
          <form onSubmit={handleSubmit} className="payment-form">
            <div className="payment-summary-bar">
              <span>Amount Due:</span>
              <strong>₱{balance.toLocaleString()}.00</strong>
            </div>

            <label className="section-label-modal">Select Payment Method</label>
            <div className="payment-methods-grid">
              <div
                className={`method-option-card ${method === 'gcash' ? 'active' : ''}`}
                onClick={() => setMethod('gcash')}
              >
                <div className="method-bullet"></div>
                <div className="method-label">
                  <span className="method-icon">🔵</span>
                  <strong>GCash</strong>
                </div>
              </div>
              <div
                className={`method-option-card ${method === 'maya' ? 'active' : ''}`}
                onClick={() => setMethod('maya')}
              >
                <div className="method-bullet"></div>
                <div className="method-label">
                  <span className="method-icon">🟢</span>
                  <strong>Maya</strong>
                </div>
              </div>
              <div
                className={`method-option-card ${method === 'card' ? 'active' : ''}`}
                onClick={() => setMethod('card')}
              >
                <div className="method-bullet"></div>
                <div className="method-label">
                  <span className="method-icon">💳</span>
                  <strong>Credit / Debit Card</strong>
                </div>
              </div>
            </div>

            <div className="method-details-fields">
              {method === 'gcash' && (
                <div className="form-group animated fadeIn">
                  <label htmlFor="gcashPhone">GCash Registered Phone Number</label>
                  <input
                    id="gcashPhone"
                    type="tel"
                    required
                    placeholder="0917-XXX-XXXX"
                    maxLength={11}
                    value={phone}
                    onChange={e => setPhone(e.target.value.replace(/[^0-9]/g, ''))}
                  />
                  <p className="field-hint">Enter your 11-digit GCash mobile number.</p>
                </div>
              )}

              {method === 'maya' && (
                <div className="form-group animated fadeIn">
                  <label htmlFor="mayaPhone">Maya Registered Phone Number</label>
                  <input
                    id="mayaPhone"
                    type="tel"
                    required
                    placeholder="0917-XXX-XXXX"
                    maxLength={11}
                    value={phone}
                    onChange={e => setPhone(e.target.value.replace(/[^0-9]/g, ''))}
                  />
                  <p className="field-hint">Enter your 11-digit Maya mobile number.</p>
                </div>
              )}

              {method === 'card' && (
                <div className="card-fields-grid animated fadeIn">
                  <div className="form-group grid-col-full">
                    <label htmlFor="cardName">Cardholder Name</label>
                    <input
                      id="cardName"
                      type="text"
                      required
                      placeholder="Juan Miguel dela Cruz"
                      value={cardName}
                      onChange={e => setCardName(e.target.value)}
                    />
                  </div>
                  <div className="form-group grid-col-full">
                    <label htmlFor="cardNum">Card Number</label>
                    <input
                      id="cardNum"
                      type="text"
                      required
                      placeholder="4111 2222 3333 4444"
                      maxLength={19}
                      value={cardNumber}
                      onChange={e => setCardNumber(formatCardNumber(e.target.value))}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="cardExp">Expiry Date</label>
                    <input
                      id="cardExp"
                      type="text"
                      required
                      placeholder="MM/YY"
                      maxLength={5}
                      value={cardExpiry}
                      onChange={e => setCardExpiry(formatExpiry(e.target.value))}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="cardCvv">CVV / CVC</label>
                    <input
                      id="cardCvv"
                      type="password"
                      required
                      placeholder="•••"
                      maxLength={3}
                      value={cardCvv}
                      onChange={e => setCardCvv(e.target.value.replace(/[^0-9]/g, ''))}
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="modal-actions">
              <button type="button" className="btn btn--ghost" onClick={onClose}>
                Cancel
              </button>
              <button type="submit" className="btn btn--primary">
                Pay ₱{balance.toLocaleString()}.00
              </button>
            </div>
          </form>
        )}

        {/* Step 2: Processing Payment */}
        {step === 2 && (
          <div className="payment-processing-view">
            <div className="spinner"></div>
            <h4>Verifying Transaction</h4>
            <p>Please do not close this window or navigate away. Securing connection to payment gateway...</p>
          </div>
        )}

        {/* Step 3: Success Response */}
        {step === 3 && (
          <div className="payment-success-view">
            <div className="success-lottie-badge">✓</div>
            <h4>Payment Successful!</h4>
            <p className="success-desc">
              Your payment has been successfully processed and posted to your ledger.
            </p>
            <div className="receipt-box">
              <div className="receipt-row">
                <span>Receipt Number:</span>
                <strong>{receiptNumber}</strong>
              </div>
              <div className="receipt-row">
                <span>Amount Paid:</span>
                <strong className="amount">₱{balance.toLocaleString()}.00</strong>
              </div>
              <div className="receipt-row">
                <span>Method Used:</span>
                <strong>{method.toUpperCase()}</strong>
              </div>
              <div className="receipt-row">
                <span>Date & Time:</span>
                <span>{new Date().toLocaleString()}</span>
              </div>
            </div>
            <button className="btn btn--primary btn--full" onClick={handleFinish}>
              Return to Portal
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentModal;
