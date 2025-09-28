import React from 'react';
import QuickActionMenu from './QuickActionMenu';

// Test component for QuickActionMenu
const TestQuickActionMenu = () => {
  const handleActionClick = (message) => {
    console.log('Action clicked:', message);
    alert(`Action: ${message}`);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h2>Test QuickActionMenu</h2>
      <QuickActionMenu 
        visible={true}
        onActionClick={handleActionClick}
      />
      
      <div style={{ marginTop: '20px', padding: '16px', background: '#f5f5f5', borderRadius: '8px' }}>
        <h3>Test Cases:</h3>
        <ul>
          <li>Click vào từng card để test action</li>
          <li>Check hover effects</li>
          <li>Responsive design trên mobile</li>
          <li>Icons và colors display correctly</li>
        </ul>
      </div>
    </div>
  );
};

export default TestQuickActionMenu;