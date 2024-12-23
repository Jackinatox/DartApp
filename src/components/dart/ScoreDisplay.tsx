import React from 'react';

interface ScoreDisplayProps {
  score: number;
  throwCount: number;
}

const ScoreDisplay: React.FC<ScoreDisplayProps> = ({ score, throwCount }) => {
  return (
    <div
    style={{
        display: 'flex', // Use flexbox to align child divs side by side
        justifyContent: 'center', // Center the items horizontally
        alignItems: 'center', // Center the items vertically (optional)
        gap: '20px', // Add spacing between the divs
        fontSize: '24px',
        fontWeight: 'bold',
        marginBottom: '20px',
      }}>
    <div>
      Score: {score}
    </div>
    <div>
        Throws: {throwCount} 
    </div>
    </div>
  );
};

export default ScoreDisplay;
