import React, { useState } from 'react';
import { Link } from "react-router";
import pb from '../../services/pocketbase';
import Avatar from '@mui/joy/Avatar';
import { Button } from '@mui/base';


const TopBar: React.FC = () => {
    const [userValid] = useState(pb.authStore.isValid);
    const [user] = useState(pb.authStore.record);

    const fetchGames = async () => {
        try {
            const games = await pb.collection("Games").getFullList({
                filter: `owner = '${user?.id}'`,
            });
            
            //console.log("Games fetched successfully:", games[0].throws);

            const throws = await pb.collection("Throws").getFullList({
                filter: `id = '${games[0].throws}'`,
            });

            console.log("throws", throws[0]);

        } catch (error) {
            console.error("Error fetching games:", error);
        } 
    };

    const getEmail = () => {
        if (user) {;
            return user.email;
        }
    } 

//    const barStyle: React.CSSProperties = {
//        maxWidth: '100%',
//        margin: '0 auto',
//        display: 'flex',
//        flexDirection: 'row',
//        gap: '10px',
//    };


    return (
        <div>
            {userValid ? (
                //<Avatar src={getIconUrl()} />
                <Avatar> {getEmail()} </Avatar>
            ) : (
                <div>
                    <Link to="/register"> Register </Link>
                     | 
                    <Link to="/login"> Login </Link>
                </div>
            )}
            <Button onClick={fetchGames} >Test</Button>
        </div>
    );
}

export default TopBar;