// campus-navigation/campus-navigation/src/components/FloorSelector.jsx
import React from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';

const FloorSelector = ({ building, selectedFloor, onFloorSelect, disabled = false }) => {
  if (!building || !building.levels) return null;

  const sortedLevels = [...building.levels].sort((a, b) => {
    const order = { 'G': -1, '1': 0, '2': 1, '3': 2, '4': 3, '5': 4 };
    return (order[b] || 100) - (order[a] || 100);
  });

  return (
    <div style={{
      background: '#ffffff',
      borderRadius: '8px',
      padding: '16px',
      marginBottom: '16px',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
    }}>
      <div style={{ marginBottom: '12px' }}>
        <div style={{
          fontSize: '0.9rem',
          fontWeight: '600',
          color: '#0a1628',
          marginBottom: '4px'
        }}>
          {building.displayName}
        </div>
        <div style={{ fontSize: '0.75rem', color: '#64748b' }}>
          {sortedLevels.length} Floor{sortedLevels.length !== 1 ? 's' : ''}
        </div>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(45px, 1fr))',
        gap: '8px'
      }}>
        {sortedLevels.map((level) => (
          <button
            key={level}
            onClick={() => onFloorSelect(level)}
            disabled={disabled}
            style={{
              padding: '10px',
              border: selectedFloor === level ? '2px solid #1565c0' : '1px solid #e2e8f0',
              background: selectedFloor === level ? '#e0ebff' : '#ffffff',
              color: selectedFloor === level ? '#1565c0' : '#0a1628',
              borderRadius: '6px',
              fontSize: '0.85rem',
              fontWeight: '600',
              cursor: disabled ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s',
              opacity: disabled ? 0.5 : 1,
            }}
            aria-pressed={selectedFloor === level}
            aria-label={`Select Level ${level}`}
          >
            {level === 'G' ? 'G' : `L${level}`}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FloorSelector;
