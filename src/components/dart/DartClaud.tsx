import React, { useState } from 'react';

const DartCounter = () => {
  const [score, setScore] = useState(0);
  const [throws, setThrows] = useState<string[]>([]);

  const handleThrow = (multiplier: number) => {
    const points = multiplier * 20;
    const throwLabel = multiplier === 0 ? 'Miss' : 
                      multiplier === 1 ? 'Single' :
                      multiplier === 2 ? 'Double' : 'Triple';
    
    setScore(prev => prev + points);
    setThrows(prev => [...prev, `${throwLabel} (${points})`]);
  };

  const resetGame = () => {
    setScore(0);
    setThrows([]);
  };

  return (
    <div style={{
      maxWidth: '400px',
      margin: '20px auto',
      padding: '20px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      borderRadius: '8px',
      backgroundColor: 'white'
    }}>
      <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>
        Dart Counter - 20s
      </h1>

      <div style={{ 
        textAlign: 'center', 
        fontSize: '24px', 
        fontWeight: 'bold',
        marginBottom: '20px'
      }}>
        Score: {score}
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '10px',
        marginBottom: '20px'
      }}>
        <button
          onClick={() => handleThrow(1)}
          style={{
            padding: '10px',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Single (20)
        </button>
        <button
          onClick={() => handleThrow(2)}
          style={{
            padding: '10px',
            backgroundColor: '#2196F3',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Double (40)
        </button>
        <button
          onClick={() => handleThrow(3)}
          style={{
            padding: '10px',
            backgroundColor: '#9C27B0',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Triple (60)
        </button>
        <button
          onClick={() => handleThrow(0)}
          style={{
            padding: '10px',
            backgroundColor: '#f44336',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Miss (0)
        </button>
      </div>

      <button
        onClick={resetGame}
        style={{
          width: '100%',
          padding: '10px',
          backgroundColor: '#grey',
          border: '1px solid #ccc',
          borderRadius: '4px',
          cursor: 'pointer',
          marginBottom: '20px'
        }}
      >
        Reset Game
      </button>

      <div>
        <h3 style={{ marginBottom: '10px' }}>Throw History:</h3>
        <div style={{ 
          maxHeight: '200px', 
          overflowY: 'auto',
          border: '1px solid #eee',
          borderRadius: '4px'
        }}>
          {throws.map((t, i) => (
            <div 
              key={i}
              style={{
                padding: '8px',
                borderBottom: '1px solid #eee'
              }}
            >
              {i + 1}. {t}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DartCounter;