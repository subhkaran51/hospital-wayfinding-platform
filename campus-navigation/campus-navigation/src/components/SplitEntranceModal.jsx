import { useEffect, useRef } from 'react';
import { AlertTriangle } from 'lucide-react';

const SplitEntranceModal = ({ onSelect, onClose }) => {
  const firstRef = useRef(null);

  useEffect(() => {
    firstRef.current?.focus();
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, []);

  const handleKey = e => { if (e.key === 'Escape') onClose(); };

  return (
    <div
      className="modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="split-modal-title"
      aria-describedby="split-modal-desc"
      onKeyDown={handleKey}
      onClick={e => e.target === e.currentTarget && onClose()}
    >
      <div className="modal-card">
        <div className="modal-header">
          <h2 id="split-modal-title">Building 14 — Choose Your Entrance</h2>
          <p id="split-modal-desc">
            Building 14 has two separate entrances. Select your visit type so we can direct you to the correct door.
          </p>
        </div>
        <div className="modal-body">
          {/* Emergency option */}
          <button
            ref={firstRef}
            className="entrance-option is-em"
            onClick={() => onSelect('emergency')}
            aria-label="Emergency or urgent care — go to Entrance A, West side, open 24/7"
          >
            <div className="eo-icon" aria-hidden="true">🚨</div>
            <div>
              <div className="eo-title" style={{ color: '#991b1b' }}>Emergency / Urgent Care</div>
              <div className="eo-desc">
                Walk-in or urgent medical situations. You will be directed to <strong>Entrance A (West side)</strong> — open 24 hours, 7 days a week.
              </div>
            </div>
          </button>

          {/* Scheduled option */}
          <button
            className="entrance-option"
            onClick={() => onSelect('scheduled')}
            aria-label="Scheduled appointment — go to Entrance B, East side"
          >
            <div className="eo-icon" aria-hidden="true">📋</div>
            <div>
              <div className="eo-title">Scheduled Appointment / Clinic Visit</div>
              <div className="eo-desc">
                Pre-scheduled appointments, Primary Care, Optometry, or clinic services. You will be directed to <strong>Entrance B (East side)</strong>.
              </div>
            </div>
          </button>

          {/* 911 warning */}
          <div style={{
            display: 'flex', alignItems: 'flex-start', gap: '0.5rem',
            background: '#fef3c7', borderRadius: '8px', padding: '0.75rem 1rem',
            fontSize: '0.8rem', color: '#92400e', marginBottom: '0.75rem',
          }} role="note">
            <AlertTriangle size={16} aria-hidden="true" style={{ flexShrink: 0, marginTop: '1px' }} />
            <span>For life-threatening emergencies, call <strong>911</strong> immediately — do not drive to the hospital.</span>
          </div>

          <button className="btn btn-ghost btn-full" onClick={onClose} aria-label="Cancel and go back">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
export default SplitEntranceModal;
