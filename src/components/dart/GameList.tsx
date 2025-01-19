import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import pb from "../../services/pocketbase";

import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import { ListItemButton, ListItemContent, Typography } from "@mui/joy";
import ListItemDecorator from "@mui/joy/ListItemDecorator";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import SportsIcon from "@mui/icons-material/Sports";
import CircularProgress from "@mui/joy/CircularProgress";
import { format } from "date-fns/format";

const GamesList: React.FC = () => {
  const [games, setGames] = useState<any[]>([]);
  //const [userValid] = useState(pb.authStore.isValid);
  const [user] = useState(pb.authStore.record);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchGames = async () => {
      try {
        // setLoading(true);
        const Lgames = await pb.collection("Games").getFullList({
          filter: `owner = '${user?.id}'`,
          sort: '-created'
        });

        if (Lgames.length === 0) {
          setLoading(false);
        }
        setGames(Lgames);
      } catch (error) {
        console.error("Failed to fetch games:", error);
      }
    };

    fetchGames();
    //setLoading(false);
  }, []);

  useEffect(() => {
    if (games.length > 0) {
      const timer = setTimeout(() => setLoading(false), 1);
      return () => clearTimeout(timer);
    }
  }, [games]);

  return (
    <>
      {loading && <CircularProgress />}

      {!loading && (
        <>
          {games.length === 0 ? (
            <Typography variant="outlined" textAlign="center">
              Noch keine Spiele
            </Typography>
          ) : (
            <List>
              {games.map((game: any) => (
                <ListItem key={game.id}>
                  <ListItemButton
                    onClick={() => navigate(`/game/${game.id}`)}
                  >
                    <ListItemDecorator>
                      <SportsIcon />
                    </ListItemDecorator>
                    <ListItemContent>
                      {format(new Date(game.created), 'dd.MM.yyyy HH:mm')}
                    </ListItemContent>
                    <KeyboardArrowRight />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          )}
        </>
      )}
    </>
  );
};

export default GamesList;
