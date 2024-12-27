import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import pb from "../../services/pocketbase";

import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import { ListItemButton, ListItemContent } from "@mui/joy";
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import SportsIcon from '@mui/icons-material/Sports';
import CircularProgress from '@mui/joy/CircularProgress';




const GamesList: React.FC = () => {
    const [games, setGames] = useState<any[]>([]);
    //const [userValid] = useState(pb.authStore.isValid);
    const [user] = useState(pb.authStore.record);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchGames = async () => {
            try {
                setLoading(true);
                const Lgames = await pb.collection("Games").getFullList({
                    filter: `owner = '${user?.id}'`,
                });

                setGames(Lgames);
            } catch (error) {
                console.error("Failed to fetch games:", error);
            }
            setLoading(false);
        };

        fetchGames();
    }, []);

    return (
        <>
            {loading && (<CircularProgress /> )}

            <List>
                {games.map((game: any) => (
                    <ListItem key={game.id}>
                        <ListItemButton>
                            <ListItemDecorator><SportsIcon /></ListItemDecorator>
                            <ListItemContent><Link to={`/game/${game.id}`}>{game.created}</Link></ListItemContent>
                            <KeyboardArrowRight />
                        </ListItemButton>

                    </ListItem>
                ))}
            </List>
        </>
    );
}

export default GamesList;