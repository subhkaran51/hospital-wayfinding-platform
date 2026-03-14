import React, { useEffect, useRef } from 'react';

const AccessibleModal = ({ isOpen, onClose, title, children }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      modalRef.current?.focus();
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  // Handle Escape key to close
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      className="modal-overlay"
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1000,
        display: 'flex', alignItems: 'center', justifyContent: 'center'
      }}
      onClick={onClose}
    >
      <div 
        className="modal-content"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        ref={modalRef}
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()} // Prevent click from closing overlay
        style={{
          background: 'var(--bg-white)', padding: '2rem', 
          borderRadius: 'var(--radius-md)', width: '90%', maxWidth: '500px',
          boxShadow: 'var(--shadow-lg)', outline: 'none'
        }}
      >
        <div className="d-flex justify-between align-center" style={{ marginBottom: '1.5rem' }}>
          <h2 id="modal-title">{title}</h2>
          <button 
            onClick={onClose} 
            aria-label="Close modal"
            style={{ fontSize: '1.5rem', lineHeight: 1, padding: '0.5rem' }}
          >
            &times;
          </button>
        </div>
        <div className="modal-body">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AccessibleModal;
