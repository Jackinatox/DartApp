import { useEffect, useState } from "react";
import ScoreDisplay from "./ScoreDisplay";
import TopBar from "../CustomButton/TopBar";
import { useParams } from "react-router-dom";
import pb from "../../services/pocketbase";
import { Button } from "@mui/joy";
import ErrorIcon from "@mui/icons-material/Error";
import Alert from "@mui/joy/Alert";

const LoggedDart: React.FC = () => {
  const { gameId } = useParams<{ gameId: string }>(); //gets the id from url jacknatox.com/game/{gameId}

  const [loading, setLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);
  const [siteError] = useState(false);  //only use for displaying a site error and this is unused


  const [throwId, setThrowId] = useState("");
  const [single, setSingle] = useState(0);
  const [double, setDouble] = useState(0);
  const [triple, setTriple] = useState(0);
  const [miss, setMiss] = useState(0);

  const [score, setScore] = useState(0);
  const [throwCount, setThrowCount] = useState(0);


  useEffect(() => {
    //fetch Games
    const fetchGame = async () => {
      await checkLogin();

      if (gameId) {
        try {
          setLoading(true);
          console.log('set to true')
          console.log("Running Initial Requests, GameId parsed: ", gameId);
          const game = await pb.collection("Games").getOne(gameId);
          if (!game) {
            throw new Error("Game not found or invalid response");
          }

          setThrowId(game.throws);

          const response = await pb.collection("Throws").getOne(game.throws);
          if (!response) {
            throw new Error("Throws not found or invalid response");
          }

          setSingle(response.singles);
          setDouble(response.doubles);
          setTriple(response.triples);
          setMiss(response.misses);

          setScore(
            (response.singles || 0) * 20 +
            (response.doubles || 0) * 40 +
            (response.triples || 0) * 60
          );
          setThrowCount(
            (response.singles || 0) +
            (response.doubles || 0) +
            (response.triples || 0) +
            (response.misses)
          );

          setLoading(false);
        } catch (error) {
          console.error(error);
        } finally {
          console.log('set to false')
        }
      }
    };

    const checkLogin = async () => {
      setLoggedIn(pb.authStore.isValid);
    };

    fetchGame();
  }, []);

  useEffect(() => {
    //Update Game
    const updateGame = async () => {
      try {
        console.log("Updating data for throw:", throwId);
        if (throwId) {
          const response = await pb.collection("Throws").update(throwId, {
            singles: single,
            doubles: double,
            triples: triple,
            misses: miss,
          });
          console.log("Updated: ", response);
        }
      } catch { }
    };

    updateGame();
  }, [miss, single, double, triple]);

  const handleThrow = (multiplier: number) => {

    if (throwCount === 99) {
      const response = confirm("Du hast schon 99 Würfe, sicher das du Fortfahren willst?");

      if (!response) {
        return;
      }
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
      {siteError && (
        <Alert color="danger" startDecorator={<ErrorIcon />}>
          {" "}
          Wahrscheinlich nicht eingeloggt, zu aufwendig alle errors zu
          prüfen{" "}
        </Alert>
      )}

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
          <Button
            onClick={() => handleThrow(1)}
            color="success"
            variant="solid"
            disabled={!loggedIn || loading}
            sx={{
              padding: '20px', // Increase padding
              fontSize: '18px', // Increase font size
            }}
          >
            Single ({single})
          </Button>
          <Button
            onClick={() => handleThrow(2)}
            color="primary"
            variant="solid"
            disabled={!loggedIn || loading}
            sx={{
              padding: '20px', // Increase padding
              fontSize: '18px', // Increase font size
            }}
          >
            Double ({double})
          </Button>
          <Button
            onClick={() => handleThrow(3)}
            color="neutral"
            variant="solid"
            disabled={!loggedIn || loading}
            sx={{
              padding: '20px', // Increase padding
              fontSize: '18px', // Increase font size
            }}
          >
            Triple ({triple})
          </Button>
          <Button
            onClick={() => handleThrow(0)}
            color="danger"
            variant="solid"
            disabled={!loggedIn || loading}
            sx={{
              padding: '20px', // Increase padding
              fontSize: '18px', // Increase font size
            }}
          >
            Miss ({miss})
          </Button>
        </div>
      </div>
    </>
  );
};

export default LoggedDart;
