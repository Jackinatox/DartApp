import { useEffect, useState } from "react";
import ScoreDisplay from "./ScoreDisplay";
import CustomButton from "../CustomButton/CustomButton";
import TopBar from "../CustomButton/TopBar";
import { useParams } from "react-router-dom";
import pb from "../../services/pocketbase";
import { CircularProgress } from "@mui/joy";

const LoggedDart: React.FC = () => {
  const { gameId } = useParams<{ gameId: string }>(); //gets the id from url jacknatox.com/game/{gameId}

  const [loading, setLoading] = useState(true);

  const [throwId, setThrowId] = useState("");
  const [single, setSingle] = useState(0);
  const [double, setDouble] = useState(0);
  const [triple, setTriple] = useState(0);
  const [miss, setMiss] = useState(0);

  const [score, setScore] = useState(0);
  const [throwCount, setThrowCount] = useState(0);

  useEffect(() => {
    const fetchGame = async () => {
      setLoading(true);
      if (gameId) {
        try {
          console.log("Running Initial Requests, GameId parsed: ", gameId);
          const game = await pb.collection("Games").getOne(gameId);
          //console.log('Git Game: ', game);
          setThrowId(game.throws);
          const response = await pb.collection("Throws").getOne(throwId);
          //console.log('Got Throw: ', response);

          setSingle(response.singles);
          setDouble(response.doubles);
          setTriple(response.triples);
          setMiss(response.misses);

          setScore(
            response.singles * 20 +
              response.doubles * 40 +
              response.triples * 60
          );
          setThrowCount(response.singles + response.doubles + response.triples);
        } catch {}
      }
    };

    fetchGame();
    setTimeout(() => setLoading(false), 100);
  }, []);

  useEffect(() => {
    const updateGame = async () => {
      try {
        console.log("Updating data for throw:", throwId);
        //if (gameId) {
        const response = await pb.collection("Throws").update(throwId, {
          singles: single,
          doubles: double,
          triples: triple,
          misses: miss,
        });
        console.log("Updated: ", response);
        //}
      } catch {}
    };

    updateGame();
  }, [miss, single, double, triple]);

  const handleThrow = (multiplier: number) => {
    if (multiplier === 1) {
      //20
      setSingle(single + 1);
    }

    switch (multiplier) {
      case 0:
        setMiss(miss + 1); // Miss
        break;
      case 1:
        setSingle(single + 1); // 20
        break;
      case 2:
        setDouble(double + 1); // Double
        break;
      case 3:
        setTriple(triple + 1); // Triple
        break;
    }

    const points = multiplier * 20;

    setScore((prev) => prev + points);
    setThrowCount((prev) => prev + 1);
  };

  return (
    <>
      {loading && <CircularProgress />}

      {!loading && (
        <div
          style={{
            maxWidth: "1200px",
            margin: "20px auto",
            padding: "20px",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            borderRadius: "8px",
            backgroundColor: "white",
          }}
        >
          <TopBar />
          <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
            Dart Counter
          </h1>

          <ScoreDisplay score={score} throwCount={throwCount} />

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "10px",
              marginBottom: "20px",
            }}
          >
            <CustomButton
              onClick={() => handleThrow(1)}
              color="#4CAF50" //4CAF50
              text={"Single (" + single + ")"}
            />
            <CustomButton
              onClick={() => handleThrow(2)}
              color="#2196F3"
              text={"Double (" + double + ")"}
            />
            <CustomButton
              onClick={() => handleThrow(3)}
              color="#9C27B0"
              text={"Triple (" + triple + ")"}
            />
            <CustomButton
              onClick={() => handleThrow(0)}
              color="#f44336"
              text={"Miss (" + miss + ")"}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default LoggedDart;
