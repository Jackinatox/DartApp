import TopBar from './CustomButton/TopBar';
import GamesList from './dart/GameList';
import { Link } from 'react-router-dom';

const Homepage = () => {
  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
      <TopBar />

      <header style={{ textAlign: 'center', margin: '20px 0' }}>
        <h1>Welcome to Dart Counter</h1>
        <p>Track your dart games effortlessly!</p>
      </header>

      <section style={{ margin: '20px 0' }}>
        <h2>Start a New Game</h2>
        <Link to="/dart" style={{ textDecoration: 'none' }}>
          <button
            style={{
              padding: '10px 20px',
              backgroundColor: '#4CAF50',
              color: '#fff',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
          >
            New Game
          </button>
        </Link>
      </section>

      <section style={{ margin: '20px 0' }}>
        <h2>Past Games</h2>
        <GamesList />
      </section>
    </div>
  );
};

export default Homepage;