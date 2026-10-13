import React, { useState } from 'react';
import { Modal } from './Modal';
import { api } from '../api/client';
import { CreditCard, CheckCircle2, ShieldCheck, Lock, DollarSign, Smartphone } from 'lucide-react';

export const PaymentModal = ({ course, user, isOpen, onClose, onEnrollSuccess, showToast }) => {
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [expiry, setExpiry] = useState('12/28');
  const [cvc, setCvc] = useState('123');
  const [processing, setProcessing] = useState(false);

  if (!course || !isOpen) return null;

  const handleCheckout = async (e) => {
    e.preventDefault();
    setProcessing(true);

    try {
      // Execute Enrollment API call
      const res = await api.enrollCourse(course.id);
      if (res.success) {
        showToast(`Payment Successful! Enrolled in ${course.title}`, 'success');
        onEnrollSuccess(course.id);
        onClose();
      }
    } catch (err) {
      showToast(err.message || 'Payment or Enrollment failed', 'error');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Course Enrollment & Checkout" maxWidth="520px">
      <form onSubmit={handleCheckout}>
        {/* Order Summary Box */}
        <div
          style={{
            padding: '1.25rem',
            borderRadius: 'var(--radius-md)',
            background: 'rgba(99, 102, 241, 0.08)',
            border: '1px solid rgba(99, 102, 241, 0.25)',
            marginBottom: '1.25rem',
          }}
        >
          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            ORDER SUMMARY
          </span>

          <h4 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#ffffff', margin: '0.4rem 0' }}>
            {course.title}
          </h4>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '0.85rem', paddingTop: '0.75rem', borderTop: '1px solid var(--border-color)' }}>
            <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Student Name:</span>
            <span style={{ fontSize: '0.9rem', fontWeight: 600, color: '#ffffff' }}>{user?.name} ({user?.email})</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '0.5rem' }}>
            <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Total Amount Due:</span>
            <span style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--secondary)' }}>$49.00 USD</span>
          </div>
        </div>

        {/* Payment Method Selector */}
        <div className="form-group" style={{ marginBottom: '1.25rem' }}>
          <label className="form-label">Select Payment Method</label>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem', marginTop: '0.35rem' }}>
            <button
              type="button"
              onClick={() => setPaymentMethod('card')}
              className="btn btn-sm"
              style={{
                background: paymentMethod === 'card' ? 'rgba(99, 102, 241, 0.2)' : 'var(--bg-tertiary)',
                color: paymentMethod === 'card' ? 'var(--primary)' : 'var(--text-muted)',
                border: paymentMethod === 'card' ? '1px solid var(--primary)' : '1px solid var(--border-color)',
                flexDirection: 'column',
                padding: '0.65rem 0.5rem',
                gap: '4px',
              }}
            >
              <CreditCard size={18} />
              <span style={{ fontSize: '0.78rem' }}>Credit Card</span>
            </button>

            <button
              type="button"
              onClick={() => setPaymentMethod('upi')}
              className="btn btn-sm"
              style={{
                background: paymentMethod === 'upi' ? 'rgba(20, 184, 166, 0.2)' : 'var(--bg-tertiary)',
                color: paymentMethod === 'upi' ? 'var(--secondary)' : 'var(--text-muted)',
                border: paymentMethod === 'upi' ? '1px solid var(--secondary)' : '1px solid var(--border-color)',
                flexDirection: 'column',
                padding: '0.65rem 0.5rem',
                gap: '4px',
              }}
            >
              <Smartphone size={18} />
              <span style={{ fontSize: '0.78rem' }}>UPI / Wallet</span>
            </button>

            <button
              type="button"
              onClick={() => setPaymentMethod('paypal')}
              className="btn btn-sm"
              style={{
                background: paymentMethod === 'paypal' ? 'rgba(245, 158, 11, 0.2)' : 'var(--bg-tertiary)',
                color: paymentMethod === 'paypal' ? 'var(--accent)' : 'var(--text-muted)',
                border: paymentMethod === 'paypal' ? '1px solid var(--accent)' : '1px solid var(--border-color)',
                flexDirection: 'column',
                padding: '0.65rem 0.5rem',
                gap: '4px',
              }}
            >
              <DollarSign size={18} />
              <span style={{ fontSize: '0.78rem' }}>PayPal</span>
            </button>
          </div>
        </div>

        {/* Payment Form Fields */}
        {paymentMethod === 'card' ? (
          <div>
            <div className="form-group">
              <label className="form-label">Card Number</label>
              <input
                type="text"
                required
                className="input-field"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
              <div className="form-group">
                <label className="form-label">Expiry Date</label>
                <input
                  type="text"
                  required
                  placeholder="MM/YY"
                  className="input-field"
                  value={expiry}
                  onChange={(e) => setExpiry(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label">CVC Code</label>
                <input
                  type="password"
                  required
                  maxLength={4}
                  className="input-field"
                  value={cvc}
                  onChange={(e) => setCvc(e.target.value)}
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="form-group">
            <label className="form-label">{paymentMethod === 'upi' ? 'UPI ID (e.g. user@upi)' : 'PayPal Email'}</label>
            <input
              type="text"
              required
              placeholder={paymentMethod === 'upi' ? 'username@upi' : 'user@paypal.com'}
              className="input-field"
            />
          </div>
        )}

        {/* Security Assurance */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', color: 'var(--text-dim)', margin: '1rem 0' }}>
          <ShieldCheck size={16} color="var(--success)" />
          <span>Encrypted 256-Bit SSL Payment Gateway</span>
        </div>

        {/* Submit Actions */}
        <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end', marginTop: '1.25rem' }}>
          <button type="button" onClick={onClose} className="btn btn-secondary">
            Cancel
          </button>

          <button type="submit" disabled={processing} className="btn btn-primary" style={{ padding: '0.75rem 1.5rem' }}>
            <Lock size={16} />
            <span>{processing ? 'Processing Payment...' : 'Confirm & Enroll Now'}</span>
          </button>
        </div>
      </form>
    </Modal>
  );
};
