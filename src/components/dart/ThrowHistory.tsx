import React from "react";

interface ThrowHistoryProps{
    throws: string[];
}

const ThrowHistory: React.FC<ThrowHistoryProps> = ({ throws }) => {
    return (
      <div style={{
        maxHeight: '200px',
        overflowY: 'auto',
        border: '1px solid #eee',
        borderRadius: '4px',
      }}>
        {throws.map((t, i) => (
          <div key={i} style={{ padding: '8px', borderBottom: '1px solid #eee' }}>
            {i + 1}. {t}
          </div>
        ))}
      </div>
    );
  };
  
  export default ThrowHistory;