import { useEffect, useState } from 'react';
import ScoreDisplay from './ScoreDisplay';
import ThrowHistory from './ThrowHistory';
import CustomButton from '../CustomButton/CustomButton';
import TopBar from "../CustomButton/TopBar";
import { useParams } from 'react-router-dom';
import pb from '../../services/pocketbase';

const LoggedDart: React.FC = () => {
    const { gameId } = useParams<{ gameId: string }>();
    const [single, setSingle] = useState(0);
    const [double, setDouble] = useState(0);
    const [triple, setTriple] = useState(0);
    const [miss, setMiss] = useState(0);

    const [score, setScore] = useState(0);
    const [throwCount, setThrowCount] = useState(0);
    const [throws, setThrows] = useState<string[]>([]);


    useEffect(() => {
        const fetchGame = async () => {
            if (gameId) {
                const response = await pb.collection('Throws').getOne(gameId);

                setSingle(response.singles);
            }
        };

        fetchGame();
    }, []);


    useEffect(() => {
        const updateGame = async () => {
            try {
                console.log("Updating data for game:", gameId);
                if (gameId) {
                    const response = await pb.collection('Throws').update(gameId, { singles: single, doubles: double, triples: triple, misses: miss });
                    console.log("Updated: ", response);
                }
            } catch {

            }
        };

        updateGame();
    }, [miss, single, double, triple]);




    const handleThrow = (multiplier: number) => {
        if (multiplier === 1) { //20
            setSingle(single + 1);
        }

        switch (multiplier) {
            case 0: setMiss(miss + 1); // Miss
                break;
            case 1: setSingle(single + 1); // 20
                break;
            case 2: setDouble(double + 1); // Double
                break;
            case 3: setTriple(triple + 1); // Triple
                break;
        }

        const points = multiplier * 20;
        const throwLabel = multiplier === 0 ? 'Miss' :
            multiplier === 1 ? 'Single' :
                multiplier === 2 ? 'Double' : 'Triple';

        setScore(prev => prev + points);
        setThrows(prev => [...prev, `${throwLabel} (${throwCount})`]);
        setThrowCount(prev => prev + 1);
    };



    const resetGame = () => {
        setScore(0);
        setThrowCount(0);
        setThrows([]);
    };

    return (
        <div style={{
            maxWidth: '1200px',
            margin: '20px auto',
            padding: '20px',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            borderRadius: '8px',
            backgroundColor: 'white'
        }}>
            <TopBar />
            <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>
                Dart Counter
            </h1>

            <ScoreDisplay score={score} throwCount={throwCount} />

            <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '10px',
                marginBottom: '20px'
            }}>
                <CustomButton
                    onClick={() => handleThrow(1)}
                    color="#4CAF50" //4CAF50
                    text="Single (20)"
                />
                <CustomButton
                    onClick={() => handleThrow(2)}
                    color="#2196F3"
                    text="Double (40)"
                />
                <CustomButton
                    onClick={() => handleThrow(3)}
                    color="#9C27B0"
                    text="Triple (60)"
                />
                <CustomButton
                    onClick={() => handleThrow(0)}
                    color="#f44336"
                    text="Miss (0)"
                />
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
            <ThrowHistory throws={throws} />

        </div>
    );
};

export default LoggedDart;