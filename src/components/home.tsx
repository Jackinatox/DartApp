import { useState } from "react";
import { useNavigate } from "react-router";
import TopBar from "./CustomButton/TopBar";
import GamesList from "./dart/GameList";
import { Button } from "@mui/joy";
import { Add } from "@mui/icons-material";
import pb from "../services/pocketbase";

const Homepage = () => {
  const [loading, SetLoading] = useState(false);
  let navigate = useNavigate();

  const newGame = async () => {
    SetLoading(true);
    const user = pb.authStore.record;
    if (user) {
      const throws = await pb.collection("Throws").create({ owner: user.id });

      const game = await pb
        .collection("Games")
        .create({ owner: user.id, throws: throws.id });

      console.log("Throws: ", throws);
      console.log("Games: ", game);

      navigate(`/game/${game.id}`);
    }

    SetLoading(false);
  };

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "20px" }}>
      <TopBar />

      <header style={{ textAlign: "center", margin: "20px 0" }}>
        <h1>Welcome to Dart Counter</h1>
        <p>Track your dart games effortlessly!</p>
      </header>

      <section style={{ margin: "20px 0" }}>
        <h2>Start a New Game</h2>
        {/*<Link to="/dart" style={{ textDecoration: 'none' }}> */}
        <Button
          loading={loading}
          size="lg"
          endDecorator={<Add />}
          color="success"
          onClick={() => newGame()}
        >
          New Game
        </Button>
      </section>

      <section style={{ margin: "20px 0" }}>
        <h2>Past Games</h2>
        <GamesList />
      </section>
    </div>
  );
};

export default Homepage;
